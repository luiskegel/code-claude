import { isRouteErrorResponse, useRouteError } from 'react-router';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

/** Auffangseite für unerwartete Fehler – die App stürzt nie ins Leere. */
export function RouteErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  if (!notFound) console.error(error);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas px-6">
      <div className="max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-warning-soft text-warning-ink">
          <Icon name="alert" size={26} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
          {notFound ? 'Seite nicht gefunden' : 'Hier ist etwas schiefgelaufen'}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          {notFound
            ? 'Diese Seite gibt es nicht.'
            : 'Ein unerwarteter Fehler ist aufgetreten. Dein gespeicherter Fortschritt ist davon nicht betroffen.'}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
          <Button icon="restart" onClick={() => window.location.reload()}>
            Seite neu laden
          </Button>
          <ButtonLink to="/" variant="secondary" reloadDocument>
            Zur Übersicht
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
