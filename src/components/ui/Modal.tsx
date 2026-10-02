import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  tone?: 'default' | 'danger';
}

/**
 * Dialog auf Basis des nativen <dialog>-Elements: Fokusfalle, Escape-Taste,
 * inaktiver Hintergrund und Fokus-Rückgabe übernimmt der Browser.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  tone = 'default',
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Klick auf den abgedunkelten Hintergrund schließt den Dialog.
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto w-[min(92vw,30rem)] rounded-2xl border border-line bg-surface p-0 text-ink shadow-pop backdrop:bg-black/40 backdrop:backdrop-blur-[2px] open:animate-scale-in"
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start gap-4">
          {tone === 'danger' && (
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger-ink">
              <Icon name="alert" size={20} />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-lg font-semibold tracking-tight">
              {title}
            </h2>
            {description && (
              <div id={descriptionId} className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                {description}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-2 rounded-lg p-2 text-ink-muted hover:bg-surface-2 hover:text-ink"
            aria-label="Dialog schließen"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        {children && <div className="mt-5">{children}</div>}
        {footer && (
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
