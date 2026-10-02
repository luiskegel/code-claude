import type { SVGProps } from 'react';

/**
 * Eigene, schlanke Linien-Icons (24×24, 1,75 px Strich) – keine externe Abhängigkeit.
 */
const PATHS = {
  home: 'M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6.5H9V21H4.5a1 1 0 0 1-1-1z',
  book: 'M12 6.6C10.3 5.2 7.8 4.5 3.5 4.5v14c4.3 0 6.8.7 8.5 2.1 1.7-1.4 4.2-2.1 8.5-2.1v-14c-4.3 0-6.8.7-8.5 2.1zM12 6.6v14',
  repeat:
    'M20 11a8 8 0 0 0-14.5-4.6L4 8.2M4 3.8v4.4h4.4M4 13a8 8 0 0 0 14.5 4.6l1.5-1.8m0 4.4v-4.4h-4.4',
  keyboard:
    'M4.5 6h15A2.5 2.5 0 0 1 22 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 15.5v-7A2.5 2.5 0 0 1 4.5 6zM6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M8 14.2h8',
  chart: 'M4 20h16M7 16.5v-5M12 16.5V7M17 16.5v-8',
  sliders:
    'M4 7h9M17 7h3M4 17h3M11 17h9M15 9.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4zM9 19.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z',
  flame:
    'M12 2.8c.9 3 4.6 5.1 4.6 9.9a4.6 4.6 0 1 1-9.2 0c0-2.3 1-3.8 2.4-5.1.1 1.8.9 3 2.1 3.5-.6-2.9-.7-5.5.1-8.3z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2',
  zap: 'M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z',
  target:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 12.6a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2z',
  check: 'M5 12.5 9.5 17 19 7.5',
  'check-circle': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.3l2.7 2.7L16 9.6',
  lock: 'M6.5 11h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-7A1.5 1.5 0 0 1 6.5 11zM8 11V8a4 4 0 0 1 8 0v3',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  'chevron-right': 'M9.5 6l6 6-6 6',
  'chevron-left': 'M14.5 6l-6 6 6 6',
  restart: 'M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.4M3.5 3.6v4.8h4.8',
  x: 'M6.5 6.5l11 11M17.5 6.5l-11 11',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4',
  moon: 'M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6z',
  monitor:
    'M5 4h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8.5 20.5h7M12 16.5v4',
  volume: 'M11 5.5 6.5 9H3.5v6h3l4.5 3.5zM15.5 9a4.5 4.5 0 0 1 0 6M18.3 6.2a8.5 8.5 0 0 1 0 11.6',
  'volume-off': 'M11 5.5 6.5 9H3.5v6h3l4.5 3.5zM16 9.5l5 5M21 9.5l-5 5',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5.5M12 7.8v.01',
  alert:
    'M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0zM12 9.5v4M12 17v.01',
  trophy:
    'M8 4h8v5.5a4 4 0 0 1-8 0zM8 6H5.5a2.5 2.5 0 0 0 2.6 3.4M16 6h2.5a2.5 2.5 0 0 1-2.6 3.4M12 13.5V17M8.5 20.5h7M10 17h4v3.5h-4z',
  pause: 'M9 5.5v13M15 5.5v13',
  play: 'M7.5 4.8v14.4a.8.8 0 0 0 1.2.7l11.5-7.2a.8.8 0 0 0 0-1.4L8.7 4.1a.8.8 0 0 0-1.2.7z',
  'eye-off':
    'M3 3l18 18M10.7 6.1A10.6 10.6 0 0 1 12 6c5 0 8.6 4.2 9.5 6-.4.9-1.3 2.2-2.6 3.4M6.7 6.7C4.6 8 3.1 10 2.5 12c.9 1.8 4.5 6 9.5 6 1.6 0 3.1-.4 4.4-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2',
  person: 'M12 7a2.3 2.3 0 1 0 0-4.6A2.3 2.3 0 0 0 12 7zM12 8.5v6.5M7.5 10.5h9M9 21l3-6 3 6',
  shoulders:
    'M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2zM4 20c.6-3.5 3.8-5.6 8-5.6s7.4 2.1 8 5.6',
  hand: 'M8 13V5.6a1.4 1.4 0 0 1 2.8 0V11M10.8 10.5V4.4a1.4 1.4 0 0 1 2.8 0v6.3M13.6 10.7V5.8a1.4 1.4 0 0 1 2.8 0v7.7a7 7 0 0 1-7 7h-.3a6 6 0 0 1-5-2.7L2.7 15.4a1.5 1.5 0 0 1 2.4-1.7L8 16.2',
  feather:
    'M20 4a5.6 5.6 0 0 0-7.9 0L6 10.1V18h7.9L20 11.9A5.6 5.6 0 0 0 20 4zM16 8 3 21M17.5 15H9',
  sparkles:
    'M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.5l-1.6-4.7L6 9.2l4.4-1.6zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z',
  layers: 'M12 3 2.5 8l9.5 5 9.5-5zM2.5 12.5l9.5 5 9.5-5M2.5 17l9.5 5 9.5-5',
  shield: 'M12 21s7.5-3.4 7.5-9.5V5.6L12 3 4.5 5.6v5.9C4.5 17.6 12 21 12 21z',
  'external-link': 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  minus: 'M5 12h14',
  enter: 'M19 5v6a3 3 0 0 1-3 3H6M10 10l-4 4 4 4',
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  /** Ausgefüllte Variante (z. B. für die Flamme des Streaks) */
  filled?: boolean;
  /** Beschriftung für Screenreader; ohne Titel ist das Icon dekorativ. */
  title?: string;
}

export function Icon({ name, size = 20, filled = false, title, className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
