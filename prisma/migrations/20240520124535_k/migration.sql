/*
  Warnings:

  - You are about to drop the column `tenantId` on the `Application` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_tenantId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "tenantId";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
