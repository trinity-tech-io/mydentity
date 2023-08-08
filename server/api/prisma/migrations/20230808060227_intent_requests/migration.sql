-- CreateEnum
CREATE TYPE "IntentType" AS ENUM ('REQUEST_CREDENTIALS', 'IMPORT_CREDENTIALS');

-- CreateTable
CREATE TABLE "Intent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "IntentType" NOT NULL,
    "requestPayload" JSONB NOT NULL,
    "responsePayload" JSONB,

    CONSTRAINT "Intent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Intent_id_key" ON "Intent"("id");
