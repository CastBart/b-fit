import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CircleCheck } from "lucide-react";
import { endSession } from "@/store/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { SessionInput } from "@/actions/session-complete";
import { useElapsedSessionTime } from "@/hooks/use-elapsed-session-time";
import { useSession } from "@/hooks/queries/use-session";

export default function SessionCompleteAlert() {
  const dispatch = useDispatch();

  const { createSession } = useSession();
  const router = useRouter();
  const {
    workoutCompleted,
    exerciseMap,
    progress,
    workoutName,
    sessionId,
    workoutId,
    startTime,
  } = useSelector((state: RootState) => state.session);

  const workoutDuration = useElapsedSessionTime();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex border rounded-lg justify-between px-2 py-4 cursor-pointer hover:bg-secondary">
          <div className="flex justify-center gap-2">
            <CircleCheck />
            <div>Complete</div>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Complete session</AlertDialogTitle>
          <AlertDialogDescription>
            {workoutCompleted
              ? "Continue to complete the session"
              : "There are uncompleted sets in the workout, are you sure you want to complete the session early?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction
            className=""
            onClick={() => {
              // Dispatch your cancel logic here
              router.push("/dashboard");
              console.log("Session Completed");
              dispatch(endSession());
              const sessionData: SessionInput = {
                sessionId: sessionId!,
                workoutId: workoutId!,
                workoutName,
                startTime: startTime!,
                duration: workoutDuration!,
                exerciseMap,
                progress,
              };
              dispatch(endSession());
              router.push("/dashboard");
              createSession(sessionData);
            }}
          >
            Yes, Complete Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
