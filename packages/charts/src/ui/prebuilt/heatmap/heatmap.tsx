"use client";

import type { CSSProperties } from "react";

import type { CompleteChartDatum } from "../shared/complete-types";
import type { HeatmapProps } from "./heatmap-types";
import { useHeatmapRuntime } from "./hooks/use-heatmap-runtime";

const DEFAULT_CELL_SIZE = 12;
const DEFAULT_CELL_GAP = 3;
const DEFAULT_CELL_RADIUS = 3;

const joinClassNames = (
  ...classNames: readonly (string | undefined)[]
): string => classNames.filter(Boolean).join(" ");

const Heatmap = <TData extends CompleteChartDatum = CompleteChartDatum>({
  cellSize = DEFAULT_CELL_SIZE,
  className,
  colorDomain,
  colorRange,
  data,
  dateKey,
  emptyCellColor,
  endDate,
  gap = DEFAULT_CELL_GAP,
  locale,
  radius = DEFAULT_CELL_RADIUS,
  splitMonths = false,
  startDate,
  tooltipLabelFormatter,
  valueFormatter,
  valueKey,
  weekStartsOn,
  withMonthLabels = true,
  withOutsideDates = true,
  withWeekdayLabels = true,
}: HeatmapProps<TData>) => {
  const {
    colorDomain: resolvedColorDomain,
    resolveCellRuntime,
    sections,
    weekdayLabels,
  } = useHeatmapRuntime({
    colorDomain,
    colorRange,
    data,
    dateKey,
    emptyCellColor,
    endDate,
    locale,
    splitMonths,
    startDate,
    tooltipLabelFormatter,
    valueFormatter,
    valueKey,
    weekStartsOn,
    withOutsideDates,
  });

  const sectionGridGapStyle = { columnGap: gap } satisfies CSSProperties;

  return (
    <div
      className={joinClassNames("flex flex-col gap-4", className)}
      data-domain-max={resolvedColorDomain[1]}
      data-domain-min={resolvedColorDomain[0]}
      data-slot="heatmap"
    >
      {sections.map((section) => {
        const monthLabelByWeekIndex = new Map(
          section.monthLabels.map((label) => [label.weekIndex, label.label])
        );

        return (
          <section
            className="flex flex-col gap-2"
            data-month-key={section.monthKey}
            key={section.key}
          >
            {splitMonths && withMonthLabels ? (
              <p className="text-foreground text-sm font-medium">
                {section.monthLabel}
              </p>
            ) : null}
            <div className="flex items-start gap-2">
              {withWeekdayLabels ? (
                <div
                  aria-hidden
                  className="text-muted-foreground grid pt-5 text-[11px] leading-[1]"
                  style={{
                    rowGap: gap,
                    gridTemplateRows: `repeat(7, ${cellSize}px)`,
                  }}
                >
                  {weekdayLabels.map((weekday) => (
                    <span
                      className="inline-flex items-center"
                      key={weekday.key}
                    >
                      {weekday.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-col gap-1">
                {withMonthLabels ? (
                  <div
                    aria-hidden
                    className="text-muted-foreground grid text-[11px] leading-4"
                    style={{
                      columnGap: gap,
                      gridTemplateColumns: `repeat(${section.weeks.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {section.weeks.map((week, weekIndex) => {
                      const monthLabel = splitMonths
                        ? ""
                        : monthLabelByWeekIndex.get(weekIndex);

                      return (
                        <span key={`${week.key}-label`}>{monthLabel}</span>
                      );
                    })}
                  </div>
                ) : null}
                <div className="flex" style={sectionGridGapStyle}>
                  {section.weeks.map((week) => (
                    <div
                      className="grid"
                      key={week.key}
                      role="row"
                      style={{
                        rowGap: gap,
                        gridTemplateRows: `repeat(7, ${cellSize}px)`,
                      }}
                    >
                      {week.cells.map((cell) => {
                        const cellRuntime = resolveCellRuntime(cell);
                        const isVisible =
                          withOutsideDates || cell.isOutsideDate === false;

                        return (
                          <div
                            aria-hidden={!isVisible}
                            aria-label={
                              isVisible ? cellRuntime.tooltipLabel : undefined
                            }
                            data-iso-date={cell.isoDate}
                            data-outside-date={cell.isOutsideDate || undefined}
                            data-value={cellRuntime.value ?? undefined}
                            key={`${week.key}-${cell.isoDate}`}
                            role="gridcell"
                            style={{
                              backgroundColor: isVisible
                                ? cellRuntime.color
                                : "transparent",
                              border: isVisible
                                ? undefined
                                : "1px solid var(--color-border)",
                              borderRadius: radius,
                              height: cellSize,
                              opacity: isVisible ? 1 : 0.45,
                              width: cellSize,
                            }}
                            title={
                              isVisible ? cellRuntime.tooltipLabel : undefined
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export { Heatmap };
export type { HeatmapCellRuntime, HeatmapProps } from "./heatmap-types";
export type {
  HeatmapDateLike,
  HeatmapTooltipLabelArgs,
  HeatmapTooltipLabelFormatter,
  HeatmapWeekStartsOn,
} from "../shared/utils/heatmap";
