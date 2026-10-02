import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createMemoryRouter } from 'react-router';
import { App } from './app/App';
import { routes } from './app/routes';
import { BACKUP_NAMES, STORAGE_KEYS } from './config/storageKeys';
import { detectStorage } from './domain/storage/storage';
import './index.css';
import {
  createCloudBackend,
  resolveClaudeDocument,
  type CloudStatus,
} from './state/backup/cloudBackend';
import { createDurableStorage, type BackupTarget } from './state/backup/durableStorage';
import { createIndexedDbBackend } from './state/backup/indexedDbBackend';
import { createAppStore } from './state/store';

const isArtifact = import.meta.env.MODE === 'artifact';
const { storage: primary, persistent } = detectStorage();

// Sicherungen neben dem LocalStorage: IndexedDB auf dem Gerät (sofort und absturzsicher) und –
// als Claude-Artefakt – ein privates Dokument im Claude-Konto der Person (gebündelt).
let cloudStatus: CloudStatus = 'off';
let reportCloudStatus = (status: CloudStatus) => {
  cloudStatus = status;
};
const targets: BackupTarget[] = [
  { backend: createIndexedDbBackend(BACKUP_NAMES.indexedDb), delayMs: 0, sameDevice: true },
];
if (isArtifact) {
  targets.push({
    backend: createCloudBackend({
      resolveDocument: () => resolveClaudeDocument(BACKUP_NAMES.cloudDocument),
      onStatus: (status) => reportCloudStatus(status),
    }),
    delayMs: 1500,
  });
}
const durable = createDurableStorage({
  primary,
  settingsKey: STORAGE_KEYS.settings,
  progressKey: STORAGE_KEYS.progress,
  savedAtKey: BACKUP_NAMES.savedAtKey,
  targets,
});

const store = createAppStore(durable.storage, persistent);
store.setCloudStatus(cloudStatus);
reportCloudStatus = (status) => store.setCloudStatus(status);

// Als Claude-Artefakt läuft die App in einem abgeschotteten Rahmen, der keine eigenen Pfade
// erlaubt – dort navigiert sie im Arbeitsspeicher und startet immer auf der Übersicht.
const router = isArtifact ? createMemoryRouter(routes) : createBrowserRouter(routes);

// Ist eine Sicherung neuer als der LocalStorage (nach einem Absturz oder auf einem neuen Gerät),
// übernimmt die App sie – die Einführung entfällt dann.
void durable.restore().then((restored) => {
  if (!restored) return;
  store.reloadFromStorage();
  const onboarding = router.state.location.pathname === '/willkommen';
  if (onboarding && store.getState().settings.onboardingCompleted) {
    void router.navigate('/', { replace: true });
  }
});

// Geht die Seite in den Hintergrund oder wird sie geschlossen, ausstehende Sicherungen sofort schreiben.
const flushBackups = () => void durable.flush();
window.addEventListener('pagehide', flushBackups);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushBackups();
});

const container = document.getElementById('root');
if (!container) throw new Error('Element #root fehlt in index.html');

createRoot(container).render(
  <StrictMode>
    <App store={store} router={router} />
  </StrictMode>,
);
