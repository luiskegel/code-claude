/** Verbindet Klassennamen und ignoriert leere Werte. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
