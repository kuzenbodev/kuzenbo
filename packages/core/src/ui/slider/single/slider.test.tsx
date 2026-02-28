import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import createUserEvent from "@testing-library/user-event";

import { Slider } from "./slider";

afterEach(cleanup);

const rootClassName = () => "root-callback";
const controlClassName = () => "control-callback";
const thumbClassName = () => "thumb-callback";
const doubleScale = (value: number) => value * 2;
const percentLabel = (value: number) => `${value}%`;
const keyboardState = {
  changes: [] as number[],
  committed: [] as number[],
  eventOrder: [] as string[],
};
const resetKeyboardState = () => {
  keyboardState.eventOrder = [];
  keyboardState.changes = [];
  keyboardState.committed = [];
};
const recordKeyboardChange = (value: number) => {
  keyboardState.eventOrder.push("change");
  keyboardState.changes.push(value);
};
const recordKeyboardChangeEnd = (value: number) => {
  keyboardState.eventOrder.push("changeEnd");
  keyboardState.committed.push(value);
};

const marks = [
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "75", value: 75 },
] as const;

const getMarkByLabel = (label: string) =>
  [...document.querySelectorAll<HTMLElement>("[data-slot=slider-mark]")].find(
    (mark) => mark.textContent?.trim() === label
  );

const getMarkDotClassName = (mark: HTMLElement | undefined) =>
  mark?.querySelector<HTMLElement>("span[aria-hidden=true]")?.className ?? "";

const getSliderControl = () =>
  document.querySelector<HTMLElement>("[data-slot=slider-control]");
const getSliderInput = () =>
  document.querySelector<HTMLInputElement>(
    "[data-slot=slider-thumb] input[type=range]"
  );
const getSliderRoot = () =>
  document.querySelector<HTMLElement>("[data-slot=slider]");
const getSliderThumb = () =>
  document.querySelector<HTMLElement>("[data-slot=slider-thumb]");

