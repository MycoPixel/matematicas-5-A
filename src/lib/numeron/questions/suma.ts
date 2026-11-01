import type { Question } from "../types";

// Tema 1 · Suma de fracciones — preguntas similares a la guía del curso,
// con números y contextos nuevos.
export const sumaFracciones: Question[] = [
  {
    id: "sf-01",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Cuál es el resultado de la suma [[4/9]] + [[2/9]]?",
    options: ["[[6/18]]", "[[6/9]]", "[[8/9]]", "[[2/9]]"],
    correctIndex: 1,
    explanationOk:
      "¡Bien! Cuando los denominadores son iguales, se suman solo los numeradores y el denominador se mantiene: 4 + 2 = 6, así que la suma es [[6/9]].",
    explanationNo:
      "Como las dos fracciones tienen el mismo denominador (9), solo sumamos los numeradores: 4 + 2 = 6. El denominador sigue siendo 9, por lo tanto [[4/9]] + [[2/9]] = [[6/9]]. Ojo: nunca sumamos los denominadores, por eso [[6/18]] no es correcto.",
  },
  {
    id: "sf-02",
    type: "numeric",
    difficulty: "easy",
    prompt: "¿Cuánto es [[1/5]] + [[2/5]]? Escribe el resultado como fracción (ej: 3/5) o como decimal.",
    answer: 0.6,
    answerText: "[[3/5]]",
    unit: "",
    explanationOk:
      "¡Correcto! [[1/5]] + [[2/5]] = [[3/5]], porque 1 + 2 = 3 y el denominador 5 no cambia.",
    explanationNo:
      "Las dos fracciones tienen denominador 5, así que sumamos los numeradores: 1 + 2 = 3. El resultado es [[3/5]] (que también puedes escribir como 0,6). El denominador se mantiene igual: no se suma.",
  },
  {
    id: "sf-03",
    type: "mcq",
    difficulty: "easy",
    prompt: "¿Cuál es la suma de [[1/4]] + [[2/4]] + [[1/4]]?",
    options: ["[[4/12]]", "[[3/4]]", "1 entero", "[[2/4]]"],
    correctIndex: 2,
    explanationOk:
      "¡Exacto! 1 + 2 + 1 = 4, entonces la suma es [[4/4]], y [[4/4]] es exactamente 1 entero.",
    explanationNo:
      "Sumamos los numeradores porque el denominador es el mismo: 1 + 2 + 1 = 4. El resultado es [[4/4]]. Como el numerador es igual al denominador, [[4/4]] equivale a 1 entero.",
  },
  {
    id: "sf-04",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "En una receta de queque se usan [[3/8]] kg de harina, [[2/8]] kg de azúcar y [[1/8]] kg de cacao. ¿Cuál es la cantidad total de ingredientes?",
    options: ["[[6/24]] kg", "[[7/8]] kg", "[[5/8]] kg", "[[6/8]] kg"],
    correctIndex: 3,
    explanationOk:
      "¡Muy bien! 3 + 2 + 1 = 6, así que en total se usan [[6/8]] kg de ingredientes (que también se puede escribir como [[3/4]] kg).",
    explanationNo:
      "Las tres fracciones tienen el mismo denominador (8), así que sumamos los numeradores: 3 + 2 + 1 = 6. El total es [[6/8]] kg. El denominador no cambia, por eso [[6/24]] kg es incorrecto.",
  },
  {
    id: "sf-05",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "De una pizza, Sofía se comió [[1/3]] y Tomás se comió [[1/6]]. ¿Qué parte de la pizza comieron entre los dos?",
    options: ["[[2/9]]", "[[1/2]]", "[[2/6]]", "[[1/4]]"],
    correctIndex: 1,
    explanationOk:
      "¡Excelente! Convertiste [[1/3]] = [[2/6]], y luego [[2/6]] + [[1/6]] = [[3/6]], que es lo mismo que [[1/2]]. Comieron media pizza.",
    explanationNo:
      "Como los denominadores son distintos, primero igualamos: [[1/3]] = [[2/6]] (multiplicamos arriba y abajo por 2). Ahora sumamos: [[2/6]] + [[1/6]] = [[3/6]]. Y [[3/6]] simplificada es [[1/2]].",
  },
  {
    id: "sf-06",
    type: "mcq",
    difficulty: "hard",
    prompt:
      "Un parque destinó [[2/10]] de su superficie para juegos infantiles y [[3/5]] para áreas verdes. ¿Qué parte del parque ocupan las dos zonas juntas?",
    options: ["[[5/15]]", "[[6/10]]", "[[8/10]]", "[[5/10]]"],
    correctIndex: 2,
    explanationOk:
      "¡Genial! [[3/5]] = [[6/10]], entonces [[2/10]] + [[6/10]] = [[8/10]]. Las dos zonas ocupan [[8/10]] del parque.",
    explanationNo:
      "Primero convertimos [[3/5]] a décimas: multiplicamos arriba y abajo por 2, y queda [[6/10]]. Después sumamos: [[2/10]] + [[6/10]] = [[8/10]]. No se suman los denominadores (2 + 5 no es 15).",
  },
  {
    id: "sf-07",
    type: "numeric",
    difficulty: "medium",
    prompt:
      "Camila mezcló [[2/6]] L de jugo de naranja con [[1/6]] L de jugo de manzana. ¿Cuántos litros de jugo obtuvo? (fracción o decimal)",
    answer: 0.5,
    answerText: "[[1/2]] L",
    unit: "L",
    explanationOk:
      "¡Perfecto! [[2/6]] + [[1/6]] = [[3/6]], y [[3/6]] simplificada es [[1/2]] L, es decir 0,5 litros.",
    explanationNo:
      "El denominador es el mismo (6): sumamos 2 + 1 = 3 y obtenemos [[3/6]] L. Para simplificar, dividimos arriba y abajo por 3: [[3/6]] = [[1/2]]. En decimal, [[1/2]] es 0,5.",
  },
  {
    id: "sf-08",
    type: "mcq",
    difficulty: "hard",
    prompt: "¿Cuál es el número que falta en la igualdad [[2/5]] = [[?/10]]?",
    options: ["4", "2", "5", "8"],
    correctIndex: 0,
    explanationOk:
      "¡Eso es! Para ir de 5 a 10 se multiplica por 2, así que también multiplicamos el numerador: 2 × 2 = 4. Por lo tanto [[2/5]] = [[4/10]].",
    explanationNo:
      "Buscamos fracciones equivalentes: el denominador pasó de 5 a 10, es decir, se multiplicó por 2. Para que la fracción no cambie, el numerador también se multiplica por 2: 2 × 2 = 4. Entonces [[2/5]] = [[4/10]].",
  },
];
