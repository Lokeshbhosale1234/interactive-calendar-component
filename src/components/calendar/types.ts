export interface CalendarNote {
  id: string;
  text: string;
  month: number;
  year: number;
  startDay?: number;
  endDay?: number;
  createdAt: number;
}

export interface DateSelection {
  start: Date | null;
  end: Date | null;
}

export interface Holiday {
  month: number;
  day: number;
  name: string;
}

export const HOLIDAYS: Holiday[] = [
  { month: 0, day: 1, name: "New Year's Day" },
  { month: 0, day: 26, name: "Republic Day" },
  { month: 2, day: 14, name: "Holi" },
  { month: 3, day: 14, name: "Ambedkar Jayanti" },
  { month: 4, day: 1, name: "May Day" },
  { month: 7, day: 15, name: "Independence Day" },
  { month: 9, day: 2, name: "Gandhi Jayanti" },
  { month: 10, day: 1, name: "Diwali" },
  { month: 11, day: 25, name: "Christmas" },
];

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
