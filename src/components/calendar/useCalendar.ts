import { useState, useEffect, useCallback } from "react";
import { CalendarNote, DateSelection } from "./types";

const NOTES_KEY = "calendar-notes";

function loadNotes(): CalendarNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: CalendarNote[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selection, setSelection] = useState<DateSelection>({ start: null, end: null });
  const [clickCount, setClickCount] = useState(0);
  const [notes, setNotes] = useState<CalendarNote[]>(loadNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }, []);

  const handleDayClick = useCallback((date: Date) => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next === 1) {
        setSelection({ start: date, end: null });
      } else if (next === 2) {
        setSelection((sel) => {
          if (sel.start && date < sel.start) {
            return { start: date, end: sel.start };
          }
          return { ...sel, end: date };
        });
      } else {
        setSelection({ start: date, end: null });
        return 1;
      }
      return next;
    });
  }, []);

  const addNote = useCallback((text: string) => {
    const note: CalendarNote = {
      id: Date.now().toString(),
      text,
      month: currentMonth,
      year: currentYear,
      startDay: selection.start?.getDate(),
      endDay: selection.end?.getDate(),
      createdAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
  }, [currentMonth, currentYear, selection]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const currentNotes = notes.filter(
    (n) => n.month === currentMonth && n.year === currentYear
  );

  return {
    currentMonth,
    currentYear,
    selection,
    notes: currentNotes,
    allNotes: notes,
    today,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    handleDayClick,
    addNote,
    deleteNote,
  };
}
