"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import exercises from "@/lib/exercise-list";
import ExerciseTable from "@/components/exercises/exercise-table";
import { Button } from "@/components/ui/button";
import ExerciseFilter from "@/components/exercises/exercise-filter";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter exercises based on search term
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Search Bar and Create Exercise button */}
      <div className="flex flex-col border rounded-3xl p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <div className="grid grid-cols-12  z-50 py-4 bg-background gap-2 items-center">
          {/* Search Bar */}
          <div className="relative col-span-9">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 px-10 rounded border"
            />
            <ExerciseFilter />
            {/* <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" /> */}
          </div>
          <Button asChild className="col-span-3">
            <Link href="/dashboard/workouts/create">Create</Link>
          </Button>
        </div>

        {/* Scrollable Exercise Table */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          <ExerciseTable exersices={filteredExercises} />
        </div>
      </div>
    </div>
  );
}
