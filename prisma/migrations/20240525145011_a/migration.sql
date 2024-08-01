/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[agencyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `resetToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "agencyId" TEXT,
ALTER COLUMN "resetToken" SET NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_userId_key" ON "Agency"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_agencyId_key" ON "User"("agencyId");

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("agencyId") ON DELETE RESTRICT ON UPDATE CASCADE;
