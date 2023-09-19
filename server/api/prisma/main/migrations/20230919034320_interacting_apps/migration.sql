-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "importedById" TEXT;

-- CreateTable
CREATE TABLE "InteractingApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "did" TEXT NOT NULL,

    CONSTRAINT "InteractingApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityInteractingApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identityDid" TEXT NOT NULL,
    "interactingApplicationId" TEXT NOT NULL,

    CONSTRAINT "IdentityInteractingApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestedCredential" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestedCredentialId" TEXT NOT NULL,
    "interactingApplicationId" TEXT NOT NULL,

    CONSTRAINT "RequestedCredential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InteractingApplication_id_key" ON "InteractingApplication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InteractingApplication_did_key" ON "InteractingApplication"("did");

-- CreateIndex
CREATE UNIQUE INDEX "IdentityInteractingApplication_id_key" ON "IdentityInteractingApplication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IdentityInteractingApplication_identityDid_interactingAppli_key" ON "IdentityInteractingApplication"("identityDid", "interactingApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "RequestedCredential_id_key" ON "RequestedCredential"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RequestedCredential_requestedCredentialId_interactingApplic_key" ON "RequestedCredential"("requestedCredentialId", "interactingApplicationId");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_importedById_fkey" FOREIGN KEY ("importedById") REFERENCES "IdentityInteractingApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityInteractingApplication" ADD CONSTRAINT "IdentityInteractingApplication_identityDid_fkey" FOREIGN KEY ("identityDid") REFERENCES "Identity"("did") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityInteractingApplication" ADD CONSTRAINT "IdentityInteractingApplication_interactingApplicationId_fkey" FOREIGN KEY ("interactingApplicationId") REFERENCES "InteractingApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedCredential" ADD CONSTRAINT "RequestedCredential_requestedCredentialId_fkey" FOREIGN KEY ("requestedCredentialId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedCredential" ADD CONSTRAINT "RequestedCredential_interactingApplicationId_fkey" FOREIGN KEY ("interactingApplicationId") REFERENCES "IdentityInteractingApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
