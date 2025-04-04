import { getWorkoutWithExercises } from "@/actions/fetch-workout";
import { notFound } from "next/navigation";
import SelectedExercisesList from "@/components/workouts/workout-selected-exercises";
import { ExerciseNode } from "@/lib/exercise-linked-list";
import EditWorkoutForm from "@/components/workouts/workout-edit-workout-form";

export default async function WorkoutDetailsPage({ params }: { params: { id: string } }) {
  const response = await getWorkoutWithExercises(params.id);
  if (!response.success || !response.workout) return notFound();

  const { workout } = response;

  // 🏋️ Initialize the head and create ExerciseNode objects
  let head: ExerciseNode | null = null;
  const exerciseMap: Record<string, ExerciseNode> = {};
  
  // First pass: Create ExerciseNode objects directly (no need for new keyword)
  for (const workoutExercise of workout.exercises) {
    const node: ExerciseNode = {
      id: workoutExercise.exercise.id,
      instanceId: workoutExercise.id,  // Use the workoutExercise ID for instanceId
      name: workoutExercise.exercise.name,
      equipment: workoutExercise.exercise.equipment,
      primaryMuscle: workoutExercise.exercise.primaryMuscle,
      auxiliaryMuscles: workoutExercise.exercise.auxiliaryMuscles,
      type: workoutExercise.exercise.exerciseType,
      next: null,  // Initially set to null
    };

    exerciseMap[workoutExercise.id] = node;

    if (!workoutExercise.previousId) {
      head = node; // Identify the first exercise in the sequence
    }
  }

  // Second pass: Link the nodes together
  for (const workoutExercise of workout.exercises) {
    if (workoutExercise.nextId) {
      exerciseMap[workoutExercise.id].next = exerciseMap[workoutExercise.nextId];
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Pass a no-op function to setHead */}
      <EditWorkoutForm workoutHead={head} workoutName={workout.name} workoutDescription={workout.description ? workout.description : undefined}/>
    </div>
  );
}
