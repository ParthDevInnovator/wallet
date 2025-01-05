/*
  Warnings:

  - The values [Sucess] on the enum `OnRampStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[token]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnRampStatus_new" AS ENUM ('Success', 'Failure', 'Processing');
ALTER TABLE "OnRampTransaction" ALTER COLUMN "status" TYPE "OnRampStatus_new" USING ("status"::text::"OnRampStatus_new");
ALTER TYPE "OnRampStatus" RENAME TO "OnRampStatus_old";
ALTER TYPE "OnRampStatus_new" RENAME TO "OnRampStatus";
DROP TYPE "OnRampStatus_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_token_key" ON "OnRampTransaction"("token");
