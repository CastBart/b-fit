
import React from "react";

export default function ExercisesSkeleton() {
  return (
    <div className="overflow-y-hidden">
      <div className="space-y-4 animate-pulse ">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-secondary rounded-lg h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
