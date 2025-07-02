import WorkoutsSkeleton from "@/components/workouts/skeletons/skeleton-workouts";

export default function Loading() {
  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex flex-col border rounded-3xl space-y-2 p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <WorkoutsSkeleton />
      </div>
    </div>
  );
}
