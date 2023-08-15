/*
  Warnings:

  - The values [PUBLICKEY] on the enum `UserShadowKeyType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `UserShadowKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `encryptedAccountKey` on the `UserShadowKey` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `UserShadowKey` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `UserShadowKey` table. All the data in the column will be lost.
  - You are about to drop the column `publicKey` on the `UserShadowKey` table. All the data in the column will be lost.
  - Added the required column `key` to the `UserShadowKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretKey` to the `UserShadowKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserShadowKeyType_new" AS ENUM ('PASSWORD', 'ED25519');
ALTER TABLE "UserShadowKey" ALTER COLUMN "type" TYPE "UserShadowKeyType_new" USING ("type"::text::"UserShadowKeyType_new");
ALTER TYPE "UserShadowKeyType" RENAME TO "UserShadowKeyType_old";
ALTER TYPE "UserShadowKeyType_new" RENAME TO "UserShadowKeyType";
DROP TYPE "UserShadowKeyType_old";
COMMIT;

-- DropIndex
DROP INDEX "UserShadowKey_id_key";

-- AlterTable
ALTER TABLE "UserShadowKey" DROP CONSTRAINT "UserShadowKey_pkey",
DROP COLUMN "encryptedAccountKey",
DROP COLUMN "id",
DROP COLUMN "passwordHash",
DROP COLUMN "publicKey",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "secretKey" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "deviceId" DROP NOT NULL,
ADD CONSTRAINT "UserShadowKey_pkey" PRIMARY KEY ("userId", "key");
