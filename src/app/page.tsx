"use client";

import { useEffect, useState } from "react";
import Header from "@/components/numeron/Header";
import HelpSheet from "@/components/numeron/HelpSheet";
import HomeView from "@/components/numeron/HomeView";
import QuizView from "@/components/numeron/QuizView";
import ResultsView from "@/components/numeron/ResultsView";

type View =
  | { name: "home" }
  | { name: "quiz"; topicId: string; mode: "full" | "review"; session: number }
  | {
      name: "results";
      topicId: string;
      score: number;
      total: number;
      mode: "full" | "review";
      session: number;
    };

export default function Page() {
  const [view, setView] = useState<View>({ name: "home" });
  const [helpOpen, setHelpOpen] = useState(false);

  // Cada vez que cambia la vista, volvemos arriba (importante en celular).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view.name, "session" in view ? view.session : 0]);

  function startQuiz(topicId: string, mode: "full" | "review") {
    setView({ name: "quiz", topicId, mode, session: Date.now() });
  }

  function finishQuiz(payload: {
    topicId: string;
    score: number;
    total: number;
    mode: "full" | "review";
  }) {
    setView({ ...payload, name: "results", session: Date.now() });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenHelp={() => setHelpOpen(true)} />

      <div className="flex flex-1 flex-col">
        {view.name === "home" && <HomeView onStart={startQuiz} />}

        {view.name === "quiz" && (
          <QuizView
            key={`${view.topicId}-${view.mode}-${view.session}`}
            topicId={view.topicId}
            mode={view.mode}
            onExit={() => setView({ name: "home" })}
            onFinish={finishQuiz}
            onOpenHelp={() => setHelpOpen(true)}
          />
        )}

        {view.name === "results" && (
          <ResultsView
            key={`${view.topicId}-${view.session}`}
            topicId={view.topicId}
            score={view.score}
            total={view.total}
            mode={view.mode}
            onReview={() => startQuiz(view.topicId, "review")}
            onRetry={() => startQuiz(view.topicId, "full")}
            onHome={() => setView({ name: "home" })}
          />
        )}
      </div>

      <footer className="mt-auto border-t border-ink-100 py-5 dark:border-ink-700">
        <p className="text-center font-mono text-[11px] text-ink-300 dark:text-ink-400">
          Numerón · aprende fracciones y decimales practicando un poco cada día
        </p>
      </footer>

      <HelpSheet open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
}
