// OOP-inspired domain model mirroring the C++ class diagram.

export interface CycleEntry {
  id: string;
  date: string; // ISO yyyy-mm-dd (start of period)
  cycleLength: number; // days between cycles
  duration: number; // bleeding days
  symptoms: string;
  mood: string;
}

export abstract class Account {
  constructor(
    protected username: string,
    protected password: string,
  ) {}
  getUsername() {
    return this.username;
  }
  checkPassword(p: string) {
    return this.password === p;
  }
  abstract displayProfile(): void;
  abstract displayReport(): void;
}

export class UserAccount extends Account {
  constructor(
    username: string,
    password: string,
    public name: string,
    public age: number,
    public cycles: CycleEntry[] = [],
  ) {
    super(username, password);
  }
  addCycle(entry: CycleEntry) {
    this.cycles.push(entry);
  }
  hasCycles() {
    return this.cycles.length > 0;
  }
  displayProfile() {}
  displayReport() {}
}

export class AdminAccount extends Account {
  constructor(
    username: string,
    password: string,
    public adminId: string,
  ) {
    super(username, password);
  }
  displayProfile() {}
  displayReport() {}
}

// Prediction engine
export function nextPeriodDate(entry: CycleEntry): Date {
  const d = new Date(entry.date);
  d.setDate(d.getDate() + entry.cycleLength);
  return d;
}

export function ovulationDate(entry: CycleEntry): Date {
  const d = new Date(entry.date);
  d.setDate(d.getDate() + Math.max(1, entry.cycleLength - 14));
  return d;
}

export function daysUntil(target: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const t = new Date(target);
  t.setHours(0, 0, 0, 0);
  return Math.round((t.getTime() - today.getTime()) / 86400000);
}

export function formatDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// LocalStorage persistence (FileManager analog)
const KEY = "period-tracker-entries-v1";

export const Storage = {
  load(): CycleEntry[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as CycleEntry[]) : [];
    } catch {
      return [];
    }
  },
  save(entries: CycleEntry[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(entries));
  },
};

export const HEALTH_TIPS = [
  { title: "Stay Hydrated", body: "Drink 8+ glasses of water daily to ease bloating and cramps." },
  { title: "Eat Iron-Rich Foods", body: "Spinach, lentils, and lean meats help replenish iron lost during your period." },
  { title: "Exercise Lightly", body: "Gentle yoga or walking can reduce cramps and boost mood." },
  { title: "Prioritize Sleep", body: "Aim for 7–9 hours; rest supports hormonal balance." },
  { title: "Mind Your Mood", body: "Journaling and mindfulness help track emotional patterns." },
  { title: "Limit Caffeine", body: "Cutting back can reduce breast tenderness and anxiety." },
];
