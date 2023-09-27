-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('REGULAR', 'APPLICATION');

-- AlterTable
ALTER TABLE "Identity" ADD COLUMN     "type" "IdentityType" NOT NULL DEFAULT 'REGULAR';

-- CreateTable
CREATE TABLE "DeveloperAccessToken" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DeveloperAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperAccessToken_id_key" ON "DeveloperAccessToken"("id");

-- AddForeignKey
ALTER TABLE "DeveloperAccessToken" ADD CONSTRAINT "DeveloperAccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
