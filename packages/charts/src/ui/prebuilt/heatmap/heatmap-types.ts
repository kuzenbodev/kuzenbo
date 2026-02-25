import type { CompleteChartDatum } from "../shared/complete-types";
import type {
  HeatmapCell,
  HeatmapDateLike,
  HeatmapSection,
  HeatmapTooltipLabelFormatter,
  HeatmapWeekStartsOn,
  HeatmapWeekdayLabel,
} from "../shared/utils/heatmap";

interface HeatmapProps<TData extends CompleteChartDatum = CompleteChartDatum> {
  cellSize?: number;
  className?: string;
  colorDomain?: readonly [number, number];
  colorRange?: readonly string[];
  data: readonly TData[];
  dateKey: keyof TData & string;
  emptyCellColor?: string;
  endDate?: HeatmapDateLike;
  gap?: number;
  locale?: string;
  radius?: number;
  splitMonths?: boolean;
  startDate?: HeatmapDateLike;
  tooltipLabelFormatter?: HeatmapTooltipLabelFormatter;
  valueFormatter?: (value: number, datum: TData) => string;
  valueKey: keyof TData & string;
  weekStartsOn?: HeatmapWeekStartsOn;
  withMonthLabels?: boolean;
  withOutsideDates?: boolean;
  withWeekdayLabels?: boolean;
}

interface HeatmapCellRuntime<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  color: string;
  formattedValue: string;
  tooltipLabel: string;
  value: number | null;
  valueDatum: TData | null;
}

interface UseHeatmapRuntimeResult<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  colorDomain: readonly [number, number];
  sections: readonly HeatmapSection[];
  weekdayLabels: readonly HeatmapWeekdayLabel[];
  withOutsideDates: boolean;
  resolveCellRuntime: (cell: HeatmapCell) => HeatmapCellRuntime<TData>;
}

export type { HeatmapCellRuntime, HeatmapProps, UseHeatmapRuntimeResult };
