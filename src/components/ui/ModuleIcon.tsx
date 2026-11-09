import {
  BookOpen,
  Brain,
  Building2,
  Calculator,
  CandlestickChart,
  ClipboardCheck,
  Coins,
  Compass,
  Globe2,
  Landmark,
  Layers,
  PieChart,
  ShieldAlert,
  ShoppingCart,
  Target,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  Landmark,
  PieChart,
  ShoppingCart,
  Building2,
  Calculator,
  CandlestickChart,
  Coins,
  Compass,
  Layers,
  ShieldAlert,
  Brain,
  Globe2,
  ClipboardCheck,
  Zap,
  Target,
};

export function ModuleIcon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? BookOpen;
  return <Icon className={className} aria-hidden />;
}
