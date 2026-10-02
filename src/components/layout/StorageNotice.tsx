import { useStorageStatus } from '../../state/hooks';
import { Icon } from '../ui/Icon';

/**
 * Ruhiger, seitenübergreifender Hinweis, solange der Fortschritt nicht gespeichert werden kann –
 * damit niemand erst nach dem Neuladen merkt, dass Übungen verloren gegangen sind.
 */
export function StorageNotice() {
  const { persistent, lastWriteFailed } = useStorageStatus();
  if (persistent && !lastWriteFailed) return null;

  return (
    <p
      role="status"
      className="mb-6 flex items-start gap-2.5 rounded-xl bg-warning-soft p-3 text-sm text-warning-ink"
    >
      <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
      {persistent
        ? 'Dein Fortschritt konnte zuletzt nicht gespeichert werden – möglicherweise ist der Browserspeicher voll.'
        : 'Dein Browser erlaubt gerade kein dauerhaftes Speichern (zum Beispiel im privaten Modus). Dein Fortschritt geht beim Schließen des Tabs verloren.'}
    </p>
  );
}
