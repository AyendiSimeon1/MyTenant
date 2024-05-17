/*
  Warnings:

  - You are about to drop the column `content` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `agencyName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reference` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agentEmail` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentName` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fields` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_formId_fkey";

-- DropForeignKey
ALTER TABLE "Reference" DROP CONSTRAINT "Reference_applicationId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "content",
DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "agencyLogo" TEXT,
ADD COLUMN     "agentEmail" TEXT NOT NULL,
ADD COLUMN     "agentName" TEXT NOT NULL,
ADD COLUMN     "fields" JSONB NOT NULL,
ADD COLUMN     "leaseEndDate" TIMESTAMP(3),
ADD COLUMN     "leaseStartDate" TIMESTAMP(3),
ADD COLUMN     "propertyAddress" TEXT,
ADD COLUMN     "tenantEmail" TEXT,
ADD COLUMN     "tenantName" TEXT,
ADD COLUMN     "tenantPhone" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "agencyName";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Reference";

-- CreateTable
CREATE TABLE "Agency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logo" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
