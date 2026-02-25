import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { useLegendHighlightHandlers } from "./use-legend-highlight-handlers";

afterEach(cleanup);

describe("useLegendHighlightHandlers", () => {
  it("emits highlight and reset values through returned handlers", () => {
    const highlightedSeries: (string | null)[] = [];

    const Probe = () => {
      const { clearHighlight, getHighlightHandler } =
        useLegendHighlightHandlers({
          onHighlightChange: (seriesName) => {
            highlightedSeries.push(seriesName);
          },
        });

      return (
        <button
          onBlur={clearHighlight}
          onFocus={getHighlightHandler("visits")}
          onMouseEnter={getHighlightHandler("visits")}
          onMouseLeave={clearHighlight}
          type="button"
        >
          visits
        </button>
      );
    };

    render(<Probe />);

    const button = screen.getByRole("button", { name: "visits" });

    fireEvent.focus(button);
    fireEvent.blur(button);
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    expect(highlightedSeries).toEqual(["visits", null, "visits", null]);
  });

  it("keeps handlers safe when highlight callback is missing", () => {
    const Probe = () => {
      const { clearHighlight, getHighlightHandler } =
        useLegendHighlightHandlers({});

      return (
        <button
          onBlur={clearHighlight}
          onFocus={getHighlightHandler("revenue")}
          type="button"
        >
          revenue
        </button>
      );
    };

    render(<Probe />);

    const button = screen.getByRole("button", { name: "revenue" });

    fireEvent.focus(button);
    fireEvent.blur(button);

    expect(button).not.toBeNull();
  });
});
