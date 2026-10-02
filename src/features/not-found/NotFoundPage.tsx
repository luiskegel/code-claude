import { useLocation } from 'react-router';
import { ButtonLink } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { usePageTitle } from '../../lib/hooks';

interface NotFoundContentProps {
  title: string;
  description: string;
  primary: { to: string; label: string };
}

export function NotFoundContent({ title, description, primary }: NotFoundContentProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-surface-2 text-ink-muted">
        <Icon name="keyboard" size={26} />
      </span>
      <p className="mt-6 text-sm font-semibold tracking-wide text-accent-ink">404</p>
      <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{description}</p>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <ButtonLink to={primary.to} iconEnd="arrow-right">
          {primary.label}
        </ButtonLink>
        <ButtonLink to="/" variant="secondary">
          Zur Übersicht
        </ButtonLink>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  const location = useLocation();
  usePageTitle('Seite nicht gefunden');
  return (
    <NotFoundContent
      title="Seite nicht gefunden"
      description={`Die Adresse „${location.pathname}“ gibt es nicht. Hier geht es zurück zu deinen Lektionen.`}
      primary={{ to: '/lernen', label: 'Zu den Lektionen' }}
    />
  );
}
