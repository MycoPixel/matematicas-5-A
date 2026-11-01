"use client";

export type ResultMark = "correct" | "incorrect" | undefined;

export default function ProgressDots({
  total,
  results,
  current,
}: {
  total: number;
  results: ResultMark[];
  current: number;
}) {
  return (
    <div
      className="flex max-w-[180px] flex-wrap items-center justify-end gap-1.5 sm:max-w-none"
      role="status"
      aria-label={`Pregunta ${current + 1} de ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const mark = results[i];
        return (
          <span
            key={i}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all duration-150",
              mark === "correct"
                ? "bg-menta"
                : mark === "incorrect"
                  ? "bg-coral"
                  : i === current
                    ? "scale-125 bg-ink-800 dark:bg-paper"
                    : "bg-ink-100 dark:bg-ink-600",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
