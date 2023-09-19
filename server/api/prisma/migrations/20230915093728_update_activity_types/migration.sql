/*
  Warnings:

  - The values [VC_CREATED,VC_SHARED,VC_SIGNED_BY_THIRD_APP,DID_CREATED,DID_DELETED,SIGNED_IN,VC_IMPORTED] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `content` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `provider` to the `UserEmail` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `UserEmail` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserEmailProvider" AS ENUM ('RAW', 'MICROSOFT');

-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('USER_SIGN_IN', 'IDENTITY_CREATED', 'IDENTITY_DELETED', 'CREDENTIALS_IMPORTED', 'CREDENTIALS_SHARED', 'BIND_EMAIL', 'BIND_BROWSER', 'PASSWORD_CHANGED');
ALTER TABLE "Activity" ALTER COLUMN "type" TYPE "ActivityType_new" USING ("type"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "ActivityType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "content",
ADD COLUMN     "appDid" TEXT,
ADD COLUMN     "browserId" TEXT,
ADD COLUMN     "browserName" TEXT,
ADD COLUMN     "credentialsCount" INTEGER,
ADD COLUMN     "identityStr" TEXT,
ADD COLUMN     "userEmailProvider" "UserEmailProvider";

-- AlterTable
ALTER TABLE "UserEmail" ADD COLUMN     "provider" "UserEmailProvider" NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
