// app/session/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useSession } from "@/hooks/queries/use-session";
import { formatTime } from "@/lib/formatTime";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";

export default function SessionPage() {
  const { id } = useParams<{ id: string }>();
  const { session, isSessionLoading, isSessionError, sessionError } =
    useSession(id);

  if (isSessionLoading) return <p className="p-4">Loading session...</p>;
  if (isSessionError)
    return <p className="p-4 text-red-500">{sessionError?.message}</p>;
  if (!session) return <p className="p-4">Session not found</p>;

  return (
    <div className="p-4 max-w-[900px] mx-auto space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">{session.workoutName}</h1>
        <p className="text-muted-foreground">
          {moment(session.startTime).format("MMM Do, YYYY, hh:mm")}
        </p>
        <p className="text-muted-foreground">
          Duration: {formatTime(session.duration)}
        </p>
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        {session.exerciseHistories.map((eh) => (
          <div key={eh.id} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold">Exercise {eh.exerciseId}</h2>
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
                {eh.sets.map((set, setIndex) => (
                  <TableRow key={setIndex}>
                    <TableCell className="text-center">
                      {set.setNumber}
                    </TableCell>
                    <TableCell className="text-center">{set.weight}</TableCell>
                    <TableCell className="text-center">{set.reps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}
