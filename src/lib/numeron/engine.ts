import type { Question } from "./types";

// Fisher-Yates: devuelve una nueva lista mezclada, sin mutar la original.
export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Mezcla las alternativas de una pregunta mcq y reubica correctIndex.
export function shuffleQuestionOptions(question: Question): Question {
  if (question.type !== "mcq" || !question.options || question.correctIndex === undefined) {
    return question;
  }
  const order = shuffleArray(question.options.map((_, i) => i));
  const options = order.map((i) => question.options![i]);
  const correctIndex = order.indexOf(question.correctIndex);
  return { ...question, options, correctIndex };
}

/**
 * Convierte lo que escribió el estudiante en un número:
 * - "0,75" y "0.75" se aceptan (la coma es el separador decimal en español).
 * - "3/4" se interpreta como fracción y se convierte a su valor (0,75).
 * - Se ignoran espacios y el símbolo "=" si aparece.
 */
export function parseResponse(raw: string): number | null {
  const cleaned = raw.trim().replace(/=/g, "").replace(/\s+/g, "").replace(",", ".");
  if (cleaned === "") return null;
  const fracMatch = cleaned.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const denominator = parseFloat(fracMatch[2]);
    if (denominator === 0) return null;
    return parseFloat(fracMatch[1]) / denominator;
  }
  const value = parseFloat(cleaned);
  return Number.isNaN(value) ? null : value;
}

export function checkAnswer(question: Question, response: string | number): boolean {
  if (question.type === "mcq") {
    return response === question.correctIndex;
  }
  const value = typeof response === "number" ? response : parseResponse(response);
  if (value === null || Number.isNaN(value)) return false;
  const expected = question.answer ?? 0;
  const tolerance = question.tolerance ?? Math.max(Math.abs(expected) * 0.02, 0.01);
  return Math.abs(value - expected) <= tolerance;
}
