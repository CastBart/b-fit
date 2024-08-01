'use client';
import React from 'react';

type SelectedExerciseProps = {
  name: string;
  onRemove: () => void;
};

export default function SelectedExercise({ name, onRemove }: SelectedExerciseProps) {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded">
      <span>{name}</span>
      <button
        onClick={onRemove}
        className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded"
      >
        -
      </button>
    </div>
  );
}
