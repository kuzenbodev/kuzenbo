/* eslint-disable func-style */
import { act, cleanup, render } from "@testing-library/react";
import createUserEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { RangeSlider } from "./range-slider";

afterEach(cleanup);

function rootClassName() {
  return "range-root-callback";
}
function controlClassName() {
  return "range-control-callback";
}
function thumbClassName() {
  return "range-thumb-callback";
}
const divideByTenScale = (value: number) => value / 10;

const marks = [
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "80", value: 80 },
] as const;

const getMarkByLabel = (label: string) =>
  [...document.querySelectorAll<HTMLElement>("[data-slot=slider-mark]")].find(
    (mark) => mark.textContent?.trim() === label
  );

const getMarkDotClassName = (mark: HTMLElement | undefined) =>
  mark?.querySelector<HTMLElement>("span[aria-hidden=true]")?.className ?? "";

const getRangeInputs = () => [
  ...document.querySelectorAll<HTMLInputElement>(
    "[data-slot=slider-thumb] input[type=range]"
  ),
];
const getRangeSliderControl = () =>
  document.querySelector<HTMLElement>("[data-slot=slider-control]");
const getRangeSliderRoot = () =>
  document.querySelector<HTMLElement>("[data-slot=slider]");
const getRangeThumbs = () => [
  ...document.querySelectorAll<HTMLElement>("[data-slot=slider-thumb]"),
];

