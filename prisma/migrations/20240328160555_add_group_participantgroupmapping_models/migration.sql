/*
  Warnings:

  - The primary key for the `SantaMapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SantaMapping` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'default@email.com';

-- AlterTable
ALTER TABLE "SantaMapping" DROP CONSTRAINT "SantaMapping_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SantaMapping_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "dateOfExchange" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantGroupMapping" (
    "id" SERIAL NOT NULL,
    "groupId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "ParticipantGroupMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");
