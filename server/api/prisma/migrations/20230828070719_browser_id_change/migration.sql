/*
  Warnings:

  - The primary key for the `Browser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `Browser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Browser" DROP CONSTRAINT "Browser_pkey",
DROP COLUMN "clientId",
ADD CONSTRAINT "Browser_pkey" PRIMARY KEY ("id");
