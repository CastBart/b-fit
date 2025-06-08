"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useCallback, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  addNote,
  updateExerciseMap,
  ExerciseProgress,
  addExercises,
} from "@/store/sessionSlice";
import {
  createExerciseNode,
  createFlattenedExerciseNode,
  ExerciseNode,
  FlattenedExerciseNode,
  flattenExerciseNodeList,
  getHeadNode,
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
import WorkoutSelectExerciseDrawer from "@/components/workouts/workout-add-exercise-drawer";
import { Exercise } from "@/lib/definitions";

export default function SessionPage() {
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const dispatch = useDispatch();

  const [selectedOptionsExercise, setSelectedOptionsExercise] = useState<ExerciseNode | null>(
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
    ? progress[currentExercise.instanceId]
    : null;
  function onSelectedExercise(exerciseID: string) {
    // Unflatten the exercise map to get the linked list
    const headNode = unFlattenExerciseNodeList(exerciseMap, headExerciseId!);

    setSupersetManager(new SupersetManager(headNode));
    // Traverse to find the selected node
    let current: ExerciseNode | null = headNode;
    while (current) {
      if (current.instanceId === exerciseID) {
        setSelectedOptionsExercise(current);
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
        newHead: supersetManager.head.instanceId,
      })
    );
    setSupersetExercise(null);
  }

  function handleAddedExercises(newExercises: Exercise[]) {
    debugger;
    const existingIds = Object.keys(exerciseMap);
    const newProgress: Record<string, ExerciseProgress> = {};
    const firstNode = existingIds
      .map((id) => exerciseMap[id])
      .find((node) => node.prev === null);
    //get current head from map
    const currentHead = unFlattenExerciseNodeList(
      exerciseMap,
      firstNode?.instanceId!
    );
    //create new nodes
    const newNodes = newExercises.map((exercise) =>
      createExerciseNode({
        id: exercise.id,
        name: exercise.name,
        equipment: exercise.equipment,
        primaryMuscle: exercise.primaryMuscle,
        auxiliaryMuscles: exercise.auxiliaryMuscles,
        type: exercise.type,
        supersetGroupId: null,
      })
    );

    // Link the new nodes together (both next and prev)
    for (let i = 0; i < newNodes.length; i++) {
      if (i > 0) newNodes[i].prev = newNodes[i - 1];
      if (i < newNodes.length - 1) newNodes[i].next = newNodes[i + 1];
    }

    let lastNode = currentHead;
    while (lastNode.next) {
      lastNode = lastNode.next;
    }

    lastNode.next = newNodes[0];
    newNodes[0].prev = lastNode;
    const joinedHead = getHeadNode(lastNode);
    console.log(joinedHead);

    //create progress for new nodes
    for (const node of newNodes) {
      newProgress[node.instanceId] = {
        exerciseId: node.instanceId,
        sets: [
          { setNumber: 1, reps: 0, weight: 0, completed: false },
          { setNumber: 2, reps: 0, weight: 0, completed: false },
          { setNumber: 3, reps: 0, weight: 0, completed: false },
        ],
        activeSetNumber: 1,
        notes: "",
      };
    }
    const newFlattenedNodes = flattenExerciseNodeList(joinedHead);

    dispatch(
      addExercises({
        newExerciseMap: newFlattenedNodes,
        newProgressMap: newProgress,
      })
    );

    debugger;
  }

  if (!currentExercise || !exerciseProgress)
    return (
      <div className="p-4 max-w-[900px] mx-auto ">
        <div className="text-center">Loading exercise for session page...</div>
      </div>
    );
  return (
    <div className="p-4 max-w-[900px] mx-auto ">
      {/* <ExerciseCarousel exerciseIds={exerciseMap} /> */}

      <div className="flex justify-between pt-4">
        <div className="flex space-x-2 items-center">
          <h3 className="text-2xl font-semibold">{currentExercise.name}</h3>
          <EllipsisHorizontalIcon
            className="w-7 h-7 cursor-pointer"
            onClick={() => onSelectedExercise(activeExerciseId!)}
          />
        </div>
        <div className="justify-self-end">
          <WorkoutSelectExerciseDrawer
            onExerciseSelect={handleAddedExercises}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <Textarea
          placeholder="Add notes..."
          value={exerciseProgress.notes ?? ""}
          onChange={(e) =>
            dispatch(
              addNote({
                exerciseId: currentExercise.instanceId,
                note: e.target.value,
              })
            )
          }
          className="w-full border rounded p-2"
        />
      </div>
      {/* Sets Section */}
      {/* <SessionSetTable /> */}

      {/* Complete Button */}
      {workoutCompleted && (
        <div className="fixed flex z-50 bottom-10 left-1/2 ">
          <Button className="rounded-full py-10 px-10 text-3xl ">
            Complete Workout
          </Button>
        </div>
      )}

      {/* Option Drawer */}
      <OptionsDrawer
        selectedExercise={selectedOptionsExercise}
        onClose={() => setSelectedOptionsExercise(null)}
        onSuperSet={() => {
          if (selectedOptionsExercise) {
            setSupersetExercise(selectedOptionsExercise);
            setSelectedOptionsExercise(null); // Hide options drawer
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
