import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Input } from "../ui/input";
import { updateSet } from "@/store/sessionSlice";

export default function SessionSetTable() {
  const dispatch = useDispatch();
  const { exerciseMap, progress, activeExerciseId, headExerciseId } =
    useSelector((state: RootState) => state.session);
  // const [supersetManager, setSupersetManager] = useState();

  const currentExercise = activeExerciseId
    ? exerciseMap[activeExerciseId]
    : null;
  const exerciseProgress = currentExercise
    ? progress[currentExercise.id]
    : null;
  if (!currentExercise || !exerciseProgress)
    return <div>Loading exercise...</div>;
  return (
    <Table>
      <TableCaption className="hidden">Exercise Sets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Set</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
      <TableBody>
        {exerciseProgress.sets.map((set) => (
          <TableRow className="hover:bg-none">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
