/*
  Warnings:

  - You are about to drop the column `secretkey` on the `IdentityClaimRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IdentityClaimRequest" DROP COLUMN "secretkey";
