/**
 * Texthilfen ohne React – damit sie auch außerhalb des Browsers laufen
 * (Suchindex, Sprachausgabe, Prüfskripte).
 */

/** Findet eingezäunte Code-Blöcke (```…```), samt Sprachangabe. */
export const FENCE_RE = /```[a-zA-Z]*\r?\n?([\s\S]*?)```/g

/**
 * Entfernt Markdown-Zeichen – für Suchindex, Sprachausgabe und Meta-Angaben.
 * Bei Code-Blöcken bleibt der Inhalt stehen, nur die Zäune fallen weg.
 */
export function stripMd(input: string): string {
  return input
    .replace(FENCE_RE, ' $1 ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}
