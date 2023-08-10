/*
  Warnings:

  - Added the required column `derivationIndex` to the `Identity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityRootId` to the `Identity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Identity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserShadowKeyType" AS ENUM ('PUBLICKEY', 'PASSWORD');

-- AlterTable
ALTER TABLE "Identity" ADD COLUMN     "derivationIndex" INTEGER NOT NULL,
ADD COLUMN     "identityRootId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "IdentityRoot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "didStoreRootIdentityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IdentityRoot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShadowKey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "UserShadowKeyType" NOT NULL,
    "encryptedAccountKey" TEXT NOT NULL,
    "publicKey" TEXT,
    "passwordHash" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserShadowKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdentityRoot_id_key" ON "IdentityRoot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserShadowKey_id_key" ON "UserShadowKey"("id");

-- AddForeignKey
ALTER TABLE "IdentityRoot" ADD CONSTRAINT "IdentityRoot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_identityRootId_fkey" FOREIGN KEY ("identityRootId") REFERENCES "IdentityRoot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShadowKey" ADD CONSTRAINT "UserShadowKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
