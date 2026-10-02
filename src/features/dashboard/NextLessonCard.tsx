import { VirtualKeyboard } from '../../components/keyboard/VirtualKeyboard';
import { ButtonLink } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { KeyCap } from '../../components/ui/KeyCap';
import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import { getIntroKeyIds, TOTAL_LESSONS } from '../../domain/lessons/catalog';
import { getModule } from '../../domain/lessons/modules';
import type { Lesson } from '../../domain/lessons/types';
import type { LessonProgress } from '../../domain/progress/types';
import { getLessonKeyBadges } from '../shared/lessonKeys';

interface NextLessonCardProps {
  lesson: Lesson | undefined;
  lessonProgress?: LessonProgress;
  layout: KeyboardLayout;
}

const MAX_KEYCAPS = 6;

export function NextLessonCard({ lesson, lessonProgress, layout }: NextLessonCardProps) {
  if (!lesson) {
    return (
      <section className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-success-soft text-success-ink">
          <Icon name="trophy" size={24} />
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
          Alle {TOTAL_LESSONS} Lektionen abgeschlossen
        </h2>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-muted">
          Stark. Bleib mit kurzen, regelmäßigen Übungen in Form – zum Beispiel mit freien Texten
          oder deinen Fehlertasten.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <ButtonLink to="/lernen/texte" iconEnd="arrow-right">
            Texte schreiben
          </ButtonLink>
          <ButtonLink to="/wiederholen" variant="secondary">
            Fehler wiederholen
          </ButtonLink>
        </div>
      </section>
    );
  }

  const module = getModule(lesson.moduleId);
  const keyIds = getIntroKeyIds(lesson, layout);
  const badges = getLessonKeyBadges(lesson, layout);
  const attempted = (lessonProgress?.attempts ?? 0) > 0;

  return (
    <section
      aria-labelledby="naechste-lektion"
      className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_minmax(0,0.9fr)] xl:items-center">
        <div className="min-w-0">
          <p className="text-sm font-medium text-accent-ink">
            {attempted ? 'Weiter mit' : 'Nächste Lektion'} · Modul {module.number} · {module.title}
          </p>
          <h2
            id="naechste-lektion"
            className="mt-2 text-2xl leading-tight font-semibold tracking-tight text-ink sm:text-[28px]"
          >
            Lektion {lesson.number} · {lesson.title}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{lesson.summary}</p>
          {badges.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Neue Tasten dieser Lektion">
              {badges.slice(0, MAX_KEYCAPS).map((badge) => (
                <li key={badge.id}>
                  <KeyCap fingerKind={badge.fingerKind} size="md">
                    {badge.label}
                  </KeyCap>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <ButtonLink to={`/lernen/${lesson.id}`} size="lg" iconEnd="arrow-right">
              Weiterlernen
            </ButtonLink>
            <ButtonLink to="/lernen" size="lg" variant="ghost">
              Alle Lektionen
            </ButtonLink>
          </div>
        </div>
        {keyIds.length > 0 && (
          <div className="hidden xl:block">
            <VirtualKeyboard
              layout={layout}
              label={`Vorschau der Tasten von Lektion ${lesson.number}`}
              introKeyIds={keyIds}
              tint={false}
            />
          </div>
        )}
      </div>
    </section>
  );
}
