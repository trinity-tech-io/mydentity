/*
  Warnings:

  - You are about to drop the column `requestedCredentialId` on the `RequestedCredential` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[credentialId,interactingApplicationId]` on the table `RequestedCredential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credentialId` to the `RequestedCredential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RequestedCredential" DROP CONSTRAINT "RequestedCredential_requestedCredentialId_fkey";

-- DropIndex
DROP INDEX "RequestedCredential_requestedCredentialId_interactingApplic_key";

-- AlterTable
ALTER TABLE "RequestedCredential" DROP COLUMN "requestedCredentialId",
ADD COLUMN     "credentialId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RequestedCredential_credentialId_interactingApplicationId_key" ON "RequestedCredential"("credentialId", "interactingApplicationId");

-- AddForeignKey
ALTER TABLE "RequestedCredential" ADD CONSTRAINT "RequestedCredential_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
