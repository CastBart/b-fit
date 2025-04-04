import { Button } from "@/components/ui/button";
import Link from "next/link";

type WorkoutCardProps = {
  id: string; // Add id prop for navigation
  title: string;
  description?: string;
};

export default function WorkoutCard({
  id,
  title,
  description,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/dashboard/workouts/${id}`}
      className="rounded-lg p-6 text-center border bg-secondary text-secondary-foreground hover:bg-primary/90"
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="mb-4">{description}</p>
    </Link>
  );
}
