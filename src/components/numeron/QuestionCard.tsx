"use client";

import { useState } from "react";
import type { Question } from "@/lib/numeron/types";
import MathText from "./MathText";

const difficultyStyle: Record<string, string> = {
  easy: "bg-menta/10 text-menta",
  medium: "bg-girasol/15 text-girasol",
  hard: "bg-coral/10 text-coral",
};

const difficultyLabel: Record<string, string> = {
  easy: "fácil",
  medium: "medio",
  hard: "difícil",
};

export default function QuestionCard({
  question,
  submitted,
  isCorrect,
  onSubmit,
}: {
  question: Question;
  submitted: boolean;
  isCorrect: boolean | null;
  onSubmit: (response: string | number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [textValue, setTextValue] = useState("");

  // El estado interno se limpia al cambiar de pregunta porque QuizView
  // reinicia este componente con la prop key={question.id}.

  function handleSubmit() {
    // Evita envíos duplicados (ej: doble tap rápido antes de que se desmonte el botón).
    if (submitted) return;
    if (question.type === "mcq") {
      if (selected === null) return;
      onSubmit(selected);
    } else {
      if (textValue.trim() === "") return;
      onSubmit(textValue);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !submitted) handleSubmit();
  }

  return (
    <div className="rounded-tile border border-ink-100 bg-paper-card p-5 shadow-tile dark:border-ink-700 dark:bg-ink-800 sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${
            difficultyStyle[question.difficulty] ?? "bg-ink-100 text-ink-500"
          }`}
        >
          {difficultyLabel[question.difficulty] ?? question.difficulty}
        </span>
        <span className="rounded-full bg-ink-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-400 dark:bg-ink-700 dark:text-ink-300">
          {question.type === "mcq" ? "alternativas" : "escribe la respuesta"}
        </span>
      </div>

      <p className="font-display text-lg font-semibold leading-relaxed text-ink-900 dark:text-paper sm:text-xl">
        <MathText text={question.prompt} />
      </p>

      {question.type === "mcq" ? (
        <div className="mt-5 flex flex-col gap-2.5" role="radiogroup" aria-label="Alternativas">
          {question.options?.map((opt, i) => {
            const isSelected = selected === i;
            const isRight = submitted && i === question.correctIndex;
            const isWrongPick = submitted && isSelected && i !== question.correctIndex;
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={submitted}
                onClick={() => setSelected(i)}
                className={[
                  "flex min-h-[52px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-base transition-colors",
                  isRight ? "border-menta bg-menta/10" : "",
                  isWrongPick ? "border-coral bg-coral/10" : "",
                  !submitted && isSelected ? "border-turquesa bg-turquesa/10" : "",
                  !submitted && !isSelected
                    ? "border-ink-100 hover:border-turquesa/50 hover:bg-turquesa/5 dark:border-ink-600"
                    : "",
                  submitted && !isRight && !isWrongPick
                    ? "border-ink-100 opacity-60 dark:border-ink-600"
                    : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold",
                    isSelected || isRight
                      ? "border-transparent text-white"
                      : "border-ink-200 text-ink-400 dark:border-ink-500 dark:text-ink-300",
                    isRight ? "bg-menta" : "",
                    isWrongPick ? "bg-coral" : "",
                    !submitted && isSelected ? "bg-turquesa" : "",
                  ].join(" ")}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-ink-800 dark:text-paper">
                  <MathText text={opt} />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              disabled={submitted}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu respuesta aquí"
              aria-label="Escribe tu respuesta"
              className={[
                "w-full max-w-[240px] rounded-xl border bg-transparent px-4 py-3 font-mono text-base text-ink-900 outline-none transition-colors dark:text-paper sm:max-w-[280px]",
                submitted
                  ? isCorrect
                    ? "border-menta bg-menta/10"
                    : "border-coral bg-coral/10"
                  : "border-ink-100 focus:border-turquesa dark:border-ink-600",
              ].join(" ")}
            />
            {question.unit ? (
              <span className="font-mono text-sm font-semibold text-ink-400 dark:text-ink-300">
                {question.unit}
              </span>
            ) : null}
          </div>
          {!submitted && (
            <p className="mt-2 text-xs text-ink-400 dark:text-ink-300">
              Puedes escribir decimales con coma (ej: 0,5) o fracciones (ej: 3/4).
            </p>
          )}
        </div>
      )}

      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={question.type === "mcq" ? selected === null : textValue.trim() === ""}
          className="mt-6 min-h-[48px] w-full rounded-xl bg-ink-800 py-3 font-display text-base font-semibold text-paper transition-colors hover:bg-ink-700 disabled:opacity-40 dark:bg-paper dark:text-ink-900 dark:hover:bg-ink-100 sm:w-auto sm:px-10"
        >
          Comprobar respuesta
        </button>
      )}
    </div>
  );
}
