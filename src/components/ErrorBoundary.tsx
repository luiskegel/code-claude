import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  error: Error | null;
}

/** Fängt Laufzeitfehler einzelner Seiten ab, damit die App bedienbar bleibt. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Fehler in einer Seite:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="card card-pad mx-auto mt-10 max-w-lg text-center" role="alert">
          <h1 className="text-lg font-semibold">Hier ist etwas schiefgelaufen</h1>
          <p className="mt-2 text-sm text-slate-400">Die Seite konnte nicht angezeigt werden. Dein Fortschritt ist gespeichert.</p>
          <p className="mt-2 break-words font-mono text-xs text-rose-300">{this.state.error.message}</p>
          <div className="mt-4 flex justify-center gap-2">
            <button className="btn-primary" onClick={() => this.setState({ error: null })}>
              Erneut versuchen
            </button>
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              Neu laden
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
