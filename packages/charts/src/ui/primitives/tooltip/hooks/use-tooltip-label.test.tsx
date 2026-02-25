import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import type { NormalizedChartPayloadItem } from "../../payload/chart-payload-normalizer";

import { useTooltipLabel } from "./use-tooltip-label";

afterEach(cleanup);

const createNormalizedPayload = (
  overrides: Partial<NormalizedChartPayloadItem> = {}
): NormalizedChartPayloadItem[] => [
  {
    color: "var(--color-chart-1)",
    item: { name: "visits", value: 120 },
    itemConfig: undefined,
    key: "visits",
    label: "Payload Label",
    payloadData: { visits: 120 },
    value: 120,
    ...overrides,
  },
];

describe("useTooltipLabel", () => {
  it("returns null when labels are hidden", () => {
    const Probe = () => {
      const tooltipLabel = useTooltipLabel({
        hideLabel: true,
        label: "Tooltip Label",
        normalizedPayload: createNormalizedPayload(),
        payload: [{ value: 120 }],
      });

      return tooltipLabel;
    };

    render(<Probe />);

    expect(screen.queryByText("Tooltip Label")).toBeNull();
  });

  it("prefers config label over tooltip label and payload label", () => {
    const Probe = () => {
      const tooltipLabel = useTooltipLabel({
        hideLabel: false,
        label: "Tooltip Label",
        normalizedPayload: createNormalizedPayload({
          itemConfig: { color: "var(--color-chart-1)", label: "Config Label" },
        }),
        payload: [{ value: 120 }],
      });

      return tooltipLabel;
    };

    render(<Probe />);

    expect(screen.queryByText("Config Label")).not.toBeNull();
    expect(screen.queryByText("Tooltip Label")).toBeNull();
    expect(screen.queryByText("Payload Label")).toBeNull();
  });

  it("passes resolved label value to labelFormatter", () => {
    let formattedLabel = "";

    const Probe = () => {
      const tooltipLabel = useTooltipLabel({
        hideLabel: false,
        label: "Tooltip Label",
        labelFormatter: (value, payload) => {
          formattedLabel = `${String(value)} (${payload.length})`;
          return formattedLabel;
        },
        normalizedPayload: createNormalizedPayload({
          itemConfig: { color: "var(--color-chart-1)", label: "Config Label" },
        }),
        payload: [{ value: 120 }],
      });

      return tooltipLabel;
    };

    render(<Probe />);

    expect(formattedLabel).toBe("Config Label (1)");
    expect(screen.queryByText("Config Label (1)")).not.toBeNull();
  });
});
