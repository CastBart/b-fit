"use client";

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
import { useState, useMemo } from "react";

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
  const exerciseNodes = useMemo(() => {
    const list: ExerciseNode[] = [];
    let current = head;
    while (current) {
      list.push(current);
      current = current.next;
    }
    return list;
  }, [head]);

  function updateLinkedList(nodes: ExerciseNode[]): ExerciseNode | null {
    // Clone nodes to avoid mutation
    const clonedNodes: ExerciseNode[] = nodes.map((node) => ({
      ...node,
      next: null,
    }));

    // Link clones into a new list
    for (let i = 0; i < clonedNodes.length - 1; i++) {
      clonedNodes[i].next = clonedNodes[i + 1];
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
    console.log(
      "exerciseNodes",
      exerciseNodes.map((e) => e.instanceId)
    );
    const filtered = exerciseNodes.filter((node) => node.instanceId !== id);
    const newHead = updateLinkedList(filtered);
    setHead(newHead);
    form?.setValue("exercises", getLinkedExerciseArray(newHead));
  }
  /**
   * Function to handle the click event of the row. Opens the option drawer and passes the exercise node of the clicked item.
   * @param exercise of type Exercise
   */
  function handleRowClick(exercise: ExerciseNode) {
    setSelectedExercise(exercise);
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
                    id={exercise.instanceId}
                    name={exercise.name}
                    onRemove={() => removeExercise(exercise.instanceId)}
                    onClick={() => setSelectedExercise(exercise)}
                  />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>
      <OptionsDrawer
        selectedExercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}

function DraggableExerciseRow({
  id,
  name,
  onRemove,
  onClick,
}: {
  id: string;
  name: string;
  onRemove: () => void;
  onClick: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <TableRow
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`transition-opacity duration-150 ease-in-out touch-none ${
        isDragging ? "cursor-grabbing" : ""
      }`}
    >
      <TableCell>
        <div className="flex items-center justify-between">
          <div className={`text-lg w-full h-full font-semibold  `}>{name}</div>
          <Button size="sm" variant="destructive" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface OptionsDrawerProps {
  selectedExercise: ExerciseNode | null;
  onClose: () => void;
}

function OptionsDrawer({ selectedExercise, onClose }: OptionsDrawerProps) {
  return (
    <Drawer
      open={!!selectedExercise}
      onOpenChange={onClose}
      shouldScaleBackground={false}
    >
      <DrawerContent className="w-[600px] justify-self-center">
        <DrawerHeader>
          <div className="flex flex-col gap-2">
            <DrawerTitle className="text-center text-3xl">
              {selectedExercise?.name}
            </DrawerTitle>
            <DrawerDescription className="hidden">
              View exercise options
            </DrawerDescription>
            <Separator className="h-1"></Separator>
          </div>
        </DrawerHeader>
        <div>{selectedExercise?.name}</div>
        <DrawerFooter>
          <DrawerClose asChild id="exercise-filters-drawer-close">
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface SupersetDrawerProps{
  exercise: ExerciseNode | null;
  onClose: () => void;
}

function SupersetDrawer({exercise, onClose }:SupersetDrawerProps){

}
