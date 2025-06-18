"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  createExerciseNode,
  ExerciseNode,
  flattenExerciseNodeList,
  getHeadNode,
  unFlattenExerciseNodeList,
} from "@/lib/exercise-linked-list";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setActiveExerciseId,
  updateExerciseMap,
  ExerciseProgress,
  addExercises,
  removeExercise,
  resumeSession,
} from "@/store/sessionSlice";
import WorkoutSelectExerciseDrawer from "@/components/workouts/workout-add-exercise-drawer";
import { SupersetManager } from "@/lib/superset-manager";
import { Exercise } from "@/lib/definitions";
import SetDrawer from "@/components/session/session-set-drawer";
import SessionSetTable from "@/components/session/session-set-table";
import {
  OptionsDrawer,
  SupersetDrawer,
} from "@/components/workouts/workout-selected-exercises";
import ExerciseCarousel from "@/components/session/session-exercise-carousel";
import { Button } from "@/components/ui/button";
import RestTimerDrawer from "@/components/session/session-timer-drawer";
import { Wrench } from "lucide-react";
import SessionSettingsDrawer from "@/components/session/session-settings-drawer";
import { SessionInput } from "@/actions/session-complete";
import { useElapsedSessionTime } from "@/hooks/use-elapsed-session-time";

export default function SessionExerciseCarousel() {
  const dispatch = useDispatch();
  const {
    workoutCompleted,
    exerciseMap,
    progress,
    activeExerciseId,
    headExerciseId,
    workoutName,
    isPaused,
    timer,
    sessionId,
    workoutId,
    startTime,
  } = useSelector((state: RootState) => state.session);
  const workoutDuration = useElapsedSessionTime();

  //currentExercise from map
  const currentExercise = activeExerciseId
    ? exerciseMap[activeExerciseId]
    : null;
  //curr
  const exerciseProgress = currentExercise
    ? progress[currentExercise.instanceId]
    : null;
  //init emblaAPI
  const [emblaRef, emblaApi] = useEmblaCarousel();

  //order exercises into ID array
  // const orderedExerciseArray = Object.values(exerciseMap);
  const [exerciseIds, setExerciseIds] = useState(
    Object.values(exerciseMap).map((ex) => ex.instanceId)
  );

  //update ordered Array od ID exericses when exercises change
  useEffect(() => {
    console.log("exerciseMap updated", exerciseMap);
    const orderedExerciseArray = Object.values(exerciseMap);
    setExerciseIds(orderedExerciseArray.map((ex) => ex.instanceId));
  }, [exerciseMap]);

  const indexFromId = useCallback(
    (id: string) => exerciseIds.findIndex((exID) => exID === id),
    [exerciseMap, exerciseIds]
  );

  const idFromIndex = useCallback(
    (index: number) => exerciseIds[index] ?? null,
    [exerciseIds]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const selectedId = idFromIndex(index);
    if (selectedId && selectedId !== activeExerciseId) {
      dispatch(setActiveExerciseId(selectedId));
    }
  }, [emblaApi, idFromIndex, dispatch, activeExerciseId]);

  //re-initialize carousel after adding or removing
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    onSelect(); // initialize on mount
  }, [emblaApi, onSelect]);

  //update index after user click or complete set logic
  useEffect(() => {
    if (!emblaApi) return;
    const index = indexFromId(activeExerciseId!);
    if (index >= 0) emblaApi.scrollTo(index);
  }, [activeExerciseId, emblaApi, indexFromId]);

  const [selectedOptionsExercise, setSelectedOptionsExercise] =
    useState<ExerciseNode | null>(null);

  const [supersetExercise, setSupersetExercise] = useState<ExerciseNode | null>(
    null
  );

  const [setDrawerID, setSetDrawerID] = useState<string | null>(null);

  const [supersetManager, setSupersetManager] =
    useState<SupersetManager | null>(null);

  function handleSetDrawerID(id: string | null) {
    setSetDrawerID(id);
  }

  function handleSelectedExerciseOptions(exerciseID: string) {
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
    setExerciseIds(Object.values(newFlattenedNodes).map((ex) => ex.instanceId));
  }

  function handleRemoveExercise(instanceId: string) {
    const nodeToRemove = exerciseMap[instanceId];
    if (!nodeToRemove) return;

    const { prev, next } = nodeToRemove;

    const newExerciseMap = { ...exerciseMap };
    delete newExerciseMap[instanceId];

    const newProgress = { ...progress };
    delete newProgress[instanceId];

    if (prev) {
      newExerciseMap[prev] = {
        ...newExerciseMap[prev],
        next,
      };
    }
    if (next) {
      newExerciseMap[next] = {
        ...newExerciseMap[next],
        prev,
      };
    }

    let newHeadId = headExerciseId;
    if (headExerciseId === instanceId) {
      newHeadId = next ?? prev ?? null;
    }

    let newActiveId = activeExerciseId;
    if (activeExerciseId === instanceId) {
      newActiveId = next ?? prev ?? newHeadId ?? null;
    }
    setExerciseIds(
      Object.values(newExerciseMap).map((node) => node.instanceId)
    );
    setSelectedOptionsExercise(null);
    dispatch(
      removeExercise({
        newExerciseMap: newExerciseMap,
        newProgress: newProgress,
        newHeadId: newHeadId,
        newActiveId: newActiveId,
      })
    );
  }

  async function handleCompleteSession() {
    const sessionData: SessionInput = {
      sessionId: sessionId!,
      workoutId: workoutId!,
      workoutName,
      startTime: startTime!,
      duration: workoutDuration!,
      exerciseMap,
      progress,
    };
    await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify(sessionData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!currentExercise || !exerciseProgress)
    return (
      <div className="p-4 max-w-[900px] mx-auto ">
        <div className="text-center">Loading exercise for session page...</div>
      </div>
    );
  return (
    <div className="p-4 max-w-[900px] mx-auto">
      {/* <div className="flex flex-col"> */}

      <SessionSettingsDrawer />

      <ExerciseCarousel
        exerciseIds={exerciseIds}
        onReorder={(newOrder) => {
          setExerciseIds(newOrder);
        }}
      />
      <WorkoutSelectExerciseDrawer onExerciseSelect={handleAddedExercises} />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4">
          {exerciseIds.map((ex) => (
            <div key={ex} className="flex-shrink-0 w-full">
              <SessionSetTable
                exerciseID={ex}
                onSelectExerciseOptions={handleSelectedExerciseOptions}
                onSelectSetDrawerID={handleSetDrawerID}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Timer Button */}
      {timer && timer.isRunning && !workoutCompleted && <RestTimerDrawer />}

      {/* Resume Button */}
      {isPaused && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-10 flex justify-center">
          <Button
            onClick={() => dispatch(resumeSession())}
            className="rounded-full py-10 px-10 text-3xl flex  justify-center space-x-2"
          >
            Resume session
          </Button>
        </div>
      )}

      {/* Complete Button */}
      {workoutCompleted && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-10 flex justify-center">
          <Button
            onClick={handleCompleteSession}
            className="rounded-full py-10 px-10 text-3xl "
          >
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
        onRemove={() =>
          selectedOptionsExercise &&
          handleRemoveExercise(selectedOptionsExercise.instanceId)
        }
      />
      <SupersetDrawer
        exercise={supersetExercise}
        onClose={() => setSupersetExercise(null)}
        onSelect={handleSuperSetSelect}
        supersetManager={supersetManager}
      />
      <SetDrawer
        exerciseId={setDrawerID}
        onClose={() => handleSetDrawerID(null)}
      />
    </div>
  );
}
