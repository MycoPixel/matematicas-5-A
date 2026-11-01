import type { Question } from "../types";

// Tema 4 · Comparar y ordenar decimales — similares a la guía del curso.
export const compararDecimales: Question[] = [
  {
    id: "cd-01",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Cuál de los siguientes números decimales es el MAYOR?",
    options: ["0,45", "0,405", "0,35", "0,5"],
    correctIndex: 3,
    explanationOk:
      "¡Muy bien! Comparando las décimas: 0,5 tiene 5 décimas y los demás solo 3 o 4, por eso 0,5 es el mayor.",
    explanationNo:
      "Para comparar decimales miramos primero las décimas: 0,5 tiene 5 décimas; 0,45 y 0,405 tienen 4; 0,35 tiene 3. Como 5 es el mayor, 0,5 es el número más grande. Ojo: 0,405 no es mayor que 0,45 solo porque tenga más cifras.",
  },
  {
    id: "cd-02",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Cuál de los siguientes decimales es menor que 0,12?",
    options: ["0,2", "0,02", "0,21", "1,2"],
    correctIndex: 1,
    explanationOk:
      "¡Correcto! 0,02 tiene 0 décimas, mientras que 0,12 tiene 1. Por eso 0,02 < 0,12.",
    explanationNo:
      "Comparamos las décimas: 0,12 tiene 1 décima; 0,2 y 0,21 tienen 2; 1,2 tiene 12 décimas (es mayor que 1). Solo 0,02 tiene 0 décimas, así que 0,02 es el único menor que 0,12.",
  },
  {
    id: "cd-03",
    type: "mcq",
    difficulty: "medium",
    prompt: "¿Cuál de las siguientes listas de decimales se encuentra ordenada de MENOR a MAYOR?",
    options: ["0,31 — 0,13 — 0,3", "0,13 — 0,3 — 0,31", "0,3 — 0,13 — 0,31", "0,13 — 0,31 — 0,3"],
    correctIndex: 1,
    explanationOk:
      "¡Excelente! 0,13 tiene 1 décima, 0,3 tiene 3 décimas y 0,31 tiene 3 décimas más 1 centésima. El orden correcto es 0,13 < 0,3 < 0,31.",
    explanationNo:
      "Miramos primero las décimas: 0,13 (1 décima) es el menor. Entre 0,3 y 0,31 las décimas empatan (3), así que comparamos centésimas: 0,3 tiene 0 centésimas y 0,31 tiene 1. Por eso el orden de menor a mayor es: 0,13, 0,3, 0,31.",
  },
  {
    id: "cd-04",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Cuatro estudiantes registraron sus saltos: 2,45 m, 2,54 m, 2,405 m y 2,455 m. ¿Cuál de estas listas está ordenada de MAYOR a MENOR?",
    options: ["2,54 — 2,455 — 2,45 — 2,405", "2,54 — 2,45 — 2,455 — 2,405", "2,405 — 2,45 — 2,455 — 2,54", "2,455 — 2,54 — 2,45 — 2,405"],
    correctIndex: 0,
    explanationOk:
      "¡Perfecto! El mayor es 2,54 (5 décimas). Luego empatan 2,455 y 2,45 en las centésimas, pero 2,455 tiene 5 milésimas y 2,45 solo 0, y el menor es 2,405.",
    explanationNo:
      "Comparamos décimas: 2,54 es el mayor (5 décimas). Después, 2,455 y 2,45 tienen 4 décimas; para diferenciarlas miramos las centésimas y milésimas: 2,455 > 2,45. El menor es 2,405 (0 centésimas). Orden de mayor a menor: 2,54, 2,455, 2,45, 2,405.",
  },
  {
    id: "cd-05",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Cuatro amigas registraron sus tiempos en una carrera de 50 metros: 11,8 s, 11,08 s, 11,88 s y 10,9 s. ¿Cuál fue el tiempo de la ganadora (el menor de todos)?",
    options: ["11,8 s", "11,88 s", "10,9 s", "11,08 s"],
    correctIndex: 2,
    explanationOk:
      "¡Muy bien! En las carreras gana el tiempo más chico. Comparando los enteros: 10,9 tiene 10 enteros y los demás 11, por eso 10,9 s es el menor y la ganadora.",
    explanationNo:
      "Comparamos primero los enteros: 10,9 tiene 10 enteros y los otros tres tienen 11, así que 10,9 es el menor. La ganadora hizo 10,9 segundos (ojo: en tiempos, el menor es el más rápido).",
  },
  {
    id: "cd-06",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Cuál de las siguientes opciones corresponde a un número decimal mayor que 0,5 y menor que 0,6?",
    options: ["0,4", "0,65", "0,5", "0,55"],
    correctIndex: 3,
    explanationOk:
      "¡Correcto! 0,55 está en la mitad: es mayor que 0,5 (5 décimas y 5 centésimas) y menor que 0,6.",
    explanationNo:
      "Buscamos un número con 5 décimas y algo más: 0,55 = 5 décimas y 5 centésimas, así que 0,5 < 0,55 < 0,6. En cambio 0,4 es menor que 0,5 y 0,65 es mayor que 0,6.",
  },
  {
    id: "cd-07",
    type: "mcq",
    difficulty: "hard",
    prompt: "¿Cuál de las siguientes comparaciones entre números decimales es CORRECTA?",
    options: ["0,09 > 0,1", "0,45 < 0,405", "0,3 > 0,27", "0,6 < 0,58"],
    correctIndex: 2,
    explanationOk:
      "¡Muy bien! 0,3 tiene 3 décimas y 0,27 solo 2, por eso 0,3 > 0,27 es correcto.",
    explanationNo:
      "Revisemos: 0,09 < 0,1 (0 décimas contra 1). 0,45 > 0,405 (4 centésimas contra 0). 0,6 > 0,58 (6 décimas contra 5). La única correcta es 0,3 > 0,27, porque 3 décimas es más que 2 décimas y 7 centésimas.",
  },
  {
    id: "cd-08",
    type: "numeric",
    difficulty: "hard",
    prompt:
      "Ana mide 1,45 m y su hermano mayor mide 1,54 m. ¿Cuántos metros más alto es el hermano? (escribe el decimal, en metros)",
    answer: 0.09,
    answerText: "0,09",
    unit: "m",
    tolerance: 0.001,
    explanationOk:
      "¡Increíble! 1,54 − 1,45 = 0,09. El hermano es 0,09 m (9 centímetros) más alto.",
    explanationNo:
      "Restamos las alturas alineando la coma: 1,54 − 1,45. De 4 centésimas no podemos quitar 5, así que pedimos prestado: 14 − 5 = 9 centésimas, y 4 − 1 = 1 décima... queda 0,09 m. En centímetros es más fácil: 154 cm − 145 cm = 9 cm = 0,09 m.",
  },
];
