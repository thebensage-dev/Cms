import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Portfolio's blocks are shared now, so its block set goes: every site can use them.
  ALTER TABLE "sites_block_sets" ALTER COLUMN "value" SET DATA TYPE text;
  DELETE FROM "sites_block_sets" WHERE "value" = 'portfolio';
  DROP TYPE "public"."enum_sites_block_sets";
  CREATE TYPE "public"."enum_sites_block_sets" AS ENUM('user-directory');
  ALTER TABLE "sites_block_sets" ALTER COLUMN "value" SET DATA TYPE "public"."enum_sites_block_sets" USING "value"::"public"."enum_sites_block_sets";
  ALTER TABLE "_sites_v_version_block_sets" ALTER COLUMN "value" SET DATA TYPE text;
  DELETE FROM "_sites_v_version_block_sets" WHERE "value" = 'portfolio';
  DROP TYPE "public"."enum__sites_v_version_block_sets";
  CREATE TYPE "public"."enum__sites_v_version_block_sets" AS ENUM('user-directory');
  ALTER TABLE "_sites_v_version_block_sets" ALTER COLUMN "value" SET DATA TYPE "public"."enum__sites_v_version_block_sets" USING "value"::"public"."enum__sites_v_version_block_sets";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_sites_block_sets" ADD VALUE 'portfolio' BEFORE 'user-directory';
  ALTER TYPE "public"."enum__sites_v_version_block_sets" ADD VALUE 'portfolio' BEFORE 'user-directory';`);
}
