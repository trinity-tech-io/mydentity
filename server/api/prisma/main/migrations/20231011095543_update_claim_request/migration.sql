/*
  Warnings:

  - Added the required column `password` to the `IdentityClaimRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretkey` to the `IdentityClaimRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IdentityClaimRequest" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "secretkey" TEXT NOT NULL;
