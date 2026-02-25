import { describe, expect, it } from "bun:test";

import { createHeatmapTooltipLabel } from "./create-heatmap-tooltip-label";

describe("createHeatmapTooltipLabel", () => {
  it("returns default formatted labels", () => {
    const formatter = createHeatmapTooltipLabel();

    expect(
      formatter({
        date: new Date("2026-01-01"),
        formattedValue: "4",
        isOutsideDate: false,
        isoDate: "2026-01-01",
        value: 4,
      })
    ).toBe("2026-01-01: 4");
  });

  it("supports outside date suffix and custom contract", () => {
    const defaultFormatter = createHeatmapTooltipLabel();

    expect(
      defaultFormatter({
        date: new Date("2026-01-01"),
        formattedValue: "No data",
        isOutsideDate: true,
        isoDate: "2026-01-01",
        value: null,
      })
    ).toBe("2026-01-01: No data (outside range)");

    const customFormatter = createHeatmapTooltipLabel(
      ({ isoDate }) => `custom:${isoDate}:none`
    );

    expect(
      customFormatter({
        date: new Date("2026-01-01"),
        formattedValue: "No data",
        isOutsideDate: true,
        isoDate: "2026-01-01",
        value: null,
      })
    ).toBe("custom:2026-01-01:none");
  });
});
