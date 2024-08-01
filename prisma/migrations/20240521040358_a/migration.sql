/*
  Warnings:

  - You are about to drop the column `tenantId` on the `Application` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_tenantId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "tenantId",
ADD COLUMN     "agentId" TEXT;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
