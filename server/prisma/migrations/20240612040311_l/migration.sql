/*
  Warnings:

  - A unique constraint covering the columns `[formSubmissionId]` on the table `Reference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formSubmissionId` to the `Reference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reference" ADD COLUMN     "formSubmissionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reference_formSubmissionId_key" ON "Reference"("formSubmissionId");

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_formSubmissionId_fkey" FOREIGN KEY ("formSubmissionId") REFERENCES "FormSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
