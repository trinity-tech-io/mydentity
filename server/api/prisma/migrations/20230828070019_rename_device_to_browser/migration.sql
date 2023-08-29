/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserShadowKey" DROP CONSTRAINT "UserShadowKey_deviceId_fkey";

-- DropTable
DROP TABLE "Device";

-- CreateTable
CREATE TABLE "Browser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Browser_pkey" PRIMARY KEY ("userId","clientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Browser_id_key" ON "Browser"("id");

-- AddForeignKey
ALTER TABLE "UserShadowKey" ADD CONSTRAINT "UserShadowKey_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Browser" ADD CONSTRAINT "Browser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
