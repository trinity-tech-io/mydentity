-- CreateTable
CREATE TABLE "IdentityClaimRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "claimCompletedAt" TIMESTAMP(3),
    "identityDid" TEXT NOT NULL,

    CONSTRAINT "IdentityClaimRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdentityClaimRequest_id_key" ON "IdentityClaimRequest"("id");

-- AddForeignKey
ALTER TABLE "IdentityClaimRequest" ADD CONSTRAINT "IdentityClaimRequest_identityDid_fkey" FOREIGN KEY ("identityDid") REFERENCES "Identity"("did") ON DELETE RESTRICT ON UPDATE CASCADE;
