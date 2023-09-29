/*
  Warnings:

  - You are about to drop the `DeveloperAccessToken` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Identity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `IdentityRoot` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DeveloperAccessToken" DROP CONSTRAINT "DeveloperAccessToken_userId_fkey";

-- AlterTable
ALTER TABLE "Identity" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "IdentityRoot" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "DeveloperAccessToken";

-- CreateTable
CREATE TABLE "DeveloperAccessKey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,
    "title" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DeveloperAccessKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperAccessKey_id_key" ON "DeveloperAccessKey"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperAccessKey_hash_key" ON "DeveloperAccessKey"("hash");

-- AddForeignKey
ALTER TABLE "DeveloperAccessKey" ADD CONSTRAINT "DeveloperAccessKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
