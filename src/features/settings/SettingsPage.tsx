import { useState, type ReactNode } from 'react';
import { VirtualKeyboard } from '../../components/keyboard/VirtualKeyboard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { Modal } from '../../components/ui/Modal';
import { PageHeader } from '../../components/ui/PageHeader';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { Switch } from '../../components/ui/Switch';
import { useToast } from '../../components/ui/toastContext';
import {
  getKeyboardLayout,
  KEYBOARD_LAYOUT_IDS,
  KEYBOARD_LAYOUTS,
  type KeyboardLayoutId,
} from '../../domain/keyboard/layouts';
import {
  GOAL_OPTIONS,
  type LearningGoal,
  type ThemePreference,
  type UserSettings,
} from '../../domain/settings/settings';
import type { ErrorMode } from '../../domain/typing/engine';
import { cn } from '../../lib/cn';
import { usePageTitle } from '../../lib/hooks';
import { playSound } from '../../lib/sound';
import { useActions, useSettings, useStorageStatus } from '../../state/hooks';
import { SettingRow } from './SettingRow';

type ResetDialog = 'progress' | 'all' | null;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const id = `einstellungen-${title.toLowerCase().replace(/[^a-zäöü]+/g, '-')}`;
  return (
    <Card aria-labelledby={id} className="py-2 sm:py-3">
      <div className="pt-3 pb-1">
        <h2 id={id} className="text-[17px] font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
      </div>
      <div className="divide-y divide-line">{children}</div>
    </Card>
  );
}

