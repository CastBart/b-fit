"use client";
import React, { use, useState } from "react";
import SelectExerciseDialog from "@/app/ui/Exercises/SelectExerciseDialog";
import SelectedExercise from "@/app/ui/Exercises/SelectedExercise";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addExercise = (exercise: string) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  const removeExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-6 text-center">
        <h1 className="text-3xl font-semibold">Create Workout</h1>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="absolute top-6 right-6 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Exercise
        </button>
      </header>
      <main className="flex-grow p-6 flex flex-col items-center">
        <div className="mb-6 w-full max-w-4xl">
          <label className="block mb-2 text-lg font-semibold">
            Workout Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <label className="block mt-2 mb-2 text-lg font-semibold">
            Workout Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            rows={4} // Adjust the number of rows to control the height of the textarea
          ></textarea>
        </div>
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Selected Exercises</h2>
          <ul className="flex flex-col space-y-2 overflow-y-auto pr-2 max-h-80 custom-scrollbar">
            {selectedExercises.map((exercise, index) => (
              <li key={index}>
                <SelectedExercise
                  name={exercise}
                  onRemove={() => removeExercise(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SelectExerciseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={addExercise}
      />
    </div>
  );
}
