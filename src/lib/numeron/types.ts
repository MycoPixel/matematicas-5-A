// Tipos compartidos de Numerón (inspirado en la estructura de Nucleon).

export type Difficulty = "easy" | "medium" | "hard";

/**
 * Preguntas con texto que puede incluir fracciones apiladas usando la
 * notación [[numerador/denominador]], por ejemplo: "¿Cuánto es [[1/2]] + [[1/4]]?".
 */
export interface Question {
  id: string;
  type: "mcq" | "numeric";
  difficulty: Difficulty;
  prompt: string;
  // Solo mcq
  options?: string[];
  correctIndex?: number;
  // Solo numeric: valor esperado (se compara numéricamente con tolerancia).
  answer?: number;
  // Cómo se muestra la respuesta esperada, ej: "[[7/10]]" o "0,75".
  answerText?: string;
  // Tolerancia para respuestas numéricas (por defecto max(2% |answer|, 0,01)).
  tolerance?: number;
  unit?: string;
  // Explicación cuando la respuesta es CORRECTA (confirma y refuerza).
  explanationOk: string;
  // Explicación cuando la respuesta es INCORRECTA (paso a paso de cómo se hace).
  explanationNo: string;
}

export type AccentName = "turquesa" | "frambuesa" | "uva" | "girasol" | "mandarina";

export interface Topic {
  id: string;
  index: number;
  /** Símbolo decorativo corto estilo "ficha" (1-3 caracteres). */
  symbol: string;
  name: string;
  tagline: string;
  accent: AccentName;
  questionsFile: string;
}

export interface TopicProgress {
  attempted: number;
  correct: number;
  missed: string[];
  lastScore: { score: number; total: number; at: number } | null;
}

export type AccentClasses = Record<
  AccentName,
  { bg: string; bgSoft: string; text: string; border: string; ring: string }
>;
