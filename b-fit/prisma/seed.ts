import { db } from "../lib/db/db";
import exercisesData from "@/lib/exercise-list"; // ✅ Your default exercise list
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  getEnumKeyByValue,
  getEnumKeysByValues,
} from "@/lib/definitions"; // ✅ Import frontend enums

async function main() {

  for (const exercise of exercisesData) {
    const equipmentEnumKey = getEnumKeyByValue(
      ExerciseEquipment,
      exercise.equipment
    );
    const primaryMuscleEnumKey = getEnumKeyByValue(
      MuscleGroup,
      exercise.primaryMuscle
    );
    const auxiliaryMusclesEnumKeys = getEnumKeysByValues(
      MuscleGroup,
      exercise.auxiliaryMuscles
    );
    const exerciseTypeEnumKey = getEnumKeyByValue(ExerciseType, exercise.type);

    // Ensure all required fields are correctly mapped
    if (!equipmentEnumKey || !primaryMuscleEnumKey || !exerciseTypeEnumKey) {
      return { error: "Invalid enum values provided." };
    }
    await db.exercise.upsert({
      where: { id: exercise.id }, // ✅ Avoids duplicates
      update: {}, // No update needed
      create: {
        name: exercise.name,
        equipment: equipmentEnumKey,
        primaryMuscle: primaryMuscleEnumKey,
        auxiliaryMuscles: auxiliaryMusclesEnumKeys,
        exerciseType: exerciseTypeEnumKey,
        ownership: "BFit",
        instructions: exercise.instructions,
      },
    });
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
