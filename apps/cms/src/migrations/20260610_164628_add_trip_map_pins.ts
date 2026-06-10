import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(`
   CREATE TYPE "public"."enum_trips_map_pin_color" AS ENUM('gold', 'coral', 'seafoam', 'deep-blue');
  ALTER TABLE "trips" ADD COLUMN "map_pin_x_percent" numeric;
  ALTER TABLE "trips" ADD COLUMN "map_pin_y_percent" numeric;
  ALTER TABLE "trips" ADD COLUMN "map_pin_color" "enum_trips_map_pin_color" DEFAULT 'gold' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(`
   ALTER TABLE "trips" DROP COLUMN "map_pin_x_percent";
  ALTER TABLE "trips" DROP COLUMN "map_pin_y_percent";
  ALTER TABLE "trips" DROP COLUMN "map_pin_color";
  DROP TYPE "public"."enum_trips_map_pin_color";`)
}
