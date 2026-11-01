"use client";

import { Fragment, type ReactNode } from "react";

// Renderiza texto con fracciones apiladas escritas como [[numerador/denominador]].
// El numerador puede ser "?" para representar el número que falta, como en
// "[[?/10]]". Ejemplo: "¿Cuánto es [[1/2]] + [[1/4]]?" muestra 1/2 y 1/4 como
// fracciones verticales (numerador arriba, línea, denominador abajo).
export default function MathText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\[\[([?\d]+)\/(\d+)\]\]/g);
  const nodes: ReactNode[] = [];

  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(<Fragment key={`t${i}`}>{parts[i]}</Fragment>);
    if (i + 2 < parts.length) {
      const num = parts[i + 1];
      const den = parts[i + 2];
      nodes.push(
        <span
          key={`f${i}`}
          className="frac"
          role="img"
          aria-label={num === "?" ? `qué número sobre ${den}` : `${num} sobre ${den}`}
        >
          <span className="frac-num">{num}</span>
          <span className="frac-den">{den}</span>
        </span>
      );
    }
  }

  return <span className={className}>{nodes}</span>;
}
