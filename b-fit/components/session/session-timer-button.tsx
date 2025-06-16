"use client";

import { useTimeLeft } from "@/hooks/use-timer";
import { formatTime } from "@/lib/formatTime";
import clsx from "clsx"; // install clsx if you don't have it: `npm install clsx`
import { Button } from "../ui/button";

export default function RestButton() {
  const timeLeft = useTimeLeft();

  if (timeLeft === null) return null;

  const isNegative = timeLeft < 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-10 flex justify-center">
      <Button
        variant={isNegative ? "secondary" : "default"}
        className="rounded-full py-10 px-10 text-3xl"
      >
        {formatTime(timeLeft!)}
      </Button>
    </div>
  );
}
