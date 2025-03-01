import WorkoutCard from "@/app/ui/Dashboard/Workouts/WorkoutCard";
import Link from "next/link";

export default async function Page() {
  const workouts = [
    { title: 'Workout 1', description: 'Description for Workout 1' },
    { title: 'Workout 2', description: 'Description for Workout 2' },
    { title: 'Workout 3', description: 'Description for Workout 3' },
    { title: 'Workout 4', description: 'Description for Workout 4' },
    // Add more workouts as needed
  ];

  return (
    <div className="min-h-screen text-white">
      <header className="p-6 flex justify-between items-center relative">
        <div className="flex-grow" />
        <h1 className="text-3xl font-semibold absolute left-1/2 transform -translate-x-1/2">
          Workouts
        </h1>
        <Link href="/dashboard/workouts/create">
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
            Create Workout
          </button>
        </Link>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              title={workout.title}
              description={workout.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
