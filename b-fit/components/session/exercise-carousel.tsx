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
import { useState } from "react";
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

type ExerciseDndListProps = {
  exercises: Record<string, FlattenedExerciseNode>;
};

function SortableExerciseCard({
  exercise,
  isActive,
}: {
  exercise: FlattenedExerciseNode;
  isActive: boolean;
}) {
  const exerciseMap = useSelector(
    (state: RootState) => state.session.exerciseMap
  );
  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };
  const isInSuperset = !!exercise.supersetGroupId;

  const prevNode = exercise.prev ? exerciseMap[exercise.prev] : null;
  const nextNode = exercise.next ? exerciseMap[exercise.next] : null;

  const isFirst =
    isInSuperset &&
    (!prevNode || prevNode.supersetGroupId !== exercise.supersetGroupId);

  const isLast =
    isInSuperset &&
    (!nextNode || nextNode.supersetGroupId !== exercise.supersetGroupId);
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => dispatch(setActiveExerciseId(exercise.id))}
      className="cursor-pointer relative flex items-center flex-col"
    >
      <div
        className={`aspect-square h-[120px] flex items-center justify-center border mb-2 rounded-lg ${isActive ? "" : "opacity-50"}`}
      >
        <span className="font-semibold text-center">{exercise.name}</span>
      </div>

      {isInSuperset && (
        <div className="absolute bottom-0 right-0 left-0 rounded-l-full rounded-r-full h-1 bg-primary">
          {/* Core horizontal line */}
          <div
            className={clsx(
              "h-full absolute right-0 left-0 bg-primary",
              isFirst && "rounded-l-full -right-3 ",
              isLast && "rounded-r-full -left-3"
            )}
          />
        </div>
      )}
    </div>
  );
}

export default function ExerciseDndList({ exercises }: ExerciseDndListProps) {
  const dispatch = useDispatch();
  const activeExerciseId = useSelector(
    (state: RootState) => state.session.activeExerciseId
  );

  const orderedExerciseArray = Object.values(exercises);
  const [exerciseIds, setExerciseIds] = useState(
    orderedExerciseArray.map((ex) => ex.id)
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
      setExerciseIds(newOrder);
      // optionally dispatch Redux update here to persist order
      const newFlattenedList = newOrder.map((id) => exercises[id]);

      // Step 2: Convert array back into a Record<string, FlattenedExerciseNode>
      const updatedMap: Record<string, FlattenedExerciseNode> = {};
      newFlattenedList.forEach((ex, index) => {
        updatedMap[ex.id] = {
          ...ex,
          prev: index > 0 ? newFlattenedList[index - 1].id : null,
          next:
            index < newFlattenedList.length - 1
              ? newFlattenedList[index + 1].id
              : null,
        };
      });

      // Step 3: Get the new head ID
      const headId = newOrder[0];

      const linkedListHead = unFlattenExerciseNodeList(updatedMap, headId);

      const supersetManager = new SupersetManager(linkedListHead);

      supersetManager.reassignSupersetGroups(linkedListHead);
      //TODO: Unflatten node
      //TODO: initialise super set manager
      //TODO: reassign super set groups
      //TODO: flatten exercise nodes
      const flattened = flattenExerciseNodeList(linkedListHead);
      dispatch(
        updateExerciseMap(flattened)
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
    >
      <SortableContext
        items={exerciseIds}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex gap-4 overflow-x-auto p-2">
          {exerciseIds.map((id) => {
            const exercise = exercises[id];
            const isActive = activeExerciseId === id;
            return (
              <SortableExerciseCard
                key={id}
                exercise={exercise}
                isActive={isActive}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
