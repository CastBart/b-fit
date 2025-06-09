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
import { updateSet, completeSet, addNote } from "@/store/sessionSlice";
import { useState } from "react";
import SetDrawer from "./session-set-drawer";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Textarea } from "../ui/textarea";

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

interface SessionSetTableProps {
  exerciseID: string;
  onSelectExerciseOptions: (exID: string) => void;
  onSelectSetDrawerID: (exID: string | null) => void;
}

export default function SessionSetTable({
  exerciseID,
  onSelectExerciseOptions,
  onSelectSetDrawerID,
}: SessionSetTableProps) {
  const dispatch = useDispatch();
  const { exerciseMap, progress, activeExerciseId, headExerciseId } =
    useSelector((state: RootState) => state.session);
  const activeSet = useSelector(selectActiveSet);

  const exerciseProgress = progress[exerciseID];

  return (
    <div className="">
      <div className="flex space-x-2 items-center">
        <h3 className="text-2xl font-semibold">
          {exerciseMap[exerciseID].name}
        </h3>
        <EllipsisHorizontalIcon
          className="w-7 h-7 cursor-pointer"
          onClick={() => onSelectExerciseOptions(exerciseID)}
        />
      </div>
      {/* Notes */}
      <div className="mt-4">
        <Textarea
          placeholder="Add notes..."
          value={exerciseProgress.notes ?? ""}
          onChange={(e) =>
            dispatch(
              addNote({
                exerciseId: exerciseID,
                note: e.target.value,
              })
            )
          }
          className="w-full border rounded p-2"
        />
      </div>
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
                onClick={() => onSelectSetDrawerID(exerciseID)}
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
                      ${!currentIsActive && !set.completed ? "opacity-40 " : ""}`}
                    value={set.reps}
                    disabled={!currentIsActive && !set.completed}
                    onChange={(e) =>
                      dispatch(
                        updateSet({
                          exerciseId: exerciseID,
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
                      ${!currentIsActive && !set.completed ? "opacity-40" : ""}`}
                    value={set.weight}
                    disabled={!currentIsActive && !set.completed}
                    onChange={(e) =>
                      dispatch(
                        updateSet({
                          exerciseId: exerciseID,
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
                        onSelectSetDrawerID(exerciseID);
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
    </div>
  );
}
