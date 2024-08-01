'use client';
import React from 'react';
import AddExercise from '@/app/ui/Exercises/AddExercise';

const exercisesList = [
  'Exercise 1',
  'Exercise 2',
  'Exercise 3',
  'Exercise 4',
  'Exercise 5',
  'Exercise 6',
  'Exercise 7',
  'Exercise 8',
  'Exercise 9',
  'Exercise 11',
  'Exercise 12',
  'Exercise 13',
  'Exercise 14',
  'Exercise 15',
];

type SelectExerciseDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exercise: string) => void;
};

export default function SelectExerciseDialog({ isOpen, onClose, onAdd }: SelectExerciseDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg max-h-full overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-semibold mb-4">Add Exercise</h2>
        <div className="flex flex-col space-y-2 max-h-[60vh] pr-2 overflow-y-auto custom-scrollbar">
          {exercisesList.map((exercise) => (
            <AddExercise key={exercise} name={exercise} onAdd={onAdd} />
          ))}
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
