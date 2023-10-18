/*
  Warnings:

  - You are about to drop the column `temporaryEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `temporaryEmailAuthExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `temporaryEmailAuthKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "temporaryEmail",
DROP COLUMN "temporaryEmailAuthExpiresAt",
DROP COLUMN "temporaryEmailAuthKey";

-- CreateTable
CREATE TABLE "TemporaryAuthentication" (
    "id" TEXT NOT NULL,
    "authKey" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "pinHash" TEXT NOT NULL,
    "temporaryEmail" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TemporaryAuthentication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryAuthentication_id_key" ON "TemporaryAuthentication"("id");

-- AddForeignKey
ALTER TABLE "TemporaryAuthentication" ADD CONSTRAINT "TemporaryAuthentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
