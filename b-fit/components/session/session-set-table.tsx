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
            <TableHead>Set</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead className="flex justify-center items-center cursor-pointer">
              <Wrench size={"16px"} onClick={() =>setSetExercise(activeExerciseId)}/>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exerciseProgress.sets.map((set) => {
            return (
              <TableRow className="hover:bg-none" key={set.setNumber}>
                <TableCell>{set.setNumber}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      dispatch(
                        updateSet({
                          exerciseId: currentExercise.id,
                          setNumber: set.setNumber,
                          reps: parseInt(e.target.value),
                        })
                      )
                    }
                  ></Input>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={(e) =>
                      dispatch(
                        updateSet({
                          exerciseId: currentExercise.id,
                          setNumber: set.setNumber,
                          weight: parseInt(e.target.value),
                        })
                      )
                    }
                  ></Input>
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  {set.completed && (
                    <div className="border py-1 px-2 rounded-full">
                      <Check
                        strokeWidth={3}
                        className="text-muted-foreground"
                      />
                    </div>
                  )}
                  {!set.completed &&
                    set.setNumber === exerciseProgress.activeSetNumber && (
                      <div className="border py-1 px-2 rounded-full bg-primary">
                        <Check
                          strokeWidth={3}
                          onClick={() => {
                            dispatch(
                              completeSet({
                                reps: set.reps,
                                weight: set.weight,
                              })
                            );
                          }}
                          className="text-primary-foreground"
                        />
                      </div>
                    )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <SetDrawer exerciseId={setExercise} onClose={() => setSetExercise(null)}/>
    </>
  );
}
