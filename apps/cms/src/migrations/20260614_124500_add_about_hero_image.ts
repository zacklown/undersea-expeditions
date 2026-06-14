import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "about_page" ADD COLUMN "hero_image_id" integer;
    ALTER TABLE "about_page"
      ADD CONSTRAINT "about_page_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
    CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DROP INDEX "about_page_hero_image_idx";
    ALTER TABLE "about_page" DROP CONSTRAINT "about_page_hero_image_id_media_id_fk";
    ALTER TABLE "about_page" DROP COLUMN "hero_image_id";
  `);
}
