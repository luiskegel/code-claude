export type ModuleId =
  | 'grundlagen'
  | 'obere-reihe'
  | 'untere-reihe'
  | 'erste-woerter'
  | 'kombinationen'
  | 'woerter'
  | 'saetze'
  | 'geschwindigkeit'
  | 'genauigkeit'
  | 'freies-schreiben';

export interface LessonModule {
  id: ModuleId;
  number: number;
  title: string;
  description: string;
}

/** Natürliche Groß-/Kleinschreibung erst, wenn die Umschalttaste gelernt ist. */
export type CaseMode = 'lower' | 'natural';

export type WordSource =
  'first' | 'common' | 'nouns-with-article' | 'eszett' | 'long' | 'confusable';
export type SentenceSource = 'short' | 'questions' | 'long' | 'precise' | 'mixed';
export type TextSource = 'paragraphs' | 'letters';
export type CombinationSource = 'bigrams' | 'syllables';

/** Beschreibt, wie der Übungstext einer Lektion erzeugt wird. */
export type ExerciseSpec =
  | { kind: 'fixed'; text: string }
  | { kind: 'keys'; targetLength: number }
  | { kind: 'phrases'; targetLength: number }
  | { kind: 'combinations'; source: CombinationSource; targetLength: number }
  | {
      kind: 'words';
      source: WordSource;
      caseMode: CaseMode;
      targetLength: number;
      minLength?: number;
      maxLength?: number;
    }
  | { kind: 'sentences'; source: SentenceSource; targetLength: number }
  | { kind: 'text'; source: TextSource; targetLength: number };

export type ExerciseKind = ExerciseSpec['kind'];

/** Theorie-Schritte, die vor der Übung erklärt werden. */
export type TheoryStep = 'posture' | 'home-position' | 'how-it-works';

export interface LessonIntro {
  /** Warum diese Lektion wichtig ist – Pädagogik statt reiner Abfrage. */
  why: string;
  tips: readonly string[];
  theory?: readonly TheoryStep[];
}

export interface Lesson {
  /** Stabile ID (auch Teil der URL), unabhängig von der Reihenfolge. */
  id: string;
  number: number;
  moduleId: ModuleId;
  title: string;
  summary: string;
  /** Zeichen, die in dieser Lektion neu eingeführt werden. */
  newChars: readonly string[];
  /** Zeichen, die in der Übung besonders oft vorkommen. */
  focusChars: readonly string[];
  /** Tasten, die in der Einführung gezeigt werden (Standard: aus newChars/focusChars abgeleitet). */
  introKeyIds?: readonly string[];
  intro: LessonIntro;
  exercise: ExerciseSpec;
  /** Zeitlimit in Sekunden für Geschwindigkeitsübungen. */
  timeLimitSec?: number;
  /** Mindestgenauigkeit in Prozent, um die Lektion abzuschließen. */
  passAccuracy: number;
}
