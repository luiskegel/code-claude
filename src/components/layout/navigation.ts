import type { IconName } from '../ui/Icon';

export interface NavItem {
  to: string;
  label: string;
  /** Kürzere Beschriftung für die mobile Tab-Leiste */
  shortLabel: string;
  icon: IconName;
  /** Nur exakt diese URL gilt als aktiv */
  end?: boolean;
  /** In der mobilen Tab-Leiste sichtbar (sonst über „Lernen“ erreichbar) */
  mobile: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Übersicht', shortLabel: 'Start', icon: 'home', end: true, mobile: true },
  { to: '/lernen', label: 'Lernen', shortLabel: 'Lernen', icon: 'book', mobile: true },
  {
    to: '/wiederholen',
    label: 'Fehler wiederholen',
    shortLabel: 'Wiederholen',
    icon: 'repeat',
    mobile: false,
  },
  { to: '/tasten', label: 'Tasten', shortLabel: 'Tasten', icon: 'keyboard', mobile: true },
  {
    to: '/statistiken',
    label: 'Statistiken',
    shortLabel: 'Statistik',
    icon: 'chart',
    mobile: true,
  },
  {
    to: '/einstellungen',
    label: 'Einstellungen',
    shortLabel: 'Einstellungen',
    icon: 'sliders',
    mobile: true,
  },
];
