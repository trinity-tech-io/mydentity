-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialId" TEXT NOT NULL,
    "identityDid" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_id_key" ON "Credential"("id");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_identityDid_fkey" FOREIGN KEY ("identityDid") REFERENCES "Identity"("did") ON DELETE RESTRICT ON UPDATE CASCADE;
