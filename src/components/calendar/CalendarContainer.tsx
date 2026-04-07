import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { MONTH_NAMES, HOLIDAYS } from "./types";
import { useCalendar } from "./useCalendar";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

import januaryImg from "@/assets/months/january.jpg";
import februaryImg from "@/assets/months/february.jpg";
import marchImg from "@/assets/months/march.jpg";
import aprilImg from "@/assets/months/april.jpg";
import mayImg from "@/assets/months/may.jpg";
import juneImg from "@/assets/months/june.jpg";
import julyImg from "@/assets/months/july.jpg";
import augustImg from "@/assets/months/august.jpg";
import septemberImg from "@/assets/months/september.jpg";
import octoberImg from "@/assets/months/october.jpg";
import novemberImg from "@/assets/months/november.jpg";
import decemberImg from "@/assets/months/december.jpg";

const MONTH_IMAGES = [
  januaryImg, februaryImg, marchImg, aprilImg, mayImg, juneImg,
  julyImg, augustImg, septemberImg, octoberImg, novemberImg, decemberImg,
];

export default function CalendarContainer() {
  const {
    currentMonth,
    currentYear,
    selection,
    notes,
    today,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    handleDayClick,
    addNote,
    deleteNote,
  } = useCalendar();

  const monthHolidays = HOLIDAYS.filter((h) => h.month === currentMonth);

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl calendar-shadow-elevated rounded-2xl overflow-hidden bg-card animate-fade-in">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <img
            src={MONTH_IMAGES[currentMonth]}
            alt="Calendar hero"
            className="w-full h-full object-cover"
            width={1280}
            height={720}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
          <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8">
            <p className="text-primary-foreground/80 text-sm font-body tracking-widest uppercase">
              {currentYear}
            </p>
            <h1 className="text-primary-foreground text-3xl md:text-5xl font-display font-bold tracking-tight">
              {MONTH_NAMES[currentMonth]}
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row">
          {/* Calendar Side */}
          <div className="flex-1 p-4 md:p-8">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPrevMonth}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <button
                onClick={goToToday}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground
                  hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Today
              </button>
            </div>

            {/* Selection indicator */}
            {selection.start && (
              <div className="mb-4 text-xs text-muted-foreground bg-muted/60 rounded-lg px-3 py-2 animate-fade-in">
                {selection.end ? (
                  <>
                    Selected: <span className="font-semibold text-foreground">{selection.start.getDate()}</span>
                    {" → "}
                    <span className="font-semibold text-foreground">{selection.end.getDate()}</span>
                    {" "}{MONTH_NAMES[currentMonth]}
                  </>
                ) : (
                  <>
                    Start: <span className="font-semibold text-foreground">{selection.start.getDate()} {MONTH_NAMES[selection.start.getMonth()]}</span>
                    <span className="ml-1 opacity-60">· Click another day to set end</span>
                  </>
                )}
              </div>
            )}

            <CalendarGrid
              month={currentMonth}
              year={currentYear}
              today={today}
              selection={selection}
              notes={notes}
              onDayClick={handleDayClick}
            />

            {/* Holidays */}
            {monthHolidays.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {monthHolidays.map((h) => (
                  <span
                    key={h.day}
                    className="inline-flex items-center gap-1.5 text-xs bg-muted rounded-full px-3 py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-calendar-holiday" />
                    <span className="text-muted-foreground">
                      {h.day} – {h.name}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Notes Side */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-border p-4 md:p-6">
            <NotesPanel
              notes={notes}
              month={currentMonth}
              year={currentYear}
              selection={selection}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
