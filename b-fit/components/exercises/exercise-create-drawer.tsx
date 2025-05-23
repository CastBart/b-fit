import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "../ui/separator";
import { Input } from "@/components/ui/input";
import FormError from "../form-error";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";
import ExerciseCreateFilter from "@/components/exercises/exercise-create-filter";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExerciseSchema } from "@/schemas/index";
import { useExercises } from "@/hooks/queries/use-exercises";

export default function CreateExerciseDrawer() {
  const { createExercise } = useExercises();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<
    z.infer<typeof CreateExerciseSchema> & {
      equipment: ExerciseEquipment | "";
      primaryMuscle: MuscleGroup | "";
      exerciseType: ExerciseType | "";
    }
  >({
    resolver: zodResolver(CreateExerciseSchema),
    defaultValues: {
      exerciseName: "",
      equipment: "" as ExerciseEquipment,
      primaryMuscle: "" as MuscleGroup,
      auxiliaryMuscles: [],
      exerciseType: "" as ExerciseType,
    },
  });
  function handleDrawerChange(isOpen: boolean) {
    if (!isOpen) {
      form.reset(); // Reset form values
      setError(""); // Clear any form error
    }
    setOpen(isOpen); // Keep drawer state in sync
  }

  function onSubmit(values: z.infer<typeof CreateExerciseSchema>) {
    createExercise(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
      onError: (err) => {
        setError(err.message); // <-- this will show inside FormError
      },
    });
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleDrawerChange}
      shouldScaleBackground={false}
    >
      <DrawerTrigger
        asChild
        id="create-exercise-drawer-trigger"
        title="Create Exercise Drawer Trigger"
        className="mb-2"
      >
        <Button type="button">Create</Button>
      </DrawerTrigger>
      <DrawerContent
        id="create-exercise-drawer-content"
        title="Create Exercise Drawer Content"
        className="w-full max-h-screen lg:w-[600px] justify-self-center"
      >
        <DrawerHeader id="create-exercise-drawer-header">
          <div className="flex flex-col gap-2">
            <DrawerTitle className="text-center text-3xl">
              Create Exercise
            </DrawerTitle>
            <DrawerDescription className="hidden">
              Create your own Exercise
            </DrawerDescription>
            <Separator className="h-1" />
          </div>
        </DrawerHeader>
        <div className="grid gap-4 px-4 overflow-y-auto custom-scrollbar">
          <Form {...form}>
            <form
              id="create-exercise-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Exercise Name */}
              <FormField
                control={form.control}
                name="exerciseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Equipment Selection (Single-Select) */}
              <FormField
                control={form.control}
                name="equipment"
                render={() => (
                  <ExerciseCreateFilter
                    title="Equipment"
                    data={Object.values(ExerciseEquipment)}
                    name="equipment"
                    control={form.control}
                    singleSelect
                  />
                )}
              />
              {/* Primary Muscles Selection (Single-Select) */}
              <FormField
                control={form.control}
                name="primaryMuscle"
                render={() => (
                  <ExerciseCreateFilter
                    title="Primary Muscle"
                    data={Object.values(MuscleGroup)}
                    name="primaryMuscle"
                    control={form.control}
                    singleSelect
                  />
                )}
              />

              {/* Auxilary Muscles Selection (Multi-Select) */}
              <FormField
                control={form.control}
                name="auxiliaryMuscles"
                render={() => (
                  <ExerciseCreateFilter
                    title="Auxiliary Muscles"
                    data={Object.values(MuscleGroup)}
                    name="auxiliaryMuscles"
                    control={form.control}
                    blankSelectionTxt="None"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="exerciseType"
                render={() => (
                  <ExerciseCreateFilter
                    title="Exercise Type"
                    data={Object.values(ExerciseType)}
                    name="exerciseType"
                    control={form.control}
                    singleSelect
                  />
                )}
              />
            </form>
          </Form>
        </div>
        {/* Drawer Footer */}
        <DrawerFooter className="flex justify-between px-4 mt-auto">
          <FormError message={error} />
          <div className="w-full flex justify-between gap-4">
            <DrawerClose asChild className="w-full">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              form="create-exercise-form"
              className="w-full mt-auto"
              disabled={isPending}
            >
              Create
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
