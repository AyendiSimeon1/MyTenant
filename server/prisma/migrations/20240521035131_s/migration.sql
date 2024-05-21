-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_tenantId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "logoUrl" DROP NOT NULL,
ALTER COLUMN "tenantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
