import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "home_page" ALTER COLUMN "hero_secondary_cta_label" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "hero_secondary_cta_href" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "featured_intro_eyebrow" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "trips_intro_title" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "trips_intro_description" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_one_title" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_one_body" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_two_title" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_two_body" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "cta_newsletter_placeholder" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "cta_newsletter_button_label" DROP NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "cta_newsletter_helper_text" DROP NOT NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    UPDATE "home_page"
    SET
      "hero_secondary_cta_label" = COALESCE("hero_secondary_cta_label", ''),
      "hero_secondary_cta_href" = COALESCE("hero_secondary_cta_href", ''),
      "featured_intro_eyebrow" = COALESCE("featured_intro_eyebrow", ''),
      "trips_intro_title" = COALESCE("trips_intro_title", ''),
      "trips_intro_description" = COALESCE("trips_intro_description", ''),
      "story_stat_one_title" = COALESCE("story_stat_one_title", ''),
      "story_stat_one_body" = COALESCE("story_stat_one_body", ''),
      "story_stat_two_title" = COALESCE("story_stat_two_title", ''),
      "story_stat_two_body" = COALESCE("story_stat_two_body", ''),
      "cta_newsletter_placeholder" = COALESCE("cta_newsletter_placeholder", ''),
      "cta_newsletter_button_label" = COALESCE("cta_newsletter_button_label", ''),
      "cta_newsletter_helper_text" = COALESCE("cta_newsletter_helper_text", '');

    ALTER TABLE "home_page" ALTER COLUMN "hero_secondary_cta_label" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "hero_secondary_cta_href" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "featured_intro_eyebrow" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "trips_intro_title" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "trips_intro_description" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_one_title" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_one_body" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_two_title" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "story_stat_two_body" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "cta_newsletter_placeholder" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "cta_newsletter_button_label" SET NOT NULL;
    ALTER TABLE "home_page" ALTER COLUMN "cta_newsletter_helper_text" SET NOT NULL;
  `);
}
