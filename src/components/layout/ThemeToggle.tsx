import type { ThemePreference } from '../../domain/settings/settings';
import { cn } from '../../lib/cn';
import { useActions, useSettings } from '../../state/hooks';
import { Icon, type IconName } from '../ui/Icon';

const NEXT: Record<ThemePreference, ThemePreference> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};
const LABEL: Record<ThemePreference, string> = { light: 'Hell', dark: 'Dunkel', system: 'System' };
const ICON: Record<ThemePreference, IconName> = { light: 'sun', dark: 'moon', system: 'monitor' };

/** Schnellumschalter Hell → Dunkel → System (gleiche Einstellung wie auf der Einstellungsseite). */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme } = useSettings();
  const { updateSettings } = useActions();
  const next = NEXT[theme];
  return (
    <button
      type="button"
      onClick={() => updateSettings({ theme: next })}
      className={cn(
        'flex size-9 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink',
        className,
      )}
      aria-label={`Darstellung: ${LABEL[theme]}. Wechseln zu ${LABEL[next]}.`}
      title={`Darstellung: ${LABEL[theme]}`}
    >
      <Icon name={ICON[theme]} size={19} />
    </button>
  );
}
