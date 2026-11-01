import type { AccentClasses, Question, Topic } from "../types";
import { sumaFracciones } from "./suma";
import { restaFracciones } from "./resta";
import { fraccionDecimal } from "./fraccionDecimal";
import { compararDecimales } from "./comparar";
import { problemas } from "./problemas";

export const topics: Topic[] = [
  {
    id: "suma-fracciones",
    index: 1,
    symbol: "+",
    name: "Suma de fracciones",
    tagline: "Suma con igual y distinto denominador",
    accent: "turquesa",
    questionsFile: "sumaFracciones",
  },
  {
    id: "resta-fracciones",
    index: 2,
    symbol: "−",
    name: "Resta de fracciones",
    tagline: "Restar, simplificar y fracciones de un entero",
    accent: "frambuesa",
    questionsFile: "restaFracciones",
  },
  {
    id: "fraccion-decimal",
    index: 3,
    symbol: "½",
    name: "De fracción a decimal",
    tagline: "Convertir fracciones en números decimales",
    accent: "uva",
    questionsFile: "fraccionDecimal",
  },
  {
    id: "comparar-decimales",
    index: 4,
    symbol: "≪",
    name: "Comparar y ordenar",
    tagline: "Cuál es mayor, menor y ordenar decimales",
    accent: "girasol",
    questionsFile: "compararDecimales",
  },
  {
    id: "problemas",
    index: 5,
    symbol: "¿?",
    name: "Problemas divertidos",
    tagline: "Fracciones y decimales en la vida real",
    accent: "mandarina",
    questionsFile: "problemas",
  },
];

export const questionBanks: Record<string, Question[]> = {
  sumaFracciones,
  restaFracciones,
  fraccionDecimal,
  compararDecimales,
  problemas,
};

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export function getQuestions(questionsFile: string): Question[] {
  return questionBanks[questionsFile] ?? [];
}

export const accentClasses: AccentClasses = {
  turquesa: {
    bg: "bg-turquesa",
    bgSoft: "bg-turquesa/10",
    text: "text-turquesa",
    border: "border-turquesa/30",
    ring: "ring-turquesa",
  },
  frambuesa: {
    bg: "bg-frambuesa",
    bgSoft: "bg-frambuesa/10",
    text: "text-frambuesa",
    border: "border-frambuesa/30",
    ring: "ring-frambuesa",
  },
  uva: {
    bg: "bg-uva",
    bgSoft: "bg-uva/10",
    text: "text-uva",
    border: "border-uva/30",
    ring: "ring-uva",
  },
  girasol: {
    bg: "bg-girasol",
    bgSoft: "bg-girasol/10",
    text: "text-girasol",
    border: "border-girasol/30",
    ring: "ring-girasol",
  },
  mandarina: {
    bg: "bg-mandarina",
    bgSoft: "bg-mandarina/10",
    text: "text-mandarina",
    border: "border-mandarina/30",
    ring: "ring-mandarina",
  },
};
