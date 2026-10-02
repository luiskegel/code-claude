import { Link, NavLink } from 'react-router';
import { BRAND } from '../../config/brand';
import { cn } from '../../lib/cn';
import { Icon } from '../ui/Icon';
import { BrandMark } from './BrandMark';
import { NAV_ITEMS } from './navigation';
import { StreakIndicator } from './StreakIndicator';
import { ThemeToggle } from './ThemeToggle';

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
      <Link to="/" className="flex items-center gap-3 rounded-xl px-2 py-1">
        <BrandMark size={34} />
        <span className="min-w-0">
          <span className="block text-[17px] leading-tight font-semibold tracking-tight text-ink">
            {BRAND.name}
          </span>
          <span className="block truncate text-xs text-ink-muted">{BRAND.tagline}</span>
        </span>
      </Link>

      <nav aria-label="Hauptnavigation" className="mt-9">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors duration-150',
                    isActive
                      ? 'bg-accent-soft font-semibold text-accent-ink'
                      : 'font-medium text-ink-muted hover:bg-surface-2 hover:text-ink',
                  )
                }
              >
                <Icon name={item.icon} size={19} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-4">
        <StreakIndicator />
        <ThemeToggle />
      </div>
    </aside>
  );
}
