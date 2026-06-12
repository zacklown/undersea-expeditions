import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "trips" ADD COLUMN "banner_image_id" integer;
    ALTER TABLE "trips" ADD COLUMN "insurance_image_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN "insurance_logo_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN "insurance_default_image_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN "insurance_buy_button_label" varchar DEFAULT 'Buy Insurance' NOT NULL;
    ALTER TABLE "site_settings" ADD COLUMN "insurance_buy_button_href" varchar DEFAULT '/contact' NOT NULL;

    ALTER TABLE "trips" ADD CONSTRAINT "trips_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "trips" ADD CONSTRAINT "trips_insurance_image_id_media_id_fk" FOREIGN KEY ("insurance_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_insurance_logo_id_media_id_fk" FOREIGN KEY ("insurance_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_insurance_default_image_id_media_id_fk" FOREIGN KEY ("insurance_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "trips_banner_image_idx" ON "trips" USING btree ("banner_image_id");
    CREATE INDEX "trips_insurance_image_idx" ON "trips" USING btree ("insurance_image_id");
    CREATE INDEX "site_settings_insurance_logo_idx" ON "site_settings" USING btree ("insurance_logo_id");
    CREATE INDEX "site_settings_insurance_default_image_idx" ON "site_settings" USING btree ("insurance_default_image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DROP INDEX "trips_banner_image_idx";
    DROP INDEX "trips_insurance_image_idx";
    DROP INDEX "site_settings_insurance_logo_idx";
    DROP INDEX "site_settings_insurance_default_image_idx";

    ALTER TABLE "trips" DROP CONSTRAINT "trips_banner_image_id_media_id_fk";
    ALTER TABLE "trips" DROP CONSTRAINT "trips_insurance_image_id_media_id_fk";
    ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_insurance_logo_id_media_id_fk";
    ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_insurance_default_image_id_media_id_fk";

    ALTER TABLE "trips" DROP COLUMN "banner_image_id";
    ALTER TABLE "trips" DROP COLUMN "insurance_image_id";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_logo_id";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_default_image_id";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_buy_button_label";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_buy_button_href";
  `);
}
