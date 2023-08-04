/*
  Warnings:

  - The primary key for the `Identity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Identity` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Identity_id_key";

-- AlterTable
ALTER TABLE "Identity" DROP CONSTRAINT "Identity_pkey",
DROP COLUMN "id";
