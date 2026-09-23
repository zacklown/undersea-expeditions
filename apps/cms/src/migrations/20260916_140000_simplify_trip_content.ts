import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Retain the retired columns as an archive, but allow new trips without a summary.
  // Merge distinct Lexical blocks so existing introductions are not lost or repeated.
  await db.execute(`
    UPDATE "trips"
    SET "content_sections_overview" = CASE
      WHEN "content_sections_overview" IS NULL
        OR jsonb_array_length(COALESCE("content_sections_overview"->'root'->'children', '[]'::jsonb)) = 0
        THEN "summary"
      WHEN "summary" = "content_sections_overview" THEN "content_sections_overview"
      ELSE jsonb_set(
        "content_sections_overview",
        '{root,children}',
        COALESCE((
          SELECT jsonb_agg(block ORDER BY position)
          FROM (
            SELECT block, MIN(position) AS position
            FROM jsonb_array_elements(
              COALESCE("summary"->'root'->'children', '[]'::jsonb)
              || COALESCE("content_sections_overview"->'root'->'children', '[]'::jsonb)
            ) WITH ORDINALITY AS blocks(block, position)
            GROUP BY block
          ) unique_blocks
        ), '[]'::jsonb)
      )
    END
    WHERE "summary" IS NOT NULL;

    ALTER TABLE "trips" ALTER COLUMN "summary" DROP NOT NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    UPDATE "trips"
    SET "summary" = COALESCE(
      "content_sections_overview",
      '{"root":{"type":"root","version":1,"format":"","indent":0,"direction":null,"children":[]}}'::jsonb
    )
    WHERE "summary" IS NULL;

    ALTER TABLE "trips" ALTER COLUMN "summary" SET NOT NULL;
  `);
}
