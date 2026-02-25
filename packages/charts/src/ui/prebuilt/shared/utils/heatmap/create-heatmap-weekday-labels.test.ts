import { describe, expect, it } from "bun:test";

import { createHeatmapWeekdayLabels } from "./create-heatmap-weekday-labels";

describe("createHeatmapWeekdayLabels", () => {
  it("orders labels from the provided week start", () => {
    const mondayLabels = createHeatmapWeekdayLabels(1, "en-US");

    expect(mondayLabels[0]?.label).toBe("Mon");
    expect(mondayLabels[6]?.label).toBe("Sun");
  });
});
