"use client";
import { useState, useMemo, useRef, useEffect } from "react";
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
  updateExerciseMap,
} from "@/store/sessionSlice";
import {
  ExerciseNode,
  flattenExerciseNodeList,
  unFlattenExerciseNodeList,
} from "@/lib/exercise-linked-list";
import ExerciseCarousel from "@/components/session/exercise-carousel";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  OptionsDrawer,
  SupersetDrawer,
} from "@/components/workouts/workout-selected-exercises";
import { SupersetManager } from "@/lib/superset-manager";
import SessionSetTable from "@/components/session/session-set-table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SessionPage() {
  const dispatch = useDispatch();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseNode | null>(
    null
  );
  const [supersetExercise, setSupersetExercise] = useState<ExerciseNode | null>(
    null
  );

  const [supersetManager, setSupersetManager] =
    useState<SupersetManager | null>(null);

  const {
    workoutCompleted,
    exerciseMap,
    progress,
    activeExerciseId,
    headExerciseId,
  } = useSelector((state: RootState) => state.session);
  // const [supersetManager, setSupersetManager] = useState();

  const currentExercise = activeExerciseId
    ? exerciseMap[activeExerciseId]
    : null;
  const exerciseProgress = currentExercise
    ? progress[currentExercise.id]
    : null;

  function onSelectedExercise(exerciseID: string) {
    // Unflatten the exercise map to get the linked list
    const headNode = unFlattenExerciseNodeList(exerciseMap, headExerciseId!);

    setSupersetManager(new SupersetManager(headNode));
    // Traverse to find the selected node
    let current: ExerciseNode | null = headNode;
    while (current) {
      if (current.id === exerciseID) {
        setSelectedExercise(current);
        break;
      }
      current = current.next;
    }
  }
  function handleSuperSetSelect() {
    if (!supersetManager) return;

    const updatedList = flattenExerciseNodeList(supersetManager.head);

    dispatch(
      updateExerciseMap({
        newMap: updatedList,
        newHead: supersetManager.head.id,
      })
    );
    setSupersetExercise(null);
  }

  if (!currentExercise || !exerciseProgress)
    return (
      <div className="p-4 w-[600px] lg:w-[900px] mx-auto ">
        <div className="text-center">Loading exercise...</div>
      </div>
    );
  return (
    <div className="p-4 w-[600px] lg:w-[900px] mx-auto ">
      <ExerciseCarousel exercises={exerciseMap} />

      <div className="flex items-center space-x-2">
        <h3 className="text-xl font-semibold">{currentExercise.name}</h3>
        <EllipsisHorizontalIcon
          className="w-7 h-7 cursor-pointer"
          onClick={() => onSelectedExercise(activeExerciseId!)}
        />
      </div>

      {/* Notes */}
      <div className="mt-4">
        <Textarea
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
      {/* Sets Section */}
      <SessionSetTable />

      {/* <div className="mt-4 flex gap-2">
        <button
          onClick={() => dispatch(addSet({ exerciseId: currentExercise.id }))}
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
      </div> */}

      {workoutCompleted && (
        <div className="fixed flex z-50 bottom-10 left-1/2 ">
          <Button className="rounded-full py-10 px-10 text-3xl ">
            Complete Workout
          </Button>
        </div>
      )}

      {/* Option Drawer */}
      <OptionsDrawer
        selectedExercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onSuperSet={() => {
          if (selectedExercise) {
            setSupersetExercise(selectedExercise);
            setSelectedExercise(null); // Hide options drawer
          }
        }}
        onRemove={() => {}}
      />
      <SupersetDrawer
        exercise={supersetExercise}
        onClose={() => setSupersetExercise(null)}
        onSelect={handleSuperSetSelect}
        supersetManager={supersetManager}
      />
    </div>
  );
}
