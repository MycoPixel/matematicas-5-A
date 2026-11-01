/**
 * Verifica la corrección matemática del banco de preguntas de Numerón.
 * Ejecutar: bun scripts/verify-questions.ts
 */
import {
  questionBanks,
  topics,
  getQuestions,
} from "../src/lib/numeron/questions/index";
import { checkAnswer, parseResponse } from "../src/lib/numeron/engine";

interface Issue {
  id: string;
  problem: string;
}

const issues: Issue[] = [];

// ---- valor esperado de cada respuesta numérica, calculado aquí de forma independiente
const expectedNumeric: Record<string, number> = {
  "sf-02": 1 / 5 + 2 / 5, // 0.6
  "sf-07": 2 / 6 + 1 / 6, // 0.5
  "rf-02": 5 / 8 - 1 / 8, // 0.5
  "rf-05": 9 / 10 - 1 / 5, // 0.7
  "rf-08": 1 - 3 / 4, // 0.25
  "fd-03": 1 / 5, // 0.2
  "fd-06": 2 / 4, // 0.5
  "cd-08": 1.54 - 1.45, // 0.09
  "pb-02": 3 / 10 + 2 / 10, // 0.5
  "pb-07": 0.85 - 0.25, // 0.6
};

// ---- respuesta correcta (texto) de cada mcq, para revisión visual
const expectedMcq: Record<string, string> = {
  "sf-01": "6/9",
  "sf-03": "1 entero",
  "sf-04": "6/8 kg",
  "sf-05": "1/2",
  "sf-06": "8/10",
  "sf-08": "4",
  "rf-01": "5/9",
  "rf-03": "5/8",
  "rf-04": "6/10 L",
  "rf-06": "1/2",
  "rf-07": "7/12",
  "fd-01": "0,25",
  "fd-02": "0,7",
  "fd-04": "0,6",
  "fd-05": "0,25",
  "fd-07": "6/10",
  "fd-08": "Entre 4 y 5",
  "cd-01": "0,5",
  "cd-02": "0,02",
  "cd-03": "0,13 — 0,3 — 0,31",
  "cd-04": "2,54 — 2,455 — 2,45 — 2,405",
  "cd-05": "10,9 s",
  "cd-06": "0,55",
  "cd-07": "0,3 > 0,27",
  "pb-01": "5/8",
  "pb-03": "1/4",
  "pb-04": "7/10 L",
  "pb-05": "Martín (15,05)",
  "pb-06": "3/8",
  "pb-08": "Sí (equivalentes)",
};

const fracRe = /\[\[([?\d]+)\/(\d+)\]\]/g;

function checkTextFields(id: string, text: string, field: string) {
  const cleaned = text.replace(fracRe, "");
  if (cleaned.includes("[[") || cleaned.includes("]]")) {
    issues.push({ id, problem: `Marcado de fracción malformado en ${field}: "${text}"` });
  }
}

let totalQuestions = 0;
const seenIds = new Set<string>();

for (const topic of topics) {
  const bank = getQuestions(topic.questionsFile);
  if (bank.length === 0) {
    issues.push({ id: topic.id, problem: "El tema no tiene preguntas" });
    continue;
  }
  for (const q of bank) {
    totalQuestions += 1;
    if (seenIds.has(q.id)) issues.push({ id: q.id, problem: "id duplicado" });
    seenIds.add(q.id);

    if (!q.prompt || q.prompt.length < 10) issues.push({ id: q.id, problem: "prompt vacío o muy corto" });
    if (!q.explanationOk || q.explanationOk.length < 20)
      issues.push({ id: q.id, problem: "explanationOk vacía o muy corta" });
    if (!q.explanationNo || q.explanationNo.length < 20)
      issues.push({ id: q.id, problem: "explanationNo vacía o muy corta" });

    checkTextFields(q.id, q.prompt, "prompt");
    checkTextFields(q.id, q.explanationOk, "explanationOk");
    checkTextFields(q.id, q.explanationNo, "explanationNo");

    if (q.type === "mcq") {
      if (!q.options || q.options.length < 3) {
        issues.push({ id: q.id, problem: "mcq con menos de 3 alternativas" });
      } else {
        const unique = new Set(q.options);
        if (unique.size !== q.options.length)
          issues.push({ id: q.id, problem: "alternativas repetidas" });
        if (q.correctIndex === undefined || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
          issues.push({ id: q.id, problem: "correctIndex fuera de rango" });
        }
        for (const opt of q.options) checkTextFields(q.id, opt, "options");
      }
    } else if (q.type === "numeric") {
      if (typeof q.answer !== "number" || Number.isNaN(q.answer)) {
        issues.push({ id: q.id, problem: "respuesta numérica inválida" });
      }
      if (!q.answerText) issues.push({ id: q.id, problem: "falta answerText" });
      else checkTextFields(q.id, q.answerText, "answerText");
    }
  }
}

