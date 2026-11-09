import { lazy, Suspense, type ReactNode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Dashboard } from '@/pages/Dashboard';

// Seiten werden bei Bedarf geladen (schnellere Startzeit)
const CoursePage = lazy(() => import('@/pages/CoursePages').then((m) => ({ default: m.CoursePage })));
const CategoryPage = lazy(() => import('@/pages/CoursePages').then((m) => ({ default: m.CategoryPage })));
const ModulePage = lazy(() => import('@/pages/CoursePages').then((m) => ({ default: m.ModulePage })));
const LessonPage = lazy(() => import('@/pages/LessonPage').then((m) => ({ default: m.LessonPage })));
const DepotPage = lazy(() => import('@/pages/DepotPage').then((m) => ({ default: m.DepotPage })));
const LexiconPage = lazy(() => import('@/pages/LexiconPage').then((m) => ({ default: m.LexiconPage })));
const QuizOverview = lazy(() => import('@/pages/QuizPages').then((m) => ({ default: m.QuizOverview })));
const QuizPage = lazy(() => import('@/pages/QuizPages').then((m) => ({ default: m.QuizPage })));
const ProgressPage = lazy(() => import('@/pages/ProgressPage').then((m) => ({ default: m.ProgressPage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const CalculatorsPage = lazy(() => import('@/pages/ToolPages').then((m) => ({ default: m.CalculatorsPage })));
const TaxPage = lazy(() => import('@/pages/ToolPages').then((m) => ({ default: m.TaxPage })));
const WatchlistPage = lazy(() => import('@/pages/WatchlistPage').then((m) => ({ default: m.WatchlistPage })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

function Loading() {
  return (
    <div className="flex items-center gap-3 py-20 text-sm text-slate-400" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" /> Lade Inhalte …
    </div>
  );
}

const page = (el: ReactNode) => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>{el}</Suspense>
  </ErrorBoundary>
);

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={page(<Dashboard />)} />
          <Route path="/kurs" element={page(<CoursePage />)} />
          <Route path="/kurs/:moduleId" element={page(<ModulePage />)} />
          <Route path="/kurs/:moduleId/:lessonId" element={page(<LessonPage />)} />
          <Route path="/grundlagen" element={page(<CategoryPage category="grundlagen" />)} />
          <Route path="/aktien-verstehen" element={page(<CategoryPage category="aktien-verstehen" />)} />
          <Route path="/aktien-analysieren" element={page(<CategoryPage category="aktien-analysieren" />)} />
          <Route path="/boersenwissen" element={page(<CategoryPage category="boersenwissen" />)} />
          <Route path="/strategien" element={page(<CategoryPage category="strategien" />)} />
          <Route path="/risiko" element={page(<CategoryPage category="risiko" />)} />
          <Route path="/depot" element={page(<DepotPage />)} />
          <Route path="/lexikon" element={page(<LexiconPage />)} />
          <Route path="/tests" element={page(<QuizOverview />)} />
          <Route path="/tests/:moduleId" element={page(<QuizPage />)} />
          <Route path="/fortschritt" element={page(<ProgressPage />)} />
          <Route path="/einstellungen" element={page(<SettingsPage />)} />
          <Route path="/rechner" element={page(<CalculatorsPage />)} />
          <Route path="/watchlist" element={page(<WatchlistPage />)} />
          <Route path="/steuern" element={page(<TaxPage />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
