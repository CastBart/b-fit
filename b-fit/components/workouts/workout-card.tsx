"use client";

import { Workout } from "@/lib/definitions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getWorkoutWithExercises } from "@/actions/fetch-workout";
import { useDispatch } from "react-redux";
import { createExerciseNode, flattenExerciseNodeList, getHeadNode } from "@/lib/exercise-linked-list";
import { startSession } from "@/store/sessionSlice";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * Create linked list → flatten → start session → redirect to session page
   */
  function handleStart() {
    if (!workout || !workout.exercises || workout.exercises.length === 0)
      return;

    // 1️⃣ Create ExerciseNodes for each exercise
    const nodes = workout.exercises.map((exercise) =>
      createExerciseNode({
        id: exercise.id,
        name: exercise.name,
        equipment: exercise.equipment,
        primaryMuscle: exercise.primaryMuscle,
        auxiliaryMuscles: exercise.auxiliaryMuscles,
        type: exercise.type,
        supersetGroupId: exercise.supsetGroupId ?? null,
      })
    );

    // 2️⃣ Link them together (double linked list)
    for (let i = 0; i < nodes.length; i++) {
      if (i > 0) nodes[i].prev = nodes[i - 1];
      if (i < nodes.length - 1) nodes[i].next = nodes[i + 1];
    }

    // 3️⃣ Get the head node
    const head = getHeadNode(nodes[0]);

    // 4️⃣ Flatten the list
    const flattenedMap = flattenExerciseNodeList(head);

    // 5️⃣ Dispatch startSession
    dispatch(
      startSession({
        workoutId: workout.id,
        workoutName: workout.name,
        headId: head.instanceId,
        flattenedMap,
      })
    );

    // 6️⃣ Redirect to session page
    router.push("/dashboard/session");
  }

  function handleEdit() {
    router.push(`/dashboard/workouts/${workout.id}`);
  }

  return (
    <Card className="h-full flex flex-col justify-between hover:bg-primary/10 transition-colors">
      <CardContent className="p-6 flex justify-between gap-4">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold break-words">
              {workout.name}
            </h3>
            {/* <ArrowRight className="w-4 h-4 text-muted-foreground" /> */}
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-muted-foreground">
              {workout.exercises.length} exercise
              {workout.exercises.length !== 1 && "s"}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {workout.description || "No description provided."}
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleStart}
            variant="default"
            className="flex-1 rounded-full"
          >
            Start
          </Button>
          <Button
            onClick={handleEdit}
            variant="outline"
            className="flex-1 rounded-full"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
