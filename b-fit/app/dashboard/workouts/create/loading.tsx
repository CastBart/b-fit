import SkeletonWorkoutCreate from "@/components/workouts/skeletons/skeleton-workout-create";

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <SkeletonWorkoutCreate />
    </div>
  );
}
