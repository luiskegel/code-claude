/**
 * Anbindung an den Speicher der Artifact-Plattform.
 *
 * Läuft die App auf claude.ai, stehen zwei Dienste bereit:
 *   - `db`     – ein Dokumentspeicher auf dem Server (überlebt Neuladen,
 *                Schliessen der App und Gerätewechsel)
 *   - `assets` – Ablage für Fotos, ebenfalls serverseitig
 *
 * Läuft die App lokal (npm start) oder auf einem anderen Host, gibt es
 * `window.claude` nicht. Dann liefern alle Funktionen hier `null` und die
 * App nutzt localStorage bzw. IndexedDB wie zuvor.
 */

const CONNECT_TIMEOUT_MS = 6000;

let dbPromise;
let assetsPromise;
let samplePromise;

function useCapability(name) {
  const api = globalThis.claude;
  if (!api || typeof api.use !== 'function') return Promise.resolve(null);

  // use() antwortet laut Vertrag spätestens nach 10 s – wir warten kürzer,
  // damit der Start der App nicht hängt.
  return Promise.race([
    api.use(name).catch((error) => {
      console.warn(`Dienst "${name}" nicht verfügbar:`, error);
      return null;
    }),
    new Promise((resolve) => setTimeout(() => resolve(null), CONNECT_TIMEOUT_MS)),
  ]);
}

export function getCloudDb() {
  if (!dbPromise) dbPromise = useCapability('db');
  return dbPromise;
}

export function getCloudAssets() {
  if (!assetsPromise) assetsPromise = useCapability('assets');
  return assetsPromise;
}

/**
 * Zugriff auf Claude selbst – ohne eigenen API-Schlüssel, über das
 * Claude-Konto der Person, die die App geöffnet hat.
 */
export function getCloudSample() {
  if (!samplePromise) samplePromise = useCapability('sample');
  return samplePromise;
}

/** Zeigt an, ob die App in einer Umgebung mit Plattform-Diensten läuft. */
export function cloudPossible() {
  return typeof globalThis.claude?.use === 'function';
}

/** Anzeige-URL eines hochgeladenen Bildes – gilt in jeder Version des Artifacts. */
export function assetUrl(assetId) {
  return `/_blob/${assetId}`;
}
