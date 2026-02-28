import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { Meter } from "./meter";

afterEach(cleanup);

const ROOT_CLASS_NAME = () => "meter-root-from-fn";
const TRACK_CLASS_NAME = () => "meter-track-from-fn";
const INDICATOR_CLASS_NAME = () => "meter-indicator-from-fn";
const LABEL_CLASS_NAME = () => "meter-label-from-fn";
const VALUE_CLASS_NAME = () => "meter-value-from-fn";

describe("Meter", () => {
  it("renders with value", () => {
    render(<Meter value={60} />);
    expect(document.querySelector("[data-slot=meter]")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(<Meter value={0} />);
    expect(document.querySelector("[data-slot=meter]")).toBeDefined();
  });

  it("preserves className callback support across meter parts", () => {
    render(
      <Meter className={ROOT_CLASS_NAME} value={60}>
        <Meter.Label className={LABEL_CLASS_NAME}>Storage</Meter.Label>
        <Meter.Value className={VALUE_CLASS_NAME} />
        <Meter.Track className={TRACK_CLASS_NAME}>
          <Meter.Indicator className={INDICATOR_CLASS_NAME} />
        </Meter.Track>
      </Meter>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=meter]");
    const label = document.querySelector<HTMLElement>(
      "[data-slot=meter-label]"
    );
    const value = document.querySelector<HTMLElement>(
      "[data-slot=meter-value]"
    );
    const track = document.querySelector<HTMLElement>(
      "[data-slot=meter-track]"
    );
    const indicator = document.querySelector<HTMLElement>(
      "[data-slot=meter-indicator]"
    );

    expect(root?.className.includes("meter-root-from-fn")).toBe(true);
    expect(label?.className.includes("meter-label-from-fn")).toBe(true);
    expect(value?.className.includes("meter-value-from-fn")).toBe(true);
    expect(track?.className.includes("meter-track-from-fn")).toBe(true);
    expect(indicator?.className.includes("meter-indicator-from-fn")).toBe(true);
  });
});
