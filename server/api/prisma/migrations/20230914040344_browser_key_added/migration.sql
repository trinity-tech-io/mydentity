/*
  Warnings:

  - Added the required column `key` to the `Browser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Browser" ADD COLUMN     "key" TEXT NOT NULL;
