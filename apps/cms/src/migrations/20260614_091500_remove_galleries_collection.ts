import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    DROP INDEX "payload_locked_documents_rels_galleries_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_galleries_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "galleries_id";

    DROP TABLE "galleries_images" CASCADE;
    DROP TABLE "galleries" CASCADE;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    CREATE TABLE "galleries" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "overlay_text" varchar NOT NULL,
      "sort_order" numeric DEFAULT 10,
      "excerpt" varchar NOT NULL,
      "cover_image_id" integer NOT NULL,
      "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
      "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
    );

    CREATE TABLE "galleries_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL,
      "caption" varchar
    );

    ALTER TABLE "galleries"
      ADD CONSTRAINT "galleries_cover_image_id_media_id_fk"
      FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "galleries_images"
      ADD CONSTRAINT "galleries_images_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "galleries_images"
      ADD CONSTRAINT "galleries_images_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE UNIQUE INDEX "galleries_slug_idx" ON "galleries" USING btree ("slug");
    CREATE INDEX "galleries_cover_image_idx" ON "galleries" USING btree ("cover_image_id");
    CREATE INDEX "galleries_updated_at_idx" ON "galleries" USING btree ("updated_at");
    CREATE INDEX "galleries_created_at_idx" ON "galleries" USING btree ("created_at");
    CREATE INDEX "galleries_images_order_idx" ON "galleries_images" USING btree ("_order");
    CREATE INDEX "galleries_images_parent_id_idx" ON "galleries_images" USING btree ("_parent_id");
    CREATE INDEX "galleries_images_image_idx" ON "galleries_images" USING btree ("image_id");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "galleries_id" integer;
    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_galleries_fk"
      FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id")
      ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "payload_locked_documents_rels_galleries_id_idx" ON "payload_locked_documents_rels" USING btree ("galleries_id");
  `);
}
