import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { Progress } from "./progress";

afterEach(cleanup);

const ROOT_CLASS_NAME = () => "progress-root-from-fn";
const TRACK_CLASS_NAME = () => "progress-track-from-fn";
const INDICATOR_CLASS_NAME = () => "progress-indicator-from-fn";
const LABEL_CLASS_NAME = () => "progress-label-from-fn";
const VALUE_CLASS_NAME = () => "progress-value-from-fn";

describe("Progress", () => {
  it("renders with value", () => {
    render(<Progress value={50} />);
    expect(document.querySelector("[data-slot=progress]")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(<Progress value={0} />);
    expect(document.querySelector("[data-slot=progress]")).toBeDefined();
  });

  it("preserves className callback support for progress parts", () => {
    render(
      <Progress className={ROOT_CLASS_NAME} value={50}>
        <Progress.Label className={LABEL_CLASS_NAME}>Progress</Progress.Label>
        <Progress.Value className={VALUE_CLASS_NAME} />
        <Progress.Track className={TRACK_CLASS_NAME}>
          <Progress.Indicator className={INDICATOR_CLASS_NAME} />
        </Progress.Track>
      </Progress>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=progress]");
    const label = document.querySelector<HTMLElement>(
      "[data-slot=progress-label]"
    );
    const value = document.querySelector<HTMLElement>(
      "[data-slot=progress-value]"
    );
    const track = document.querySelector<HTMLElement>(
      "[data-slot=progress-track]"
    );
    const indicator = document.querySelector<HTMLElement>(
      "[data-slot=progress-indicator]"
    );

    expect(root?.className.includes("progress-root-from-fn")).toBe(true);
    expect(label?.className.includes("progress-label-from-fn")).toBe(true);
    expect(value?.className.includes("progress-value-from-fn")).toBe(true);
    expect(track?.className.includes("progress-track-from-fn")).toBe(true);
    expect(indicator?.className.includes("progress-indicator-from-fn")).toBe(
      true
    );
  });
});
