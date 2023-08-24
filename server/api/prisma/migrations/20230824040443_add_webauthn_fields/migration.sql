/*
  Warnings:

  - The values [ED25519] on the enum `UserShadowKeyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserShadowKeyType_new" AS ENUM ('PASSWORD', 'WEBAUTHN');
ALTER TABLE "UserShadowKey" ALTER COLUMN "type" TYPE "UserShadowKeyType_new" USING ("type"::text::"UserShadowKeyType_new");
ALTER TYPE "UserShadowKeyType" RENAME TO "UserShadowKeyType_old";
ALTER TYPE "UserShadowKeyType_new" RENAME TO "UserShadowKeyType";
DROP TYPE "UserShadowKeyType_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserShadowKey" ADD COLUMN     "counter" INTEGER,
ADD COLUMN     "credentialId" TEXT;
