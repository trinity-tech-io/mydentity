/*
  Warnings:

  - You are about to drop the `ProfileEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileEntry" DROP CONSTRAINT "ProfileEntry_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "ProfileEntry";
