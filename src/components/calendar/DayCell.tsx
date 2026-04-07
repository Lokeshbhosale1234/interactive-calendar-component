import { useMemo } from "react";
import { HOLIDAYS } from "./types";

interface DayCellProps {
  date: Date;
  currentMonth: number;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  hasNote: boolean;
  onClick: (date: Date) => void;
}

export default function DayCell({
  date,
  currentMonth,
  isToday,
  isStart,
  isEnd,
  isInRange,
  hasNote,
  onClick,
}: DayCellProps) {
  const isOutside = date.getMonth() !== currentMonth;
  const day = date.getDate();

  const holiday = useMemo(() => {
    if (isOutside) return null;
    return HOLIDAYS.find(
      (h) => h.month === date.getMonth() && h.day === day
    );
  }, [date, day, isOutside]);

  const isEdge = isStart || isEnd;

  return (
    <button
      onClick={() => onClick(date)}
      className={`
        relative flex flex-col items-center justify-center
        aspect-square rounded-lg text-sm font-body
        transition-all duration-200 ease-out cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
        ${isOutside ? "text-calendar-outside opacity-50" : ""}
        ${isEdge ? "bg-calendar-range-edge text-primary-foreground font-semibold scale-105 z-10 shadow-md" : ""}
        ${isInRange && !isEdge ? "bg-calendar-range text-foreground" : ""}
        ${isToday && !isEdge ? "ring-2 ring-calendar-today font-semibold" : ""}
        ${!isEdge && !isInRange && !isOutside ? "hover:bg-calendar-hover" : ""}
      `}
      title={holiday ? holiday.name : undefined}
      aria-label={`${day} ${holiday ? `- ${holiday.name}` : ""}`}
    >
      <span className={`${isEdge ? "animate-scale-in" : ""}`}>{day}</span>

      {holiday && !isOutside && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-calendar-holiday" />
      )}

      {hasNote && !holiday && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-calendar-note-dot" />
      )}
    </button>
  );
}
