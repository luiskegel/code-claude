import type { CloudStatus } from '../../state/backup/cloudBackend';

const IS_ARTIFACT = import.meta.env.MODE === 'artifact';

/** Datenschutz-Hinweis, der beschreibt, wo die Lerndaten tatsächlich liegen. */
export function privacyStatement(cloud: CloudStatus): string {
  if (cloud === 'on') {
    return 'Dein Lernfortschritt wird in deinem Browser gespeichert und zusätzlich privat in deinem Claude-Konto gesichert. So bleibt er erhalten, auch wenn du die App schließt oder das Gerät wechselst. Andere Personen – auch wer dieses Artefakt geteilt hat – sehen ihn nicht.';
  }
  if (!IS_ARTIFACT) {
    return 'Deine Lerndaten werden lokal in deinem Browser gespeichert. Es gibt kein Konto, keine Anmeldung und keine Übertragung an einen Server.';
  }
  if (cloud === 'failed') {
    return 'Deine Lerndaten werden lokal in deinem Browser gespeichert. Die Sicherung in deinem Claude-Konto ist für dich gerade nicht möglich – zum Beispiel, weil du dieses Artefakt nur ansehen darfst.';
  }
  return 'Deine Lerndaten werden lokal in deinem Browser gespeichert.';
}

/** Kurzfassung für die Einführung. */
export const ONBOARDING_PRIVACY = IS_ARTIFACT
  ? 'Kein eigenes Konto nötig. Dein Fortschritt bleibt privat – nur du siehst ihn.'
  : 'Kein Konto nötig. Dein Fortschritt bleibt in deinem Browser.';
