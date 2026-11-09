const eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
const eur0 = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export const fmtEur = (v: number, compact = false) => (Number.isFinite(v) ? (compact ? eur0.format(v) : eur.format(v)) : '–');
export const fmtNum = (v: number, digits = 2) =>
  Number.isFinite(v) ? v.toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits }) : '–';
export const fmtPct = (v: number, digits = 2, sign = false) =>
  Number.isFinite(v) ? `${sign && v > 0 ? '+' : ''}${fmtNum(v, digits)} %` : '–';
export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
export const fmtDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h} Std. ${m} Min.` : `${m} Min.`;
};
