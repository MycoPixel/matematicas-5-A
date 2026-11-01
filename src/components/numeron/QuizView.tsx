"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { accentClasses, getQuestions, getTopic } from "@/lib/numeron/questions";
import { getTopicProgress, recordAttempt, recordSessionScore, recordPracticeToday } from "@/lib/numeron/progress";
import { checkAnswer, shuffleArray, shuffleQuestionOptions } from "@/lib/numeron/engine";
import type { ResultMark } from "./ProgressDots";
import ProgressDots from "./ProgressDots";
import QuestionCard from "./QuestionCard";
import ExplanationPanel from "./ExplanationPanel";

export default function QuizView({
  topicId,
  mode,
  onExit,
  onFinish,
  onOpenHelp,
}: {
  topicId: string;
  mode: "full" | "review";
  onExit: () => void;
  onFinish: (payload: { topicId: string; score: number; total: number; mode: "full" | "review" }) => void;
  onOpenHelp: () => void;
}) {
  const topic = getTopic(topicId);
  const topRef = useRef<HTMLDivElement>(null);

  // El orden se mezcla una vez por sesión. En modo repaso solo entran las
  // preguntas que alguna vez salieron mal.
  const questions = useMemo(() => {
    const currentTopic = getTopic(topicId);
    if (!currentTopic) return [];
    const all = getQuestions(currentTopic.questionsFile);
    const pool =
      mode === "review"
        ? all.filter((q) => new Set(getTopicProgress(currentTopic.id).missed ?? []).has(q.id))
        : all;
    return shuffleArray(pool);
  }, [topicId, mode]);

  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<ResultMark[]>(() => Array(questions.length).fill(undefined));

  // Subir al inicio de la pregunta al avanzar (útil en celulares).
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
  }, [index]);

  // Mezcla las alternativas solo cuando cambia la pregunta actual.
  const question = useMemo(() => {
    const raw = questions[index];
    return raw ? shuffleQuestionOptions(raw) : null;
  }, [questions, index]);

  if (!topic) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
        <p className="text-ink-500 dark:text-ink-300">No encontramos este tema.</p>
        <button
          type="button"
          onClick={onExit}
          className="mt-4 text-turquesa underline underline-offset-2"
        >
          Volver al inicio
        </button>
      </main>
    );
  }

  if (mode === "review" && questions.length === 0) {
    const accent = accentClasses[topic.accent];
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center px-4 pb-16 pt-16 text-center sm:pt-24">
        <span className={`rounded-full ${accent.bgSoft} ${accent.text} px-3 py-1 font-mono text-xs font-semibold`}>
          {topic.name}
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink-900 dark:text-paper">
          ¡Nada por repasar aquí!
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600 dark:text-ink-200">
          No tienes preguntas falladas en este tema. Practica de nuevo o elige otro tema para
          seguir aprendiendo.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-8 w-full max-w-xs rounded-xl bg-ink-800 py-3 font-display text-sm font-semibold text-paper transition-colors hover:bg-ink-700 dark:bg-paper dark:text-ink-900 dark:hover:bg-ink-100"
        >
          Volver al inicio
        </button>
      </main>
    );
  }

  const accent = accentClasses[topic.accent];
  const isLast = index === questions.length - 1;

  function handleSubmit(response: string | number) {
    if (!question || submitted) return;
    const correct = checkAnswer(question, response);
    setIsCorrect(correct);
    setSubmitted(true);
    recordAttempt(topic!.id, question.id, correct);
    setResults((prev) => {
      const next = [...prev];
      next[index] = correct ? "correct" : "incorrect";
      return next;
    });
  }

  function handleNext() {
    if (isLast) {
      const finalResults = [...results];
      finalResults[index] = isCorrect ? "correct" : "incorrect";
      const score = finalResults.filter((r) => r === "correct").length;
      recordSessionScore(topic!.id, score, questions.length);
      recordPracticeToday();
      onFinish({ topicId: topic!.id, score, total: questions.length, mode });
      return;
    }
    setIndex((i) => i + 1);
    setSubmitted(false);
    setIsCorrect(null);
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 pt-6 sm:px-8 sm:pt-10">
      <div ref={topRef} className="scroll-mt-24" />

      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExit}
          className="flex min-h-[36px] items-center gap-1 font-mono text-xs text-ink-400 transition-colors hover:text-ink-800 dark:text-ink-300 dark:hover:text-paper"
        >
          <ArrowLeft size={14} />
          Salir
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenHelp}
            className="flex min-h-[32px] items-center gap-1.5 rounded-full border border-ink-200 bg-paper-card px-2.5 py-1.5 font-mono text-[11px] font-semibold text-ink-600 transition-colors hover:border-turquesa hover:text-turquesa dark:border-ink-600 dark:bg-ink-800 dark:text-ink-300 dark:hover:border-turquesa dark:hover:text-turquesa"
          >
            <BookOpen size={12} />
            Ayuda memoria
          </button>
          <ProgressDots total={questions.length} results={results} current={index} />
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className={`rounded-full ${accent.bgSoft} ${accent.text} px-2.5 py-1 font-mono text-[11px] font-semibold`}>
          {topic.symbol} · {topic.name}
        </span>
        {mode === "review" && (
          <span className="rounded-full bg-coral/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-coral">
            repaso de errores
          </span>
        )}
        <p className="w-full font-mono text-xs text-ink-400 dark:text-ink-300">
          Pregunta {index + 1} de {questions.length}
        </p>
      </div>

      {question && (
        <>
          <QuestionCard
            key={question.id}
            question={question}
            submitted={submitted}
            isCorrect={isCorrect}
            onSubmit={handleSubmit}
          />
          {submitted && isCorrect !== null && (
            <ExplanationPanel
              question={question}
              isCorrect={isCorrect}
              onNext={handleNext}
              isLast={isLast}
            />
          )}
        </>
      )}
    </main>
  );
}
