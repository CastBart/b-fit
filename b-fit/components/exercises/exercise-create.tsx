import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CreateExerciseProps {
  className?: string;
}

export default function CreateExercise({ className }: CreateExerciseProps) {
  return (
    <Button asChild className={className}>
      <Link href="">Create</Link>
    </Button>
  );
}
