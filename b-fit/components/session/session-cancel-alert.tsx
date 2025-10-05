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
import { Ban } from "lucide-react";
import { endSession } from "@/store/sessionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function SessionCancelAlert() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex border rounded-lg justify-between px-2 py-4 cursor-pointer hover:bg-secondary">
          <div className="flex justify-center gap-2">
            <Ban />
            <div>Cancel</div>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Session?</AlertDialogTitle>
          <AlertDialogDescription>
            This will end your current session without saving any progress. Are
            you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
            onClick={() => {
              // Dispatch your cancel logic here
              dispatch(endSession());
              router.push("/dashboard");
              console.log("Session cancelled");
            }}
          >
            Yes, Cancel Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
