-- CreateTable
CREATE TABLE "SubmittedApplication" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "logoUrl" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "propertyAddress" TEXT,
    "leaseStartDate" TIMESTAMP(3),
    "leaseEndDate" TIMESTAMP(3),
    "fields" JSONB NOT NULL,

    CONSTRAINT "SubmittedApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubmittedApplication" ADD CONSTRAINT "SubmittedApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
