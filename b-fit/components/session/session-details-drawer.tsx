// components/session/session-details-drawer.tsx
"use client";

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
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { formatTime } from "@/lib/formatTime";
import { useSession } from "@/hooks/queries/use-session";
import { useExercises } from "@/hooks/queries/use-exercises";

type SessionDetailsDrawerProps = {
  selectedSessionId: string | null;
  onClose: () => void;
};

export function SessionDetailsDrawer({ selectedSessionId, onClose }: SessionDetailsDrawerProps) {
  // fetch the single session when we have an id
  const { session, isSessionLoading } = useSession(selectedSessionId ?? undefined);

  // optional: resolve exerciseId -> exerciseName from your cached exercises list
  const { exercises = [] } = useExercises();
  const exerciseNameById = new Map(exercises.map((e) => [e.id, e.name]));

  const hasSession = !!session;

  return (
    <Drawer
      open={!!selectedSessionId}
      onOpenChange={onClose}
      shouldScaleBackground={false}
    >
      <DrawerContent className="w-full max-h-screen lg:w-[600px] justify-self-center">
        {selectedSessionId && (
          <>
            <DrawerHeader>
              <div className="flex flex-col gap-2">
                <DrawerTitle className="text-center text-3xl">
                  {hasSession ? session.workoutName : "Session Details"}
                </DrawerTitle>
                <DrawerDescription className="hidden">
                  View session details
                </DrawerDescription>
                <Separator className="h-1" />
              </div>
            </DrawerHeader>

            {/* Body */}
            <div className="h-[70vh] overflow-y-auto custom-scrollbar px-4 pb-2">
              {isSessionLoading && (
                <div className="w-full flex justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}

              {!isSessionLoading && hasSession && (
                <div className="space-y-6">
                  {/* Session summary */}
                  <div className="rounded-xl border p-4 bg-secondary/40">
                    <div className="text-lg font-semibold">{session.workoutName}</div>
                    <div className="text-muted-foreground">
                      {moment(session.startTime).format("MMM Do, YYYY, hh:mm")}
                    </div>
                    <div className="text-muted-foreground">
                      Duration: {formatTime(session.duration)}
                    </div>
                  </div>

                  {/* Exercise histories */}
                  <div className="space-y-4">
                    {session.exerciseHistories.map((eh) => {
                      const name = exerciseNameById.get(eh.exerciseId) ?? `Exercise ${eh.exerciseId}`;
                      return (
                        <div key={eh.id} className="rounded-xl border bg-secondary/50">
                          <div className="px-4 pt-2">
                            <div className="font-medium">{name}</div>
                          </div>

                          <Table>
                            <TableCaption className="hidden">Sets</TableCaption>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-center">Set</TableHead>
                                <TableHead className="text-center">Weight</TableHead>
                                <TableHead className="text-center">Reps</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {eh.sets.map((set, idx) => (
                                <TableRow key={idx}>
                                  <TableCell className="text-center">{set.setNumber}</TableCell>
                                  <TableCell className="text-center">{set.weight ?? "-"}</TableCell>
                                  <TableCell className="text-center">{set.reps}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <DrawerFooter>
              <DrawerClose asChild id="session-details-drawer-close">
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
