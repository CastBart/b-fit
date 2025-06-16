"use client";
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
import { useRestTimer } from "@/hooks/use-rest-timer";
import { Separator } from "../ui/separator";
import { MinusIcon, PlusIcon } from "lucide-react";
import { formatTime } from "@/lib/formatTime";
import { Button } from "../ui/button";
import { Timer } from "lucide-react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addTimeToTimer } from "@/store/sessionSlice";

export default function RestTimerDrawer() {
  const timeLeft = useRestTimer();
  const dispatch = useDispatch();
  if (timeLeft === null) return null;

  const isNegative = timeLeft < 0;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="fixed bottom-0 left-0 right-0 p-4 z-10 flex justify-center">
          <Button
            variant={isNegative ? "secondary" : "default"}
            className="rounded-full py-10 px-10 text-3xl flex w-[200px] justify-center space-x-2"
          >
            <Timer />
            <span className="w-full">{formatTime(timeLeft!)}</span>
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-screen lg:w-[600px] justify-self-center">
        <DrawerHeader>
          <DrawerTitle className="text-center text-3xl">Rest Timer</DrawerTitle>
          <DrawerDescription className="hidden">
            Rest timer drawer: Allows user to add or subtract time from the
            timer
          </DrawerDescription>
          <Separator className="h-1" />
        </DrawerHeader>
        <div className="flex justify-center items-center gap-10 py-6">
          <Button
            variant="default"
            size="lg"
             onClick={() => dispatch(addTimeToTimer(-15))}
            // disabled={sets.length === 0}
            // className="flex justify-center items-center"
          >
            <MinusIcon className="w-5 h-5" />
            <span className="text-xl">15</span>
          </Button>
          <span className={clsx("text-3xl text-center font-semibold w-[220px] py-2 px-4 rounded-full",
            isNegative? "bg-secondary text-secondary-foreground ":"bg-primary text-primary-foreground"
          )}>
            {formatTime(timeLeft!)}
          </span>
          <Button
          className=""
            variant="default"
            size="lg"
            onClick={() => dispatch(addTimeToTimer(15))}
          >
            <span className="text-xl">15</span>
            <PlusIcon className="w-5 h-5 " />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
