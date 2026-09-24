import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { generateNKeysBetween } from "payload/shared";

type FAQRow = { id: number };

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "trips" ADD COLUMN "content_sections_package_includes_heading" varchar DEFAULT 'Our Package Includes';
    ALTER TABLE "trips" ADD COLUMN "content_sections_not_included_heading" varchar DEFAULT 'Not Included';
    ALTER TABLE "trips" ADD COLUMN "content_sections_flights_heading" varchar DEFAULT 'Getting There';
    ALTER TABLE "trips" ADD COLUMN "content_sections_deposit_heading" varchar DEFAULT 'Deposit';
    ALTER TABLE "trips" ADD COLUMN "content_sections_update_as_of" timestamp(3) with time zone;
    ALTER TABLE "trips" ADD COLUMN "content_sections_update_content" jsonb;

    CREATE TABLE "trips_content_sections_additional_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar NOT NULL,
      "content" jsonb NOT NULL
    );

    ALTER TABLE "trips_content_sections_additional_sections"
      ADD CONSTRAINT "trips_content_sections_additional_sections_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."trips"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "trips_content_sections_additional_sections_order_idx"
      ON "trips_content_sections_additional_sections" USING btree ("_order");
    CREATE INDEX "trips_content_sections_additional_sections_parent_id_idx"
      ON "trips_content_sections_additional_sections" USING btree ("_parent_id");

    ALTER TABLE "faqs" ADD COLUMN "_order" varchar;
    CREATE INDEX "faqs_order_idx" ON "faqs" USING btree ("_order");
  `);

  const result = (await db.execute(
    `SELECT "id" FROM "faqs" ORDER BY "sort_order" ASC NULLS LAST, "id" ASC`,
  )) as unknown as { rows?: FAQRow[] };
  const rows = result.rows || [];
  const keys = generateNKeysBetween(null, null, rows.length);

  for (const [index, row] of rows.entries()) {
    await db.execute(`UPDATE "faqs" SET "_order" = '${keys[index]}' WHERE "id" = ${Number(row.id)}`);
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DROP INDEX IF EXISTS "faqs_order_idx";
    ALTER TABLE "faqs" DROP COLUMN IF EXISTS "_order";

    DROP TABLE IF EXISTS "trips_content_sections_additional_sections" CASCADE;
    ALTER TABLE "trips" DROP COLUMN IF EXISTS "content_sections_update_content";
    ALTER TABLE "trips" DROP COLUMN IF EXISTS "content_sections_update_as_of";
    ALTER TABLE "trips" DROP COLUMN IF EXISTS "content_sections_deposit_heading";
    ALTER TABLE "trips" DROP COLUMN IF EXISTS "content_sections_flights_heading";
    ALTER TABLE "trips" DROP COLUMN IF EXISTS "content_sections_not_included_heading";
    ALTER TABLE "trips" DROP COLUMN IF EXISTS "content_sections_package_includes_heading";
  `);
}
