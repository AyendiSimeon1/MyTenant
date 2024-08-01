/*
  Warnings:

  - Made the column `agencyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_userId_fkey";

-- AlterTable
ALTER TABLE "Agency" ALTER COLUMN "agencyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "agencyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
