import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trips" ADD COLUMN "legacy_url" varchar;
  ALTER TABLE "trips" ADD COLUMN "trip_year" numeric;
  ALTER TABLE "trips" ADD COLUMN "map_pin_show_on_homepage" boolean DEFAULT false;
  UPDATE "trips"
    SET "trip_year" = EXTRACT(YEAR FROM "trip_start")
    WHERE "trip_year" IS NULL AND "trip_start" IS NOT NULL;
  UPDATE "trips"
    SET "map_pin_show_on_homepage" = COALESCE("map_pin_enabled", false)
    WHERE "map_pin_enabled" IS NOT NULL;
  ALTER TABLE "trips" DROP COLUMN "map_pin_enabled";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trips" ADD COLUMN "map_pin_enabled" boolean DEFAULT false;
  UPDATE "trips"
    SET "map_pin_enabled" = COALESCE("map_pin_show_on_homepage", false)
    WHERE "map_pin_show_on_homepage" IS NOT NULL;
  ALTER TABLE "trips" DROP COLUMN "legacy_url";
  ALTER TABLE "trips" DROP COLUMN "trip_year";
  ALTER TABLE "trips" DROP COLUMN "map_pin_show_on_homepage";`);
}
