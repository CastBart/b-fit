import { Exercise } from "@/lib/definitions";
import { TabsContent } from "../ui/tabs";

interface ExerciseInstructionsProps {
  exercise: Exercise;
}

export default function ExerciseInstructions({
  exercise,
}: ExerciseInstructionsProps) {
  // Try to split by number prefix (e.g., "1. ", "2. ")
  if (!exercise.instructions) {
    return (
      <TabsContent value="instructions">
        <div className="w-full flex justify-center py-10 text-muted-foreground">
          No instructions available for this exercise
        </div>
      </TabsContent>
    );
  }
  const steps = exercise.instructions
    .split(/\d+\.\s/) // split on "1. ", "2. ", etc.
    .filter(Boolean); // remove empty items

  return (
    <TabsContent value="instructions">
      <div className="text-xl font-bold py-2 pr-2">{exercise.name}</div>
      <div className="space-y-2 bg-secondary p-2 pt-4 rounded-lg text-secondary-foreground">
        {steps.map((step, i) => (
          <p key={i} className="flex gap-2">
            <span className="font-bold">{i + 1}.</span>
            <span>{step.trim()}</span>
          </p>
        ))}
      </div>
    </TabsContent>
  );
}
