import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    CREATE TABLE "about_page_staff_section_members" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "role" varchar,
      "image_id" integer,
      "bio" jsonb
    );

    INSERT INTO "about_page_staff_section_members"
      ("_order", "_parent_id", "id", "name", "role", "image_id", "bio")
    SELECT "_order", "_parent_id", "id", "name", "role", "image_id", "bio"
      FROM "about_page_staff_section_office_staff";

    INSERT INTO "about_page_staff_section_members"
      ("_order", "_parent_id", "id", "name", "role", "image_id", "bio")
    SELECT
      trip."_order" + COALESCE((
        SELECT MAX(office."_order") + 1
        FROM "about_page_staff_section_office_staff" office
        WHERE office."_parent_id" = trip."_parent_id"
      ), 0),
      trip."_parent_id", trip."id", trip."name", trip."role", trip."image_id", trip."bio"
      FROM "about_page_staff_section_trip_leaders" trip;

    ALTER TABLE "about_page_staff_section_members"
      ADD CONSTRAINT "about_page_staff_section_members_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "about_page_staff_section_members"
      ADD CONSTRAINT "about_page_staff_section_members_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id")
      ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "about_page_staff_section_members_order_idx"
      ON "about_page_staff_section_members" USING btree ("_order");
    CREATE INDEX "about_page_staff_section_members_parent_id_idx"
      ON "about_page_staff_section_members" USING btree ("_parent_id");
    CREATE INDEX "about_page_staff_section_members_image_idx"
      ON "about_page_staff_section_members" USING btree ("image_id");

    DROP TABLE "about_page_staff_section_office_staff" CASCADE;
    DROP TABLE "about_page_staff_section_trip_leaders" CASCADE;
    ALTER TABLE "about_page" DROP COLUMN IF EXISTS "staff_section_office_title";
    ALTER TABLE "about_page" DROP COLUMN IF EXISTS "staff_section_trip_leaders_title";
    ALTER TABLE "about_page" DROP COLUMN IF EXISTS "testimonials_section_eyebrow";

    UPDATE "about_page"
      SET "testimonials_section_title" = 'What our customers are saying'
      WHERE "testimonials_section_title" IS NULL
         OR "testimonials_section_title" = 'The best part is who you meet along the way';

    ALTER TABLE "site_settings" ADD COLUMN "insurance_description" varchar;
    ALTER TABLE "site_settings" ADD COLUMN "insurance_dan_label" varchar DEFAULT 'DAN Insurance';
    ALTER TABLE "site_settings" ADD COLUMN "insurance_dan_href" varchar;
    ALTER TABLE "site_settings" ADD COLUMN "insurance_travel_label" varchar DEFAULT 'Travel Insurance';
    ALTER TABLE "site_settings" ADD COLUMN "insurance_travel_href" varchar;

    UPDATE "site_settings"
      SET "insurance_dan_href" = "insurance_buy_button_href"
      WHERE "insurance_buy_button_href" LIKE 'http%';

    ALTER TABLE "site_settings" DROP COLUMN "insurance_buy_button_label";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_buy_button_href";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "site_settings" ADD COLUMN "insurance_buy_button_label" varchar DEFAULT 'Get Insurance' NOT NULL;
    ALTER TABLE "site_settings" ADD COLUMN "insurance_buy_button_href" varchar DEFAULT '/contact' NOT NULL;
    UPDATE "site_settings"
      SET "insurance_buy_button_label" = COALESCE("insurance_dan_label", 'Get Insurance'),
          "insurance_buy_button_href" = COALESCE("insurance_dan_href", '/contact');
    ALTER TABLE "site_settings" DROP COLUMN "insurance_description";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_dan_label";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_dan_href";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_travel_label";
    ALTER TABLE "site_settings" DROP COLUMN "insurance_travel_href";

    ALTER TABLE "about_page" ADD COLUMN "staff_section_office_title" varchar;
    ALTER TABLE "about_page" ADD COLUMN "staff_section_trip_leaders_title" varchar;
    ALTER TABLE "about_page" ADD COLUMN "testimonials_section_eyebrow" varchar DEFAULT 'Traveler Stories';

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

    INSERT INTO "about_page_staff_section_office_staff"
      ("_order", "_parent_id", "id", "name", "role", "image_id", "bio")
    SELECT "_order", "_parent_id", "id", "name", "role", "image_id", "bio"
      FROM "about_page_staff_section_members";

    ALTER TABLE "about_page_staff_section_office_staff"
      ADD CONSTRAINT "about_page_staff_section_office_staff_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "about_page_staff_section_office_staff"
      ADD CONSTRAINT "about_page_staff_section_office_staff_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "about_page_staff_section_trip_leaders"
      ADD CONSTRAINT "about_page_staff_section_trip_leaders_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "about_page_staff_section_trip_leaders"
      ADD CONSTRAINT "about_page_staff_section_trip_leaders_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "about_page_staff_section_office_staff_order_idx" ON "about_page_staff_section_office_staff" USING btree ("_order");
    CREATE INDEX "about_page_staff_section_office_staff_parent_id_idx" ON "about_page_staff_section_office_staff" USING btree ("_parent_id");
    CREATE INDEX "about_page_staff_section_office_staff_image_idx" ON "about_page_staff_section_office_staff" USING btree ("image_id");
    CREATE INDEX "about_page_staff_section_trip_leaders_order_idx" ON "about_page_staff_section_trip_leaders" USING btree ("_order");
    CREATE INDEX "about_page_staff_section_trip_leaders_parent_id_idx" ON "about_page_staff_section_trip_leaders" USING btree ("_parent_id");
    CREATE INDEX "about_page_staff_section_trip_leaders_image_idx" ON "about_page_staff_section_trip_leaders" USING btree ("image_id");

    DROP TABLE "about_page_staff_section_members" CASCADE;
  `);
}
