/*
  Warnings:

  - A unique constraint covering the columns `[nextId]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[previousId]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownership` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExerciseOwnership" AS ENUM ('BFit', 'Custom');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "ownership" "ExerciseOwnership" NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "nextId" TEXT,
ADD COLUMN     "previousId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_nextId_key" ON "WorkoutExercise"("nextId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_previousId_key" ON "WorkoutExercise"("previousId");

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_nextId_fkey" FOREIGN KEY ("nextId") REFERENCES "WorkoutExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_previousId_fkey" FOREIGN KEY ("previousId") REFERENCES "WorkoutExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
