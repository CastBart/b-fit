"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { createExerciseNode, ExerciseNode, getLinkedExerciseArray } from "@/lib/exercise-linked-list";
import { WorkoutSchema } from "@/schemas";
import WorkoutSelectExerciseDrawer from "@/components/workouts/workout-add-exercise-drawer";
import SelectedExercisesList from "@/components/workouts/workout-selected-exercises";
import { Exercise } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useWorkout } from "@/hooks/queries/use-workout";
import { useWorkouts } from "@/hooks/queries/use-workouts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type WorkoutFormProps = {
  mode: "create" | "edit";
  workoutId?: string;
  defaultName?: string;
  defaultDescription?: string;
  workoutHead?: ExerciseNode | null;
};

export default function WorkoutForm({
  mode,
  workoutId,
  defaultName = "",
  defaultDescription = "",
  workoutHead = null,
}: WorkoutFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [head, setHead] = useState<ExerciseNode | null>(workoutHead);
  const {isUpdating, handleUpdate, handleDelete} = useWorkout(workoutId ?? "");
  const { createWorkout, isCreating } = useWorkouts();

  const form = useForm<z.infer<typeof WorkoutSchema>>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: {
      name: defaultName,
      description: defaultDescription,
      exercises: getLinkedExerciseArray(workoutHead),
    },
  });

  

  function handleExerciseSelect(newExercises: Exercise[]) {
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
  
    if (!head) {
      // If no head, start new chain
      setHead(newNodes[0]);
    } else {
      // Otherwise, append to end of current chain
      let lastNode = head;
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
  
      lastNode.next = newNodes[0];
      newNodes[0].prev = lastNode;
  
      // Force state update
      setHead({ ...head });
    }
  }

  function handleSubmit(values: z.infer<typeof WorkoutSchema>) {
    startTransition(async () => {
      const linkedExercises = getLinkedExerciseArray(head);

      const workoutData = {
        ...values,
        exercises: linkedExercises,
      };

      if (mode === "create") {
        await new Promise<void>((resolve) => {
          createWorkout(workoutData, {
            onSuccess: () => {
              resolve();
              router.push("/dashboard/workouts");
            },
            onError: () => {
              resolve(); // Still resolve to exit transition on failure
            },
          });
        });
      } else if (mode === "edit" && workoutId) {
        handleUpdate(workoutData);
      }
    });
  }

  return (
    <div className="max-w-[600px] mx-auto overflow-auto space-y-4 p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-2"
          id={`${mode}-workout-form`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Workout Name</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-between">
                    <Input
                      {...field}
                      placeholder="Enter workout name"
                      className="border-none pl-0 text-2xl md:text-2xl sm:text-2xl lg:text-2xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring"
                    />
                    {mode === "edit" && (
                      <EditDropdown
                        onDelete={() => handleDelete(defaultName)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your workout (optional)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <WorkoutSelectExerciseDrawer onExerciseSelect={handleExerciseSelect} />

      {form.formState.errors.exercises && (
        <p className="text-sm text-destructive">
          {form.formState.errors.exercises.message}
        </p>
      )}

      <SelectedExercisesList head={head} setHead={setHead} form={form} />

      <Button
        type="submit"
        form={`${mode}-workout-form`}
        className="w-full"
        onClick={() => {
          form.setValue("exercises", getLinkedExerciseArray(head), {
            shouldValidate: true,
          });
        }}
        disabled={isUpdating || isCreating}
      >
        {isUpdating || isCreating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            {mode === "create" ? "Creating..." : "Updating..."}
          </>
        ) : mode === "create" ? (
          "Create Workout"
        ) : (
          "Update Workout"
        )}
      </Button>
      {/* <Button onClick={()=>{
        console.log("Exercises: ", getLinkedExerciseArray(head))
      }}>Head</Button> */}
    </div>
  );
}

function EditDropdown({ onDelete }: { onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button className="w-full" variant={"destructive"} onClick={onDelete}>
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
interface SelectionButtonProps {
  label: string;
  value: string | string[];
}

function SelectionButton({ label, value }: SelectionButtonProps) {
  return (
    <Button className="w-full min-h-[48px] h-full" variant="secondary">
      <div className="flex items-start justify-between w-full">
        <div>{label}</div>
        <div className="text-right text-muted-foreground">
          {Array.isArray(value) ? (
            value.length > 0 ? (
              value.map((item, index) => <div key={index}>{item}</div>)
            ) : (
              <div>None</div>
            )
          ) : (
            <div>{value}</div>
          )}
        </div>
      </div>
    </Button>
  );
}
