import WorkoutCardSkeleton from "./WorkoutCardSkeleton";
export default function AllWorkoutsSkeleton(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 text-center">
        <h1 className="text-3xl font-semibold">Workouts</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <WorkoutCardSkeleton />
          <WorkoutCardSkeleton />
          <WorkoutCardSkeleton />
          <WorkoutCardSkeleton />
        </div>
      </main>
    </div>
  );
}
