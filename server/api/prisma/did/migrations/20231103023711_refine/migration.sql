/*
  Warnings:

  - You are about to drop the column `context` on the `PrivateKey` table. All the data in the column will be lost.
  - You are about to drop the column `defaultRootIndentity` on the `StoreMetadata` table. All the data in the column will be lost.
  - Added the required column `content` to the `PrivateKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrivateKey" DROP COLUMN "context",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StoreMetadata" DROP COLUMN "defaultRootIndentity",
ADD COLUMN     "defaultRootIdentity" TEXT;
