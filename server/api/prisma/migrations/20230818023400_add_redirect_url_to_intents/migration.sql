/*
  Warnings:

  - Added the required column `redirectUrl` to the `Intent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Intent" ADD COLUMN     "redirectUrl" TEXT NOT NULL;
