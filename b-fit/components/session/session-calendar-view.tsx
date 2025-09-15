"use client";

import { useMemo, useState } from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { useSession } from "@/hooks/queries/use-session";
import { formatTime } from "@/lib/formatTime";
import moment from "moment";
import { SessionDetailsDrawer } from "./session-details-drawer";

/** helper to join class names */
const cls = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

export function SessionsCalendarView() {
  const { sessions, isSessionsLoading } = useSession();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Build a Set of normalized day timestamps for quick lookup
  const sessionDaysSet = useMemo(() => {
    if (!sessions) return new Set<number>();
    const set = new Set<number>();
    sessions.forEach((s) => {
      const d = new Date(s.startTime);
      d.setHours(0, 0, 0, 0);
      set.add(d.getTime());
    });
    return set;
  }, [sessions]);

  const workoutsOnSelectedDay =
    selectedDate && sessions
      ? sessions.filter(
          (s) =>
            new Date(s.startTime).toDateString() === selectedDate.toDateString()
        )
      : [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ✅ Always render calendar */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        showOutsideDays={false}
        className="w-full"
        modifiers={{
          hasSession: (date) =>
            sessionDaysSet.has(new Date(date).setHours(0, 0, 0, 0)),
        }}
        components={{
          DayButton: (props: any) => {
            const { day, modifiers, children } = props;
            const hasSession = !!modifiers.hasSession;

            return (
              <CalendarDayButton {...props}>
                <span>{children}</span>
                {hasSession && (
                  <span
                    className={cls(
                      "inline-block mt-0.5 h-1.5 w-1.5 rounded-full",
                      modifiers.selected
                        ? "bg-primary-foreground"
                        : "bg-primary"
                    )}
                  />
                )}
              </CalendarDayButton>
            );
          },
        }}
      />

      <div>
        {/* ✅ While loading: show skeleton or placeholder */}
        {isSessionsLoading ? (
          <p className="text-muted-foreground">Loading sessions...</p>
        ) : workoutsOnSelectedDay.length === 0 ? (
          <p className="text-muted-foreground">No sessions on this day.</p>
        ) : (
          <ul className="space-y-2">
            {workoutsOnSelectedDay.map((s) => (
              <li
                key={s.id}
                className="p-3 rounded-lg border bg-card shadow-sm cursor-pointer hover:bg-accent"
                onClick={() => setSelectedSessionId(s.id)}
              >
                <h3 className="font-semibold">{s.workoutName}</h3>
                <p className="text-sm text-muted-foreground">
                  Start time: {moment(s.startTime).format("HH:mm A")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Duration: {formatTime(s.duration)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <SessionDetailsDrawer
        selectedSessionId={selectedSessionId}
        onClose={() => setSelectedSessionId(null)}
      />
    </div>
  );
}
