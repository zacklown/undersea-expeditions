import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "home_page" ADD COLUMN "hero_logo_id" integer;
    ALTER TABLE "home_page" ADD COLUMN "map_section_title" varchar;
    ALTER TABLE "home_page" ADD COLUMN "map_section_description" varchar;
    ALTER TABLE "home_page" ADD COLUMN "map_section_button_label" varchar;
    ALTER TABLE "home_page" ADD COLUMN "map_section_button_href" varchar;
    ALTER TABLE "home_page" ADD COLUMN "featured_trips_title" varchar;
    ALTER TABLE "home_page" ADD COLUMN "featured_trips_description" varchar;
    ALTER TABLE "home_page" ADD COLUMN "story_button_label" varchar;
    ALTER TABLE "home_page" ADD COLUMN "story_button_href" varchar;
    ALTER TABLE "trips" ADD COLUMN "featured_on_homepage" boolean DEFAULT false;

    UPDATE "home_page"
    SET
      "map_section_title" = COALESCE("map_section_title", 'Explore Where The Next Expeditions Go'),
      "map_section_description" = COALESCE("map_section_description", 'Each pin links directly to a trip page, so you can jump from the map into dates, itinerary, and booking details.'),
      "map_section_button_label" = COALESCE("map_section_button_label", 'Browse All Trips'),
      "map_section_button_href" = COALESCE("map_section_button_href", '/trips'),
      "featured_trips_title" = COALESCE("featured_trips_title", "trips_intro_title", 'Featured Trips'),
      "featured_trips_description" = COALESCE("featured_trips_description", "trips_intro_description"),
      "story_button_label" = COALESCE("story_button_label", 'About Us'),
      "story_button_href" = COALESCE("story_button_href", '/about');

    ALTER TABLE "home_page"
      ADD CONSTRAINT "home_page_hero_logo_id_media_id_fk"
      FOREIGN KEY ("hero_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX "home_page_hero_logo_idx" ON "home_page" USING btree ("hero_logo_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DROP INDEX "home_page_hero_logo_idx";
    ALTER TABLE "home_page" DROP CONSTRAINT "home_page_hero_logo_id_media_id_fk";
    ALTER TABLE "trips" DROP COLUMN "featured_on_homepage";
    ALTER TABLE "home_page" DROP COLUMN "hero_logo_id";
    ALTER TABLE "home_page" DROP COLUMN "map_section_title";
    ALTER TABLE "home_page" DROP COLUMN "map_section_description";
    ALTER TABLE "home_page" DROP COLUMN "map_section_button_label";
    ALTER TABLE "home_page" DROP COLUMN "map_section_button_href";
    ALTER TABLE "home_page" DROP COLUMN "featured_trips_title";
    ALTER TABLE "home_page" DROP COLUMN "featured_trips_description";
    ALTER TABLE "home_page" DROP COLUMN "story_button_label";
    ALTER TABLE "home_page" DROP COLUMN "story_button_href";
  `);
}
