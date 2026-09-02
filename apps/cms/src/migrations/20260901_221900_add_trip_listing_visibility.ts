import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "trips" ADD COLUMN "show_in_listings" boolean DEFAULT true;
    UPDATE "trips" SET "show_in_listings" = true WHERE "show_in_listings" IS NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "trips" DROP COLUMN "show_in_listings";
  `);
}
