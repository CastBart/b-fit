import React from "react";

export default function SkeletonWorkouts() {
  return (
    <div className="grid grid-cols-1 gap-4 pr-2 overflow-y-auto custom-scrollbar">
      <div className="space-y-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-xl p-4 h-24 flex flex-col justify-between shadow"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
