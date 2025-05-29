import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Wrench } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Input } from "../ui/input";
import { updateSet, completeSet } from "@/store/sessionSlice";
import { useState } from "react";
import SetDrawer from "./session-set-drawer";

/**
 * Checks which set is active in a active exercise
 * @param state state of redux
 * @returns active set boolean
 */
const selectActiveSet = (state: RootState) => {
  const activeId = state.session.activeExerciseId;
  const progress = state.session.progress[activeId ?? ""];
  return progress?.sets.find((s) => s.setNumber === progress.activeSetNumber);
};

export default function SessionSetTable() {
  const dispatch = useDispatch();
  const { exerciseMap, progress, activeExerciseId, headExerciseId } =
    useSelector((state: RootState) => state.session);
  const activeSet = useSelector(selectActiveSet);

  const [setExercise, setSetExercise] = useState<string | null>(null);

  const currentExercise = activeExerciseId
    ? exerciseMap[activeExerciseId]
    : null;
  const exerciseProgress = currentExercise
    ? progress[currentExercise.instanceId]
    : null;
  if (!currentExercise || !exerciseProgress)
    return <div>Loading exercise table component...</div>;
  return (
    <>
      <Table>
        <TableCaption className="hidden">Exercise Sets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Set</TableHead>
            <TableHead className="text-center">Reps</TableHead>
            <TableHead className="text-center">Weight</TableHead>
            <TableHead className="flex justify-center items-center cursor-pointer">
              <Wrench
                size={"16px"}
                onClick={() => setSetExercise(activeExerciseId)}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exerciseProgress.sets.map((set) => {
            const currentIsActive =
              exerciseProgress.activeSetNumber === set.setNumber;
            return (
              <TableRow key={set.setNumber}>
                <TableCell className="text-center">{set.setNumber}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className={`text-center rounded-full transition
                      ${currentIsActive ? "bg-muted" : ""}
                      ${!currentIsActive && !set.completed ? "opacity-40 cursor-not-allowed" : ""}`}
                    value={set.reps}
                    disabled={!currentIsActive && !set.completed}
                    onChange={(e) =>
                      dispatch(
                        updateSet({
                          exerciseId: currentExercise.instanceId,
                          setNumber: set.setNumber,
                          reps: parseInt(e.target.value),
                        })
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className={`text-center rounded-full transition 
                      ${currentIsActive ? "bg-muted" : ""} 
                      ${!currentIsActive && !set.completed ? "opacity-40 cursor-not-allowed" : ""}`}
                    value={set.weight}
                    disabled={!currentIsActive && !set.completed}
                    onChange={(e) =>
                      dispatch(
                        updateSet({
                          exerciseId: currentExercise.instanceId,
                          setNumber: set.setNumber,
                          weight: parseInt(e.target.value),
                        })
                      )
                    }
                  />
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <div
                    className={`border py-1 px-2 rounded-full transition
                      ${set.completed ? "" : currentIsActive ? "bg-primary cursor-pointer" : "opacity-40 cursor-not-allowed "}`}
                    onClick={() => {
                      if (!set.completed && currentIsActive) {
                        dispatch(
                          completeSet({
                            reps: set.reps,
                            weight: set.weight,
                          })
                        );
                      } else {
                        setSetExercise(activeExerciseId);
                      }
                    }}
                  >
                    <Check
                      strokeWidth={3}
                      className={`transition ${set.completed ? "text-muted-foreground" : currentIsActive ? "text-primary-foreground" : "hidden"}`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <SetDrawer
        exerciseId={setExercise}
        onClose={() => setSetExercise(null)}
      />
    </>
  );
}
