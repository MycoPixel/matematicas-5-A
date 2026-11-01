import type { Question } from "../types";

// Tema 3 · De fracción a decimal — similares a la guía del curso.
export const fraccionDecimal: Question[] = [
  {
    id: "fd-01",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Qué número decimal es equivalente a la fracción [[1/4]]?",
    options: ["1,4", "0,14", "0,4", "0,25"],
    correctIndex: 3,
    explanationOk:
      "¡Correcto! [[1/4]] equivale a 0,25, porque 1 dividido en 4 partes iguales da 25 centésimas (o [[25/100]]).",
    explanationNo:
      "Para convertir una fracción a decimal dividimos numerador ÷ denominador: 1 ÷ 4 = 0,25. Otro truco: multiplicamos arriba y abajo por 25 para llegar a centésimas: [[1/4]] = [[25/100]] = 0,25.",
  },
  {
    id: "fd-02",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Cuál es la expresión decimal equivalente a la fracción [[7/10]]?",
    options: ["0,7", "7,0", "0,07", "1,7"],
    correctIndex: 0,
    explanationOk:
      "¡Muy bien! [[7/10]] son 7 décimas, y eso se escribe 0,7.",
    explanationNo:
      "El denominador 10 indica décimas: [[7/10]] significa 7 décimas, que se escribe 0,7. Cuidado: 0,07 serían 7 centésimas ([[7/100]]) y 7,0 son 7 enteros.",
  },
  {
    id: "fd-03",
    type: "numeric",
    difficulty: "easy",
    prompt: "¿A qué número decimal equivale la fracción [[1/5]]? (escribe el decimal)",
    answer: 0.2,
    answerText: "0,2",
    unit: "",
    explanationOk:
      "¡Excelente! [[1/5]] = 0,2, porque 1 ÷ 5 = 0,2 (también: [[1/5]] = [[2/10]]).",
    explanationNo:
      "Dividimos: 1 ÷ 5 = 0,2. Otra forma: buscamos que el denominador sea 10 multiplicando arriba y abajo por 2: [[1/5]] = [[2/10]], y [[2/10]] es 0,2.",
  },
  {
    id: "fd-04",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "En la báscula de una feria se colocan [[3/5]] kg de manzanas. Si la pantalla muestra el peso en decimales, ¿qué número aparece?",
    options: ["3,5", "0,35", "0,6", "5,3"],
    correctIndex: 2,
    explanationOk:
      "¡Muy bien! [[3/5]] = [[6/10]] = 0,6, así que la báscula muestra 0,6 kg.",
    explanationNo:
      "Convertimos [[3/5]] a décimas multiplicando arriba y abajo por 2: [[3/5]] = [[6/10]]. Y [[6/10]] se escribe como decimal 0,6. En la pantalla aparece 0,6 kg.",
  },
  {
    id: "fd-05",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "En un contenedor hay [[1/4]] L de jugo de naranja. ¿A qué número decimal equivale esa cantidad?",
    options: ["0,4", "0,25", "0,14", "1,4"],
    correctIndex: 1,
    explanationOk:
      "¡Correcto! [[1/4]] L equivale a 0,25 L, es decir, un cuarto de litro.",
    explanationNo:
      "Dividimos 1 ÷ 4 = 0,25. También podemos pensar que [[1/4]] = [[25/100]]: veinticinco centésimas se escriben 0,25.",
  },
  {
    id: "fd-06",
    type: "numeric",
    difficulty: "medium",
    prompt: "¿Qué número decimal corresponde exactamente a la fracción [[2/4]]? (escribe el decimal)",
    answer: 0.5,
    answerText: "0,5",
    unit: "",
    explanationOk:
      "¡Perfecto! [[2/4]] simplificada es [[1/2]], y [[1/2]] es 0,5.",
    explanationNo:
      "Primero simplificamos: [[2/4]] = [[1/2]] (dividimos arriba y abajo por 2). Y sabemos que [[1/2]] = [[5/10]] = 0,5. También 2 ÷ 4 = 0,5.",
  },
  {
    id: "fd-07",
    type: "mcq",
    difficulty: "hard",
    prompt: "¿Cuál de las siguientes fracciones equivale al decimal 0,6?",
    options: ["[[1/6]]", "[[6/100]]", "[[6/10]]", "[[60/10]]"],
    correctIndex: 2,
    explanationOk:
      "¡Genial! 0,6 son 6 décimas, por eso 0,6 = [[6/10]] (que también es [[3/5]]).",
    explanationNo:
      "El 6 en 0,6 está en el lugar de las décimas, así que 0,6 = [[6/10]]. [[6/100]] sería 0,06 (seis centésimas) y [[1/6]] es un valor distinto (aprox. 0,166).",
  },
  {
    id: "fd-08",
    type: "mcq",
    difficulty: "hard",
    prompt: "¿Entre qué números naturales se ubica el número decimal 4,7?",
    options: ["Entre 3 y 4", "Entre 5 y 6", "Entre 4 y 5", "Entre 0 y 1"],
    correctIndex: 2,
    explanationOk:
      "¡Muy bien! 4,7 está entre 4 y 5, porque es mayor que 4 pero todavía no llega a 5.",
    explanationNo:
      "El número 4,7 tiene 4 enteros y 7 décimas. Es más grande que 4, pero más chico que 5. Por eso se ubica entre los naturales 4 y 5, más cerca del 5.",
  },
];
