// Zentrale Typdefinitionen für MY STOCK ACADEMY

export type CategoryId =
  | 'grundlagen'
  | 'aktien-verstehen'
  | 'aktien-analysieren'
  | 'boersenwissen'
  | 'strategien'
  | 'risiko';

/** Interaktive Elemente, die in eine Lektion eingebettet werden können. */
export type LessonWidget =
  | 'supply-demand'
  | 'index-weights'
  | 'order-types'
  | 'spread'
  | 'profit-loss'
  | 'balance-sheet'
  | 'kpi-calculator'
  | 'candlestick'
  | 'indicators'
  | 'dividend-calculator'
  | 'compound-interest'
  | 'savings-plan'
  | 'etf-comparison'
  | 'risk-calculator'
  | 'drawdown'
  | 'diversification'
  | 'psychology-scenarios'
  | 'inflation'
  | 'analysis-checklist'
  | 'leverage'
  | 'investment-plan';

export interface LessonSection {
  heading: string;
  /** Absätze. Einfache Hervorhebung mit **fett** wird unterstützt. */
  paragraphs: string[];
  /** Optionale Aufzählung unter den Absätzen. */
  bullets?: string[];
  /** Optionale Formel (z. B. bei Kennzahlen). */
  formula?: string;
}

export interface Term {
  term: string;
  definition: string;
}

export interface Exercise {
  title: string;
  task: string;
  steps?: string[];
  solution: string;
}

export type QuestionType = 'mc' | 'tf' | 'calc' | 'case';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  /** Index der Lektion im Modul (0-basiert), zu der die Frage gehört. */
  lesson: number;
  question: string;
  /** Bei 'tf' automatisch ["Richtig", "Falsch"]. */
  options?: string[];
  /** Index der richtigen Antwort in options. Bei 'tf': 0 = Richtig, 1 = Falsch. */
  answer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  intro: string;
  sections: LessonSection[];
  examples: { title: string; text: string }[];
  practice: string[];
  terms: Term[];
  mistakes: string[];
  summary: string[];
  exercise: Exercise;
  widget?: LessonWidget;
  /** Hinweis auf besonders riskante Inhalte. */
  riskNote?: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: CategoryId;
  icon: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  sources: Source[];
}

export interface GlossaryEntry {
  term: string;
  short: string;
  long: string;
  example: string;
  category: GlossaryCategory;
}

export type GlossaryCategory =
  | 'Börse & Handel'
  | 'Aktienarten'
  | 'Kennzahlen'
  | 'Unternehmensanalyse'
  | 'Technische Analyse'
  | 'Dividenden'
  | 'ETFs & Fonds'
  | 'Risiko'
  | 'Psychologie'
  | 'Wirtschaft'
  | 'Derivate & Fortgeschrittenes'
  | 'Steuern & Recht';

// ---------- Lernfortschritt ----------

export interface QuizResult {
  bestScore: number; // Anteil 0..1
  lastScore: number;
  attempts: number;
  passed: boolean;
  wrongIds: string[];
  lastAttemptAt: string;
}

export interface ActivityEntry {
  id: string;
  at: string;
  type: 'lesson' | 'quiz' | 'lesson-quiz' | 'trade' | 'exercise' | 'calculator';
  text: string;
  points: number;
}

export interface ProgressState {
  completedLessons: Record<string, string>; // lessonId -> ISO-Datum
  lessonQuiz: Record<string, number>; // lessonId -> bester Anteil 0..1
  exercisesDone: Record<string, string>;
  quizResults: Record<string, QuizResult>; // moduleId -> Ergebnis
  points: number;
  activity: ActivityEntry[];
  studyDays: string[]; // YYYY-MM-DD
  studySeconds: number;
  lastLessonId?: string;
  checklist: Record<string, boolean>;
  investmentPlan: Record<string, string>;
}

// ---------- Depot (Simulation) ----------

export interface Position {
  symbol: string;
  shares: number;
  avgPrice: number; // durchschnittlicher Kaufpreis je Aktie inkl. Gebühren
}

export type TransactionType = 'BUY' | 'SELL' | 'DIVIDEND' | 'FEE' | 'RESET';

export interface Transaction {
  id: string;
  day: number;
  at: string;
  type: TransactionType;
  symbol?: string;
  shares?: number;
  price?: number;
  fee?: number;
  amount: number; // Cash-Veränderung (+/-)
  realizedPnL?: number;
  note?: string;
}

export interface PortfolioState {
  cash: number;
  startCapital: number;
  day: number; // simulierter Handelstag
  positions: Position[];
  transactions: Transaction[];
  history: { day: number; value: number; cash: number }[];
  feePerTrade: number;
}

// ---------- Watchlist ----------

export type DataQuality = 'realtime' | 'delayed' | 'historical' | 'simulated' | 'manual';

export interface WatchlistItem {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  exchange: string;
  /** Kurs nur bei manueller Eingabe (eigene Recherche) – sonst über Datenanbieter. */
  manualPrice?: number;
  manualPriceDate?: string;
  simulatedSymbol?: string;
  notes: string;
  thesis: string;
  lastAnalysis?: string;
  addedAt: string;
}

export interface Settings {
  name: string;
  dailyGoalMinutes: number;
  reduceMotion: boolean;
  dataProvider: 'simulated' | 'proxy';
  proxyBaseUrl: string;
  showDisclaimers: boolean;
}

export interface AppState {
  version: number;
  settings: Settings;
  progress: ProgressState;
  portfolio: PortfolioState;
  watchlist: WatchlistItem[];
}
