import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(`
  CREATE TABLE "about_page_testimonials_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"trip" varchar
  );
  
  ALTER TABLE "about_page" ADD COLUMN "testimonials_section_eyebrow" varchar DEFAULT 'Traveler Stories';
  ALTER TABLE "about_page" ADD COLUMN "testimonials_section_title" varchar DEFAULT 'The best part is who you meet along the way';
  ALTER TABLE "about_page" ADD COLUMN "testimonials_section_description" varchar;
  ALTER TABLE "about_page_testimonials_section_items" ADD CONSTRAINT "about_page_testimonials_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_testimonials_section_items_order_idx" ON "about_page_testimonials_section_items" USING btree ("_order");
  CREATE INDEX "about_page_testimonials_section_items_parent_id_idx" ON "about_page_testimonials_section_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(`
   ALTER TABLE "about_page_testimonials_section_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page_testimonials_section_items" CASCADE;
  ALTER TABLE "about_page" DROP COLUMN "testimonials_section_eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "testimonials_section_title";
  ALTER TABLE "about_page" DROP COLUMN "testimonials_section_description";`)
}
