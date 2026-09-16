import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LessonPage from './pages/Lesson'

// Seiten, die nicht beim ersten Laden gebraucht werden, kommen nachgeladen.
const Path = lazy(() => import('./pages/Path'))
const Track = lazy(() => import('./pages/Track'))
const PromptLibrary = lazy(() => import('./pages/PromptLibrary'))
const PromptImproverPage = lazy(() => import('./pages/PromptImprover'))
const Exercises = lazy(() => import('./pages/Exercises'))
const Glossary = lazy(() => import('./pages/Glossary'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Progress = lazy(() => import('./pages/Progress'))
const Quickstart = lazy(() => import('./pages/Quickstart'))
const Plan30 = lazy(() => import('./pages/Plan30'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Loading() {
  return (
    <div style={{ padding: 'var(--sp-8) var(--sp-5)', textAlign: 'center', color: 'var(--text-muted)' }}>
      Lädt …
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lernpfad" element={<Path />} />
        <Route path="/thema/:id" element={<Track />} />
        <Route path="/lektion/:slug" element={<LessonPage />} />
        <Route path="/prompts" element={<PromptLibrary />} />
        <Route path="/prompt-verbessern" element={<PromptImproverPage />} />
        <Route path="/uebungen" element={<Exercises />} />
        <Route path="/glossar" element={<Glossary />} />
        <Route path="/favoriten" element={<Favorites />} />
        <Route path="/fortschritt" element={<Progress />} />
        <Route path="/schnellstart" element={<Quickstart />} />
        <Route path="/30-tage" element={<Plan30 />} />
        {/* Ältere/abgekürzte Adressen freundlich umleiten. */}
        <Route path="/lektionen" element={<Navigate to="/lernpfad" replace />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
