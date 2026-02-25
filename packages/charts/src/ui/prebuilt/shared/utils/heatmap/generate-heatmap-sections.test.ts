import { describe, expect, it } from "bun:test";

import { generateHeatmapSections } from "./generate-heatmap-sections";

describe("generateHeatmapSections", () => {
  it("creates a single section with month labels across a date range", () => {
    const sections = generateHeatmapSections({
      endDate: "2026-02-03",
      locale: "en-US",
      startDate: "2026-01-28",
    });

    expect(sections).toHaveLength(1);
    expect(sections[0]?.weeks.length).toBeGreaterThan(0);
    expect(
      sections[0]?.monthLabels.some((label) => label.label === "Jan 2026")
    ).toBe(true);
    expect(
      sections[0]?.monthLabels.some((label) => label.label === "Feb 2026")
    ).toBe(true);
  });

  it("splits sections by month when requested", () => {
    const sections = generateHeatmapSections({
      endDate: "2026-02-03",
      locale: "en-US",
      splitMonths: true,
      startDate: "2026-01-28",
    });

    expect(sections.map((section) => section.monthKey)).toEqual([
      "2026-01",
      "2026-02",
    ]);
  });

  it("respects weekStartsOn alignment", () => {
    const sections = generateHeatmapSections({
      endDate: "2026-01-05",
      startDate: "2026-01-01",
      weekStartsOn: 1,
    });

    expect(sections[0]?.weeks[0]?.startIsoDate).toBe("2025-12-29");
  });
});
