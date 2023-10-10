-- AlterTable
ALTER TABLE "Identity" ADD COLUMN     "creatingAppIdentityDid" TEXT;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_creatingAppIdentityDid_fkey" FOREIGN KEY ("creatingAppIdentityDid") REFERENCES "Identity"("did") ON DELETE RESTRICT ON UPDATE CASCADE;
