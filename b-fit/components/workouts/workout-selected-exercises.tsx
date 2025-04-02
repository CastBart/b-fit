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

export default function SelectedExercisesList({
  head,
  setHead,
  form,
}: {
  head: ExerciseNode | null;
  setHead: (head: ExerciseNode | null) => void;
  form: UseFormReturn<any>; // Ensure it works with your form
}) {
  function removeExercise(id: string) {
    console.log("Removing Exercise: ", id);
    let dummy = new ExerciseNode({
      id: "dummy",
      name: "",
      equipment: "",
      primaryMuscle: "",
      auxiliaryMuscles: [],
      type: "",
    });

    dummy.next = head;
    let prev = dummy;
    let current = head;

    while (current) {
      if (current.instanceId === id) {
        prev.next = current.next;
        break;
      }
      prev = current;
      current = current.next;
    }

    const newHead = dummy.next ? { ...dummy.next } : null; // Ensure a new reference
    setHead(newHead);
    updateForm(newHead);
  }

  function updateForm(updatedHead: ExerciseNode | null) {
    let exercises: ExerciseNode[] = [];
    let current = updatedHead;
    while (current) {
      exercises.push(current);
      current = current.next;
    }
    form.setValue("exercises", exercises);
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
                const exerciseInstanceId = current.instanceId; // ✅ Capture ID in the loop

                rows.push(
                  <TableRow key={exerciseInstanceId}>
                    <TableCell>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold">
                            {current.name}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeExercise(exerciseInstanceId)} // ✅ Uses captured ID
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
