import ExercisesSkeleton from "@/components/exercises/skeletons/skeleton-exercises";
import SkeletonWorkoutCreate from "@/components/workouts/skeletons/skeleton-workout-create";
import SkeletonWorkouts from "@/components/workouts/skeletons/skeleton-workouts";
export default function Loading() {
  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex flex-col border rounded-3xl p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <ExercisesSkeleton />
      </div>
    </div>
  );
}
