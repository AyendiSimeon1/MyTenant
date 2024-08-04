/*
  Warnings:

  - You are about to drop the column `formId` on the `CustomForm` table. All the data in the column will be lost.
  - Added the required column `tenantId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CustomForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomForm" DROP CONSTRAINT "CustomForm_formId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CustomForm" DROP COLUMN "formId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomForm" ADD CONSTRAINT "CustomForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
