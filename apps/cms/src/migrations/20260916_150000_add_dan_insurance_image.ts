import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "site_settings" ADD COLUMN "insurance_dan_image_id" integer;
    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_insurance_dan_image_id_media_id_fk" FOREIGN KEY ("insurance_dan_image_id") REFERENCES "public"."media"("id") ON DELETE set null;
    CREATE INDEX "site_settings_insurance_dan_image_idx" ON "site_settings" ("insurance_dan_image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`ALTER TABLE "site_settings" DROP COLUMN "insurance_dan_image_id";`);
}
