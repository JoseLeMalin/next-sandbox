-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "creatorId" TEXT NOT NULL DEFAULT 'clrgukr5y0000hxwyw1grq5r3';

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
