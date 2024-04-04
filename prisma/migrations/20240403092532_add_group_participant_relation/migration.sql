-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_id_fkey" FOREIGN KEY ("id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
