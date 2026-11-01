import type { Question } from "../types";

// Tema 2 · Resta de fracciones — similares a la guía del curso.
export const restaFracciones: Question[] = [
  {
    id: "rf-01",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Cuál es el resultado de la resta [[7/9]] − [[2/9]]?",
    options: ["[[5/18]]", "[[9/18]]", "[[5/9]]", "[[2/9]]"],
    correctIndex: 2,
    explanationOk:
      "¡Muy bien! Con el mismo denominador solo restamos los numeradores: 7 − 2 = 5, entonces la resta es [[5/9]].",
    explanationNo:
      "Como las dos fracciones tienen denominador 9, restamos los numeradores: 7 − 2 = 5. El denominador queda igual: [[7/9]] − [[2/9]] = [[5/9]].",
  },
  {
    id: "rf-02",
    type: "numeric",
    difficulty: "easy",
    prompt: "¿Cuánto es [[5/8]] − [[1/8]]? (fracción o decimal)",
    answer: 0.5,
    answerText: "[[1/2]]",
    unit: "",
    explanationOk:
      "¡Correcto! 5 − 1 = 4, entonces la resta es [[4/8]], que simplificada es [[1/2]].",
    explanationNo:
      "El denominador es el mismo (8): restamos los numeradores, 5 − 1 = 4, y obtenemos [[4/8]]. Para simplificar dividimos arriba y abajo por 4: [[4/8]] = [[1/2]], es decir 0,5.",
  },
  {
    id: "rf-03",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Valentina tenía [[7/8]] de una cinta adhesiva y usó [[1/4]] para envolver un regalo. ¿Qué fracción de la cinta le quedó?",
    options: ["[[6/8]]", "[[5/8]]", "[[3/8]]", "[[1/4]]"],
    correctIndex: 1,
    explanationOk:
      "¡Excelente! [[1/4]] = [[2/8]], entonces [[7/8]] − [[2/8]] = [[5/8]]. Le quedó [[5/8]] de la cinta.",
    explanationNo:
      "Primero igualamos los denominadores: [[1/4]] = [[2/8]] (multiplicamos arriba y abajo por 2). Ahora restamos: [[7/8]] − [[2/8]] = [[5/8]].",
  },
  {
    id: "rf-04",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Una botella contiene [[9/10]] L de agua y durante el recreo se consumen [[3/10]] L. ¿Cuánta agua queda en la botella?",
    options: ["[[6/20]] L", "[[5/10]] L", "[[7/10]] L", "[[6/10]] L"],
    correctIndex: 3,
    explanationOk:
      "¡Muy bien! Con el mismo denominador restamos 9 − 3 = 6, así que quedan [[6/10]] litros de agua.",
    explanationNo:
      "Las dos fracciones están en décimas, así que restamos directo los numeradores: 9 − 3 = 6. Quedan [[6/10]] L (es decir, 0,6 litros).",
  },
  {
    id: "rf-05",
    type: "numeric",
    difficulty: "medium",
    prompt: "¿Cuánto es [[9/10]] − [[1/5]]? (fracción o decimal)",
    answer: 0.7,
    answerText: "[[7/10]]",
    unit: "",
    explanationOk:
      "¡Perfecto! Convertiste [[1/5]] = [[2/10]] y restaste: [[9/10]] − [[2/10]] = [[7/10]].",
    explanationNo:
      "Los denominadores son distintos. Convertimos [[1/5]] a décimas: multiplicamos arriba y abajo por 2 y queda [[2/10]]. Ahora restamos: [[9/10]] − [[2/10]] = [[7/10]], que en decimal es 0,7.",
  },
  {
    id: "rf-06",
    type: "mcq",
    difficulty: "hard",
    prompt: "¿Cuál es el resultado de [[5/6]] − [[1/3]]?",
    options: ["[[4/6]]", "[[1/3]]", "[[1/2]]", "[[5/3]]"],
    correctIndex: 2,
    explanationOk:
      "¡Genial! [[1/3]] = [[2/6]], entonces [[5/6]] − [[2/6]] = [[3/6]], que simplificada es [[1/2]].",
    explanationNo:
      "Igualamos denominadores: [[1/3]] = [[2/6]]. Restamos: [[5/6]] − [[2/6]] = [[3/6]]. Y simplificamos dividiendo arriba y abajo por 3: [[3/6]] = [[1/2]].",
  },
  {
    id: "rf-07",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Una tabla de chocolate se divide en 12 trozos iguales. Isidora se comió 5 trozos. ¿Qué fracción de la tabla queda?",
    options: ["[[5/12]]", "[[7/12]]", "[[8/12]]", "[[1/12]]"],
    correctIndex: 1,
    explanationOk:
      "¡Correcto! La tabla completa es [[12/12]] y comió [[5/12]], entonces quedan [[12/12]] − [[5/12]] = [[7/12]].",
    explanationNo:
      "La tabla completa es 1, que en doceavos se escribe [[12/12]]. Como Isidora comió [[5/12]], restamos: [[12/12]] − [[5/12]] = [[7/12]]. Quedan 7 de los 12 trozos.",
  },
  {
    id: "rf-08",
    type: "numeric",
    difficulty: "hard",
    prompt: "¿Cuánto es 1 − [[3/4]]? (fracción o decimal)",
    answer: 0.25,
    answerText: "[[1/4]]",
    unit: "",
    explanationOk:
      "¡Muy bien! Convertiste 1 = [[4/4]] y restaste: [[4/4]] − [[3/4]] = [[1/4]].",
    explanationNo:
      "El 1 entero se convierte en fracción con el mismo denominador: 1 = [[4/4]]. Ahora restamos: [[4/4]] − [[3/4]] = [[1/4]], que en decimal es 0,25.",
  },
];
