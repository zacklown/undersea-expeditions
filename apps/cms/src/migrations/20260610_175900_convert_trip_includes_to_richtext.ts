import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

const emptyLexicalDocument = sql`'{"root":{"children":[],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'::jsonb`;

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "trips" ADD COLUMN "content_sections_package_includes" jsonb;
    ALTER TABLE "trips" ADD COLUMN "content_sections_not_included" jsonb;

    UPDATE "trips" AS "t"
    SET "content_sections_package_includes" = "payload"."document"
    FROM (
      SELECT
        "source"."_parent_id",
        jsonb_build_object(
          'root',
          jsonb_build_object(
            'children',
            jsonb_build_array(
              jsonb_build_object(
                'type', 'list',
                'listType', 'bullet',
                'children', COALESCE(
                  jsonb_agg(
                    jsonb_build_object(
                      'type', 'listitem',
                      'children', jsonb_build_array(
                        jsonb_build_object(
                          'type', 'text',
                          'text', "source"."item"
                        )
                      )
                    )
                    ORDER BY "source"."_order" ASC
                  ),
                  '[]'::jsonb
                )
              )
            ),
            'direction', 'ltr',
            'format', '',
            'indent', 0,
            'type', 'root',
            'version', 1
          )
        ) AS "document"
      FROM "trips_content_sections_package_includes" AS "source"
      WHERE COALESCE("source"."item", '') <> ''
      GROUP BY "source"."_parent_id"
    ) AS "payload"
    WHERE "t"."id" = "payload"."_parent_id";

    UPDATE "trips" AS "t"
    SET "content_sections_not_included" = "payload"."document"
    FROM (
      SELECT
        "source"."_parent_id",
        jsonb_build_object(
          'root',
          jsonb_build_object(
            'children',
            jsonb_build_array(
              jsonb_build_object(
                'type', 'list',
                'listType', 'bullet',
                'children', COALESCE(
                  jsonb_agg(
                    jsonb_build_object(
                      'type', 'listitem',
                      'children', jsonb_build_array(
                        jsonb_build_object(
                          'type', 'text',
                          'text', "source"."item"
                        )
                      )
                    )
                    ORDER BY "source"."_order" ASC
                  ),
                  '[]'::jsonb
                )
              )
            ),
            'direction', 'ltr',
            'format', '',
            'indent', 0,
            'type', 'root',
            'version', 1
          )
        ) AS "document"
      FROM "trips_content_sections_not_included" AS "source"
      WHERE COALESCE("source"."item", '') <> ''
      GROUP BY "source"."_parent_id"
    ) AS "payload"
    WHERE "t"."id" = "payload"."_parent_id";

    UPDATE "trips"
    SET "content_sections_package_includes" = COALESCE("content_sections_package_includes", ${emptyLexicalDocument}),
        "content_sections_not_included" = COALESCE("content_sections_not_included", ${emptyLexicalDocument});

    DROP TABLE "trips_content_sections_package_includes" CASCADE;
    DROP TABLE "trips_content_sections_not_included" CASCADE;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "trips_content_sections_package_includes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );
    CREATE TABLE "trips_content_sections_not_included" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );

    ALTER TABLE "trips_content_sections_package_includes"
      ADD CONSTRAINT "trips_content_sections_package_includes_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "trips_content_sections_not_included"
      ADD CONSTRAINT "trips_content_sections_not_included_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "trips_content_sections_package_includes_order_idx"
      ON "trips_content_sections_package_includes" USING btree ("_order");
    CREATE INDEX "trips_content_sections_package_includes_parent_id_idx"
      ON "trips_content_sections_package_includes" USING btree ("_parent_id");
    CREATE INDEX "trips_content_sections_not_included_order_idx"
      ON "trips_content_sections_not_included" USING btree ("_order");
    CREATE INDEX "trips_content_sections_not_included_parent_id_idx"
      ON "trips_content_sections_not_included" USING btree ("_parent_id");

    INSERT INTO "trips_content_sections_package_includes" ("_order", "_parent_id", "id", "item")
    SELECT
      ROW_NUMBER() OVER (PARTITION BY "payload"."trip_id" ORDER BY "payload"."sort_order") - 1,
      "payload"."trip_id",
      'package-include-' || "payload"."trip_id" || '-' || ROW_NUMBER() OVER (PARTITION BY "payload"."trip_id" ORDER BY "payload"."sort_order"),
      "payload"."item"
    FROM (
      SELECT
        "t"."id" AS "trip_id",
        "root_item"."ordinality" AS "sort_order",
        NULLIF(TRIM(BOTH FROM COALESCE("text_node"."value" ->> 'text', '')), '') AS "item"
      FROM "trips" AS "t"
      CROSS JOIN LATERAL jsonb_array_elements(COALESCE("t"."content_sections_package_includes" -> 'root' -> 'children', '[]'::jsonb)) WITH ORDINALITY AS "root_item"("value", "ordinality")
      LEFT JOIN LATERAL (
        SELECT "list_item"."value"
        FROM jsonb_array_elements(COALESCE("root_item"."value" -> 'children', '[]'::jsonb)) AS "list_item"("value")
        WHERE "root_item"."value" ->> 'type' = 'list'
        UNION ALL
        SELECT "root_item"."value"
        WHERE "root_item"."value" ->> 'type' = 'paragraph'
      ) AS "text_container" ON true
      LEFT JOIN LATERAL jsonb_array_elements(COALESCE("text_container"."value" -> 'children', '[]'::jsonb)) AS "text_node"("value") ON true
    ) AS "payload"
    WHERE "payload"."item" IS NOT NULL;

    INSERT INTO "trips_content_sections_not_included" ("_order", "_parent_id", "id", "item")
    SELECT
      ROW_NUMBER() OVER (PARTITION BY "payload"."trip_id" ORDER BY "payload"."sort_order") - 1,
      "payload"."trip_id",
      'not-included-' || "payload"."trip_id" || '-' || ROW_NUMBER() OVER (PARTITION BY "payload"."trip_id" ORDER BY "payload"."sort_order"),
      "payload"."item"
    FROM (
      SELECT
        "t"."id" AS "trip_id",
        "root_item"."ordinality" AS "sort_order",
        NULLIF(TRIM(BOTH FROM COALESCE("text_node"."value" ->> 'text', '')), '') AS "item"
      FROM "trips" AS "t"
      CROSS JOIN LATERAL jsonb_array_elements(COALESCE("t"."content_sections_not_included" -> 'root' -> 'children', '[]'::jsonb)) WITH ORDINALITY AS "root_item"("value", "ordinality")
      LEFT JOIN LATERAL (
        SELECT "list_item"."value"
        FROM jsonb_array_elements(COALESCE("root_item"."value" -> 'children', '[]'::jsonb)) AS "list_item"("value")
        WHERE "root_item"."value" ->> 'type' = 'list'
        UNION ALL
        SELECT "root_item"."value"
        WHERE "root_item"."value" ->> 'type' = 'paragraph'
      ) AS "text_container" ON true
      LEFT JOIN LATERAL jsonb_array_elements(COALESCE("text_container"."value" -> 'children', '[]'::jsonb)) AS "text_node"("value") ON true
    ) AS "payload"
    WHERE "payload"."item" IS NOT NULL;

    ALTER TABLE "trips" DROP COLUMN "content_sections_package_includes";
    ALTER TABLE "trips" DROP COLUMN "content_sections_not_included";
  `);
}
