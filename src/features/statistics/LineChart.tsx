import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { niceScale } from './chartScale';

export interface LinePoint {
  id: string;
  value: number;
  /** Beschriftung im Tooltip, z. B. „Lektion 4 · J K L Ö“ */
  label: string;
  /** Datum, z. B. „1. Okt., 18:30“ */
  date: string;
  /** Beschriftung auf der x-Achse, z. B. „Nr. 12“ */
  axisLabel: string;
}

interface LineChartProps {
  title: string;
  unit: string;
  points: readonly LinePoint[];
  formatValue: (value: number) => string;
  /** Untergrenze der y-Achse; Standard: 0 (ehrliche Größenverhältnisse) */
  floor?: 'zero' | 'auto';
  /** Bei floor="auto": Mindestspanne der y-Achse, damit kleine Schwankungen nicht dramatisch wirken */
  minSpan?: number;
  ceiling?: number;
  activeIndex: number | null;
  onActiveIndexChange: (index: number | null) => void;
}

const HEIGHT = 216;
const MARGIN = { top: 18, right: 44, bottom: 28, left: 40 };
const DEFAULT_WIDTH = 560;

/** Breite des Containers per ResizeObserver – das SVG zeichnet in echten Pixeln, Text bleibt scharf. */
function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  // Mit ResizeObserver wird vor dem ersten Zeichnen gemessen; ohne ihn (z. B. in Tests) gilt eine Standardbreite.
  const [width, setWidth] = useState(() =>
    typeof ResizeObserver === 'function' ? 0 : DEFAULT_WIDTH,
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver !== 'function') return;
    const observer = new ResizeObserver((entries) => {
      const next = Math.round(entries[0]?.contentRect.width ?? DEFAULT_WIDTH);
      if (next > 0) setWidth(next);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}

/** Einzelserie als Linie: 2-px-Strich, zarte Fläche, Haarlinien-Raster, Fadenkreuz mit Tooltip. */
export function LineChart({
  title,
  unit,
  points,
  formatValue,
  floor = 'zero',
  minSpan = 10,
  ceiling,
  activeIndex,
  onActiveIndexChange,
}: LineChartProps) {
  const { ref, width } = useContainerWidth();
  const titleId = useId();
  const values = points.map((point) => point.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  // Beide Kennzahlen werden ganzzahlig angezeigt – die Achse darf daher nur ganze Werte tragen.
  const scale = niceScale(
    floor === 'zero' ? 0 : Math.max(0, Math.min(dataMin - 2, dataMax - minSpan)),
    Math.max(dataMax, floor === 'zero' ? 10 : dataMax),
    { integer: true },
  );
  const yMax = ceiling !== undefined ? Math.min(scale.max, ceiling) : scale.max;
  const ticks = scale.ticks.filter((tick) => tick <= yMax);

  const plotWidth = Math.max(10, width - MARGIN.left - MARGIN.right);
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const x = (index: number) =>
    MARGIN.left + (points.length <= 1 ? plotWidth / 2 : (index / (points.length - 1)) * plotWidth);
  const y = (value: number) =>
    MARGIN.top + plotHeight - ((value - scale.min) / Math.max(1e-9, yMax - scale.min)) * plotHeight;

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index)} ${y(point.value)}`)
    .join(' ');
  const baseline = MARGIN.top + plotHeight;
  const areaPath =
    points.length > 1
      ? `${linePath} L${x(points.length - 1)} ${baseline} L${x(0)} ${baseline} Z`
      : '';
  const last = points.at(-1);
  const active = activeIndex !== null ? points[activeIndex] : undefined;
  const xLabelIndices = [
    ...new Set([0, Math.floor((points.length - 1) / 2), points.length - 1]),
  ].filter((index) => index >= 0);

  const indexFromPointer = (event: PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relative = (event.clientX - rect.left) / Math.max(1, rect.width);
    return Math.round(Math.min(1, Math.max(0, relative)) * (points.length - 1));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = activeIndex ?? points.length - 1;
    const targets: Record<string, number | null> = {
      ArrowLeft: Math.max(0, current - 1),
      ArrowRight: Math.min(points.length - 1, current + 1),
      Home: 0,
      End: points.length - 1,
      Escape: null,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    onActiveIndexChange(targets[event.key] ?? null);
  };

  const tooltipLeft =
    active && activeIndex !== null ? Math.min(Math.max(x(activeIndex), 90), width - 90) : 0;
  const summary =
    points.length > 1
      ? `${title} der letzten ${points.length} Übungen: zwischen ${formatValue(dataMin)} und ${formatValue(dataMax)} ${unit}, zuletzt ${formatValue(last?.value ?? 0)} ${unit}. Mit den Pfeiltasten einzelne Werte anzeigen.`
      : last
        ? `${title} deiner letzten Übung: ${formatValue(last.value)} ${unit}.`
        : title;

  return (
    <figure className="min-w-0">
      <figcaption id={titleId} className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-[15px] font-semibold text-ink">{title}</span>
        <span className="text-xs text-ink-muted">in {unit}</span>
      </figcaption>
      <div
        ref={ref}
        role="img"
        aria-label={summary}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (activeIndex === null) onActiveIndexChange(points.length - 1);
        }}
        onBlur={() => onActiveIndexChange(null)}
        className="relative rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ minHeight: HEIGHT }}
      >
        {width > 0 && (
          <svg width={width} height={HEIGHT} className="block overflow-visible" aria-hidden="true">
            {ticks.map((tick) => (
              <g key={tick}>
                <line
                  x1={MARGIN.left}
                  x2={MARGIN.left + plotWidth}
                  y1={y(tick)}
                  y2={y(tick)}
                  stroke="var(--tf-line)"
                  strokeWidth={1}
                  shapeRendering="crispEdges"
                />
                <text
                  x={MARGIN.left - 10}
                  y={y(tick)}
                  textAnchor="end"
                  dominantBaseline="central"
                  fontSize={11}
                  fill="var(--tf-ink-muted)"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatValue(tick)}
                </text>
              </g>
            ))}
            {xLabelIndices.map((index) => (
              <text
                key={index}
                x={x(index)}
                y={HEIGHT - 8}
                fontSize={11}
                fill="var(--tf-ink-muted)"
                textAnchor={
                  index === 0 && points.length > 1
                    ? 'start'
                    : index === points.length - 1 && points.length > 1
                      ? 'end'
                      : 'middle'
                }
              >
                {points[index]?.axisLabel}
              </text>
            ))}
            {areaPath && <path d={areaPath} fill="var(--tf-accent)" opacity={0.1} />}
            {points.length > 1 && (
              <path
                d={linePath}
                fill="none"
                stroke="var(--tf-accent)"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}
            {active && activeIndex !== null && (
              <line
                x1={x(activeIndex)}
                x2={x(activeIndex)}
                y1={MARGIN.top}
                y2={baseline}
                stroke="var(--tf-line-strong)"
                strokeWidth={1}
                shapeRendering="crispEdges"
              />
            )}
            {last && (
              <>
                <circle
                  cx={x(points.length - 1)}
                  cy={y(last.value)}
                  r={4.5}
                  fill="var(--tf-accent)"
                  stroke="var(--tf-surface)"
                  strokeWidth={2}
                />
                <text
                  x={x(points.length - 1) + 9}
                  y={y(last.value)}
                  dominantBaseline="central"
                  fontSize={12}
                  fontWeight={600}
                  fill="var(--tf-ink)"
                >
                  {formatValue(last.value)}
                </text>
              </>
            )}
            {active && activeIndex !== null && (
              <circle
                cx={x(activeIndex)}
                cy={y(active.value)}
                r={5}
                fill="var(--tf-accent)"
                stroke="var(--tf-surface)"
                strokeWidth={2}
              />
            )}
            <rect
              x={MARGIN.left - 12}
              y={MARGIN.top}
              width={plotWidth + 24}
              height={plotHeight}
              fill="transparent"
              onPointerMove={(event) => onActiveIndexChange(indexFromPointer(event))}
              onPointerDown={(event) => onActiveIndexChange(indexFromPointer(event))}
              onPointerLeave={() => onActiveIndexChange(null)}
            />
          </svg>
        )}
        {active && (
          <div
            className="pointer-events-none absolute top-0 z-10 w-max max-w-44 -translate-x-1/2 rounded-xl border border-line bg-surface px-3 py-2 shadow-raised"
            style={{ left: tooltipLeft }}
          >
            <p className="text-[15px] font-semibold text-ink">
              {formatValue(active.value)}{' '}
              <span className="text-xs font-medium text-ink-muted">{unit}</span>
            </p>
            <p className="mt-0.5 truncate text-xs text-ink-muted">{active.label}</p>
            <p className="text-xs text-ink-muted">{active.date}</p>
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {active ? `${formatValue(active.value)} ${unit}, ${active.label}, ${active.date}` : ''}
      </p>
    </figure>
  );
}
