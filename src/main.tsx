import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createMemoryRouter } from 'react-router';
import { App } from './app/App';
import { routes } from './app/routes';
import { detectStorage } from './domain/storage/storage';
import './index.css';
import { createAppStore } from './state/store';

const { storage, persistent } = detectStorage();
const store = createAppStore(storage, persistent);
// Als Claude-Artefakt läuft die App in einem abgeschotteten Rahmen, der keine eigenen Pfade
// erlaubt – dort navigiert sie im Arbeitsspeicher und startet immer auf der Übersicht.
const router =
  import.meta.env.MODE === 'artifact' ? createMemoryRouter(routes) : createBrowserRouter(routes);

const container = document.getElementById('root');
if (!container) throw new Error('Element #root fehlt in index.html');

createRoot(container).render(
  <StrictMode>
    <App store={store} router={router} />
  </StrictMode>,
);
