"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  addSet,
  completeSet,
  updateSet,
  removeLastSet,
  undoLastCompletedSet,
  addNote,
  goToExercise,
} from "@/store/sessionSlice";
import ExerciseCarousel from "@/components/session/exercise-carousel";

export default function SessionPage(){
  const dispatch = useDispatch();

  const {
    workoutId,
    exerciseMap,
    progress,
    activeExerciseId,
  } = useSelector((state: RootState) => state.session);

  const currentExercise = activeExerciseId ? exerciseMap[activeExerciseId] : null;
  const exerciseProgress = currentExercise ? progress[currentExercise.id] : null;

  if (!currentExercise || !exerciseProgress) return <div>Loading exercise...</div>;
  return (
    <div className="p-4 w-[600px] lg:w-[900px] mx-auto ">
      <ExerciseCarousel exercises={exerciseMap}/>

      <h3 className="text-xl font-semibold">{currentExercise.name}</h3>

      {/* Sets Section */}
      <div className="mt-4">
        {exerciseProgress.sets.map((set) => (
          <div key={set.setNumber} className="mb-2">
            <span className="font-medium">Set {set.setNumber}</span>
            <input
              type="number"
              value={set.reps}
              onChange={(e) =>
                dispatch(
                  updateSet({
                    exerciseId: currentExercise.id,
                    setNumber: set.setNumber,
                    reps: parseInt(e.target.value),
                  })
                )
              }
              placeholder="Reps"
              className="ml-2 border px-2 py-1 w-20"
            />
            <input
              type="number"
              value={set.weight}
              onChange={(e) =>
                dispatch(
                  updateSet({
                    exerciseId: currentExercise.id,
                    setNumber: set.setNumber,
                    weight: parseFloat(e.target.value),
                  })
                )
              }
              placeholder="Weight"
              className="ml-2 border px-2 py-1 w-24"
            />
            <span className="ml-2 text-sm text-gray-500">
              {set.completed ? "✅ Completed" : "⏳ In Progress"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() =>
            dispatch(addSet({ exerciseId: currentExercise.id }))
          }
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          Add Set
        </button>
        <button
          onClick={() =>
            dispatch(removeLastSet({ exerciseId: currentExercise.id }))
          }
          className="px-3 py-2 bg-red-500 text-white rounded"
        >
          Remove Last Set
        </button>
        <button
          onClick={() =>
            dispatch(undoLastCompletedSet({ exerciseId: currentExercise.id }))
          }
          className="px-3 py-2 bg-yellow-500 text-white rounded"
        >
          Undo Last Completed
        </button>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <textarea
          placeholder="Add notes..."
          value={exerciseProgress.notes ?? ""}
          onChange={(e) =>
            dispatch(
              addNote({
                exerciseId: currentExercise.id,
                note: e.target.value,
              })
            )
          }
          className="w-full border rounded p-2"
        />
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          disabled={!currentExercise.prev}
          onClick={() =>
            dispatch(goToExercise(currentExercise.prev!))
          }
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={!currentExercise.next}
          onClick={() =>
            dispatch(goToExercise(currentExercise.next!))
          }
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
};
