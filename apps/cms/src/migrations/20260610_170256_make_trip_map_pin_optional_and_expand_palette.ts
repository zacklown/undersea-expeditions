import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DATA TYPE text;
  ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DEFAULT 'amber'::text;
  DROP TYPE "public"."enum_trips_map_pin_color";
  CREATE TYPE "public"."enum_trips_map_pin_color" AS ENUM('amber', 'apricot', 'aqua', 'berry', 'blush', 'brick', 'bronze', 'coral', 'crimson', 'deep-blue', 'emerald', 'forest', 'gold', 'hot-pink', 'indigo', 'lavender', 'lemon', 'mint', 'ocean', 'orchid', 'peacock', 'plum', 'seafoam', 'terracotta');
  ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DEFAULT 'amber'::"public"."enum_trips_map_pin_color";
  ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DATA TYPE "public"."enum_trips_map_pin_color" USING "map_pin_color"::"public"."enum_trips_map_pin_color";
  ALTER TABLE "trips" ADD COLUMN "map_pin_enabled" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DATA TYPE text;
  ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DEFAULT 'gold'::text;
  DROP TYPE "public"."enum_trips_map_pin_color";
  CREATE TYPE "public"."enum_trips_map_pin_color" AS ENUM('gold', 'coral', 'seafoam', 'deep-blue');
  ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DEFAULT 'gold'::"public"."enum_trips_map_pin_color";
  ALTER TABLE "trips" ALTER COLUMN "map_pin_color" SET DATA TYPE "public"."enum_trips_map_pin_color" USING "map_pin_color"::"public"."enum_trips_map_pin_color";
  ALTER TABLE "trips" DROP COLUMN "map_pin_enabled";`)
}
