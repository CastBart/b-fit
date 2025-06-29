import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "../ui/separator";
import { MinusIcon, PlusIcon, Undo } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  addSet,
  removeLastSet,
  undoLastCompletedSet,
} from "@/store/sessionSlice"; // adjust path as needed

interface SetDrawerProps {
  exerciseId: string | null;
  onClose: () => void;
}

export default function SetDrawer({ exerciseId, onClose }: SetDrawerProps) {
  const dispatch = useDispatch();
  const sets = useSelector(
    (state: RootState) => state.session.progress[exerciseId!]?.sets || []
  );
  //check if set has at least one set completed
  const hasCompletedSet = sets.some((set) => set.completed);
  return (
    exerciseId && (
      <Drawer
        open={!!exerciseId}
        onOpenChange={onClose}
        shouldScaleBackground={false}
      >
        <DrawerContent className="w-screen lg:w-[600px] justify-self-center">
          <DrawerHeader>
            <div className="flex flex-col gap-2">
              <DrawerTitle className="text-center text-3xl">Sets</DrawerTitle>
              <DrawerDescription className="hidden">
                Sets drawer options
              </DrawerDescription>
              <Separator className="h-1" />
            </div>
          </DrawerHeader>

          <div className="flex justify-center items-center gap-10 py-6">
            <Button
              variant="default"
              size="lg"
              onClick={() => dispatch(removeLastSet({ exerciseId }))}
              disabled={sets.length === 0}
            >
              <MinusIcon className="w-5 h-5" />
            </Button>
            <span className="text-7xl font-semibold">{sets.length}</span>
            <Button
              variant="default"
              size="lg"
              onClick={() => dispatch(addSet({ exerciseId }))}
            >
              <PlusIcon className="w-5 h-5 " />
            </Button>
          </div>
          {hasCompletedSet && (
            <div className="w-full px-4">
              <Button
                className="flex gap-2 w-full"
                variant="secondary"
                onClick={() => dispatch(undoLastCompletedSet({ exerciseId }))}
              >
                <span>Undo last set</span>
                <Undo className="w-5 h-5" />
              </Button>
            </div>
          )}

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  );
}
