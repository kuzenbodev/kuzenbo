import { describe, expect, it } from "bun:test";

import { mapHeatmapValueToColor } from "./map-heatmap-value-to-color";

describe("mapHeatmapValueToColor", () => {
  const colorRange = ["black", "gray", "white"] as const;

  it("maps null values to the first color", () => {
    const mapped = mapHeatmapValueToColor({
      colorRange,
      domain: [0, 100],
      value: null,
    });

    expect(mapped.color).toBe("black");
    expect(mapped.level).toBe(0);
  });

  it("maps domain max value to the highest color level", () => {
    const mapped = mapHeatmapValueToColor({
      colorRange,
      domain: [0, 100],
      value: 100,
    });

    expect(mapped.color).toBe("white");
    expect(mapped.level).toBe(2);
  });

  it("clamps values outside of domain bounds", () => {
    const mapped = mapHeatmapValueToColor({
      colorRange,
      domain: [0, 100],
      value: 350,
    });

    expect(mapped.color).toBe("white");
    expect(mapped.intensity).toBe(1);
  });
});
