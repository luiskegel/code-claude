import type { LessonModule, ModuleId } from './types';

export const MODULES: readonly LessonModule[] = [
  {
    id: 'grundlagen',
    number: 1,
    title: 'Grundlagen',
    description: 'Haltung, Grundstellung und die mittlere Tastenreihe.',
  },
  {
    id: 'obere-reihe',
    number: 2,
    title: 'Obere Reihe',
    description: 'Die Buchstaben oberhalb der Grundreihe.',
  },
  {
    id: 'untere-reihe',
    number: 3,
    title: 'Untere Reihe',
    description: 'Die Buchstaben unterhalb der Grundreihe und erste Satzzeichen.',
  },
  {
    id: 'erste-woerter',
    number: 4,
    title: 'Erste Wörter',
    description: 'Einfache, echte Wörter aus allen Buchstaben.',
  },
  {
    id: 'kombinationen',
    number: 5,
    title: 'Buchstaben kombinieren',
    description: 'Typische Buchstabenpaare und Silben der deutschen Sprache.',
  },
  {
    id: 'woerter',
    number: 6,
    title: 'Wörter',
    description: 'Großschreibung, ß und längere Wörter.',
  },
  {
    id: 'saetze',
    number: 7,
    title: 'Sätze',
    description: 'Vollständige Sätze mit Satzzeichen.',
  },
  {
    id: 'geschwindigkeit',
    number: 8,
    title: 'Geschwindigkeit',
    description: 'Zeitlich begrenzte Übungen für mehr Tempo.',
  },
  {
    id: 'genauigkeit',
    number: 9,
    title: 'Genauigkeit',
    description: 'Möglichst fehlerfrei schreiben.',
  },
  {
    id: 'freies-schreiben',
    number: 10,
    title: 'Freies Schreiben',
    description: 'Längere Texte und Briefe am Stück.',
  },
];

const moduleById = new Map(MODULES.map((module) => [module.id, module]));

export function getModule(id: ModuleId): LessonModule {
  const module = moduleById.get(id);
  if (!module) throw new Error(`Unbekanntes Modul: ${id}`);
  return module;
}
