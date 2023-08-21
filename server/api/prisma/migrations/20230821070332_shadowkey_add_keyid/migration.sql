/*
  Warnings:

  - The primary key for the `UserShadowKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `keyId` to the `UserShadowKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserShadowKey" DROP CONSTRAINT "UserShadowKey_pkey",
ADD COLUMN     "keyId" TEXT NOT NULL,
ADD CONSTRAINT "UserShadowKey_pkey" PRIMARY KEY ("userId", "keyId");
