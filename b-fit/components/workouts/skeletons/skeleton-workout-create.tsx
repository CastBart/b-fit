import React from "react";

export default function SkeletonWorkoutCreate() {
  return (
    <div className="max-w-[600px] mx-auto overflow-auto space-y-4 p-2">
      <div className="space-y-4 animate-pulse">
        {/* Workout Name */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        {/* Description */}
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        {/* Add Exercise Button */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
        {/* Exercise List Skeletons */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-14 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"
          />
        ))}
        {/* Submit Button */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
}
