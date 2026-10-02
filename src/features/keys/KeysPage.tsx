import { useMemo, useState } from 'react';
import { VirtualKeyboard } from '../../components/keyboard/VirtualKeyboard';
import { Badge, type BadgeTone } from '../../components/ui/Badge';
import { ButtonLink } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { Icon, type IconName } from '../../components/ui/Icon';
import { KeyCap } from '../../components/ui/KeyCap';
import { PageHeader } from '../../components/ui/PageHeader';
import { FINGER_INFO } from '../../domain/keyboard/fingers';
import { findKey } from '../../domain/keyboard/keyMap';
import { getKeyboardLayout, type KeyboardLayout } from '../../domain/keyboard/layouts';
import {
  getKeyMastery,
  KEY_STATS_WINDOW,
  MASTERED_MIN_ACCURACY,
  MASTERED_MIN_ATTEMPTS,
  WEAK_MAX_ACCURACY,
  type KeyMastery,
  type MasteryLevel,
} from '../../domain/progress/statistics';
import { cn } from '../../lib/cn';
import { formatAccuracy } from '../../lib/format';
import { usePageTitle } from '../../lib/hooks';
import { useProgress, useSettings } from '../../state/hooks';

const LEVEL_ORDER: readonly MasteryLevel[] = ['mastered', 'learning', 'weak', 'locked'];

const LEVEL_META: Record<
  MasteryLevel,
  { label: string; description: string; icon: IconName; tone: BadgeTone }
> = {
  mastered: {
    label: 'Sicher',
    description: `Mindestens ${MASTERED_MIN_ATTEMPTS} Anschläge mit ${MASTERED_MIN_ACCURACY} % Genauigkeit oder mehr.`,
    icon: 'check',
    tone: 'success',
  },
  learning: {
    label: 'In Übung',
    description: 'Schon eingeführt – für eine Bewertung braucht es noch mehr Anschläge.',
    icon: 'layers',
    tone: 'accent',
  },
  weak: {
    label: 'Üben',
    description: `Genauigkeit unter ${WEAK_MAX_ACCURACY} % – hier lohnt sich gezieltes Training.`,
    icon: 'alert',
    tone: 'warning',
  },
  locked: {
    label: 'Noch nicht gelernt',
    description: 'Diese Tasten kommen in späteren Lektionen.',
    icon: 'lock',
    tone: 'neutral',
  },
};

function keyName(layout: KeyboardLayout, keyId: string): string {
  const key = findKey(layout, keyId);
  if (!key) return keyId;
  if (key.kind === 'space') return 'Leertaste';
  if (key.kind === 'enter') return 'Enter';
  return key.label;
}

function describeKey(layout: KeyboardLayout, entry: KeyMastery): string {
  const meta = LEVEL_META[entry.level];
  const stats =
    entry.attempts > 0
      ? `, ${entry.attempts} Anschläge, ${formatAccuracy(entry.accuracy)} % Genauigkeit`
      : '';
  return `${keyName(layout, entry.keyId)}: ${meta.label}${stats}`;
}

