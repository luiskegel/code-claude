import type { LessonWidget as WidgetId } from '@/types';
import { CompoundCalc, DiversificationCalc, DividendCalc, ReturnCalc, SavingsCalc } from '@/components/calculators/Calculators';
import { BalanceSheetWidget, IndexWeightsWidget, KpiWidget, OrderTypesWidget, SpreadWidget, SupplyDemandWidget } from './MarketWidgets';
import { CandlestickWidget, IndicatorsWidget } from './ChartWidgets';
import { DrawdownWidget, EtfComparisonWidget, InflationWidget, LeverageWidget, PsychologyWidget, RiskCalculatorWidget } from './RiskWidgets';
import { AnalysisChecklistWidget, InvestmentPlanWidget } from './PlanWidgets';

export const WIDGET_TITLES: Record<WidgetId, string> = {
  'supply-demand': 'Simulator: Angebot und Nachfrage',
  'index-weights': 'Index-Gewichtungs-Rechner',
  'order-types': 'Ordertypen-Simulator',
  spread: 'Spread- und Gebühren-Rechner',
  'profit-loss': 'Gewinn-/Verlust- und Renditerechner',
  'balance-sheet': 'Bilanz-Baukasten',
  'kpi-calculator': 'Kennzahlen-Rechner',
  candlestick: 'Interaktiver Kerzenchart',
  indicators: 'Indikator-Labor',
  'dividend-calculator': 'Dividendenrechner',
  'compound-interest': 'Zinseszins-Visualisierer',
  'savings-plan': 'Sparplan-Simulator',
  'etf-comparison': 'ETF-Vergleich (fiktive Beispieldaten)',
  'risk-calculator': 'Risikorechner',
  drawdown: 'Drawdown-Simulator',
  diversification: 'Diversifikations-Simulator',
  'psychology-scenarios': 'Entscheidungssituationen',
  inflation: 'Inflationsrechner',
  'analysis-checklist': 'Interaktive Analyse-Checkliste',
  leverage: 'Hebel-Simulator',
  'investment-plan': 'Investmentplan-Assistent',
};

export function LessonWidgetView({ id }: { id: WidgetId }) {
  switch (id) {
    case 'supply-demand':
      return <SupplyDemandWidget />;
    case 'index-weights':
      return <IndexWeightsWidget />;
    case 'order-types':
      return <OrderTypesWidget />;
    case 'spread':
      return <SpreadWidget />;
    case 'profit-loss':
      return <ReturnCalc compact />;
    case 'balance-sheet':
      return <BalanceSheetWidget />;
    case 'kpi-calculator':
      return <KpiWidget />;
    case 'candlestick':
      return <CandlestickWidget />;
    case 'indicators':
      return <IndicatorsWidget />;
    case 'dividend-calculator':
      return <DividendCalc compact />;
    case 'compound-interest':
      return <CompoundCalc compact />;
    case 'savings-plan':
      return <SavingsCalc compact />;
    case 'etf-comparison':
      return <EtfComparisonWidget />;
    case 'risk-calculator':
      return <RiskCalculatorWidget />;
    case 'drawdown':
      return <DrawdownWidget />;
    case 'diversification':
      return <DiversificationCalc compact />;
    case 'psychology-scenarios':
      return <PsychologyWidget />;
    case 'inflation':
      return <InflationWidget />;
    case 'analysis-checklist':
      return <AnalysisChecklistWidget />;
    case 'leverage':
      return <LeverageWidget />;
    case 'investment-plan':
      return <InvestmentPlanWidget />;
    default:
      return null;
  }
}