describe("RangeSlider", () => {
  it("renders slider root with two range inputs", () => {
    render(<RangeSlider aria-label="Price range" defaultValue={[20, 80]} />);

    expect(document.querySelector("[data-slot=slider]")).not.toBeNull();
    expect(getRangeInputs().length).toBe(2);
  });

  it("uses control insets to keep endpoint thumbs aligned with marks", () => {
    render(<RangeSlider aria-label="Aligned range" defaultValue={[20, 80]} />);

    const slider = getRangeSliderRoot();
    const control = getRangeSliderControl();

    expect(slider).not.toBeNull();
    expect(control).not.toBeNull();
    expect(
      slider?.className.includes(
        "px-[calc(var(--slider-thumb-size,1.25rem)/2)]"
      )
    ).toBe(true);
    expect(slider?.dataset.thumbAlignment).toBeUndefined();
  });

  it("applies thumbFromLabel and thumbToLabel accessibility labels", () => {
    render(
      <RangeSlider
        defaultValue={[25, 75]}
        thumbFromLabel="From thumb"
        thumbToLabel="To thumb"
      />
    );

    const fromInput = document.querySelector<HTMLInputElement>(
      "[data-slot=slider-thumb] input[aria-label='From thumb']"
    );
    const toInput = document.querySelector<HTMLInputElement>(
      "[data-slot=slider-thumb] input[aria-label='To thumb']"
    );

    expect(fromInput).not.toBeNull();
    expect(toInput).not.toBeNull();
  });

  it("renders marks and thumb label slots", () => {
    render(<RangeSlider defaultValue={[30, 70]} labelAlwaysOn marks={marks} />);

    expect(document.querySelectorAll("[data-slot=slider-mark]").length).toBe(3);
    expect(
      document.querySelectorAll("[data-slot=slider-mark-label]").length
    ).toBe(3);
    expect(
      document.querySelectorAll("[data-slot=slider-thumb-label]").length
    ).toBe(2);
  });

  it("applies labelTransitionProps transition styles to both thumb labels", () => {
    const rangeSliderProps = {
      defaultValue: [30, 70],
      labelAlwaysOn: true,
      labelTransitionProps: {
        delay: 90,
        duration: 260,
        timingFunction: "ease-in-out",
      },
    } as unknown as Parameters<typeof RangeSlider>[0];

    render(<RangeSlider {...rangeSliderProps} />);

    const labels = document.querySelectorAll<HTMLElement>(
      "[data-slot=slider-thumb-label]"
    );

    expect(labels.length).toBe(2);

    for (const label of labels) {
      expect(label.style.transitionDelay).toBe("90ms");
      expect(label.style.transitionDuration).toBe("260ms");
      expect(label.style.transitionTimingFunction).toBe("ease-in-out");
    }
  });

  it("keeps focus visibility class contracts for thumbs and labels", () => {
    render(<RangeSlider defaultValue={[30, 70]} showLabelOnHover={false} />);

    const thumbs = getRangeThumbs();
    const labels = document.querySelectorAll<HTMLElement>(
      "[data-slot=slider-thumb-label]"
    );

    expect(thumbs.length).toBe(2);
    expect(labels.length).toBe(2);

    for (const thumb of thumbs) {
      expect(thumb.className.includes("has-[:focus-visible]")).toBe(true);
    }

    for (const label of labels) {
      expect(
        label.className.includes("group-has-[:focus]/thumb:opacity-100")
      ).toBe(true);
    }
  });

  it("renders named hidden inputs and forwards hiddenInputProps in hidden-input mode", () => {
    const rangeSliderProps = {
      defaultValue: [15, 85],
      hiddenInputProps: {
        "data-hidden-input": "range-slider",
        form: "range-slider-form",
      },
      name: "price",
    } as unknown as Parameters<typeof RangeSlider>[0];

    render(
      <form id="range-slider-form">
        <RangeSlider {...rangeSliderProps} />
      </form>
    );

    const hiddenInputs = [
      ...document.querySelectorAll<HTMLInputElement>(
        "input[type=hidden][data-hidden-input='range-slider']"
      ),
    ];

    expect(hiddenInputs.length).toBe(2);
    expect(hiddenInputs[0]?.getAttribute("name")).toBe("price_from");
    expect(hiddenInputs[1]?.getAttribute("name")).toBe("price_to");
    expect(hiddenInputs[0]?.value).toBe("15");
    expect(hiddenInputs[1]?.value).toBe("85");
    expect(hiddenInputs[0]?.getAttribute("form")).toBe("range-slider-form");
    expect(hiddenInputs[1]?.getAttribute("form")).toBe("range-slider-form");
  });

  it("does not attach submit names to internal range inputs in hidden-input mode", () => {
    const rangeSliderProps = {
      defaultValue: [25, 75],
      name: "internal-range",
    } as unknown as Parameters<typeof RangeSlider>[0];

    render(<RangeSlider {...rangeSliderProps} />);

    const rangeInputs = getRangeInputs();
    expect(rangeInputs.length).toBe(2);

    for (const input of rangeInputs) {
      expect(input.getAttribute("name")).toBeNull();
    }
  });

  it("applies scale to named hidden input values", () => {
    render(
      <RangeSlider
        defaultValue={[20, 60]}
        name="scaled-range"
        scale={divideByTenScale}
      />
    );

    const fromInput = document.querySelector<HTMLInputElement>(
      "input[type=hidden][name='scaled-range_from']"
    );
    const toInput = document.querySelector<HTMLInputElement>(
      "input[type=hidden][name='scaled-range_to']"
    );

    expect(fromInput?.value).toBe("2");
    expect(toInput?.value).toBe("6");
  });

  it("pushes and clamps the opposite thumb for keyboard minRange collisions", async () => {
    const user = createUserEvent.setup();

    render(
      <RangeSlider
        defaultValue={[30, 60]}
        minRange={20}
        pushOnOverlap
        step={7}
      />
    );

    const [fromInputCandidate, toInputCandidate] = getRangeInputs();

    expect(fromInputCandidate).not.toBeUndefined();
    expect(toInputCandidate).not.toBeUndefined();

    const fromInput = fromInputCandidate as HTMLInputElement;
    const toInput = toInputCandidate as HTMLInputElement;

    act(() => {
      toInput.focus();
    });
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("{ArrowLeft}");

    const fromAfterArrows = Number(fromInput.getAttribute("aria-valuenow"));
    const toAfterArrows = Number(toInput.getAttribute("aria-valuenow"));

    expect(fromAfterArrows < 30).toBe(true);
    expect(toAfterArrows < 60).toBe(true);
    expect(toAfterArrows - fromAfterArrows >= 20).toBe(true);

    await user.keyboard("{Home}");

    const fromAfterHome = Number(fromInput.getAttribute("aria-valuenow"));
    const toAfterHome = Number(toInput.getAttribute("aria-valuenow"));

    expect(fromAfterHome <= fromAfterArrows).toBe(true);
    expect(toAfterHome - fromAfterHome >= 20).toBe(true);
  });

  it("keeps range values on marks for keyboard interaction when restrictToMarks is enabled", async () => {
    const user = createUserEvent.setup();
    const markValues = new Set(["0", "20", "50", "80"]);

    render(
      <RangeSlider
        defaultValue={[20, 80]}
        marks={[{ value: 0 }, { value: 20 }, { value: 50 }, { value: 80 }]}
        restrictToMarks
        step={1}
      />
    );

    const [fromInputCandidate, toInputCandidate] = getRangeInputs();

    expect(fromInputCandidate).not.toBeUndefined();
    expect(toInputCandidate).not.toBeUndefined();

    const fromInput = fromInputCandidate as HTMLInputElement;
    const toInput = toInputCandidate as HTMLInputElement;

    act(() => {
      toInput.focus();
    });
    await user.keyboard("{ArrowLeft}");

    expect(toInput.getAttribute("aria-valuenow")).toBe("50");

    await user.keyboard("{Home}");

    const fromAfterHome = fromInput.getAttribute("aria-valuenow") as string;
    const toAfterHome = toInput.getAttribute("aria-valuenow") as string;

    expect(markValues.has(fromAfterHome)).toBe(true);
    expect(markValues.has(toAfterHome)).toBe(true);
    expect(Number(toAfterHome) - Number(fromAfterHome) > 0).toBe(true);

    await user.keyboard("{End}");

    const fromAfterEnd = fromInput.getAttribute("aria-valuenow") as string;
    const toAfterEnd = toInput.getAttribute("aria-valuenow") as string;

    expect(markValues.has(fromAfterEnd)).toBe(true);
    expect(markValues.has(toAfterEnd)).toBe(true);
    expect(Number(toAfterEnd) - Number(fromAfterEnd) > 0).toBe(true);
  });

  it("uses scale for displayed labels while keeping raw aria-valuenow values", () => {
    render(
      <RangeSlider
        defaultValue={[20, 60]}
        labelAlwaysOn
        scale={divideByTenScale}
      />
    );

    const inputs = getRangeInputs();
    const labels = document.querySelectorAll<HTMLElement>(
      "[data-slot=slider-thumb-label]"
    );

    expect(inputs[0]?.getAttribute("aria-valuenow")).toBe("20");
    expect(inputs[1]?.getAttribute("aria-valuenow")).toBe("60");
    expect(labels[0]?.textContent).toBe("2");
    expect(labels[1]?.textContent).toBe("6");
  });

  it("applies non-inverted fill semantics to range marks", () => {
    render(
      <RangeSlider
        aria-label="Range marks"
        defaultValue={[30, 70]}
        marks={marks}
      />
    );

    const mark20ClassName = getMarkDotClassName(getMarkByLabel("20"));
    const mark50ClassName = getMarkDotClassName(getMarkByLabel("50"));
    const mark80ClassName = getMarkDotClassName(getMarkByLabel("80"));

    expect(mark20ClassName.includes("bg-background")).toBe(true);
    expect(
      mark50ClassName.includes("bg-[var(--slider-color,var(--color-primary))]")
    ).toBe(true);
    expect(mark80ClassName.includes("bg-background")).toBe(true);
  });

  it("applies inverted fill semantics to range marks", () => {
    render(
      <RangeSlider
        aria-label="Inverted range marks"
        defaultValue={[30, 70]}
        inverted
        marks={marks}
      />
    );

    const mark20ClassName = getMarkDotClassName(getMarkByLabel("20"));
    const mark50ClassName = getMarkDotClassName(getMarkByLabel("50"));
    const mark80ClassName = getMarkDotClassName(getMarkByLabel("80"));

    expect(
      mark20ClassName.includes("bg-[var(--slider-color,var(--color-primary))]")
    ).toBe(true);
    expect(mark50ClassName.includes("bg-background")).toBe(true);
    expect(
      mark80ClassName.includes("bg-[var(--slider-color,var(--color-primary))]")
    ).toBe(true);
  });

  it("preserves callback className on root", () => {
    render(<RangeSlider className={rootClassName} defaultValue={[30, 70]} />);

    const root = getRangeSliderRoot();

    expect(root).not.toBeNull();
    expect(root?.className.includes("range-root-callback")).toBe(true);
    expect(root?.className.includes("orientation=horizontal")).toBe(true);
  });

  it("applies color, size, radius, and thumb size style contracts", () => {
    const rangeSliderProps = {
      color: "teal",
      defaultValue: [20, 80],
      radius: "0.75rem",
      size: "0.625rem",
      thumbSize: 18,
    } as unknown as Parameters<typeof RangeSlider>[0];

    render(<RangeSlider {...rangeSliderProps} />);

    const root = getRangeSliderRoot();
    const thumbs = getRangeThumbs();

    expect(root).not.toBeNull();
    expect(thumbs.length).toBe(2);
    expect(root?.style.getPropertyValue("--slider-size")).not.toBe("");
    expect(root?.style.getPropertyValue("--slider-color")).not.toBe("");
    expect(root?.style.getPropertyValue("--slider-radius")).not.toBe("");
    expect(root?.style.getPropertyValue("--slider-thumb-size")).not.toBe("");

    for (const thumb of thumbs) {
      expect(thumb.className.includes("h-[var(--slider-thumb-size")).toBe(true);
    }
  });

  it("renders exposed canonical subprimitives when composed", () => {
    render(
      <RangeSlider defaultValue={[20, 60]}>
        <RangeSlider.Control className={controlClassName}>
          <RangeSlider.Track>
            <RangeSlider.Indicator />
          </RangeSlider.Track>
          <RangeSlider.Thumb className={thumbClassName} index={0}>
            <RangeSlider.ThumbLabel label="From" labelAlwaysOn />
          </RangeSlider.Thumb>
          <RangeSlider.Thumb index={1}>
            <RangeSlider.ThumbLabel label="To" labelAlwaysOn />
          </RangeSlider.Thumb>
        </RangeSlider.Control>
        <RangeSlider.Value />
      </RangeSlider>
    );

    const control = document.querySelector<HTMLElement>(
      "[data-slot=slider-control]"
    );
    const thumbs = document.querySelectorAll<HTMLElement>(
      "[data-slot=slider-thumb]"
    );

    expect(control).not.toBeNull();
    expect(control?.className.includes("range-control-callback")).toBe(true);

    expect(thumbs.length).toBe(2);
    expect(thumbs[0]?.className.includes("range-thumb-callback")).toBe(true);

    expect(document.querySelector("[data-slot=slider-track]")).not.toBeNull();
    expect(document.querySelector("[data-slot=slider-range]")).not.toBeNull();
    expect(document.querySelector("[data-slot=slider-value]")).not.toBeNull();
    expect(
      document.querySelectorAll("[data-slot=slider-thumb-label]").length
    ).toBe(2);
  });
});
