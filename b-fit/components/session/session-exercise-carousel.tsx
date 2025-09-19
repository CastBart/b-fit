"use client";
import { clsx } from "clsx";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect, useRef } from "react";
import {
  FlattenedExerciseNode,
  unFlattenExerciseNodeList,
  flattenExerciseNodeList,
} from "@/lib/exercise-linked-list";
import { useDispatch, useSelector } from "react-redux";
import { setActiveExerciseId, updateExerciseMap } from "@/store/sessionSlice";
import { RootState } from "@/store";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { SupersetManager } from "@/lib/superset-manager";
import WorkoutSelectExerciseDrawer from "../workouts/workout-add-exercise-drawer";
import { Exercise } from "@/lib/definitions";
import { CheckCircle2 } from "lucide-react";

type ExerciseThumbsProps = {
  exerciseIds: string[];
  onReorder: (order: string[]) => void;
  onExerciseSelect: (exercises: Exercise[]) => void;
};

export default function ExerciseThumbs({
  exerciseIds,
  onReorder,
  onExerciseSelect,
}: ExerciseThumbsProps) {
  const dispatch = useDispatch();
  const { activeExerciseId, exerciseMap } = useSelector(
    (state: RootState) => state.session
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 10,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = exerciseIds.indexOf(active.id);
      const newIndex = exerciseIds.indexOf(over.id);
      const newOrder = arrayMove(exerciseIds, oldIndex, newIndex);
      //setExerciseIds(newOrder);

      const newFlattenedList = newOrder.map((id) => exerciseMap[id]);

      // Convert array back into a Record<string, FlattenedExerciseNode>
      const updatedMap: Record<string, FlattenedExerciseNode> = {};
      newFlattenedList.forEach((ex, index) => {
        updatedMap[ex.instanceId] = {
          ...ex,
          prev: index > 0 ? newFlattenedList[index - 1].instanceId : null,
          next:
            index < newFlattenedList.length - 1
              ? newFlattenedList[index + 1].instanceId
              : null,
        };
      });
      // Get the new head ID
      const headId = newOrder[0];
      // Unflatten map into head to form double linked list
      const linkedListHead = unFlattenExerciseNodeList(updatedMap, headId);
      //initialize superset manager
      const supersetManager = new SupersetManager(linkedListHead);
      let movedNode = linkedListHead;
      while (movedNode && movedNode.instanceId !== active.id) {
        movedNode = movedNode.next!;
      }
      //perform superset reasignment
      supersetManager.reassignSupersetGroups(movedNode);
      //create record map from new head
      const flattened = flattenExerciseNodeList(supersetManager.head);
      dispatch(updateExerciseMap({ newMap: flattened, newHead: headId }));
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
    >
      <div className="flex flex-row  items-center overflow-x-auto">
        <SortableContext
          items={exerciseIds}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4">
            {exerciseIds.map((instanceId) => {
              const exercise = exerciseMap[instanceId];
              const isActive = activeExerciseId === instanceId;
              return (
                <SortableExerciseCard
                  key={exercise.instanceId}
                  exercise={exercise}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </SortableContext>
        <div className="ml-2">
          <WorkoutSelectExerciseDrawer onExerciseSelect={onExerciseSelect} />
        </div>
      </div>
    </DndContext>
  );
}

function SortableExerciseCard({
  exercise,
  isActive,
}: {
  exercise: FlattenedExerciseNode;
  isActive: boolean;
}) {
  const { progress, exerciseMap } = useSelector(
    (state: RootState) => state.session
  );
  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.instanceId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };

  const nodeRef = useRef<HTMLDivElement | null>(null);

  //scroll into view if active. currently there is an issue where the whole page scrolls into view not just the carousel.
  useEffect(() => {
    if (isActive && nodeRef.current) {
      nodeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [isActive]);
  const isInSuperset = !!exercise.supersetGroupId;

  const prevNode = exercise.prev ? exerciseMap[exercise.prev] : null;
  const nextNode = exercise.next ? exerciseMap[exercise.next] : null;

  const isFirst =
    isInSuperset &&
    (!prevNode || prevNode.supersetGroupId !== exercise.supersetGroupId);

  const isLast =
    isInSuperset &&
    (!nextNode || nextNode.supersetGroupId !== exercise.supersetGroupId);

  // ✅ Check completion from redux progress
  const exerciseProgress = progress[exercise.instanceId];
  const isCompleted =
    exerciseProgress?.sets.length > 0 &&
    exerciseProgress.sets.every((s) => s.completed);

  return (
    <div
      key={exercise.instanceId}
      ref={(el) => {
        setNodeRef(el);
        nodeRef.current = el;
      }}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        const temp = exercise;
        dispatch(setActiveExerciseId(exercise.instanceId));
      }}
      className="cursor-pointer relative flex items-center flex-col"
    >
      <div
        className={`w-24 h-12 flex items-center justify-center border rounded-lg ${isActive ? "" : "opacity-50"}`}
      >
        <span className="font-semibold text-center line-clamp-2">
          {exercise.name}
        </span>
      </div>
      {/* ✅ Completion tick overlay */}
      {isCompleted && (
        <span className="text-center absolute top-1 right-1 w-5 h-5 text-black bg-green-700 rounded-full">
          <CheckCircle2 className="w-5 h-5 text-black" />
        </span>
      )}

      {isInSuperset && (
        <div className="absolute bottom-0 right-0 left-0 rounded-l-full rounded-r-full h-1 bg-primary">
          {/* Core horizontal line */}
          <div
            className={clsx(
              "h-full absolute bg-primary",
              isFirst && "rounded-l-full -right-4 left-0",
              isLast && "rounded-r-full -left-4 right-0"
            )}
          />
        </div>
      )}
    </div>
  );
}
