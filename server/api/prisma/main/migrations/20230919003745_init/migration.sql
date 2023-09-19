-- CreateEnum
CREATE TYPE "UserEmailProvider" AS ENUM ('RAW', 'MICROSOFT');

-- CreateEnum
CREATE TYPE "IntentType" AS ENUM ('REQUEST_CREDENTIALS', 'IMPORT_CREDENTIALS');

-- CreateEnum
CREATE TYPE "UserShadowKeyType" AS ENUM ('PASSWORD', 'WEBAUTHN');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('USER_SIGN_IN', 'IDENTITY_CREATED', 'IDENTITY_DELETED', 'CREDENTIALS_IMPORTED', 'CREDENTIALS_SHARED', 'BIND_EMAIL', 'BIND_BROWSER', 'PASSWORD_CHANGED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "fullName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "welcomeEmailSentAt" TIMESTAMP(3),
    "temporaryEmailAuthKey" TEXT,
    "temporaryEmailAuthExpiresAt" TIMESTAMP(3),
    "temporaryEmail" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" "UserEmailProvider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityRoot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "didStoreRootIdentityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IdentityRoot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identity" (
    "did" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "derivationIndex" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "identityRootId" TEXT NOT NULL,
    "publicationId" TEXT,
    "publishedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialId" TEXT NOT NULL,
    "identityDid" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "IntentType" NOT NULL,
    "redirectUrl" TEXT NOT NULL,
    "requestPayload" JSONB NOT NULL,
    "responsePayload" JSONB,

    CONSTRAINT "Intent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShadowKey" (
    "userId" TEXT NOT NULL,
    "keyId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "credentialId" TEXT,
    "counter" INTEGER,
    "type" "UserShadowKeyType" NOT NULL,
    "secretKey" TEXT NOT NULL,
    "browserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserShadowKey_pkey" PRIMARY KEY ("userId","keyId")
);

-- CreateTable
CREATE TABLE "Browser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Browser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "userEmailProvider" "UserEmailProvider",
    "identityStr" TEXT,
    "credentialsCount" INTEGER,
    "appDid" TEXT,
    "browserName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "browserId" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthChallenge" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_id_key" ON "UserEmail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_email_key" ON "UserEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IdentityRoot_id_key" ON "IdentityRoot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_did_key" ON "Identity"("did");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_id_key" ON "Credential"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Intent_id_key" ON "Intent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Browser_id_key" ON "Browser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthChallenge_id_key" ON "AuthChallenge"("id");

-- AddForeignKey
ALTER TABLE "UserEmail" ADD CONSTRAINT "UserEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityRoot" ADD CONSTRAINT "IdentityRoot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_identityRootId_fkey" FOREIGN KEY ("identityRootId") REFERENCES "IdentityRoot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_identityDid_fkey" FOREIGN KEY ("identityDid") REFERENCES "Identity"("did") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShadowKey" ADD CONSTRAINT "UserShadowKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShadowKey" ADD CONSTRAINT "UserShadowKey_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Browser" ADD CONSTRAINT "Browser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
