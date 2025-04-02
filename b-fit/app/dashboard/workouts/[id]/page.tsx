import { fetchWorkoutById } from "@/actions/fetch-workout";
import { notFound } from "next/navigation";

export default async function WorkoutDetailsPage({ params }: { params: { id: string } }) {
  const workout = await fetchWorkoutById(params.id);

  if (!workout) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{workout.name}</h1>
      {workout.description && <p className="text-gray-600">{workout.description}</p>}

      <h2 className="text-xl font-semibold mt-4">Exercises</h2>
      <ul className="space-y-2">
        {workout.exercises.map((exercise) => (
          <li key={exercise.id} className="p-3 border rounded-lg">
            <p className="text-lg font-medium">{exercise.name}</p>
            <p className="text-sm text-gray-600">{exercise.primaryMuscle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
