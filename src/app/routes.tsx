import type { RouteObject } from 'react-router';
import { AppShell } from '../components/layout/AppShell';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { RouteErrorPage } from '../features/errors/RouteErrorPage';
import { KeysPage } from '../features/keys/KeysPage';
import { LessonsPage } from '../features/lessons/LessonsPage';
import { NotFoundPage } from '../features/not-found/NotFoundPage';
import { OnboardingPage } from '../features/onboarding/OnboardingPage';
import { LessonPage } from '../features/practice/LessonPage';
import { ReviewPage } from '../features/review/ReviewPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { StatisticsPage } from '../features/statistics/StatisticsPage';

/** Alle Routen der App – auch von den Tests genutzt. */
export const routes: RouteObject[] = [
  { path: '/willkommen', element: <OnboardingPage />, errorElement: <RouteErrorPage /> },
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'lernen', element: <LessonsPage /> },
      { path: 'lernen/:lessonId', element: <LessonPage /> },
      { path: 'wiederholen', element: <ReviewPage /> },
      { path: 'tasten', element: <KeysPage /> },
      { path: 'statistiken', element: <StatisticsPage /> },
      { path: 'einstellungen', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
