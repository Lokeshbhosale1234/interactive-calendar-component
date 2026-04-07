import { useState } from "react";
import { CalendarNote, MONTH_NAMES } from "./types";
import { DateSelection } from "./types";
import { Trash2, StickyNote, Calendar } from "lucide-react";

interface NotesPanelProps {
  notes: CalendarNote[];
  month: number;
  year: number;
  selection: DateSelection;
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesPanel({
  notes,
  month,
  year,
  selection,
  onAddNote,
  onDeleteNote,
}: NotesPanelProps) {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!text.trim()) return;
    onAddNote(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  const rangeLabel = selection.start
    ? selection.end
      ? `${selection.start.getDate()} – ${selection.end.getDate()} ${MONTH_NAMES[month]}`
      : `${selection.start.getDate()} ${MONTH_NAMES[month]}`
    : MONTH_NAMES[month];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <StickyNote className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-semibold text-foreground">Notes</h3>
      </div>

      <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
        <Calendar className="w-3.5 h-3.5" />
        <span>{rangeLabel}, {year}</span>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a note for the selected range..."
        className="w-full rounded-lg border border-input bg-background p-3 text-sm
          placeholder:text-muted-foreground resize-none
          focus:outline-none focus:ring-2 focus:ring-ring
          transition-shadow duration-200 min-h-[80px]"
        rows={3}
      />

      <button
        onClick={handleSave}
        disabled={!text.trim()}
        className="mt-2 w-full rounded-lg bg-primary text-primary-foreground
          py-2.5 text-sm font-medium
          transition-all duration-200
          hover:opacity-90 active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Save Note
      </button>

      <div className="mt-4 flex-1 overflow-y-auto space-y-2">
        {notes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No notes for this month yet.
          </p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="group rounded-lg border border-border bg-muted/50 p-3
              animate-fade-in transition-colors hover:bg-muted"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {note.startDay && (
                  <span className="text-xs text-muted-foreground block mb-1">
                    {note.startDay}
                    {note.endDay ? ` – ${note.endDay}` : ""}{" "}
                    {MONTH_NAMES[note.month]}
                  </span>
                )}
                <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                  {note.text}
                </p>
              </div>
              <button
                onClick={() => onDeleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity
                  text-muted-foreground hover:text-destructive p-1 rounded"
                aria-label="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
