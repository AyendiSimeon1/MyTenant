-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