export function SettingsPage() {
  usePageTitle('Einstellungen');
  const settings = useSettings();
  const storage = useStorageStatus();
  const { updateSettings, resetProgress, resetAll } = useActions();
  const toast = useToast();
  const [dialog, setDialog] = useState<ResetDialog>(null);

  const toggle =
    (
      key: keyof Pick<
        UserSettings,
        | 'animationsEnabled'
        | 'showErrorHints'
        | 'showLiveWpm'
        | 'showHands'
        | 'freeLessonChoice'
        | 'soundEnabled'
      >,
    ) =>
    (value: boolean) =>
      updateSettings({ [key]: value });

  const confirmReset = () => {
    if (dialog === 'progress') {
      resetProgress();
      toast.show({
        title: 'Lernfortschritt zurückgesetzt',
        description: 'Du startest wieder bei Lektion 1.',
      });
    } else if (dialog === 'all') {
      resetAll();
      toast.show({ title: 'Alle Daten gelöscht', description: 'Die Einführung beginnt von vorn.' });
    }
    setDialog(null);
  };

  return (
    <>
      <PageHeader
        title="Einstellungen"
        description="Änderungen werden sofort übernommen und gespeichert."
      />

      <div className="space-y-6">
        <Section title="Darstellung">
          <SettingRow
            id="theme"
            label="Farbschema"
            description="„System“ folgt der Einstellung deines Geräts."
          >
            <SegmentedControl<ThemePreference>
              name="theme"
              label="Farbschema"
              value={settings.theme}
              onChange={(theme) => updateSettings({ theme })}
              options={[
                { value: 'light', label: 'Hell', icon: 'sun' },
                { value: 'dark', label: 'Dunkel', icon: 'moon' },
                { value: 'system', label: 'System', icon: 'monitor' },
              ]}
            />
          </SettingRow>
          <SettingRow
            id="animations"
            label="Animationen"
            description="Sanfte Übergänge und Bewegungen. Reduzierte Bewegung deines Systems wird immer berücksichtigt."
          >
            <Switch
              checked={settings.animationsEnabled}
              onChange={toggle('animationsEnabled')}
              labelledBy="animations-label"
              describedBy="animations-description"
            />
          </SettingRow>
        </Section>

        <Section
          title="Tastatur"
          description="Die Übungen funktionieren mit jeder deutschen QWERTZ-Tastatur. Die Auswahl ändert die Bildschirmtastatur."
        >
          <SettingRow id="layout" label="Tastaturlayout" stacked>
            <div
              role="radiogroup"
              aria-labelledby="layout-label"
              className="grid gap-3 sm:grid-cols-2"
            >
              {KEYBOARD_LAYOUT_IDS.map((id) => {
                const layout = KEYBOARD_LAYOUTS[id];
                const checked = settings.keyboardLayout === id;
                return (
                  <label
                    key={id}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors',
                      'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--tf-focus)',
                      checked ? 'border-accent bg-accent-soft' : 'border-line hover:bg-surface-2',
                    )}
                  >
                    <input
                      type="radio"
                      name="keyboard-layout"
                      value={id}
                      checked={checked}
                      onChange={() => updateSettings({ keyboardLayout: id as KeyboardLayoutId })}
                      className="mt-1 size-4 accent-(--tf-accent)"
                    />
                    <span>
                      <span className="block text-[15px] font-medium text-ink">{layout.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-muted">
                        {layout.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="mt-4 rounded-2xl bg-surface-2 p-3 sm:p-4">
              <VirtualKeyboard
                layout={getKeyboardLayout(settings.keyboardLayout)}
                label={`Vorschau: ${KEYBOARD_LAYOUTS[settings.keyboardLayout].name}`}
                showHandDivider
              />
            </div>
          </SettingRow>
        </Section>

        <Section title="Training">
          <SettingRow
            id="error-mode"
            label="Fehlerverhalten"
            description={
              settings.errorMode === 'correct'
                ? 'Fehler sofort korrigieren: Es geht erst mit der richtigen Taste weiter.'
                : 'Einfach weiterschreiben: Fehler werden markiert, Korrektur mit der Rücktaste.'
            }
          >
            <SegmentedControl<ErrorMode>
              name="error-mode"
              label="Fehlerverhalten"
              value={settings.errorMode}
              onChange={(errorMode) => updateSettings({ errorMode })}
              options={[
                { value: 'correct', label: 'Fehler korrigieren' },
                { value: 'continue', label: 'Weiterschreiben' },
              ]}
            />
          </SettingRow>
          <SettingRow
            id="error-hints"
            label="Fehler sofort anzeigen"
            description="Zeigt bei einem Tippfehler direkt, welche Taste und welcher Finger richtig gewesen wären."
          >
            <Switch
              checked={settings.showErrorHints}
              onChange={toggle('showErrorHints')}
              labelledBy="error-hints-label"
              describedBy="error-hints-description"
            />
          </SettingRow>
          <SettingRow
            id="live-wpm"
            label="WPM anzeigen"
            description="Live-Geschwindigkeit während der Übung. Im Ergebnis siehst du sie immer."
          >
            <Switch
              checked={settings.showLiveWpm}
              onChange={toggle('showLiveWpm')}
              labelledBy="live-wpm-label"
              describedBy="live-wpm-description"
            />
          </SettingRow>
          <SettingRow
            id="hands"
            label="Handgrafik anzeigen"
            description="Hebt während der Übung den Finger hervor, der die nächste Taste drückt."
          >
            <Switch
              checked={settings.showHands}
              onChange={toggle('showHands')}
              labelledBy="hands-label"
              describedBy="hands-description"
            />
          </SettingRow>
          <SettingRow
            id="free-choice"
            label="Freie Lektionswahl"
            description="Alle Lektionen sind sofort geöffnet – für alle, die schon tippen können."
          >
            <Switch
              checked={settings.freeLessonChoice}
              onChange={toggle('freeLessonChoice')}
              labelledBy="free-choice-label"
              describedBy="free-choice-description"
            />
          </SettingRow>
          <SettingRow
            id="goal"
            label="Lernziel"
            description="Bestimmt den Fokus-Tipp auf deiner Übersicht."
          >
            <select
              aria-labelledby="goal-label"
              value={settings.goal}
              onChange={(event) => updateSettings({ goal: event.target.value as LearningGoal })}
              className="h-10 w-full rounded-xl border border-line bg-surface px-3 text-[15px] text-ink sm:w-72"
            >
              {GOAL_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </SettingRow>
        </Section>

        <Section title="Ton">
          <SettingRow
            id="sound"
            label="Töne"
            description="Dezente Klänge für Anschlag, Fehler und abgeschlossene Übungen."
          >
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" icon="volume" onClick={() => playSound('complete')}>
                Probehören
              </Button>
              <Switch
                checked={settings.soundEnabled}
                onChange={toggle('soundEnabled')}
                labelledBy="sound-label"
                describedBy="sound-description"
              />
            </div>
          </SettingRow>
        </Section>

        <Section title="Daten & Datenschutz">
          <div className="space-y-3 py-4">
            <p className="flex items-start gap-2.5 text-[15px] text-ink">
              <Icon name="shield" size={18} className="mt-0.5 shrink-0 text-success-ink" />
              Deine Lerndaten werden lokal in deinem Browser gespeichert. Es gibt kein Konto, keine
              Anmeldung und keine Übertragung an einen Server.
            </p>
            {storage.recoveredFromCorruption && (
              <p className="flex items-start gap-2.5 rounded-xl bg-surface-2 p-3 text-sm text-ink-muted">
                <Icon name="info" size={16} className="mt-0.5 shrink-0" />
                Beim Laden wurden beschädigte Daten gefunden und durch sichere Standardwerte
                ersetzt.
              </p>
            )}
          </div>
          <SettingRow
            id="reset-progress"
            label="Lernfortschritt zurücksetzen"
            description="Löscht Lektionen, Statistiken, Fehlerdaten und Lernserie. Einstellungen bleiben erhalten."
          >
            <Button variant="danger-outline" onClick={() => setDialog('progress')}>
              Zurücksetzen …
            </Button>
          </SettingRow>
          <SettingRow
            id="reset-all"
            label="Alle Daten löschen"
            description="Setzt zusätzlich alle Einstellungen zurück und startet die Einführung neu."
          >
            <Button variant="danger-outline" onClick={() => setDialog('all')}>
              Alles löschen …
            </Button>
          </SettingRow>
        </Section>
      </div>

      <Modal
        open={dialog !== null}
        onClose={() => setDialog(null)}
        tone="danger"
        title={dialog === 'all' ? 'Alle Daten löschen?' : 'Lernfortschritt zurücksetzen?'}
        description={
          dialog === 'all'
            ? 'Lektionen, Statistiken, Lernserie und alle Einstellungen werden gelöscht. Danach beginnt die Einführung von vorn. Das lässt sich nicht rückgängig machen.'
            : 'Alle abgeschlossenen Lektionen, Statistiken, Fehlerdaten und deine Lernserie werden gelöscht. Deine Einstellungen bleiben erhalten. Das lässt sich nicht rückgängig machen.'
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialog(null)}>
              Abbrechen
            </Button>
            <Button variant="danger" onClick={confirmReset}>
              {dialog === 'all' ? 'Alles löschen' : 'Fortschritt löschen'}
            </Button>
          </>
        }
      />
    </>
  );
}
