/*
  Warnings:

  - You are about to drop the `ParticipantGroupMapping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Participant_email_key";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "email" DROP DEFAULT;

-- DropTable
DROP TABLE "ParticipantGroupMapping";
