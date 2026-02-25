export type HeatmapDateLike = Date | string | number;

export type HeatmapWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface HeatmapCell {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: number;
  isoDate: string;
  isInRange: boolean;
  isOutsideDate: boolean;
  monthKey: string;
}

export interface HeatmapWeek {
  cells: readonly HeatmapCell[];
  key: string;
  startIsoDate: string;
}

export interface HeatmapMonthLabel {
  key: string;
  label: string;
  weekIndex: number;
}

export interface HeatmapSection {
  key: string;
  monthKey: string;
  monthLabel: string;
  monthLabels: readonly HeatmapMonthLabel[];
  weeks: readonly HeatmapWeek[];
}

export interface HeatmapWeekdayLabel {
  dayOfWeek: number;
  key: string;
  label: string;
}

export interface GenerateHeatmapSectionsOptions {
  endDate: HeatmapDateLike;
  locale?: string;
  splitMonths?: boolean;
  startDate: HeatmapDateLike;
  weekStartsOn?: HeatmapWeekStartsOn;
  withOutsideDates?: boolean;
}

export interface MapHeatmapValueToColorArgs {
  colorRange: readonly string[];
  domain: readonly [number, number];
  value: number | null;
}

export interface MappedHeatmapValue {
  color: string;
  intensity: number;
  level: number;
}

export interface HeatmapTooltipLabelArgs {
  date: Date;
  formattedValue: string;
  isOutsideDate: boolean;
  isoDate: string;
  value: number | null;
}

export type HeatmapTooltipLabelFormatter = (
  args: HeatmapTooltipLabelArgs
) => string;
