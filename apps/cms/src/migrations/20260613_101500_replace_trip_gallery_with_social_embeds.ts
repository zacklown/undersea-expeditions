import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    CREATE TABLE "trips_social_embeds" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "platform" varchar NOT NULL,
      "title" varchar,
      "post_url" varchar NOT NULL
    );

    ALTER TABLE "trips_social_embeds"
      ADD CONSTRAINT "trips_social_embeds_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."trips"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "trips_social_embeds_order_idx" ON "trips_social_embeds" USING btree ("_order");
    CREATE INDEX "trips_social_embeds_parent_id_idx" ON "trips_social_embeds" USING btree ("_parent_id");

    DROP INDEX "trips_gallery_idx";
    ALTER TABLE "trips" DROP CONSTRAINT "trips_gallery_id_galleries_id_fk";
    ALTER TABLE "trips" DROP COLUMN "gallery_id";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "trips" ADD COLUMN "gallery_id" integer;
    ALTER TABLE "trips"
      ADD CONSTRAINT "trips_gallery_id_galleries_id_fk"
      FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries"("id")
      ON DELETE set null ON UPDATE no action;
    CREATE INDEX "trips_gallery_idx" ON "trips" USING btree ("gallery_id");

    DROP INDEX "trips_social_embeds_order_idx";
    DROP INDEX "trips_social_embeds_parent_id_idx";
    ALTER TABLE "trips_social_embeds" DROP CONSTRAINT "trips_social_embeds_parent_id_fk";
    DROP TABLE "trips_social_embeds";
  `);
}
