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
import { useDispatch, useSelector } from "react-redux";
import { addTimeToTimer } from "@/store/sessionSlice";
import { RootState } from "@/store";

export default function RestTimerDrawer() {
  const timeLeft = useRestTimer();
  const {
    timer,
  } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  if (timeLeft === null) return null;

  const isNegative = timeLeft < 0;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="fixed bottom-0 left-0 right-0 p-4 z-10 flex justify-center">
          <Button
            variant={isNegative ? "secondary" : "default"}
            className="rounded-full p-8 text-xl flex w-[150px] justify-center space-x-2"
          >
            <Timer />
            <span className="w-full">{formatTime(timeLeft!)}</span>
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-screen lg:w-[600px] justify-self-center">
        <DrawerHeader>
          <DrawerTitle className="text-center text-3xl">{`Rest Timer (${timer?.duration && formatTime(timer?.duration)})`}</DrawerTitle>
          <DrawerDescription className="hidden">
            Rest timer drawer: Allows user to add or subtract time from the
            timer
          </DrawerDescription>
          <Separator className="h-1" />
        </DrawerHeader>
        <div className="flex justify-center items-center gap-10 py-6">
          <Button
          className="rounded-full"
            variant="default"
            onClick={() => dispatch(addTimeToTimer(-15))}
          >
            <MinusIcon />
          </Button>
          <span
            className={clsx(
              "text-xl text-center font-medium w-[150px] p-6 rounded-full",
              isNegative
                ? "bg-secondary text-secondary-foreground "
                : "bg-primary text-primary-foreground"
            )}
          >
            {formatTime(timeLeft!)}
          </span>
          <Button
            className="rounded-full"
            variant="default"
            onClick={() => dispatch(addTimeToTimer(15))}
          >
            <PlusIcon />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