export function KeysPage() {
  usePageTitle('Tasten');
  const settings = useSettings();
  const progress = useProgress();
  const layout = getKeyboardLayout(settings.keyboardLayout);
  const entries = useMemo(() => getKeyMastery(progress, layout), [progress, layout]);
  const masteryMap = useMemo(
    () => new Map(entries.map((entry) => [entry.keyId, entry.level])),
    [entries],
  );
  // Tasten, die im Kurs nicht vorkommen (Zahlen, Modifikatoren), treten zurück.
  const trainableKeyIds = useMemo(() => new Set(entries.map((entry) => entry.keyId)), [entries]);
  const byLevel = useMemo(
    () =>
      Object.fromEntries(
        LEVEL_ORDER.map((level) => [level, entries.filter((entry) => entry.level === level)]),
      ) as Record<MasteryLevel, KeyMastery[]>,
    [entries],
  );

  const defaultKey = byLevel.weak[0]?.keyId ?? byLevel.learning[0]?.keyId ?? 'KeyF';
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const selected =
    entries.find((entry) => entry.keyId === (selectedKeyId ?? defaultKey)) ?? entries[0];
  const selectedKey = selected ? findKey(layout, selected.keyId) : undefined;
  const learnedCount = entries.length - byLevel.locked.length;

  return (
    <>
      <PageHeader
        title="Tasten"
        description={`So sicher beherrschst du jede Taste – berechnet aus deinen letzten ${KEY_STATS_WINDOW} Übungen. Wähle eine Taste für Details.`}
        actions={
          byLevel.weak.length > 0 ? (
            <ButtonLink to="/wiederholen" icon="repeat">
              Schwache Tasten üben
            </ButtonLink>
          ) : undefined
        }
      />

      <dl className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {LEVEL_ORDER.map((level) => (
          <div
            key={level}
            className="rounded-2xl border border-line bg-surface px-4 py-3.5 shadow-card"
          >
            <dt className="flex items-center gap-1.5 text-sm text-ink-muted">
              <Icon name={LEVEL_META[level].icon} size={15} />
              {LEVEL_META[level].label}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink tabular-nums">
              {byLevel[level].length}
            </dd>
          </div>
        ))}
      </dl>

      <Card padding="lg">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[17px] font-semibold tracking-tight text-ink">
            {learnedCount} von {entries.length} Tasten gelernt
          </h2>
          <ul className="flex flex-wrap gap-2" aria-label="Legende">
            {LEVEL_ORDER.map((level) => (
              <li key={level}>
                <Badge tone={LEVEL_META[level].tone} icon={LEVEL_META[level].icon}>
                  {LEVEL_META[level].label}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <VirtualKeyboard
          layout={layout}
          label="Tastatur mit Beherrschungsgrad je Taste"
          mastery={masteryMap}
          activeKeyIds={trainableKeyIds}
          tint={false}
          selectedKeyId={selected?.keyId ?? null}
          onKeySelect={setSelectedKeyId}
          keyLabel={(keyId) => {
            const entry = entries.find((item) => item.keyId === keyId);
            return entry ? describeKey(layout, entry) : keyName(layout, keyId);
          }}
        />

        {selected && selectedKey && (
          <div
            className="mt-6 flex flex-col gap-4 rounded-2xl bg-surface-2 p-4 sm:flex-row sm:items-center"
            aria-live="polite"
          >
            <KeyCap size="lg">{keyName(layout, selected.keyId)}</KeyCap>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-ink">
                Taste {keyName(layout, selected.keyId)}
                <Badge
                  tone={LEVEL_META[selected.level].tone}
                  icon={LEVEL_META[selected.level].icon}
                >
                  {LEVEL_META[selected.level].label}
                </Badge>
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {selectedKey.finger ? FINGER_INFO[selectedKey.finger].label : ''}
                {selected.attempts > 0
                  ? ` · ${selected.attempts} Anschläge · ${formatAccuracy(selected.accuracy)} % Genauigkeit`
                  : ' · noch keine Anschläge in den letzten Übungen'}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {LEVEL_META[selected.level].description}
              </p>
            </div>
          </div>
        )}
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {LEVEL_ORDER.map((level) => (
          <Card key={level} aria-labelledby={`stufe-${level}`}>
            <CardHeader
              id={`stufe-${level}`}
              title={LEVEL_META[level].label}
              description={LEVEL_META[level].description}
            />
            {byLevel[level].length === 0 ? (
              <p className="text-sm text-ink-muted">Keine Tasten in dieser Gruppe.</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {byLevel[level].map((entry) => (
                  <li key={entry.keyId}>
                    <button
                      type="button"
                      onClick={() => setSelectedKeyId(entry.keyId)}
                      aria-pressed={selected?.keyId === entry.keyId}
                      aria-label={describeKey(layout, entry)}
                      className={cn(
                        'flex items-center gap-1.5 rounded-xl border px-2 py-1.5 text-sm transition-colors hover:bg-surface-2',
                        selected?.keyId === entry.keyId ? 'border-ink' : 'border-line',
                      )}
                    >
                      <KeyCap size="sm" decorative>
                        {keyName(layout, entry.keyId)}
                      </KeyCap>
                      <Icon name={LEVEL_META[level].icon} size={14} className="text-ink-muted" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
