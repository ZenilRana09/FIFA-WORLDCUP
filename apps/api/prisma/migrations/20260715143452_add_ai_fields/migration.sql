/*
  Warnings:

  - Added the required column `crowdDensity` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "aiActions" JSONB,
ADD COLUMN     "aiPriority" INTEGER,
ADD COLUMN     "aiResolution" TEXT,
ADD COLUMN     "aiRisk" TEXT,
ADD COLUMN     "aiSummary" TEXT,
ADD COLUMN     "crowdDensity" INTEGER NOT NULL;
