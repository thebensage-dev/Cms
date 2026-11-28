import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sites_block_sets" AS ENUM('portfolio', 'user-directory');
  CREATE TYPE "public"."enum__sites_v_version_block_sets" AS ENUM('portfolio', 'user-directory');
  CREATE TABLE "sites_block_sets" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_sites_block_sets",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_sites_v_version_block_sets" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__sites_v_version_block_sets",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "sites" ALTER COLUMN "slug" SET DATA TYPE varchar;
  ALTER TABLE "_sites_v" ALTER COLUMN "version_slug" SET DATA TYPE varchar;
  ALTER TABLE "sites" ADD COLUMN "subdomain" varchar;
  ALTER TABLE "_sites_v" ADD COLUMN "version_subdomain" varchar;
  ALTER TABLE "sites_block_sets" ADD CONSTRAINT "sites_block_sets_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sites_v_version_block_sets" ADD CONSTRAINT "_sites_v_version_block_sets_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_sites_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sites_block_sets_order_idx" ON "sites_block_sets" USING btree ("order");
  CREATE INDEX "sites_block_sets_parent_idx" ON "sites_block_sets" USING btree ("parent_id");
  CREATE INDEX "_sites_v_version_block_sets_order_idx" ON "_sites_v_version_block_sets" USING btree ("order");
  CREATE INDEX "_sites_v_version_block_sets_parent_idx" ON "_sites_v_version_block_sets" USING btree ("parent_id");
  -- Every site is now one type. The two existing ones keep their blocks through a block set each,
  -- the User Directory lives on users.<domain>, and its meta description becomes its headline.
  INSERT INTO "sites_block_sets" ("order", "parent_id", "value")
    SELECT 1, "id", "slug"::"enum_sites_block_sets" FROM "sites" WHERE "slug" IN ('portfolio', 'user-directory');
  INSERT INTO "_sites_v_version_block_sets" ("order", "parent_id", "value")
    SELECT 1, "id", "version_slug"::"enum__sites_v_version_block_sets" FROM "_sites_v" WHERE "version_slug" IN ('portfolio', 'user-directory');
  UPDATE "sites" SET "subdomain" = 'users' WHERE "slug" = 'user-directory';
  UPDATE "_sites_v" SET "version_subdomain" = 'users' WHERE "version_slug" = 'user-directory';
  UPDATE "sites" SET "headline" = COALESCE("headline", "description", "name");
  UPDATE "_sites_v" SET "version_headline" = COALESCE("version_headline", "version_description", "version_name");
  ALTER TABLE "sites" ALTER COLUMN "headline" SET NOT NULL;
  ALTER TABLE "_sites_v" ALTER COLUMN "version_headline" SET NOT NULL;
  ALTER TABLE "sites" DROP COLUMN "description";
  ALTER TABLE "_sites_v" DROP COLUMN "version_description";
  DROP TYPE "public"."enum_sites_slug";
  DROP TYPE "public"."enum__sites_v_version_slug";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sites_slug" AS ENUM('portfolio', 'user-directory');
  CREATE TYPE "public"."enum__sites_v_version_slug" AS ENUM('portfolio', 'user-directory');
  ALTER TABLE "sites_block_sets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sites_v_version_block_sets" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sites_block_sets" CASCADE;
  DROP TABLE "_sites_v_version_block_sets" CASCADE;
  ALTER TABLE "sites" ALTER COLUMN "slug" SET DATA TYPE "public"."enum_sites_slug" USING "slug"::"public"."enum_sites_slug";
  ALTER TABLE "sites" ALTER COLUMN "headline" DROP NOT NULL;
  ALTER TABLE "_sites_v" ALTER COLUMN "version_slug" SET DATA TYPE "public"."enum__sites_v_version_slug" USING "version_slug"::"public"."enum__sites_v_version_slug";
  ALTER TABLE "_sites_v" ALTER COLUMN "version_headline" DROP NOT NULL;
  ALTER TABLE "sites" ADD COLUMN "description" varchar;
  ALTER TABLE "_sites_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "sites" DROP COLUMN "subdomain";
  ALTER TABLE "_sites_v" DROP COLUMN "version_subdomain";
  DROP TYPE "public"."enum_sites_block_sets";
  DROP TYPE "public"."enum__sites_v_version_block_sets";`);
}
