/*
  Warnings:

  - The primary key for the `DidDocument` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PrivateKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RootIdentity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VerifiableCredential` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[path,did]` on the table `DidDocument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path,id]` on the table `PrivateKey` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path,id]` on the table `RootIdentity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path,id]` on the table `VerifiableCredential` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DidDocument_did_key";

-- DropIndex
DROP INDEX "PrivateKey_id_key";

-- DropIndex
DROP INDEX "RootIdentity_id_key";

-- DropIndex
DROP INDEX "VerifiableCredential_id_key";

-- AlterTable
ALTER TABLE "DidDocument" DROP CONSTRAINT "DidDocument_pkey";

-- AlterTable
ALTER TABLE "PrivateKey" DROP CONSTRAINT "PrivateKey_pkey";

-- AlterTable
ALTER TABLE "RootIdentity" DROP CONSTRAINT "RootIdentity_pkey";

-- AlterTable
ALTER TABLE "VerifiableCredential" DROP CONSTRAINT "VerifiableCredential_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "DidDocument_path_did_key" ON "DidDocument"("path", "did");

-- CreateIndex
CREATE UNIQUE INDEX "PrivateKey_path_id_key" ON "PrivateKey"("path", "id");

-- CreateIndex
CREATE UNIQUE INDEX "RootIdentity_path_id_key" ON "RootIdentity"("path", "id");

-- CreateIndex
CREATE UNIQUE INDEX "VerifiableCredential_path_id_key" ON "VerifiableCredential"("path", "id");
