import { useMemo } from "react";
import { DAY_NAMES } from "./types";
import { DateSelection, CalendarNote } from "./types";
import DayCell from "./DayCell";

interface CalendarGridProps {
  month: number;
  year: number;
  today: Date;
  selection: DateSelection;
  notes: CalendarNote[];
  onDayClick: (date: Date) => void;
}

function getCalendarDays(month: number, year: number): Date[] {
  const firstDay = new Date(year, month, 1);
  // getDay(): 0=Sun, we want Mon=0
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const days: Date[] = [];
  const startDate = new Date(year, month, 1 - startOffset);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
  }
  return days;
}

function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  return date > start && date < end;
}

export default function CalendarGrid({
  month,
  year,
  today,
  selection,
  notes,
  onDayClick,
}: CalendarGridProps) {
  const days = useMemo(() => getCalendarDays(month, year), [month, year]);

  const noteDays = useMemo(() => {
    const set = new Set<number>();
    notes.forEach((n) => {
      if (n.startDay) set.add(n.startDay);
      if (n.endDay) set.add(n.endDay);
    });
    return set;
  }, [notes]);

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-2"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => (
          <DayCell
            key={i}
            date={date}
            currentMonth={month}
            isToday={isSameDay(today, date)}
            isStart={isSameDay(selection.start, date)}
            isEnd={isSameDay(selection.end, date)}
            isInRange={isInRange(date, selection.start, selection.end)}
            hasNote={date.getMonth() === month && noteDays.has(date.getDate())}
            onClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
}
