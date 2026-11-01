"use client";

import { useTheme } from "next-themes";
import { BookOpen, Moon, Sun } from "lucide-react";

export default function Header({ onOpenHelp }: { onOpenHelp: () => void }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-ink-100 bg-paper/90 backdrop-blur dark:border-ink-700 dark:bg-ink-900/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 font-display text-lg font-bold text-paper dark:bg-paper dark:text-ink-900"
            aria-hidden="true"
          >
            N
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-none tracking-tight text-ink-900 dark:text-paper">
              Numerón
            </span>
            <span className="mt-0.5 hidden font-mono text-[10px] text-ink-300 dark:text-ink-400 sm:inline">
              fracciones y decimales
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenHelp}
            title="Ayuda memoria"
            aria-label="Abrir ayuda memoria"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-ink-400 hover:text-ink-800 dark:border-ink-600 dark:text-ink-300 dark:hover:border-ink-400 dark:hover:text-paper"
          >
            <BookOpen size={16} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            title="Cambiar tema"
            aria-label="Cambiar entre tema claro y oscuro"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-ink-400 hover:text-ink-800 dark:border-ink-600 dark:text-ink-300 dark:hover:border-ink-400 dark:hover:text-paper"
          >
            {/* El CSS decide qué ícono mostrar según la clase .dark de <html>,
                así no necesitamos estado "mounted" ni manejamos hidratación. */}
            <Sun size={16} strokeWidth={2.25} className="hidden dark:block" />
            <Moon size={16} strokeWidth={2.25} className="dark:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
}
