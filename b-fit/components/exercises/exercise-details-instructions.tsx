export default function ExerciseInstructions({ instructions }: { instructions: string }) {
  // Try to split by number prefix (e.g., "1. ", "2. ")
  const steps = instructions
    .split(/\d+\.\s/) // split on "1. ", "2. ", etc.
    .filter(Boolean); // remove empty items

  return (
    <div className="space-y-2 bg-secondary p-2 pt-4 rounded-lg text-secondary-foreground">
      {steps.map((step, i) => (
        <p key={i} className="flex gap-2">
          <span className="font-bold">{i + 1}.</span>
          <span>{step.trim()}</span>
        </p>
      ))}
    </div>
  );
}
