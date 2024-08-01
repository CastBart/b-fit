'use client';
import React from 'react';

type AddExerciseProps = {
  name: string;
  onAdd: (exercise: string) => void;
};

export default function AddExercise({ name, onAdd }: AddExerciseProps) {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded">
      <span>{name}</span>
      <button
        onClick={() => onAdd(name)}
        className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded"
      >
        +
      </button>
    </div>
  );
}
