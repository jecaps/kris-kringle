-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wishlist" TEXT[],

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SantaMapping" (
    "id" TEXT NOT NULL,
    "santaId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "SantaMapping_pkey" PRIMARY KEY ("id")
);
