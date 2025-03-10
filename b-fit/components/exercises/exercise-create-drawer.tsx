import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
import { Label } from "@/components/ui/label";
import FormError from "../form-error";
import FormSuccess from "../from-success";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";
import ExerciseCreateFilter from "@/components/exercises/exercise-create-filter";

import { createExercise } from "@/actions/create-exercise";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExerciseSchema } from "@/schemas/index";

export default function CreateExerciseDrawer() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof CreateExerciseSchema>>({
    resolver: zodResolver(CreateExerciseSchema),
    defaultValues: {
      exerciseName: "",
      equipment: undefined,
      primaryMuscle: undefined,
      auxiliaryMuscles: [],
      exerciseType: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof CreateExerciseSchema>) {
    console.log("Form submitted!");
    console.log("Form submitted with values:", values); // Debugging log
    console.log("Errors:", form.formState.errors);

    setError("");
    setSuccess("");
    startTransition(() => {
      createExercise(values).then((data) => {
        console.log("Server response:", data); // Debugging log
        setError(data.error);
        setSuccess(data.success);
        if (data.success) setOpen(false);
      });
    });
  }

  // State for filters
  const [selectedEquipment, setSelectedEquipment] = useState<
    ExerciseEquipment[]
  >([]);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup[]>([]);
  const [selectedAuxMuscles, setSelectedAuxMuscles] = useState<MuscleGroup[]>(
    []
  );
  const [selectedType, setSelectedType] = useState<ExerciseType[]>([]);

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <Button>Create</Button>
      </DrawerTrigger>
      <DrawerContent className="custom-drawer justify-self-center">
        <DrawerHeader>
          <div className="flex flex-col gap-2">
            <DrawerTitle className="text-center text-3xl">
              Create Exercise
            </DrawerTitle>
            <Separator className="h-1" />
          </div>
        </DrawerHeader>
        <div className="grid gap-4 px-4 min-h-[200px] overflow-y-auto custom-scrollbar">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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

              <FormField
                control={form.control}
                name="auxiliaryMuscles"
                render={() => (
                  <ExerciseCreateFilter
                    title="Auxiliary Muscles"
                    data={Object.values(MuscleGroup)}
                    name="auxiliaryMuscles"
                    control={form.control}
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

              <Button type="submit" className="w-full" disabled={isPending}>
                Create Exercise
              </Button>
            </form>
          </Form>
        </div>
        {/* Drawer Footer */}
        <DrawerFooter className="flex justify-between px-4 mt-auto">
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="w-full flex justify-between gap-2">
            <DrawerClose asChild className="w-full">
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
