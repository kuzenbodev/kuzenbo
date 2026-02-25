import { describe, expect, it } from "bun:test";

import { createLabelListContentRenderer } from "./create-label-list-content-renderer";
import { resolveLabelDatum } from "./resolve-label-datum";

describe("label utils", () => {
  it("resolves nested payload datum before fallback", () => {
    expect(
      resolveLabelDatum({ payload: { id: "nested" } }, { id: "fallback" })
    ).toEqual({
      id: "nested",
    });

    expect(resolveLabelDatum({ id: "top-level" }, { id: "fallback" })).toEqual({
      id: "top-level",
    });

    expect(resolveLabelDatum(null, { id: "fallback" })).toEqual({
      id: "fallback",
    });
  });

  it("returns an empty string when x/y coordinates are missing", () => {
    const renderer = createLabelListContentRenderer({
      fallbackDatum: { id: "fallback" },
      resolveLabelValue: (value, datum) => `${datum.id}:${String(value)}`,
    });

    expect(renderer({ payload: { id: "payload" }, value: 10 })).toBe("");
  });

  it("renders a text element with normalized label props", () => {
    const renderer = createLabelListContentRenderer({
      datumByIndex: [{ id: "index-0" }],
      fallbackDatum: { id: "fallback" },
      resolveLabelValue: (value, datum) => `${datum.id}:${String(value)}`,
    });

    const result = renderer({
      className: "chart-label",
      content: "ignored",
      dominantBaseline: "middle",
      dx: 1,
      dy: 2,
      fill: "var(--color-foreground)",
      fontSize: 12,
      fontWeight: 600,
      index: 0,
      payload: { payload: { id: "payload" } },
      style: { opacity: 0.7 },
      textAnchor: "middle",
      value: 11,
      x: 40,
      y: 60,
    });

    expect(typeof result).toBe("object");
    expect((result as { type: string }).type).toBe("text");
    expect((result as { props: { children: string } }).props.children).toBe(
      "payload:11"
    );
    expect((result as { props: { className?: string } }).props.className).toBe(
      "chart-label"
    );
  });

  it("uses index-based datum and fallback datum when payload is not an object", () => {
    const renderer = createLabelListContentRenderer({
      datumByIndex: [{ id: "index-0" }],
      fallbackDatum: { id: "fallback" },
      resolveLabelValue: (value, datum) => `${datum.id}:${String(value)}`,
    });

    const withIndex = renderer({
      index: 0,
      payload: "invalid",
      value: 3,
      x: 1,
      y: 2,
    });
    const withFallback = renderer({ payload: "invalid", value: 4, x: 1, y: 2 });

    expect((withIndex as { props: { children: string } }).props.children).toBe(
      "index-0:3"
    );
    expect(
      (withFallback as { props: { children: string } }).props.children
    ).toBe("fallback:4");
  });
});