describe("Slider", () => {
  it("renders slider thumb", () => {
    render(<Slider aria-label="Volume" />);
    expect(document.querySelector("[data-slot=slider-thumb]")).not.toBeNull();
  });

  it("has data-slot attribute", () => {
    render(<Slider aria-label="Test" />);
    expect(document.querySelector("[data-slot=slider]")).not.toBeNull();
  });

  it("uses control insets to keep thumb endpoints aligned with marks", () => {
    render(<Slider aria-label="Alignment" />);

    const slider = getSliderRoot();
    const control = getSliderControl();

    expect(slider).not.toBeNull();
    expect(control).not.toBeNull();
    expect(
      slider?.className.includes(
        "px-[calc(var(--slider-thumb-size,1.25rem)/2)]"
      )
    ).toBe(true);
    expect(slider?.dataset.thumbAlignment).toBeUndefined();
  });

  it("spreads rest props", () => {
    render(<Slider aria-label="Test" data-testid="my-slider" />);
    expect(screen.getByTestId("my-slider")).toBeDefined();
  });

  it("preserves callback className on root", () => {
    render(<Slider aria-label="Styled" className={rootClassName} />);
    const slider = getSliderRoot();

    expect(slider).not.toBeNull();
    expect(slider?.className.includes("root-callback")).toBe(true);
    expect(slider?.className.includes("orientation=horizontal")).toBe(true);
  });

  it("applies color, size, radius, and thumb size style contracts", () => {
    const sliderProps = {
      "aria-label": "Style contracts",
      color: "teal",
      radius: "0.75rem",
      size: "0.625rem",
      thumbSize: 18,
    } as unknown as Parameters<typeof Slider>[0];

    render(<Slider {...sliderProps} />);

    const slider = getSliderRoot();
    const thumb = getSliderThumb();

    expect(slider).not.toBeNull();
    expect(thumb).not.toBeNull();
    expect(slider?.style.getPropertyValue("--slider-size")).not.toBe("");
    expect(slider?.style.getPropertyValue("--slider-color")).not.toBe("");
    expect(slider?.style.getPropertyValue("--slider-radius")).not.toBe("");
    expect(slider?.style.getPropertyValue("--slider-thumb-size")).not.toBe("");
    expect(thumb?.className.includes("h-[var(--slider-thumb-size")).toBe(true);
  });

  it("renders marks and mark label slots with non-inverted fill semantics", () => {
    render(<Slider aria-label="Marks" defaultValue={50} marks={marks} />);

    const markWrappers = document.querySelectorAll("[data-slot=slider-mark]");
    const markLabels = document.querySelectorAll(
      "[data-slot=slider-mark-label]"
    );

    expect(markWrappers.length).toBe(3);
    expect(markLabels.length).toBe(3);

    const mark25ClassName = getMarkDotClassName(getMarkByLabel("25"));
    const mark50ClassName = getMarkDotClassName(getMarkByLabel("50"));
    const mark75ClassName = getMarkDotClassName(getMarkByLabel("75"));

    expect(
      mark25ClassName.includes("bg-[var(--slider-color,var(--color-primary))]")
    ).toBe(true);
    expect(
      mark50ClassName.includes("bg-[var(--slider-color,var(--color-primary))]")
    ).toBe(true);
    expect(mark75ClassName.includes("bg-background")).toBe(true);
  });

  it("renders marks with inverted fill semantics", () => {
    render(
      <Slider
        aria-label="Inverted marks"
        defaultValue={50}
        inverted
        marks={marks}
      />
    );

    const mark25ClassName = getMarkDotClassName(getMarkByLabel("25"));
    const mark50ClassName = getMarkDotClassName(getMarkByLabel("50"));
    const mark75ClassName = getMarkDotClassName(getMarkByLabel("75"));

    expect(mark25ClassName.includes("bg-background")).toBe(true);
    expect(
      mark50ClassName.includes("bg-[var(--slider-color,var(--color-primary))]")
    ).toBe(true);
    expect(
      mark75ClassName.includes("bg-[var(--slider-color,var(--color-primary))]")
    ).toBe(true);
  });

  it("renders slider thumb label slot and supports basic visibility classes", () => {
    render(
      <Slider
        aria-label="Tooltip basic"
        defaultValue={42}
        labelAlwaysOn
        showLabelOnHover={false}
      />
    );

    const thumbLabel = document.querySelector<HTMLElement>(
      "[data-slot=slider-thumb-label]"
    );

    expect(thumbLabel).not.toBeNull();
    expect(thumbLabel?.textContent).toBe("42");
    expect(thumbLabel?.className.includes("opacity-100")).toBe(true);
    expect(
      thumbLabel?.className.includes("group-hover/slider:opacity-100")
    ).toBe(false);
  });

  it("does not render slider thumb label slot when label resolves to null", () => {
    render(<Slider aria-label="No tooltip" label={null} />);

    expect(document.querySelector("[data-slot=slider-thumb-label]")).toBeNull();
  });

  it("applies labelTransitionProps transition styles to the label element", () => {
    const sliderProps = {
      "aria-label": "Transition styles",
      defaultValue: 35,
      labelAlwaysOn: true,
      labelTransitionProps: {
        delay: 120,
        duration: 280,
        timingFunction: "ease-in-out",
      },
    } as unknown as Parameters<typeof Slider>[0];

    render(<Slider {...sliderProps} />);

    const thumbLabel = document.querySelector<HTMLElement>(
      "[data-slot=slider-thumb-label]"
    );

    expect(thumbLabel).not.toBeNull();
    expect(thumbLabel?.style.transitionDelay).toBe("120ms");
    expect(thumbLabel?.style.transitionDuration).toBe("280ms");
    expect(thumbLabel?.style.transitionTimingFunction).toBe("ease-in-out");
  });

  it("keeps focus visibility class contracts for thumb and label", () => {
    render(
      <Slider
        aria-label="Focus visibility contract"
        defaultValue={35}
        showLabelOnHover={false}
      />
    );

    const thumb = getSliderThumb();
    const thumbLabel = document.querySelector<HTMLElement>(
      "[data-slot=slider-thumb-label]"
    );

    expect(thumb).not.toBeNull();
    expect(thumbLabel).not.toBeNull();
    expect(thumb?.className.includes("has-[:focus-visible]")).toBe(true);
    expect(
      thumbLabel?.className.includes("group-has-[:focus]/thumb:opacity-100")
    ).toBe(true);
  });

  it("renders a hidden input with scaled value and forwarded hiddenInputProps when name is provided", () => {
    const sliderProps = {
      "aria-label": "Hidden input",
      defaultValue: 35,
      hiddenInputProps: {
        "data-hidden-input": "single-slider",
        form: "single-slider-form",
      },
      name: "volume",
      precision: 1,
      scale: (value: number) => value / 10,
    } as unknown as Parameters<typeof Slider>[0];

    render(
      <form id="single-slider-form">
        <Slider {...sliderProps} />
      </form>
    );

    const hiddenInput = document.querySelector<HTMLInputElement>(
      "input[type=hidden][name='volume']"
    );

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.value).toBe("3.5");
    expect(hiddenInput?.dataset.hiddenInput).toBe("single-slider");
    expect(hiddenInput?.getAttribute("form")).toBe("single-slider-form");
    expect(getSliderInput()?.getAttribute("name")).toBeNull();
  });

  it("calls onChange before onChangeEnd for keyboard input", async () => {
    const user = createUserEvent.setup();
    resetKeyboardState();

    render(
      <Slider
        aria-label="Keyboard ordering"
        defaultValue={10}
        onChange={recordKeyboardChange}
        onChangeEnd={recordKeyboardChangeEnd}
      />
    );

    const input = getSliderInput();
    expect(input).not.toBeNull();

    input?.focus();
    await user.keyboard("{ArrowRight}");
    input?.blur();

    expect(keyboardState.changes.length > 0).toBe(true);
    expect(keyboardState.committed.length > 0).toBe(true);
    expect(keyboardState.eventOrder[0]).toBe("change");
    expect(keyboardState.eventOrder.at(-1)).toBe("changeEnd");
    expect(keyboardState.changes.at(-1)).toBe(keyboardState.committed.at(-1));
  });

  it("projects domain while clamping normalized value to min and max", () => {
    render(
      <Slider
        aria-label="Projected value"
        domain={[0, 200]}
        max={80}
        min={20}
        value={120}
      />
    );

    const input = getSliderInput();
    expect(input).not.toBeNull();

    expect(input?.getAttribute("min")).toBe("0");
    expect(input?.getAttribute("max")).toBe("200");
    expect(input?.getAttribute("aria-valuenow")).toBe("80");
  });

  it("rounds values using precision", () => {
    render(
      <Slider aria-label="Rounded precision" precision={2} value={33.336} />
    );

    expect(getSliderInput()?.getAttribute("aria-valuenow")).toBe("33.34");
  });

  it("uses scale for displayed thumb label while keeping raw slider value", () => {
    render(
      <Slider
        aria-label="Scaled label"
        defaultValue={50}
        labelAlwaysOn
        scale={doubleScale}
      />
    );

    const input = getSliderInput();
    const thumbLabel = document.querySelector<HTMLElement>(
      "[data-slot=slider-thumb-label]"
    );

    expect(input?.getAttribute("aria-valuenow")).toBe("50");
    expect(thumbLabel?.textContent).toBe("100");
  });

  it("moves only between marks on keyboard input when restrictToMarks is enabled", async () => {
    const user = createUserEvent.setup();

    render(
      <Slider
        aria-label="Restrict to marks"
        defaultValue={20}
        marks={[{ value: 0 }, { value: 20 }, { value: 50 }, { value: 100 }]}
        restrictToMarks
        step={1}
      />
    );

    const input = getSliderInput();
    expect(input).not.toBeNull();

    input?.focus();

    await user.keyboard("{ArrowRight}");
    expect(input?.getAttribute("aria-valuenow")).toBe("50");

    await user.keyboard("{ArrowLeft}");
    expect(input?.getAttribute("aria-valuenow")).toBe("20");
  });

  it("keeps restrictToMarks Home and End deterministic with labels enabled", async () => {
    const user = createUserEvent.setup();

    render(
      <Slider
        aria-label="Restrict marks Home End"
        defaultValue={50}
        label={percentLabel}
        marks={[{ value: 0 }, { value: 20 }, { value: 50 }, { value: 100 }]}
        restrictToMarks
        showLabelOnHover
        step={1}
      />
    );

    const input = getSliderInput();
    expect(input).not.toBeNull();

    input?.focus();

    await user.keyboard("{End}");
    expect(input?.getAttribute("aria-valuenow")).toBe("100");

    await user.keyboard("{Home}");
    expect(input?.getAttribute("aria-valuenow")).toBe("0");
  });

  it("applies thumbLabel to the internal range input accessibility label", () => {
    render(<Slider defaultValue={35} thumbLabel="Volume thumb" />);

    const input = document.querySelector<HTMLInputElement>(
      "[data-slot=slider-thumb] input[aria-label='Volume thumb']"
    );

    expect(input).not.toBeNull();
  });

  it("renders exposed canonical subprimitives when composed", () => {
    render(
      <Slider aria-label="Composed" defaultValue={25}>
        <Slider.Control className={controlClassName}>
          <Slider.Track>
            <Slider.Indicator />
          </Slider.Track>
          <Slider.Thumb className={thumbClassName} />
        </Slider.Control>
        <Slider.Value />
      </Slider>
    );

    const control = document.querySelector<HTMLElement>(
      "[data-slot=slider-control]"
    );
    const thumb = document.querySelector<HTMLElement>(
      "[data-slot=slider-thumb]"
    );

    expect(control).not.toBeNull();
    expect(control?.className.includes("control-callback")).toBe(true);

    expect(thumb).not.toBeNull();
    expect(thumb?.className.includes("thumb-callback")).toBe(true);

    expect(document.querySelector("[data-slot=slider-track]")).not.toBeNull();
    expect(document.querySelector("[data-slot=slider-range]")).not.toBeNull();
    expect(document.querySelector("[data-slot=slider-value]")).not.toBeNull();
  });
});
