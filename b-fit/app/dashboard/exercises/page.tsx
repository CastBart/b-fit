"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import exercises from "@/lib/exercise-list";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter exercises based on search term
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white p-6">
      <header className="flex justify-between items-center relative mb-6">
        <div className="flex-grow" />
        <h1 className="text-3xl font-semibold absolute left-1/2 transform -translate-x-1/2">
          Exercises
        </h1>
        <Link href="/dashboard/workouts/create">
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
            Create Exercise
          </button>
        </Link>
      </header>

      {/* Search Bar */}
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 rounded border border-gray-300"
        />
        <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>

      {/* Exercise Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-500 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-500 p-2">Name</th>
              <th className="border border-gray-500 p-2">Equipment</th>
              <th className="border border-gray-500 p-2">Primary Muscle</th>
              <th className="border border-gray-500 p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredExercises.map((exercise, index) => (
              <tr key={index} className="hover:bg-gray-600">
                <td className="border border-gray-500 p-2">{exercise.name}</td>
                <td className="border border-gray-500 p-2">{exercise.equipment}</td>
                <td className="border border-gray-500 p-2">{exercise.primaryMuscle}</td>
                <td className="border border-gray-500 p-2">{exercise.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
