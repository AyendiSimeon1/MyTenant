/*
  Warnings:

  - You are about to drop the column `createdAt` on the `SubmittedApplication` table. All the data in the column will be lost.
  - You are about to drop the column `leaseEndDate` on the `SubmittedApplication` table. All the data in the column will be lost.
  - You are about to drop the column `leaseStartDate` on the `SubmittedApplication` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `SubmittedApplication` table. All the data in the column will be lost.
  - You are about to drop the column `propertyAddress` on the `SubmittedApplication` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `SubmittedApplication` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SubmittedApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubmittedApplication" DROP COLUMN "createdAt",
DROP COLUMN "leaseEndDate",
DROP COLUMN "leaseStartDate",
DROP COLUMN "logoUrl",
DROP COLUMN "propertyAddress",
DROP COLUMN "status",
DROP COLUMN "title";
