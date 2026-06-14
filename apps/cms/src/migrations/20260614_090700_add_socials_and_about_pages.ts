import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    CREATE TABLE "socials_page_social_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "button_label" varchar,
      "href" varchar
    );

    CREATE TABLE "socials_page_latest_social_moments_tiles" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "image_id" integer,
      "button_label" varchar,
      "href" varchar
    );

    CREATE TABLE "socials_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "latest_social_moments_title" varchar,
      "latest_social_moments_description" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE "about_page_staff_section_office_staff" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "role" varchar,
      "image_id" integer,
      "bio" jsonb
    );

    CREATE TABLE "about_page_staff_section_trip_leaders" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "role" varchar,
      "image_id" integer,
      "bio" jsonb
    );

    CREATE TABLE "about_page_press_section_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "cta_label" varchar,
      "description" varchar,
      "pdf_id" integer,
      "external_url" varchar
    );

    CREATE TABLE "about_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" jsonb,
      "staff_section_title" varchar,
      "staff_section_description" varchar,
      "staff_section_office_title" varchar,
      "staff_section_trip_leaders_title" varchar,
      "press_section_title" varchar,
      "press_section_description" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    ALTER TABLE "socials_page_social_links"
      ADD CONSTRAINT "socials_page_social_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."socials_page"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "socials_page_latest_social_moments_tiles"
      ADD CONSTRAINT "socials_page_latest_social_moments_tiles_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "socials_page_latest_social_moments_tiles"
      ADD CONSTRAINT "socials_page_latest_social_moments_tiles_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."socials_page"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "about_page_staff_section_office_staff"
      ADD CONSTRAINT "about_page_staff_section_office_staff_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "about_page_staff_section_office_staff"
      ADD CONSTRAINT "about_page_staff_section_office_staff_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "about_page_staff_section_trip_leaders"
      ADD CONSTRAINT "about_page_staff_section_trip_leaders_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "about_page_staff_section_trip_leaders"
      ADD CONSTRAINT "about_page_staff_section_trip_leaders_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "about_page_press_section_items"
      ADD CONSTRAINT "about_page_press_section_items_pdf_id_media_id_fk"
      FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "about_page_press_section_items"
      ADD CONSTRAINT "about_page_press_section_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "socials_page_social_links_order_idx" ON "socials_page_social_links" USING btree ("_order");
    CREATE INDEX "socials_page_social_links_parent_id_idx" ON "socials_page_social_links" USING btree ("_parent_id");
    CREATE INDEX "socials_page_latest_social_moments_tiles_order_idx" ON "socials_page_latest_social_moments_tiles" USING btree ("_order");
    CREATE INDEX "socials_page_latest_social_moments_tiles_parent_id_idx" ON "socials_page_latest_social_moments_tiles" USING btree ("_parent_id");
    CREATE INDEX "socials_page_latest_social_moments_tiles_image_idx" ON "socials_page_latest_social_moments_tiles" USING btree ("image_id");
    CREATE INDEX "about_page_staff_section_office_staff_order_idx" ON "about_page_staff_section_office_staff" USING btree ("_order");
    CREATE INDEX "about_page_staff_section_office_staff_parent_id_idx" ON "about_page_staff_section_office_staff" USING btree ("_parent_id");
    CREATE INDEX "about_page_staff_section_office_staff_image_idx" ON "about_page_staff_section_office_staff" USING btree ("image_id");
    CREATE INDEX "about_page_staff_section_trip_leaders_order_idx" ON "about_page_staff_section_trip_leaders" USING btree ("_order");
    CREATE INDEX "about_page_staff_section_trip_leaders_parent_id_idx" ON "about_page_staff_section_trip_leaders" USING btree ("_parent_id");
    CREATE INDEX "about_page_staff_section_trip_leaders_image_idx" ON "about_page_staff_section_trip_leaders" USING btree ("image_id");
    CREATE INDEX "about_page_press_section_items_order_idx" ON "about_page_press_section_items" USING btree ("_order");
    CREATE INDEX "about_page_press_section_items_parent_id_idx" ON "about_page_press_section_items" USING btree ("_parent_id");
    CREATE INDEX "about_page_press_section_items_pdf_idx" ON "about_page_press_section_items" USING btree ("pdf_id");

    INSERT INTO "socials_page" ("title", "description", "updated_at", "created_at")
    SELECT "title", "description", "updated_at", "created_at"
    FROM "gallery_page";

    DROP TABLE "gallery_page" CASCADE;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    CREATE TABLE "gallery_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    INSERT INTO "gallery_page" ("title", "description", "updated_at", "created_at")
    SELECT
      COALESCE("title", 'Dive Into Socials'),
      COALESCE("description", 'Follow the latest trip moments, traveler updates, and underwater highlights across our social channels.'),
      "updated_at",
      "created_at"
    FROM "socials_page";

    DROP INDEX "about_page_press_section_items_pdf_idx";
    DROP INDEX "about_page_press_section_items_parent_id_idx";
    DROP INDEX "about_page_press_section_items_order_idx";
    DROP INDEX "about_page_staff_section_trip_leaders_image_idx";
    DROP INDEX "about_page_staff_section_trip_leaders_parent_id_idx";
    DROP INDEX "about_page_staff_section_trip_leaders_order_idx";
    DROP INDEX "about_page_staff_section_office_staff_image_idx";
    DROP INDEX "about_page_staff_section_office_staff_parent_id_idx";
    DROP INDEX "about_page_staff_section_office_staff_order_idx";
    DROP INDEX "socials_page_latest_social_moments_tiles_image_idx";
    DROP INDEX "socials_page_latest_social_moments_tiles_parent_id_idx";
    DROP INDEX "socials_page_latest_social_moments_tiles_order_idx";
    DROP INDEX "socials_page_social_links_parent_id_idx";
    DROP INDEX "socials_page_social_links_order_idx";

    ALTER TABLE "about_page_press_section_items" DROP CONSTRAINT "about_page_press_section_items_pdf_id_media_id_fk";
    ALTER TABLE "about_page_press_section_items" DROP CONSTRAINT "about_page_press_section_items_parent_id_fk";
    ALTER TABLE "about_page_staff_section_trip_leaders" DROP CONSTRAINT "about_page_staff_section_trip_leaders_image_id_media_id_fk";
    ALTER TABLE "about_page_staff_section_trip_leaders" DROP CONSTRAINT "about_page_staff_section_trip_leaders_parent_id_fk";
    ALTER TABLE "about_page_staff_section_office_staff" DROP CONSTRAINT "about_page_staff_section_office_staff_image_id_media_id_fk";
    ALTER TABLE "about_page_staff_section_office_staff" DROP CONSTRAINT "about_page_staff_section_office_staff_parent_id_fk";
    ALTER TABLE "socials_page_latest_social_moments_tiles" DROP CONSTRAINT "socials_page_latest_social_moments_tiles_image_id_media_id_fk";
    ALTER TABLE "socials_page_latest_social_moments_tiles" DROP CONSTRAINT "socials_page_latest_social_moments_tiles_parent_id_fk";
    ALTER TABLE "socials_page_social_links" DROP CONSTRAINT "socials_page_social_links_parent_id_fk";

    DROP TABLE "about_page_press_section_items";
    DROP TABLE "about_page_staff_section_trip_leaders";
    DROP TABLE "about_page_staff_section_office_staff";
    DROP TABLE "about_page";
    DROP TABLE "socials_page_latest_social_moments_tiles";
    DROP TABLE "socials_page_social_links";
    DROP TABLE "socials_page";
  `);
}
