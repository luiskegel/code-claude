import { Link, NavLink } from 'react-router';
import { BRAND } from '../../config/brand';
import { cn } from '../../lib/cn';
import { Icon } from '../ui/Icon';
import { BrandMark } from './BrandMark';
import { NAV_ITEMS } from './navigation';
import { StreakIndicator } from './StreakIndicator';
import { ThemeToggle } from './ThemeToggle';

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-canvas/85 px-4 backdrop-blur-md lg:hidden">
      <Link to="/" className="flex items-center gap-2.5 rounded-lg">
        <BrandMark size={28} />
        <span className="text-[16px] font-semibold tracking-tight text-ink">{BRAND.name}</span>
      </Link>
      <div className="flex items-center gap-1">
        <StreakIndicator compact />
        <ThemeToggle />
      </div>
    </header>
  );
}

export function MobileTabBar() {
  return (
    <nav
      aria-label="Hauptnavigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg">
        {NAV_ITEMS.filter((item) => item.mobile).map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors',
                  isActive ? 'text-accent-ink' : 'text-ink-muted hover:text-ink',
                )
              }
            >
              <Icon name={item.icon} size={22} />
              {item.shortLabel}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
