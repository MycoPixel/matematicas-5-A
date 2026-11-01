import type { Question } from "../types";

// Tema 5 · Problemas divertidos — problemas contextualizados con fracciones
// y decimales, al estilo de la guía del curso.
export const problemas: Question[] = [
  {
    id: "pb-01",
    type: "mcq",
    difficulty: "easy",
    prompt:
      "Una pizza se corta en 8 pedazos iguales. Martín se comió 3 pedazos. ¿Qué fracción de la pizza quedó?",
    options: ["[[3/8]]", "[[8/8]]", "[[5/8]]", "[[8/5]]"],
    correctIndex: 2,
    explanationOk:
      "¡Muy bien! Si comió [[3/8]], quedan [[8/8]] − [[3/8]] = [[5/8]] de la pizza.",
    explanationNo:
      "La pizza completa es [[8/8]]. Como Martín comió [[3/8]], restamos: [[8/8]] − [[3/8]] = [[5/8]]. Quedan 5 de los 8 pedazos.",
  },
  {
    id: "pb-02",
    type: "numeric",
    difficulty: "easy",
    prompt:
      "Para hacer pan, Amalia usa [[3/10]] kg de harina y [[2/10]] kg de avena. ¿Cuántos kilogramos de ingredientes secos usa en total? (escribe el decimal, en kg)",
    answer: 0.5,
    answerText: "0,5",
    unit: "kg",
    explanationOk:
      "¡Correcto! [[3/10]] + [[2/10]] = [[5/10]] kg, que en decimal es 0,5 kg (medio kilo).",
    explanationNo:
      "Sumamos las décimas: [[3/10]] + [[2/10]] = [[5/10]] kg. Para escribirlo en decimal, [[5/10]] es 0,5. También puedes pensarlo: 0,3 + 0,2 = 0,5.",
  },
  {
    id: "pb-03",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Joaquín pintó [[1/4]] de un mural y Emilia pintó [[2/4]]. ¿Qué parte del mural falta por pintar?",
    options: ["[[3/4]]", "[[1/4]]", "[[2/4]]", "[[4/4]]"],
    correctIndex: 1,
    explanationOk:
      "¡Excelente! Juntos pintaron [[1/4]] + [[2/4]] = [[3/4]], así que falta [[4/4]] − [[3/4]] = [[1/4]].",
    explanationNo:
      "Primero sumamos lo pintado: [[1/4]] + [[2/4]] = [[3/4]]. El mural completo es [[4/4]], así que falta [[4/4]] − [[3/4]] = [[1/4]].",
  },
  {
    id: "pb-04",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Una jarra contiene 1 litro de jugo y se sirven [[3/10]] L en un vaso. ¿Cuánto jugo queda en la jarra?",
    options: ["[[13/10]] L", "[[7/10]] L", "[[3/10]] L", "[[4/10]] L"],
    correctIndex: 1,
    explanationOk:
      "¡Muy bien! 1 L = [[10/10]] L, entonces [[10/10]] − [[3/10]] = [[7/10]] L de jugo quedan en la jarra.",
    explanationNo:
      "El litro completo se convierte en décimas: 1 L = [[10/10]] L. Restamos lo servido: [[10/10]] − [[3/10]] = [[7/10]] L. En decimal, quedan 0,7 litros.",
  },
  {
    id: "pb-05",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "En una competencia de natación, Sofía completó su heat en 15,5 s y Martín en 15,05 s. ¿Quién llegó primero y por qué?",
    options: [
      "Sofía, porque 15,5 es mayor",
      "Martín, porque 15,05 es menor que 15,5",
      "Empataron con el mismo tiempo",
      "No se puede saber",
    ],
    correctIndex: 1,
    explanationOk:
      "¡Correcto! Martín llegó primero: 15,05 s es menor que 15,5 s porque sus décimas son 0 contra 5.",
    explanationNo:
      "En las carreras gana el tiempo menor. Comparamos las décimas: 15,05 tiene 0 décimas y 15,5 tiene 5. Como 0 < 5, entonces 15,05 < 15,5. Cuidado: el 0 en medio no hace al número más grande; 15,05 es quince segundos y cinco centésimas.",
  },
  {
    id: "pb-06",
    type: "mcq",
    difficulty: "hard",
    prompt:
      "Una tabla de chocolate tiene 16 trozos iguales y entre todos se comieron 10 trozos. ¿Qué fracción de la tabla queda?",
    options: ["[[10/16]]", "[[6/10]]", "[[1/2]]", "[[3/8]]"],
    correctIndex: 3,
    explanationOk:
      "¡Genial! Quedan 6 trozos de 16: [[6/16]]. Simplificando (dividiendo por 2) es [[3/8]] de la tabla.",
    explanationNo:
      "Quedan 16 − 10 = 6 trozos, es decir [[6/16]] de la tabla. Para simplificar dividimos arriba y abajo por 2: [[6/16]] = [[3/8]]. Ojo: [[10/16]] es lo que se comieron, no lo que queda.",
  },
  {
    id: "pb-07",
    type: "numeric",
    difficulty: "hard",
    prompt:
      "Un bidón tiene 0,85 L de agua y se usan 0,25 L para regar una planta. ¿Cuánta agua queda en el bidón? (escribe el decimal, en litros)",
    answer: 0.6,
    answerText: "0,6",
    unit: "L",
    explanationOk:
      "¡Muy bien! 0,85 − 0,25 = 0,6. Quedan 0,6 litros de agua en el bidón.",
    explanationNo:
      "Restamos alineando la coma: 0,85 − 0,25. Restamos las centésimas: 5 − 5 = 0. Restamos las décimas: 8 − 2 = 6. El resultado es 0,60, que se escribe 0,6. Quedan 0,6 litros.",
  },
  {
    id: "pb-08",
    type: "mcq",
    difficulty: "hard",
    prompt:
      "Diego dice que comió [[6/12]] de un queque, lo mismo que [[1/2]]. ¿Es correcto lo que dice?",
    options: [
      "Sí, porque [[6/12]] simplificada es [[1/2]]",
      "No, porque [[6/12]] es mayor que [[1/2]]",
      "No, porque [[6/12]] es menor que [[1/2]]",
      "Solo si el queque era grande",
    ],
    correctIndex: 0,
    explanationOk:
      "¡Perfecto! Diego tiene razón: [[6/12]] dividido arriba y abajo por 6 es [[1/2]]. Son fracciones equivalentes.",
    explanationNo:
      "Para saber si son equivalentes simplificamos [[6/12]]: dividimos numerador y denominador por 6 y queda [[1/2]]. Como la mitad de 12 es 6, comieron la misma cantidad. El tamaño del queque no importa: la fracción [[6/12]] siempre es [[1/2]].",
  },
];
