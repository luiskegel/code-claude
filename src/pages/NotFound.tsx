import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export function NotFound() {
  return (
    <div className="card card-pad mx-auto mt-10 max-w-lg text-center">
      <Compass className="mx-auto mb-3 h-10 w-10 text-accent" />
      <h1 className="text-xl font-semibold">Seite nicht gefunden</h1>
      <p className="mt-2 text-sm text-slate-400">Diese Seite existiert nicht (mehr). Vielleicht hilft dir der Kursüberblick weiter.</p>
      <div className="mt-5 flex justify-center gap-2">
        <Link to="/" className="btn-primary">
          Zum Dashboard
        </Link>
        <Link to="/kurs" className="btn-secondary">
          Zum Kurs
        </Link>
      </div>
    </div>
  );
}
