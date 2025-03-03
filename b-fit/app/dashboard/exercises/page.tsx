"use client";

import { useState } from "react";
import Link from "next/link";
import { FunnelIcon } from "@heroicons/react/24/outline";
import exercises from "@/lib/exercise-list";
import ExerciseTable from "@/components/exercises/exercise-table";
import { Button } from "@/components/ui/button";
import ExerciseFilter from "@/components/exercises/exercise-filter";
import ExerciseSearch from "@/components/exercises/exercise-search";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter exercises based on search term
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Search Bar and Create Exercise button */}
      <div className="flex flex-col gap-2 border rounded-3xl p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <ExerciseSearch />
        <ExerciseFilter numOfExercises={100}/>
        <ExerciseTable exersices={filteredExercises} />
      </div>
    </div>
  );
}

