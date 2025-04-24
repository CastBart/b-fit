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
import {
  ExerciseNode,
  getLinkedExerciseArray,
} from "@/lib/exercise-linked-list";
import { GripVertical } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useMemo } from "react";

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
                  />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function DraggableExerciseRow({
  id,
  name,
  onRemove,
}: {
  id: string;
  name: string;
  onRemove: () => void;
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

// interface OptionsDrawerProps{
//   selectedExercise:
// }

// function OptionsDrawer(){
//   return (
//     <Drawer>
//       <DrawerContent>

//       </DrawerContent>
//     </Drawer>
//   )
// }
