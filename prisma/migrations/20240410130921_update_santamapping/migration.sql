/*
  Warnings:

  - Added the required column `groupId` to the `SantaMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SantaMapping" ADD COLUMN     "groupId" TEXT NOT NULL;
