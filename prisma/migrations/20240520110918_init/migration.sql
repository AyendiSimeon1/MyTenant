/*
  Warnings:

  - You are about to drop the `Agency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormResponse` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `resetToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_agentId_fkey";

-- DropForeignKey
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_formId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetToken" SET NOT NULL;

-- DropTable
DROP TABLE "Agency";

-- DropTable
DROP TABLE "Form";

-- DropTable
DROP TABLE "FormResponse";

-- CreateTable
CREATE TABLE "CustomForm" (
    "id" SERIAL NOT NULL,
    "formId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "tenantId" TEXT NOT NULL,
    "formId" INTEGER NOT NULL,
    "formData" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "propertyAddress" TEXT,
    "leaseStartDate" TIMESTAMP(3),
    "leaseEndDate" TIMESTAMP(3),
    "fields" JSONB NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "tenantId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomForm" ADD CONSTRAINT "CustomForm_formId_fkey" FOREIGN KEY ("formId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
