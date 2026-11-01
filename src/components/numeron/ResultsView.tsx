"use client";

import { useMemo } from "react";
import { PartyPopper, RotateCcw, Smile, ThumbsUp, Trophy } from "lucide-react";
import { accentClasses, getTopic } from "@/lib/numeron/questions";

function resultFor(pct: number) {
  if (pct === 100)
    return {
      icon: Trophy,
      iconClass: "text-girasol",
      chipClass: "bg-girasol/15 text-girasol",
      title: "¡PERFECTO!",
      message: "Contestaste todas las preguntas bien. ¡Eres una estrella de las matemáticas!",
    };
  if (pct >= 80)
    return {
      icon: PartyPopper,
      iconClass: "text-turquesa",
      chipClass: "bg-turquesa/10 text-turquesa",
      title: "¡MUY BIEN!",
      message: "Dominas este tema. Repasa las que fallaste y quedarás imparable.",
    };
  if (pct >= 50)
    return {
      icon: Smile,
      iconClass: "text-mandarina",
      chipClass: "bg-mandarina/10 text-mandarina",
      title: "¡BUEN INTENTO!",
      message: "Vas por buen camino. Repasa los errores con calma y vuelve a intentarlo.",
    };
  return {
    icon: ThumbsUp,
    iconClass: "text-uva",
    chipClass: "bg-uva/10 text-uva",
    title: "¡NO TE RINDAS!",
    message: "Errar es parte de aprender. Lee las explicaciones con calma y practica otra vez.",
  };
}

export default function ResultsView({
  topicId,
  score,
  total,
  mode,
  onReview,
  onRetry,
  onHome,
}: {
  topicId: string;
  score: number;
  total: number;
  mode: "full" | "review";
  onReview: () => void;
  onRetry: () => void;
  onHome: () => void;
}) {
  const topic = getTopic(topicId);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const result = useMemo(() => resultFor(pct), [pct]);
  const Icon = result.icon;

  if (!topic) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
        <p className="text-ink-500 dark:text-ink-300">No encontramos este tema.</p>
        <button type="button" onClick={onHome} className="mt-4 text-turquesa underline underline-offset-2">
          Volver al inicio
        </button>
      </main>
    );
  }

  const accent = accentClasses[topic.accent];

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-4 pb-16 pt-12 text-center sm:pt-20">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className={`rounded-full ${accent.bgSoft} ${accent.text} px-3 py-1 font-mono text-xs font-semibold`}>
          {topic.name}
        </span>
        {mode === "review" && (
          <span className="rounded-full bg-coral/10 px-3 py-1 font-mono text-xs font-semibold text-coral">
            repaso de errores
          </span>
        )}
      </div>

      <span
        className={`mt-6 flex h-16 w-16 items-center justify-center rounded-full ${result.chipClass}`}
        aria-hidden="true"
      >
        <Icon size={30} strokeWidth={2} />
      </span>

      <div className="mt-4 font-display text-6xl font-bold text-ink-900 dark:text-paper sm:text-7xl">
        {pct}%
      </div>
      <p className="mt-2 font-mono text-sm text-ink-400 dark:text-ink-300">
        {score} de {total} respuestas correctas
      </p>

      <h1 className="mt-5 font-display text-xl font-bold text-ink-900 dark:text-paper sm:text-2xl">
        {result.title}
      </h1>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-600 dark:text-ink-200 sm:text-base">
        {result.message}
      </p>

      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        {mode !== "review" && score < total && (
          <button
            type="button"
            onClick={onReview}
            className="min-h-[48px] w-full rounded-xl bg-coral py-3 font-display text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral/90"
          >
            Repasar mis errores ({total - score})
          </button>
        )}
        <button
          type="button"
          onClick={onRetry}
          className="min-h-[48px] w-full rounded-xl bg-ink-800 py-3 font-display text-sm font-semibold text-paper transition-colors hover:bg-ink-700 dark:bg-paper dark:text-ink-900 dark:hover:bg-ink-100"
        >
          Practicar otra vez
        </button>
        <button
          type="button"
          onClick={onHome}
          className="min-h-[48px] w-full rounded-xl border border-ink-200 py-3 font-display text-sm font-semibold text-ink-700 transition-colors hover:border-ink-400 dark:border-ink-600 dark:text-paper dark:hover:border-ink-400"
        >
          Volver a los temas
        </button>
      </div>
    </main>
  );
}
