/*
  Warnings:

  - You are about to drop the column `leaseEndDate` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `leaseStartDate` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `propertyAddress` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the `CustomForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomForm" DROP CONSTRAINT "CustomForm_userId_fkey";

-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "leaseEndDate",
DROP COLUMN "leaseStartDate",
DROP COLUMN "propertyAddress";

-- DropTable
DROP TABLE "CustomForm";

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" TEXT,
    "religion" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "occupation" TEXT,
    "currentAddress" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "nextOfKinName" TEXT,
    "nextOfKinContact" TEXT,
    "nextOfKinAddress" TEXT,
    "nextOfKinRelationship" TEXT,
    "placeOfWork" TEXT,
    "localGovernmentOrigin" TEXT,
    "state" TEXT,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "contactInfo" TEXT,
    "relationship" TEXT,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "additionalDetails" TEXT,
    "identityDocument" TEXT,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
