import type { TopicProgress } from "./types";

export type TopicProgressMap = Record<string, TopicProgress>;

const PROGRESS_KEY = "numeron:progress:v1";
const STREAK_KEY = "numeron:streak:v1";

// ---------------------------------------------------------------- progreso

function readAllProgress(): Record<string, TopicProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, TopicProgress>) : {};
  } catch {
    return {};
  }
}

function writeAllProgress(data: Record<string, TopicProgress>) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch {
    // almacenamiento no disponible (navegación privada): fallar en silencio
  }
}

export function getTopicProgress(topicId: string): TopicProgress {
  const all = readAllProgress();
  return all[topicId] ?? { attempted: 0, correct: 0, missed: [], lastScore: null };
}

export function getAllProgress(): Record<string, TopicProgress> {
  return readAllProgress();
}

export function recordAttempt(topicId: string, questionId: string, wasCorrect: boolean) {
  const all = readAllProgress();
  const current = all[topicId] ?? { attempted: 0, correct: 0, missed: [], lastScore: null };
  current.attempted += 1;
  if (wasCorrect) {
    current.correct += 1;
    current.missed = current.missed.filter((id) => id !== questionId);
  } else if (!current.missed.includes(questionId)) {
    current.missed.push(questionId);
  }
  all[topicId] = current;
  writeAllProgress(all);
}

export function recordSessionScore(topicId: string, score: number, total: number) {
  const all = readAllProgress();
  const current = all[topicId] ?? { attempted: 0, correct: 0, missed: [], lastScore: null };
  current.lastScore = { score, total, at: Date.now() };
  all[topicId] = current;
  writeAllProgress(all);
}

export function resetAllProgress(): boolean {
  const all = readAllProgress();
  const had = Object.keys(all).length > 0;
  writeAllProgress({});
  return had;
}

// ------------------------------------------------------------------- racha

interface Streak {
  current: number;
  longest: number;
  lastDate: string | null;
}

function readStreak(): Streak {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw
      ? (JSON.parse(raw) as Streak)
      : { current: 0, longest: 0, lastDate: null };
  } catch {
    return { current: 0, longest: 0, lastDate: null };
  }
}

function writeStreak(streak: Streak) {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  } catch {
    // ignorar fallos de almacenamiento
  }
}

export function getStreak(): Streak {
  return readStreak();
}

// Se llama al terminar cada quiz. Extiende la racha si la práctica anterior
// fue ayer; parte una nueva si fue antes; no hace nada si ya practicó hoy.
export function recordPracticeToday(): Streak {
  const streak = readStreak();
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;

  if (streak.lastDate === today) return streak;

  if (streak.lastDate) {
    const previous = new Date(`${streak.lastDate}T00:00:00`);
    const diff = Math.round((now.getTime() - previous.getTime()) / 86400000);
    streak.current = diff === 1 ? streak.current + 1 : 1;
  } else {
    streak.current = 1;
  }

  streak.longest = Math.max(streak.longest || 0, streak.current);
  streak.lastDate = today;
  writeStreak(streak);
  return streak;
}
