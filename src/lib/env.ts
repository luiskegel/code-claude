// Läuft die App als Claude-Artefakt? (Build mit `npm run build:artifact`)
// Im Artefakt sind Drucken, Datei-Downloads und Abrufe fremder Server gesperrt.
export const IS_ARTIFACT = import.meta.env.MODE === 'artifact';
