import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    CREATE TABLE "trips_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL,
      "description" varchar
    );

    ALTER TABLE "trips_gallery"
      ADD CONSTRAINT "trips_gallery_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."trips"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "trips_gallery"
      ADD CONSTRAINT "trips_gallery_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX "trips_gallery_order_idx" ON "trips_gallery" USING btree ("_order");
    CREATE INDEX "trips_gallery_parent_id_idx" ON "trips_gallery" USING btree ("_parent_id");
    CREATE INDEX "trips_gallery_image_idx" ON "trips_gallery" USING btree ("image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DROP TABLE "trips_gallery" CASCADE;
  `);
}
