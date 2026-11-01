"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MathText from "./MathText";

const cards = [
  {
    title: "Sumar fracciones con el mismo denominador",
    body: "Suma solo los numeradores y deja el denominador igual.",
    example: "[[2/7]] + [[3/7]] = [[5/7]]",
  },
  {
    title: "Sumar o restar con distinto denominador",
    body: "Primero convierte las fracciones en equivalentes con el mismo denominador, y después suma o resta.",
    example: "[[1/2]] + [[3/10]] → [[5/10]] + [[3/10]] = [[8/10]]",
  },
  {
    title: "Restar desde 1 entero",
    body: "Convierte el 1 en fracción con el denominador que necesites: 1 es igual a [[8/8]], a [[10/10]], a [[4/4]]…",
    example: "1 − [[3/4]] = [[4/4]] − [[3/4]] = [[1/4]]",
  },
  {
    title: "De fracción a decimal",
    body: "Divide el numerador entre el denominador. Truco: si puedes, convierte el denominador en 10 o en 100.",
    example: "[[3/4]] = [[75/100]] = 0,75",
  },
  {
    title: "De decimal a fracción",
    body: "Una cifra después de la coma son décimas (sobre 10); dos cifras son centésimas (sobre 100).",
    example: "0,6 = [[6/10]] = [[3/5]]",
  },
  {
    title: "Comparar decimales",
    body: "Compara primero las décimas; si empatan, sigue con las centésimas y luego las milésimas. Más cifras no significa mayor.",
    example: "0,45 < 0,5 porque 4 décimas < 5 décimas",
  },
  {
    title: "Simplificar fracciones",
    body: "Divide el numerador y el denominador por el mismo número hasta que no se pueda más.",
    example: "[[6/8]] = [[3/4]]",
  },
];

export default function HelpSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-tile border-ink-100 bg-paper-card dark:border-ink-700 dark:bg-ink-800 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-ink-900 dark:text-paper">
            Ayuda memoria
          </DialogTitle>
          <DialogDescription className="text-sm text-ink-500 dark:text-ink-300">
            Los pasos más importantes para trabajar con fracciones y decimales.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pb-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-ink-100 bg-paper p-4 dark:border-ink-600 dark:bg-ink-800"
            >
              <h4 className="font-display text-sm font-bold text-ink-900 dark:text-paper">
                {card.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-200">
                <MathText text={card.body} />
              </p>
              <p className="mt-2 rounded-lg bg-turquesa/10 px-3 py-2 font-mono text-sm font-semibold text-turquesa dark:bg-turquesa/15">
                <MathText text={card.example} />
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
