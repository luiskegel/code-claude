import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { App } from './app/App';
import { routes } from './app/routes';
import { detectStorage } from './domain/storage/storage';
import './index.css';
import { createAppStore } from './state/store';

const { storage, persistent } = detectStorage();
const store = createAppStore(storage, persistent);
const router = createBrowserRouter(routes);

const container = document.getElementById('root');
if (!container) throw new Error('Element #root fehlt in index.html');

createRoot(container).render(
  <StrictMode>
    <App store={store} router={router} />
  </StrictMode>,
);
