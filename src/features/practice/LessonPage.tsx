import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ADAPTIVE_HIGHLIGHT_WEIGHT,
  generateLessonExercise,
  type Exercise,
} from '../../domain/exercise/generator';
import { randomSeed } from '../../domain/exercise/random';
import {
  getAllowedChars,
  getLessonById,
  getLessonIndex,
  getNextLesson,
} from '../../domain/lessons/catalog';
import { getModule } from '../../domain/lessons/modules';
import type { Lesson } from '../../domain/lessons/types';
import { getBlockingLesson, isLessonUnlocked } from '../../domain/lessons/unlock';
import type { ResultOutcome } from '../../domain/progress/progress';
import type { SessionSummary } from '../../domain/typing/engine';
import { usePageTitle, useScrollToTop } from '../../lib/hooks';
import { playSound } from '../../lib/sound';
import { useActions } from '../../state/hooks';
import { NotFoundContent } from '../not-found/NotFoundPage';
import { LessonIntro } from './LessonIntro';
import { LockedLesson } from './LockedLesson';
import { ResultsScreen } from './ResultsScreen';
import { TypingSession } from './TypingSession';
import { keyIdsForChars, usePracticeEnvironment } from './usePracticeEnvironment';

type Phase =
  | { name: 'intro' }
  | { name: 'practice'; exercise: Exercise; attempt: number }
  | { name: 'results'; outcome: ResultOutcome };

export function LessonPage() {
  const { lessonId = '' } = useParams();
  const lesson = getLessonById(lessonId);
  usePageTitle(lesson ? `Lektion ${lesson.number}: ${lesson.title}` : 'Lektion nicht gefunden');

  if (!lesson) {
    return (
      <NotFoundContent
        title="Lektion nicht gefunden"
        description="Diese Lektion gibt es nicht. Vielleicht hat sich die Adresse geändert."
        primary={{ to: '/lernen', label: 'Alle Lektionen' }}
      />
    );
  }
  // Neuer Schlüssel je Lektion: Beim Wechsel zur nächsten Lektion startet alles frisch.
  return <LessonFlow key={lesson.id} lesson={lesson} />;
}

const MAX_ADAPTIVE_CHARS = 4;

/** Eindeutiger Schlüssel je Ansicht – ein Wechsel scrollt nach oben. */
function phaseKey(phase: Phase): string {
  return phase.name === 'practice' ? `practice-${phase.exercise.id}-${phase.attempt}` : phase.name;
}

function LessonFlow({ lesson }: { lesson: Lesson }) {
  const navigate = useNavigate();
  const { recordExercise } = useActions();
  const { settings, progress, layout, reducedMotion, charWeights } = usePracticeEnvironment();
  const [phase, setPhase] = useState<Phase>({ name: 'intro' });
  useScrollToTop(phaseKey(phase));

  const module = getModule(lesson.moduleId);
  const allowedChars = getAllowedChars(getLessonIndex(lesson.id));
  const activeKeyIds = useMemo(() => keyIdsForChars(layout, allowedChars), [layout, allowedChars]);
  const adaptiveChars = useMemo(
    () =>
      lesson.exercise.kind === 'fixed'
        ? []
        : [...charWeights]
            .filter(
              ([char, weight]) => weight >= ADAPTIVE_HIGHLIGHT_WEIGHT && allowedChars.has(char),
            )
            .sort((a, b) => b[1] - a[1])
            .slice(0, MAX_ADAPTIVE_CHARS)
            .map(([char]) => char),
    [charWeights, allowedChars, lesson.exercise.kind],
  );

  const unlocked = isLessonUnlocked(lesson.id, progress.lessons, settings.freeLessonChoice);
  const nextLesson = getNextLesson(lesson.id);
  const nextUnlocked = nextLesson
    ? isLessonUnlocked(nextLesson.id, progress.lessons, settings.freeLessonChoice)
    : false;

  const startPractice = () => {
    setPhase({
      name: 'practice',
      exercise: generateLessonExercise({ lesson, seed: randomSeed(), charWeights }),
      attempt: 0,
    });
  };

  const handleFinish = (exercise: Exercise, summary: SessionSummary) => {
    const outcome = recordExercise({ exercise, summary, completedAt: new Date() });
    if (settings.soundEnabled) playSound('complete');
    setPhase({ name: 'results', outcome });
  };

  if (!unlocked && phase.name === 'intro') {
    return (
      <LockedLesson
        lesson={lesson}
        blocking={getBlockingLesson(lesson.id, progress.lessons, settings.freeLessonChoice)}
      />
    );
  }

  if (phase.name === 'practice') {
    const { exercise, attempt } = phase;
    return (
      <TypingSession
        key={`${exercise.id}-${attempt}`}
        exercise={exercise}
        layout={layout}
        eyebrow={`Modul ${module.number} · ${module.title}`}
        heading={`Lektion ${lesson.number} · ${lesson.title}`}
        errorMode={settings.errorMode}
        showErrorHints={settings.showErrorHints}
        showLiveWpm={settings.showLiveWpm}
        showHands={settings.showHands}
        soundEnabled={settings.soundEnabled}
        reducedMotion={reducedMotion}
        activeChars={allowedChars}
        onFinish={(summary) => handleFinish(exercise, summary)}
        onRestart={() => setPhase({ name: 'practice', exercise, attempt: attempt + 1 })}
        onExit={() => setPhase({ name: 'intro' })}
      />
    );
  }

  if (phase.name === 'results') {
    return (
      <ResultsScreen
        outcome={phase.outcome}
        lesson={lesson}
        nextLesson={nextLesson}
        nextUnlocked={nextUnlocked}
        onRetry={startPractice}
        onNext={nextLesson ? () => navigate(`/lernen/${nextLesson.id}`) : undefined}
      />
    );
  }

  return (
    <LessonIntro
      lesson={lesson}
      module={module}
      layout={layout}
      lessonProgress={progress.lessons[lesson.id]}
      adaptiveChars={adaptiveChars}
      activeKeyIds={activeKeyIds}
      onStart={startPractice}
    />
  );
}
