"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, ListChecks, RotateCcw, Target, Trash2, Trophy } from "lucide-react";
import { getTopic, topics, accentClasses } from "@/lib/numeron/questions";
import {
  getAllProgress,
  getStreak,
  resetAllProgress,
  type TopicProgressMap,
} from "@/lib/numeron/progress";
import TopicTile from "./TopicTile";

interface HomeStats {
  progress: TopicProgressMap;
  streak: { current: number; longest: number };
}

export default function HomeView({ onStart }: { onStart: (topicId: string, mode: "full" | "review") => void }) {
  const [stats, setStats] = useState<HomeStats>({
    progress: {},
    streak: { current: 0, longest: 0 },
  });
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    // El progreso vive en localStorage (sistema externo): leerlo y guardarlo
    // en el estado al montar es el patrón correcto aquí.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({ progress: getAllProgress(), streak: getStreak() });
  }, []);

  const reviewTopics = useMemo(() => {
    return Object.entries(stats.progress)
      .map(([topicId, p]) => ({ topic: getTopic(topicId), missedCount: p.missed?.length ?? 0 }))
      .filter((entry) => entry.topic && entry.missedCount > 0)
      .sort((a, b) => b.missedCount - a.missedCount);
  }, [stats.progress]);

  const summary = useMemo(() => {
    const values = Object.values(stats.progress);
    const answered = values.reduce((sum, p) => sum + (p.attempted || 0), 0);
    const correct = values.reduce((sum, p) => sum + (p.correct || 0), 0);
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, accuracy };
  }, [stats.progress]);

  function handleReset() {
    if (resetAllProgress()) {
      setStats((prev) => ({ ...prev, progress: {} }));
      setResetDone(true);
      setTimeout(() => setResetDone(false), 4000);
    }
    setConfirmingReset(false);
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-14 pt-8 sm:px-8 sm:pt-12">
      <section className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-turquesa">
          práctica diaria de matemáticas
        </p>
        <h1 className="mt-2 max-w-xl font-display text-3xl font-bold leading-tight text-ink-900 dark:text-paper sm:text-4xl">
          Elige un tema y demuestra lo que sabes
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-500 dark:text-ink-300 sm:text-base">
          Preguntas de alternativas o para escribir la respuesta. En cada una recibirás una
          explicación: para confirmar si lo hiciste bien, o para aprender cómo se hace si te
          equivocaste.
        </p>

        {summary.answered > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-turquesa/10 px-3 py-1.5 font-mono text-xs font-semibold text-turquesa">
              <ListChecks size={13} strokeWidth={2.5} />
              {summary.answered} respuestas
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-menta/10 px-3 py-1.5 font-mono text-xs font-semibold text-menta">
              <Target size={13} strokeWidth={2.5} />
              {summary.accuracy}% de acierto
            </span>
            {stats.streak.current > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-girasol/15 px-3 py-1.5 font-mono text-xs font-semibold text-girasol">
                <Flame size={13} strokeWidth={2.5} />
                {stats.streak.current} {stats.streak.current === 1 ? "día" : "días"} seguidos
              </span>
            )}
            {stats.streak.longest > 1 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-uva/10 px-3 py-1.5 font-mono text-xs font-semibold text-uva">
                <Trophy size={13} strokeWidth={2.5} />
                récord: {stats.streak.longest} {stats.streak.longest === 1 ? "día" : "días"}
              </span>
            )}
          </div>
        )}
      </section>

      {reviewTopics.length > 0 && (
        <section className="mb-10 sm:mb-14">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-300">
            Para repasar tus errores
          </h2>
          <div className="flex flex-col gap-2.5">
            {reviewTopics.map(({ topic, missedCount }) => {
              if (!topic) return null;
              const accent = accentClasses[topic.accent];
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => onStart(topic.id, "review")}
                  className={`flex items-center justify-between rounded-tile border ${accent.border} bg-paper-card px-4 py-3 text-left shadow-tile transition-transform hover:-translate-y-0.5 dark:bg-ink-800 sm:px-5`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-display text-lg font-bold ${accent.text}`}>
                      {topic.symbol}
                    </span>
                    <span className="font-display text-sm font-semibold text-ink-900 dark:text-paper sm:text-base">
                      {topic.name}
                    </span>
                  </div>
                  <span className="rounded-full bg-coral/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-coral">
                    {missedCount} por repasar
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-300">
          Temas
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {topics.map((topic) => (
            <TopicTile
              key={topic.id}
              topic={topic}
              progress={stats.progress[topic.id]}
              onSelect={(id) => onStart(id, "full")}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-tile border border-ink-100 bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-800 sm:p-6">
        <h2 className="font-display text-sm font-bold text-ink-900 dark:text-paper">
          Tu progreso se guarda solo
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-400 dark:text-ink-300">
          Tus respuestas y tu racha de días se guardan en este dispositivo. Si quieres empezar de
          nuevo desde cero, puedes borrar todo tu progreso.
        </p>
        <div className="mt-4">
          {confirmingReset ? (
            <div
              role="alertdialog"
              aria-label="Confirmar borrado de progreso"
              className="flex flex-wrap items-center gap-3 rounded-xl border border-coral/40 bg-coral/5 px-4 py-3"
            >
              <p className="w-full text-xs leading-relaxed text-ink-700 dark:text-ink-200">
                ¿Seguro? Se borrarán todas tus respuestas y tu racha. Esto no se puede deshacer.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-xl bg-coral px-4 py-2 font-display text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Trash2 size={14} strokeWidth={2.25} />
                Sí, borrar todo
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="rounded-xl border border-ink-200 px-4 py-2 font-display text-xs font-semibold text-ink-700 transition-colors hover:border-ink-400 dark:border-ink-600 dark:text-paper dark:hover:border-ink-400"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 px-4 py-2 font-display text-xs font-semibold text-ink-500 transition-colors hover:border-coral/60 hover:text-coral dark:border-ink-600 dark:text-ink-300 dark:hover:border-coral/60 dark:hover:text-coral"
              >
                <RotateCcw size={14} strokeWidth={2.25} />
                Borrar mi progreso
              </button>
              {resetDone && (
                <span className="font-mono text-xs font-semibold text-menta">
                  Progreso borrado
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
