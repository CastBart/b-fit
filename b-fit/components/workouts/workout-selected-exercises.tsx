"use client";
import { clsx } from "clsx";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "../ui/separator";
import {
  ExerciseNode,
  getLinkedExerciseArray,
} from "@/lib/exercise-linked-list";
import { GripVertical } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState, useMemo, useEffect } from "react";
import { SupersetManager } from "@/lib/superset-manager";

interface SelectedExerciseListProps {
  head: ExerciseNode | null;
  setHead: (head: ExerciseNode | null) => void;
  form?: UseFormReturn<any>;
}

export default function SelectedExercisesList({
  head,
  setHead,
  form,
}: SelectedExerciseListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const [selectedExercise, setSelectedExercise] = useState<ExerciseNode | null>(
    null
  );
  const [supersetExercise, setSupersetExercise] = useState<ExerciseNode | null>(
    null
  );

  const exerciseNodes = useMemo(() => {
    const list: ExerciseNode[] = [];
    let current = head;
    while (current) {
      list.push(current);
      current = current.next;
    }
    return list;
  }, [head]);

  const supersetManager = useMemo(() => {
    return head ? new SupersetManager(head) : null;
  }, [head]);

  function updateLinkedList(nodes: ExerciseNode[]): ExerciseNode | null {
    // Clone nodes to avoid mutation
    const clonedNodes: ExerciseNode[] = nodes.map((node) => ({
      ...node,
      next: null,
      prev: null,
    }));

    // Link clones into a doubly linked list
    for (let i = 0; i < clonedNodes.length; i++) {
      if (i > 0) clonedNodes[i].prev = clonedNodes[i - 1];
      if (i < clonedNodes.length - 1) clonedNodes[i].next = clonedNodes[i + 1];
    }

    return clonedNodes[0] || null;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = exerciseNodes.findIndex(
        (item) => item.instanceId === active.id
      );
      const newIndex = exerciseNodes.findIndex(
        (item) => item.instanceId === over?.id
      );

      const newOrder = arrayMove(exerciseNodes, oldIndex, newIndex);
      const newHead = updateLinkedList(newOrder);

      setHead(newHead);
      form?.setValue("exercises", getLinkedExerciseArray(newHead));
    }
  }

  function removeExercise(id: string) {
    setSelectedExercise(null);
    console.log(
      "exerciseNodes",
      exerciseNodes.map((e) => e.instanceId)
    );
    const filtered = exerciseNodes.filter((node) => node.instanceId !== id);
    const newHead = updateLinkedList(filtered);
    setHead(newHead);
    form?.setValue("exercises", getLinkedExerciseArray(newHead));
  }
  function handleSuperSetSelect() {
    // if (supersetExercise && target && supersetManager) {
    // supersetManager.addToGroup(target, supersetExercise);
    const newHead = updateLinkedList(exerciseNodes);

    setHead(newHead);
    form?.setValue("exercises", getLinkedExerciseArray(newHead));
    // }
    setSupersetExercise(null);
  }

  return (
    <div className="p-2 border rounded-lg">
      <div className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-520px)]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={exerciseNodes.map((ex) => ex.instanceId)}
            strategy={verticalListSortingStrategy}
          >
            <Table>
              <TableCaption>Selected exercises</TableCaption>
              <TableBody>
                {exerciseNodes.map((exercise) => (
                  <DraggableExerciseRow
                    key={exercise.instanceId}
                    exercise={exercise}
                    onClick={() => setSelectedExercise(exercise)}
                  />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>
      {/* Options Drawer */}
      <OptionsDrawer
        selectedExercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onSuperSet={() => {
          if (selectedExercise) {
            setSupersetExercise(selectedExercise);
            setSelectedExercise(null);
          }
        }}
        onRemove={() =>
          selectedExercise && removeExercise(selectedExercise.instanceId)
        }
      />

      {/* Superset Drawer */}
      <SupersetDrawer
        exercise={supersetExercise}
        onClose={() => setSupersetExercise(null)}
        onSelect={handleSuperSetSelect}
        supersetManager={supersetManager}
      />
    </div>
  );
}

interface DraggableExerciseRowProps {
  exercise: ExerciseNode;
  onClick: () => void;
}

function DraggableExerciseRow({
  exercise,
  onClick,
}: DraggableExerciseRowProps) {
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
  // Determine node position inside the superset
  const isInSuperset = !!exercise.supersetGroupId;
  const isFirst =
    isInSuperset &&
    (!exercise.prev ||
      exercise.prev.supersetGroupId !== exercise.supersetGroupId);
  const isLast =
    isInSuperset &&
    (!exercise.next ||
      exercise.next.supersetGroupId !== exercise.supersetGroupId);
  const isMiddle = isInSuperset && !isFirst && !isLast;

  return (
    <TableRow
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`transition-opacity duration-150 ease-in-out touch-none ${isDragging ? "cursor-grabbing" : ""}`}
    >
      <TableCell className="relative">
        {isInSuperset && (
          <div className="absolute -top-1 -bottom-1 w-1">
            {/* Core vertical line */}
            <div
              className={clsx(
                "w-full absolute top-0 bottom-0 bg-primary",
                isFirst && "rounded-t-full top-3 ",
                isLast && "rounded-b-full bottom-3"
              )}
            />
          </div>
        )}

        {/* Content with padding */}
        <div className="pl-8 py-2">{exercise.name}</div>
      </TableCell>
    </TableRow>
  );
}

