import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonWorkoutCreate() {
  return (
    <div className="max-w-[600px] mx-auto overflow-auto space-y-4 p-2">
      <div className="space-y-4 ">
        {/* Workout Name */}
        <Skeleton className="h-8" />
        {/* Description */}
        <Skeleton className="h-24 " />
        {/* Add Exercise Button */}
        <Skeleton className="h-10 w-36" />
        {/* Exercise List Skeletons */}
        <div className="space-y-2 p-2 border rounded-2xl">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 " />
          ))}
          <Skeleton className="h-4 mx-auto w-32" />
        </div>
        {/* Submit Button */}
        <Skeleton className="h-10" />
      </div>
    </div>
  );
}
