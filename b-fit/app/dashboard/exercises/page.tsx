"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import exercises from "@/lib/exercise-list";
import ExerciseTable from "@/components/exercises/exercise-table";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter exercises based on search term
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[600px] mx-auto bg-sidebar">
      {/* Search Bar and Create Exercise button */}
      <div className="grid grid-cols-6 sticky top-16 z-50 p-2 bg-sidebar gap-2 items-center">
        {/* Search Bar */}
        <div className="relative  col-span-4 col-start-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 rounded border "
          />
          <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
        <Button asChild className="col-span-1 col-start-6">
          <Link href="/dashboard/workouts/create">Create</Link>
        </Button>
        {/* <Link href="/dashboard/workouts/create" className="col-span-2 col-start-5">
            <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
              Create Exercise
            </button>
          </Link> */}
      </div>

      {/* Exercise Table */}
      <div className="max-w-[600px] mx-auto">
        <ExerciseTable exersices={filteredExercises} />
      </div>
    </div>
  );
}
