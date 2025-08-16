import { Workout } from "@/lib/definitions";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/dashboard/workouts/${workout.id}`} className="group">
      <Card className="h-full flex flex-col justify-between hover:bg-primary/10 transition-colors">
        <CardContent className="p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold break-words">{workout.name}</h3>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-muted-foreground">
            {workout.exercises.length} exercise{workout.exercises.length !== 1 && "s"}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {workout.description || "No description provided."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
