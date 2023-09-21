/*
  Warnings:

  - You are about to drop the column `identityStr` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "identityStr",
ADD COLUMN     "identityDid" TEXT,
ADD COLUMN     "identityId" TEXT,
ADD COLUMN     "userEmailAddress" TEXT,
ADD COLUMN     "userEmailId" TEXT;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userEmailId_fkey" FOREIGN KEY ("userEmailId") REFERENCES "UserEmail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity"("did") ON DELETE SET NULL ON UPDATE CASCADE;
