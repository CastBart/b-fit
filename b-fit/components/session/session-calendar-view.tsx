"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { formatTime } from "@/lib/formatTime";
import { useSession } from "@/hooks/queries/use-session";
export function SessionsCalendarView() {
  const {sessions, isSessionsLoading, isSessionsError, sessionsError} = useSession();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  if (isSessionsLoading || !sessions) {
    return <div>Loading sessions...</div>;
  }
  const workoutsOnSelectedDay = selectedDate
    ? sessions.filter(
        (s) => new Date(s.startTime).toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        showOutsideDays={false}
        className="w-full"
        modifiers={{
          hasSession: (date) =>
            sessions.some(
              (s) => new Date(s.startTime).toDateString() === date.toDateString()
            ),
        }}
        modifiersClassNames={{
          hasSession: "bg-green-500 text-white rounded-full",
        }}
      />

      <div>
        {workoutsOnSelectedDay.length === 0 ? (
          <p className="text-muted-foreground">No sessions on this day.</p>
        ) : (
          <ul className="space-y-2">
            {workoutsOnSelectedDay.map((s) => (
              <li
                key={s.id}
                className="p-3 rounded-lg border bg-card shadow-sm"
              >
                <h3 className="font-semibold">{s.workoutName}</h3>
                <p className="text-sm text-muted-foreground">
                  Duration: {formatTime(s.duration)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