// ---- comparar respuestas numéricas declaradas vs cálculo independiente
const allQuestions = Object.values(questionBanks).flat();
for (const [id, expected] of Object.entries(expectedNumeric)) {
  const q = allQuestions.find((x) => x.id === id);
  if (!q) {
    issues.push({ id, problem: "no existe pero está en expectedNumeric" });
    continue;
  }
  if (q.type !== "numeric" || q.answer === undefined) {
    issues.push({ id, problem: "marcado como numeric en expected pero no lo es" });
    continue;
  }
  if (Math.abs(q.answer - expected) > 1e-9) {
    issues.push({
      id,
      problem: `respuesta declarada ${q.answer} ≠ cálculo ${expected}`,
    });
  }
}

// ---- probar el motor de respuestas con entradas típicas de niños
const engineTests: Array<[string, string, number, boolean]> = [
  ["decimal con coma", "0,5", 0.5, true],
  ["decimal con punto", "0.5", 0.5, true],
  ["fracción", "3/4", 0.75, true],
  ["fracción equivalente", "6/8", 0.75, true],
  ["con espacios", " 3 / 4 ", 0.75, true],
  ["con igual", "=0,6", 0.6, true],
  ["texto no numérico", "hola", 0.5, false],
  ["valor incorrecto", "0,3", 0.5, false],
  ["división por cero", "5/0", 0.5, false],
  ["entero", "1", 1, true],
];
for (const [name, input, expected, shouldPass] of engineTests) {
  const parsed = parseResponse(input);
  const result = parsed === null ? false : Math.abs(parsed - expected) < 1e-9;
  if (result !== shouldPass) {
    issues.push({
      id: "engine",
      problem: `parseResponse("${input}") = ${parsed}, esperado ${expected} (${name})`,
    });
  }
}

// checkAnswer con tolerancia
const numericQ = questionBanks.sumaFracciones.find((q) => q.id === "sf-02")!;
if (!checkAnswer(numericQ, "0,6") || !checkAnswer(numericQ, "3/5") || checkAnswer(numericQ, "0,9")) {
  issues.push({ id: "engine", problem: "checkAnswer falla en sf-02" });
}

// ---- informe
console.log(`Preguntas revisadas: ${totalQuestions}`);
console.log(`Temas: ${topics.length}`);
console.log("");
for (const [id, answer] of Object.entries(expectedMcq)) {
  const q = allQuestions.find((x) => x.id === id);
  if (!q || q.type !== "mcq" || q.options === undefined || q.correctIndex === undefined) {
    issues.push({ id, problem: "mcq esperado no encontrado" });
    continue;
  }
  console.log(`  ${id}: correcta="${q.options[q.correctIndex]}" | esperado="${answer}"`);
}

console.log("");
if (issues.length === 0) {
  console.log("TODO CORRECTO: estructura, respuestas y motor verificados");
} else {
  console.log(`${issues.length} PROBLEMAS:`);
  for (const i of issues) console.log(`  - [${i.id}] ${i.problem}`);
  process.exit(1);
}
