import type { GlossaryCategory, GlossaryEntry } from '@/types';
import { GLOSSARY_1 } from './glossary1';
import { GLOSSARY_2 } from './glossary2';

export const GLOSSARY: GlossaryEntry[] = [...GLOSSARY_1, ...GLOSSARY_2].sort((a, b) => a.term.localeCompare(b.term, 'de'));

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  'Börse & Handel',
  'Aktienarten',
  'Kennzahlen',
  'Unternehmensanalyse',
  'Technische Analyse',
  'Dividenden',
  'ETFs & Fonds',
  'Risiko',
  'Psychologie',
  'Wirtschaft',
  'Derivate & Fortgeschrittenes',
  'Steuern & Recht',
];
