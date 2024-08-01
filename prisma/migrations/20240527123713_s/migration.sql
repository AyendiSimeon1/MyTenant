/*
  Warnings:

  - Made the column `area` on table `Agency` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agency" ALTER COLUMN "area" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
