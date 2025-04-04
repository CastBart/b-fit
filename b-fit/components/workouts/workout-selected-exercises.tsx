"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ExerciseNode } from "@/lib/exercise-linked-list";
import { UseFormReturn } from "react-hook-form";

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
  function removeExercise(id: string) {
    console.log("Removing Exercise: ", id);

    // Create a dummy node that points to the head of the list
    let dummy: ExerciseNode = {
      id: "dummy",
      instanceId: "",
      name: "", // Set an empty string for name or default value
      equipment: "", // Default value for equipment
      primaryMuscle: "", // Default value for primaryMuscle
      auxiliaryMuscles: [], // Default empty array for auxiliaryMuscles
      type: "", // Default value for type
      next: head, // Link to the head of the list
    };

    let prev: ExerciseNode = dummy;
    let current = head;

    // Traverse the list and find the node to remove
    while (current) {
      if (current.instanceId === id) {
        prev.next = current.next; // Remove the node by linking previous to next
        break;
      }
      prev = current;
      current = current.next;
    }

    // Set the new head after removal
    const newHead = dummy.next ? { ...dummy.next } : null; // Ensure a new reference
    setHead(newHead); // Update the head
    updateForm(newHead);
  }

  function updateForm(updatedHead: ExerciseNode | null) {
    let exercises: ExerciseNode[] = [];
    let current = updatedHead;
    while (current) {
      exercises.push(current);
      current = current.next;
    }
    form?.setValue("exercises", exercises);
  }

  return (
    <div className="p-2 border rounded-lg">
      <div className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-460px)]">
        <Table>
          <TableCaption>Selected exercises</TableCaption>
          <TableBody>
            {(() => {
              let rows = [];
              let current = head;
              while (current) {
                const exerciseId = current.instanceId;

                rows.push(
                  <TableRow key={exerciseId}>
                    <TableCell>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold">{current.name}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeExercise(exerciseId)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
                current = current.next;
              }
              return rows;
            })()}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
