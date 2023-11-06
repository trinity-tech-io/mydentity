/*
  Warnings:

  - You are about to drop the column `context` on the `PrivateKey` table. All the data in the column will be lost.
  - You are about to drop the column `defaultRootIndentity` on the `StoreMetadata` table. All the data in the column will be lost.
  - Added the required column `content` to the `PrivateKey` table without a default value. This is not possible if the table is not empty.

*/
ALTER TABLE "PrivateKey" RENAME COLUMN "context" TO "content";
ALTER TABLE "StoreMetadata" RENAME COLUMN "defaultRootIndentity" TO "defaultRootIdentity";
