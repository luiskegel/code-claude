import { cn } from '../../lib/cn';

/** Logo: eine Taste mit der fühlbaren Markierung von F und J. */
export function BrandMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <rect width="64" height="64" rx="16" fill="var(--tf-accent)" />
      <path
        d="M21 21.5h22M32 21.5v20"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M26.5 49h11"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  );
}
