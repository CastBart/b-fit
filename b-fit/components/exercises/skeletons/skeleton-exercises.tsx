import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ExercisesSkeleton() {
  return (
    <>
      <Skeleton className="h-10 mb-2" />
      <Skeleton className="h-8 mb-2" />
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 rounded w-1/6 " />
        <div className="flex items-center w-1/4 gap-2 justify-end">
          <Skeleton className="h-6 rounded w-1/2" />
          <Skeleton className="h-6 rounded w-1/4" />
        </div>
      </div>
      <div className="overflow-y-hidden">
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="rounded-lg h-16 w-full p-2" >
              <Skeleton className="h-6 rounded w-1/2 mb-2" />
              <Skeleton className="h-4 rounded w-1/3 mb-2" />
            </Skeleton>
          ))}
        </div>
      </div>
    </>
  );
}
