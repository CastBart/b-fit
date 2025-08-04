import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonWorkouts() {
  return (
    <>
      <Skeleton className="h-10 " />
      <Skeleton className="h-8 mb-2" />
      <div className="grid grid-cols-1 gap-4 pr-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-4 ">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-28 p-4 rounded-lg  flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-6 rounded w-1/2" />
                <Skeleton className="h-4 rounded w-[20px]" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 rounded w-1/3" />
                <Skeleton className="h-5 rounded" />
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </>
  );
}