interface OptionsDrawerProps {
  selectedExercise: ExerciseNode | null;
  onClose: () => void;
  onSuperSet: () => void;
  onRemove: () => void;
}

function OptionsDrawer({
  selectedExercise,
  onClose,
  onSuperSet,
  onRemove,
}: OptionsDrawerProps) {
  return (
    selectedExercise && (
      <Drawer
        open={!!selectedExercise}
        onOpenChange={onClose}
        shouldScaleBackground={false}
      >
        <DrawerContent className="w-[600px] justify-self-center">
          <DrawerHeader>
            <div className="flex flex-col gap-2">
              <DrawerTitle className="text-center text-3xl">
                {selectedExercise.name}
              </DrawerTitle>
              <DrawerDescription className="hidden">
                View exercise options
              </DrawerDescription>
              <Separator className="h-1" />
            </div>
          </DrawerHeader>
          <div className="px-4 space-y-4">
            <Button
              onClick={onSuperSet}
              className="w-full min-h-[48px]"
              variant="secondary"
            >
              Super Set
            </Button>
            <Button
              size="sm"
              className="w-full"
              variant="destructive"
              onClick={onRemove}
            >
              Remove
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  );
}

interface SupersetDrawerProps {
  exercise: ExerciseNode | null;
  onClose: () => void;
  onSelect: () => void;
  supersetManager: SupersetManager | null;
}

function SupersetDrawer({
  exercise,
  onClose,
  onSelect,
  supersetManager,
}: SupersetDrawerProps) {
  return (
    exercise &&
    supersetManager && (
      <Drawer
        open={!!exercise}
        onOpenChange={onClose}
        shouldScaleBackground={false}
      >
        <DrawerContent className="w-[600px] justify-self-center">
          <DrawerHeader>
            <div className="flex flex-col gap-2">
              <DrawerTitle className="text-center text-3xl">
                Super Set
              </DrawerTitle>
              <DrawerDescription className="hidden">
                Select an exercise
              </DrawerDescription>
              <Separator className="h-1" />
            </div>
          </DrawerHeader>
          <div className="px-4 space-y-4">
            {supersetManager.canSupersetWithPrev(exercise) && (
              <Button
                variant={"secondary"}
                className="w-full min-h-[48px]"
                onClick={() => {
                  supersetManager.supersetWithPrev(exercise);
                  onSelect();
                }}
              >
                Superset with Previous
              </Button>
            )}
            {supersetManager.canRemoveSupersetWithPrev(exercise) && (
              <Button
                variant={"secondary"}
                className="w-full min-h-[48px]"
                onClick={() => {
                  supersetManager.removeSupersetWithPrev(exercise);
                  onSelect();
                }}
              >
                Remove from Previous Superset
              </Button>
            )}
            {supersetManager.canSupersetWithNext(exercise) && (
              <Button
                variant={"secondary"}
                className="w-full min-h-[48px]"
                onClick={() => {
                  supersetManager.supersetWithNext(exercise);
                  onSelect();
                }}
              >
                Superset with Next
              </Button>
            )}
            {supersetManager.canRemoveSupersetWithNext(exercise) && (
              <Button
                variant={"secondary"}
                className="w-full min-h-[48px]"
                onClick={() => {
                  supersetManager.removeSupersetWithNext(exercise);
                  onSelect();
                }}
              >
                Remove from Next Superset
              </Button>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  );
}
