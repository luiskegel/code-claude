/** Inline-Icons (24×24, currentColor) – keine Icon-Bibliothek nötig. */

interface Props {
  size?: number
  className?: string
}

function base(size = 18) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: 'false' as const,
  }
}

export const IconSearch = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const IconSun = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const IconMoon = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

export const IconMenu = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export const IconClose = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconCopy = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
)

export const IconCheck = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="m5 13 4 4L19 7" />
  </svg>
)

export const IconChevronRight = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const IconChevronLeft = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="m15 6-6 6 6 6" />
  </svg>
)

export const IconStar = ({ size, className, filled }: Props & { filled?: boolean }) => (
  <svg {...base(size)} className={className} fill={filled ? 'currentColor' : 'none'}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8Z" />
  </svg>
)

export const IconClock = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconBook = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
    <path d="M19 19v2H6.5A2.5 2.5 0 0 1 4 18.5" />
  </svg>
)

export const IconSparkle = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />
  </svg>
)

export const IconSpeaker = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4Z" />
    <path d="M15.8 9a4 4 0 0 1 0 6" />
    <path d="M18.4 6.4a7.5 7.5 0 0 1 0 11.2" />
  </svg>
)

export const IconStop = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none" />
  </svg>
)

export const IconPause = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <rect x="7" y="5.5" width="3.4" height="13" rx="1.2" fill="currentColor" stroke="none" />
    <rect x="13.6" y="5.5" width="3.4" height="13" rx="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const IconPlay = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M8 5.5 18.5 12 8 18.5Z" fill="currentColor" stroke="none" />
  </svg>
)

export const IconTarget = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
)
