-- CreateTable
CREATE TABLE "StoreMetadata" (
    "userId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 4,
    "fingerprint" TEXT,
    "defaultRootIndentity" TEXT,

    CONSTRAINT "StoreMetadata_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "RootIdentity" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "defaultDid" TEXT,
    "mnemonic" TEXT,
    "privateKey" TEXT,
    "publicKey" TEXT,
    "index" INTEGER NOT NULL,

    CONSTRAINT "RootIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifiableCredential" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "credential" TEXT NOT NULL,
    "txid" TEXT,
    "published" TIMESTAMP(3),
    "revoked" BOOLEAN,
    "alias" TEXT,

    CONSTRAINT "VerifiableCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DidDocument" (
    "userId" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "doc" TEXT,
    "rootIdentityId" TEXT,
    "index" INTEGER,
    "txid" TEXT,
    "previousSignature" TEXT,
    "signature" TEXT,
    "published" TIMESTAMP(3),
    "deactivated" BOOLEAN,
    "alias" TEXT,

    CONSTRAINT "DidDocument_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "PrivateKey" (
    "userId" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "context" TEXT NOT NULL,

    CONSTRAINT "PrivateKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreMetadata_userId_key" ON "StoreMetadata"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RootIdentity_id_key" ON "RootIdentity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VerifiableCredential_id_key" ON "VerifiableCredential"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DidDocument_did_key" ON "DidDocument"("did");

-- CreateIndex
CREATE UNIQUE INDEX "PrivateKey_id_key" ON "PrivateKey"("id");

-- AddForeignKey
ALTER TABLE "StoreMetadata" ADD CONSTRAINT "StoreMetadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RootIdentity" ADD CONSTRAINT "RootIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiableCredential" ADD CONSTRAINT "VerifiableCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DidDocument" ADD CONSTRAINT "DidDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateKey" ADD CONSTRAINT "PrivateKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
