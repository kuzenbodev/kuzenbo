import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import type { CompleteChartDatum } from "../shared/complete-types";

import { Heatmap, type HeatmapTooltipLabelArgs } from "./heatmap";
import {
  heatmapCrossMonthData,
  heatmapDateObjectData,
  heatmapPrimaryData,
  heatmapSparseData,
} from "./heatmap-test-data";

afterEach(cleanup);

const formatHeatmapTooltipValue = (value: number | null): number | string =>
  value ?? "none";

const heatmapTooltipLabelFormatter = ({
  isoDate,
  value,
}: HeatmapTooltipLabelArgs): string =>
  `Tooltip:${isoDate}:${formatHeatmapTooltipValue(value)}`;

describe("Heatmap", () => {
  const heatmapDateObjectRuntimeData =
    heatmapDateObjectData as unknown as readonly CompleteChartDatum[];

  it("generates full week date ranges and marks outside dates", () => {
    const { container } = render(
      <Heatmap
        data={heatmapPrimaryData}
        dateKey="date"
        endDate="2026-01-12"
        startDate="2026-01-01"
        valueKey="activity"
      />
    );

    const outsideCells = container.querySelectorAll(
      "[data-outside-date='true']"
    );

    expect(outsideCells.length).toBeGreaterThan(0);
    expect(container.querySelectorAll("[role='gridcell']").length).toBe(21);
  });

  it("hides outside dates when withOutsideDates is disabled", () => {
    const { container } = render(
      <Heatmap
        data={heatmapPrimaryData}
        dateKey="date"
        endDate="2026-01-12"
        startDate="2026-01-01"
        valueKey="activity"
        withOutsideDates={false}
      />
    );

    const hiddenOutsideCell = container.querySelector(
      "[data-outside-date='true'][aria-hidden='true']"
    );

    expect(hiddenOutsideCell).not.toBeNull();
  });

  it("renders weekday and month labels", () => {
    render(
      <Heatmap
        data={heatmapPrimaryData}
        dateKey="date"
        endDate="2026-01-12"
        startDate="2026-01-01"
        valueKey="activity"
        withMonthLabels
        withWeekdayLabels
      />
    );

    expect(screen.getByText("Sun")).not.toBeNull();
    expect(screen.getAllByText("Jan 2026").length).toBeGreaterThan(0);
  });

  it("splits output into month sections when splitMonths is enabled", () => {
    const { container } = render(
      <Heatmap
        data={heatmapCrossMonthData}
        dateKey="date"
        endDate="2026-02-05"
        splitMonths
        startDate="2026-01-28"
        valueKey="activity"
      />
    );

    expect(
      container.querySelector("[data-month-key='2026-01']")
    ).not.toBeNull();
    expect(
      container.querySelector("[data-month-key='2026-02']")
    ).not.toBeNull();
  });

  it("maps values to a provided color domain", () => {
    const { container } = render(
      <Heatmap
        colorDomain={[0, 10]}
        colorRange={["black", "white"]}
        data={heatmapCrossMonthData}
        dateKey="date"
        endDate="2026-02-05"
        startDate="2026-01-28"
        valueKey="activity"
      />
    );

    const highestValueCell = container.querySelector(
      "[data-iso-date='2026-02-02']"
    ) as HTMLElement | null;

    expect(highestValueCell).not.toBeNull();
    expect(highestValueCell?.style.backgroundColor).toBe("white");
  });

  it("supports tooltip label formatter contract", () => {
    const { container } = render(
      <Heatmap
        data={heatmapSparseData}
        dateKey="date"
        endDate="2026-01-05"
        startDate="2026-01-01"
        tooltipLabelFormatter={heatmapTooltipLabelFormatter}
        valueKey="activity"
      />
    );

    const targetCell = container.querySelector(
      "[data-iso-date='2026-01-03']"
    ) as HTMLElement | null;

    expect(targetCell?.getAttribute("title")).toBe("Tooltip:2026-01-03:4");
  });

  it("accepts Date values in the dateKey data branch", () => {
    const { container } = render(
      <Heatmap
        data={heatmapDateObjectRuntimeData}
        dateKey="date"
        endDate="2026-01-04"
        startDate="2026-01-01"
        valueKey="activity"
      />
    );

    const targetCell = container.querySelector(
      "[data-iso-date='2026-01-03']"
    ) as HTMLElement | null;

    expect(targetCell).not.toBeNull();
    expect(targetCell?.dataset.value).toBe("9");
  });
});
