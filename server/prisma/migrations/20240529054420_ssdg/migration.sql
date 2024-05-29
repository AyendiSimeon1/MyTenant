/*
  Warnings:

  - You are about to drop the column `agencyId` on the `Agency` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Agency_agencyId_key";

-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "agencyId";
