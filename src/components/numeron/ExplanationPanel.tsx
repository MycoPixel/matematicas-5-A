"use client";

import { Check, X } from "lucide-react";
import type { Question } from "@/lib/numeron/types";
import MathText from "./MathText";

// Panel que aparece al responder. Si la respuesta es correcta confirma con
// una explicación; si es incorrecta muestra la respuesta correcta y explica
// paso a paso cómo se resuelve.
export default function ExplanationPanel({
  question,
  isCorrect,
  onNext,
  isLast,
}: {
  question: Question;
  isCorrect: boolean;
  onNext: () => void;
  isLast: boolean;
}) {
  const explanation = isCorrect ? question.explanationOk : question.explanationNo;

  return (
    <div
      className={`mt-4 rounded-tile border p-5 sm:p-7 ${
        isCorrect
          ? "border-menta/30 bg-menta/5 dark:bg-menta/10"
          : "border-coral/30 bg-coral/5 dark:bg-coral/10"
      }`}
      role="status"
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${
            isCorrect ? "bg-menta" : "bg-coral"
          }`}
        >
          {isCorrect ? <Check size={17} strokeWidth={3} /> : <X size={17} strokeWidth={3} />}
        </span>
        <div>
          <h4 className="font-display text-base font-bold text-ink-900 dark:text-paper sm:text-lg">
            {isCorrect ? "¡Muy bien! Respuesta correcta" : "Esta vez no salió, ¡no pasa nada!"}
          </h4>
          {!isCorrect && (
            <p className="text-xs text-ink-500 dark:text-ink-200">Aquí te explico cómo se hace:</p>
          )}
        </div>
      </div>

      {!isCorrect && question.type === "numeric" && (
        <p className="mt-4 font-mono text-sm text-ink-600 dark:text-ink-200">
          La respuesta correcta es{" "}
          <span className="font-bold text-ink-900 dark:text-paper">
            <MathText text={question.answerText ?? String(question.answer ?? "")} />
          </span>{" "}
          {question.unit}
        </p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-100 sm:text-base">
        <MathText text={explanation} />
      </p>

      <button
        type="button"
        onClick={onNext}
        className="mt-5 min-h-[48px] w-full rounded-xl bg-ink-800 py-3 font-display text-base font-semibold text-paper transition-colors hover:bg-ink-700 dark:bg-paper dark:text-ink-900 dark:hover:bg-ink-100 sm:w-auto sm:px-10"
      >
        {isLast ? "Ver mis resultados" : "Siguiente pregunta"}
      </button>
    </div>
  );
}
