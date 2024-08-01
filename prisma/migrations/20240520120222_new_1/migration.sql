/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `formData` on the `Application` table. All the data in the column will be lost.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `logoUrl` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
DROP COLUMN "formData",
ADD COLUMN     "logoUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Application_id_seq";

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Payment_id_seq";
