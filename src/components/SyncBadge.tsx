import { Cloud, CloudOff, HardDrive, Loader2 } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { cx } from '@/components/ui/ui';

const TEXT = {
  local: 'Gespeichert in diesem Browser',
  connecting: 'Verbinde mit deinem Claude-Konto …',
  synced: 'Gespeichert in deinem Claude-Konto',
  saving: 'Speichere …',
  error: 'Speichern im Konto gestört',
  readonly: 'Nur in diesem Browser gespeichert',
} as const;

/** Zeigt, wo der Lernstand gerade gespeichert wird. */
export function SyncBadge({ detailed = false }: { detailed?: boolean }) {
  const { sync } = useStore();
  const Icon = sync.status === 'synced' ? Cloud : sync.status === 'connecting' || sync.status === 'saving' ? Loader2 : sync.status === 'local' ? HardDrive : CloudOff;
  const tone = sync.status === 'synced' || sync.status === 'saving' ? 'text-accent-glow' : sync.status === 'error' || sync.status === 'readonly' ? 'text-amber-300' : 'text-slate-400';
  return (
    <div role="status" aria-live="polite" className={cx('flex items-start gap-1.5 text-[11px]', tone)}>
      <Icon className={cx('mt-px h-3.5 w-3.5 flex-none', (sync.status === 'connecting' || sync.status === 'saving') && 'animate-spin')} aria-hidden />
      <span>
        {TEXT[sync.status]}
        {detailed && sync.detail && <span className="block text-slate-400">{sync.detail}</span>}
      </span>
    </div>
  );
}
