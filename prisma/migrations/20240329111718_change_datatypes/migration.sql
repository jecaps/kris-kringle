/*
  Warnings:

  - You are about to alter the column `budget` on the `Group` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "budget" SET DATA TYPE INTEGER,
ALTER COLUMN "dateOfExchange" SET DATA TYPE TEXT;
