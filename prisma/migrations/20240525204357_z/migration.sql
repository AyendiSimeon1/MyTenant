/*
  Warnings:

  - A unique constraint covering the columns `[agencyId]` on the table `Agency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agencyId` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "agencyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agency_agencyId_key" ON "Agency"("agencyId");
