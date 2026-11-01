"use client";

import type { Topic, TopicProgress } from "@/lib/numeron/types";
import { accentClasses } from "@/lib/numeron/questions";

export default function TopicTile({
  topic,
  progress,
  onSelect,
}: {
  topic: Topic;
  progress?: TopicProgress;
  onSelect: (topicId: string) => void;
}) {
  const accent = accentClasses[topic.accent];
  const missedCount = progress?.missed.length ?? 0;
  const lastScore = progress?.lastScore ?? null;

  return (
    <button
      type="button"
      onClick={() => onSelect(topic.id)}
      className={`group relative flex aspect-square w-full flex-col justify-between rounded-tile border ${accent.border} bg-paper-card p-4 text-left shadow-tile transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-pop active:translate-y-0 dark:bg-ink-800 sm:p-5`}
      aria-label={`Practicar: ${topic.name}`}
    >
      <div className="flex items-center justify-between font-mono text-xs text-ink-400 dark:text-ink-300">
        <span className="flex items-center gap-1.5">
          {String(topic.index).padStart(2, "0")}
          {missedCount > 0 && (
            <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
          )}
        </span>
        {lastScore && (
          <span className="font-mono text-[10px] text-ink-300 dark:text-ink-400">
            {lastScore.score}/{lastScore.total}
          </span>
        )}
      </div>

      <div>
        <div className={`font-display text-4xl font-bold ${accent.text} sm:text-5xl`}>
          {topic.symbol}
        </div>
        <h3 className="mt-2 font-display text-sm font-semibold leading-tight text-ink-900 dark:text-paper sm:text-base">
          {topic.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-ink-400 dark:text-ink-300">
          {topic.tagline}
        </p>
      </div>
    </button>
  );
}
