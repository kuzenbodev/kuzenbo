import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { useTooltipValueFormat } from "./use-tooltip-value-format";

afterEach(cleanup);

describe("useTooltipValueFormat", () => {
  it("prioritizes custom valueFormatter when numeric value and payload data exist", () => {
    let formattedValue = "";

    const Probe = () => {
      const formatValue = useTooltipValueFormat({
        valueFormatter: (value) => `$${value}`,
      });

      formattedValue = formatValue(120, "visits", { visits: 120 });

      return null;
    };

    render(<Probe />);

    expect(formattedValue).toBe("$120");
  });

  it("falls back to unit formatting for numeric values when no formatter is provided", () => {
    let formattedValue = "";

    const Probe = () => {
      const formatValue = useTooltipValueFormat({
        unit: "USD",
      });

      formattedValue = formatValue("120", "visits", { visits: 120 });

      return null;
    };

    render(<Probe />);

    expect(formattedValue).toBe("120 USD");
  });

  it("stringifies non-numeric values", () => {
    let formattedValue = "";

    const Probe = () => {
      const formatValue = useTooltipValueFormat({});

      formattedValue = formatValue("N/A", "visits", { visits: "N/A" });

      return null;
    };

    render(<Probe />);

    expect(formattedValue).toBe("N/A");
  });
});
