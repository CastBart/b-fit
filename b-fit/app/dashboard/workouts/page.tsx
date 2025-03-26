import WorkoutCard from "@/app/ui/Dashboard/Workouts/WorkoutCard";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Page() {
  const workouts = [
    { title: "Workout 1", description: "Description for Workout 1" },
    { title: "Workout 2", description: "Description for Workout 2" },
    { title: "Workout 3", description: "Description for Workout 3" },
    { title: "Workout 4", description: "Description for Workout 4" },
    // Add more workouts as needed
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-4">
      <Button asChild className="self-end" size={"lg"}>
        <Link href="/dashboard/workouts/create">Create Workout</Link>
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            title={workout.title}
            description={workout.description}
          />
        ))}
      </div>
    </div>
  );
}
