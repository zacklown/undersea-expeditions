import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

const insuranceURL = "https://dan.org/membership-insurance/travel-insurance/per-trip-insurance/";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "site_settings_social_links"
      ADD COLUMN "platform" varchar DEFAULT 'website' NOT NULL;

    UPDATE "site_settings_social_links"
      SET "platform" = CASE
        WHEN lower("url") LIKE '%instagram.com%' THEN 'instagram'
        WHEN lower("url") LIKE '%facebook.com%' THEN 'facebook'
        WHEN lower("url") LIKE '%tiktok.com%' THEN 'tiktok'
        WHEN lower("url") LIKE '%youtube.com%' OR lower("url") LIKE '%youtu.be%' THEN 'youtube'
        WHEN lower("url") LIKE '%linkedin.com%' THEN 'linkedin'
        WHEN lower("url") LIKE '%x.com%' OR lower("url") LIKE '%twitter.com%' THEN 'x'
        ELSE 'website'
      END;

    ALTER TABLE "site_settings" DROP CONSTRAINT IF EXISTS "site_settings_insurance_logo_id_media_id_fk";
    DROP INDEX IF EXISTS "site_settings_insurance_logo_idx";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "insurance_logo_id";

    ALTER TABLE "site_settings" ADD COLUMN "trip_defaults_hero_image_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN "legal_pages_privacy_policy" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN "legal_pages_cookie_policy" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN "legal_pages_terms_and_conditions" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN "legal_pages_accessibility_statement" jsonb;

    ALTER TABLE "site_settings"
      ADD CONSTRAINT "site_settings_trip_defaults_hero_image_id_media_id_fk"
      FOREIGN KEY ("trip_defaults_hero_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX "site_settings_trip_defaults_hero_image_idx"
      ON "site_settings" USING btree ("trip_defaults_hero_image_id");

    UPDATE "site_settings"
      SET "insurance_buy_button_label" = 'Get Insurance'
      WHERE "insurance_buy_button_label" IS NULL OR "insurance_buy_button_label" = 'Buy Insurance';

    UPDATE "site_settings"
      SET "insurance_buy_button_href" = '${insuranceURL}'
      WHERE "insurance_buy_button_href" IS NULL
         OR "insurance_buy_button_href" = ''
         OR "insurance_buy_button_href" = '/contact';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DROP INDEX IF EXISTS "site_settings_trip_defaults_hero_image_idx";
    ALTER TABLE "site_settings" DROP CONSTRAINT IF EXISTS "site_settings_trip_defaults_hero_image_id_media_id_fk";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "trip_defaults_hero_image_id";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "legal_pages_privacy_policy";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "legal_pages_cookie_policy";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "legal_pages_terms_and_conditions";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "legal_pages_accessibility_statement";

    ALTER TABLE "site_settings" ADD COLUMN "insurance_logo_id" integer;
    ALTER TABLE "site_settings"
      ADD CONSTRAINT "site_settings_insurance_logo_id_media_id_fk"
      FOREIGN KEY ("insurance_logo_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
    CREATE INDEX "site_settings_insurance_logo_idx"
      ON "site_settings" USING btree ("insurance_logo_id");

    ALTER TABLE "site_settings_social_links" DROP COLUMN IF EXISTS "platform";
  `);
}
