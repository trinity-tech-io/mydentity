/*
  Warnings:

  - You are about to drop the column `deviceId` on the `UserShadowKey` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserShadowKey" DROP CONSTRAINT "UserShadowKey_deviceId_fkey";

-- AlterTable
ALTER TABLE "UserShadowKey" DROP COLUMN "deviceId",
ADD COLUMN     "browserId" TEXT;

-- AddForeignKey
ALTER TABLE "UserShadowKey" ADD CONSTRAINT "UserShadowKey_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
