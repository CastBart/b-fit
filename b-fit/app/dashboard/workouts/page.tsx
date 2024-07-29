import WorkoutCard from "@/app/ui/Dashboard/Workouts/WorkoutCard";

export default function Page(): React.ReactNode {
  const workouts = [
    { title: 'Workout 1', description: 'Description for Workout 1' },
    { title: 'Workout 2', description: 'Description for Workout 2' },
    { title: 'Workout 3', description: 'Description for Workout 3' },
    { title: 'Workout 4', description: 'Description for Workout 4' },
    // Add more workouts as needed
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 text-center">
        <h1 className="text-3xl font-semibold">Workouts</h1>
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