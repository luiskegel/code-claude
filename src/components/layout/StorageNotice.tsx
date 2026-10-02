import { useStorageStatus } from '../../state/hooks';
import { Icon } from '../ui/Icon';

/**
 * Ruhiger, seitenübergreifender Hinweis, solange der Fortschritt nicht gespeichert werden kann –
 * damit niemand erst nach dem Neuladen merkt, dass Übungen verloren gegangen sind.
 * Die Live-Region bleibt dauerhaft im DOM: Ein neuer Fehlschlag wird angesagt,
 * ein Seitenwechsel dagegen nicht.
 */
export function StorageNotice() {
  const { persistent, lastWriteFailed } = useStorageStatus();
  const message = !persistent
    ? 'Dein Browser erlaubt gerade kein dauerhaftes Speichern (zum Beispiel im privaten Modus). Dein Fortschritt geht beim Schließen des Tabs verloren.'
    : lastWriteFailed
      ? 'Dein Fortschritt konnte zuletzt nicht gespeichert werden – möglicherweise ist der Browserspeicher voll.'
      : null;

  return (
    <div
      role="status"
      className={
        message ? 'mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10' : undefined
      }
    >
      {message && (
        <p className="flex items-start gap-2.5 rounded-xl bg-warning-soft p-3 text-sm text-warning-ink">
          <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
          {message}
        </p>
      )}
    </div>
  );
}
