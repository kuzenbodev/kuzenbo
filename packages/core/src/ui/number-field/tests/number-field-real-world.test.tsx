import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useCallback, useId, useState } from "react";

import { Label } from "../../label/label";
import { NumberField } from "../number-field";

afterEach(cleanup);

const LABEL_ORDER_QUANTITY = "Order quantity";
const INPUT_NAME = "quantity";

const getByDataSlot = <TElement extends HTMLElement>(slot: string) => {
  const element = document.querySelector(`[data-slot=${slot}]`);
  expect(element).not.toBeNull();
  return element as TElement;
};

const getIncrementButton = () =>
  getByDataSlot<HTMLButtonElement>("number-field-increment");

const getDecrementButton = () =>
  getByDataSlot<HTMLButtonElement>("number-field-decrement");

const getInputByLabel = (label: string) =>
  screen.getByLabelText(label) as HTMLInputElement;

const BasicQuantityField = ({
  defaultValue,
  disabled,
  max,
  min,
  step,
}: {
  defaultValue: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  step?: number;
}) => {
  const id = useId();

  return (
    <NumberField
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      max={max}
      min={min}
      step={step}
    >
      <Label htmlFor={id}>{LABEL_ORDER_QUANTITY}</Label>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  );
};

const ControlledQuantityHarness = () => {
  const id = useId();
  const [value, setValue] = useState<number | null>(2);
  const handleValueChange = useCallback((nextValue: number | null) => {
    if (nextValue === null) {
      setValue(0);
      return;
    }

    setValue(nextValue);
  }, []);

  return (
    <div>
      <NumberField id={id} onValueChange={handleValueChange} value={value}>
        <Label htmlFor={id}>{LABEL_ORDER_QUANTITY}</Label>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
      <output data-testid="controlled-value">{String(value)}</output>
    </div>
  );
};

const NamedQuantityForm = () => {
  const id = useId();

  return (
    <form data-testid="quantity-form">
      <NumberField defaultValue={4} id={id} name={INPUT_NAME}>
        <Label htmlFor={id}>{LABEL_ORDER_QUANTITY}</Label>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
    </form>
  );
};

describe("NumberField real-world behavior", () => {
  it("increments quantity from default value", async () => {
    const user = userEvent.setup();
    render(<BasicQuantityField defaultValue={1} min={1} />);

    const input = getInputByLabel(LABEL_ORDER_QUANTITY);
    expect(input.value).toBe("1");

    await user.click(getIncrementButton());
    expect(input.value).toBe("2");
  });

  it("decrements quantity from default value", async () => {
    const user = userEvent.setup();
    render(<BasicQuantityField defaultValue={3} min={1} />);

    const input = getInputByLabel(LABEL_ORDER_QUANTITY);
    expect(input.value).toBe("3");

    await user.click(getDecrementButton());
    expect(input.value).toBe("2");
  });

  it("respects minimum value boundary on decrement", async () => {
    const user = userEvent.setup();
    render(<BasicQuantityField defaultValue={1} min={1} />);

    const input = getInputByLabel(LABEL_ORDER_QUANTITY);
    expect(input.value).toBe("1");

    await user.click(getDecrementButton());
    expect(input.value).toBe("1");
  });

  it("respects maximum value boundary on increment", async () => {
    const user = userEvent.setup();
    render(<BasicQuantityField defaultValue={5} max={5} min={1} />);

    const input = getInputByLabel(LABEL_ORDER_QUANTITY);
    expect(input.value).toBe("5");

    await user.click(getIncrementButton());
    expect(input.value).toBe("5");
  });

  it("applies custom step size for pack-based ordering", async () => {
    const user = userEvent.setup();
    render(<BasicQuantityField defaultValue={6} min={6} step={6} />);

    const input = getInputByLabel(LABEL_ORDER_QUANTITY);
    expect(input.value).toBe("6");

    await user.click(getIncrementButton());
    expect(input.value).toBe("12");
  });

  it("supports controlled quantity updates through value and onValueChange", async () => {
    const user = userEvent.setup();
    render(<ControlledQuantityHarness />);

    const input = getInputByLabel(LABEL_ORDER_QUANTITY);
    const controlledValue = screen.getByTestId("controlled-value");

    expect(input.value).toBe("2");
    expect(controlledValue.textContent).toBe("2");

    await user.click(getIncrementButton());
    expect(input.value).toBe("3");
    expect(controlledValue.textContent).toBe("3");
  });

  it("prevents value changes when disabled and exposes disabled state markers", async () => {
    const user = userEvent.setup();
    render(<BasicQuantityField defaultValue={4} disabled min={1} />);

    const input = getInputByLabel(LABEL_ORDER_QUANTITY);
    const increment = getIncrementButton();
    const decrement = getDecrementButton();

    expect(input.value).toBe("4");
    expect("disabled" in increment.dataset).toBe(true);
    expect("disabled" in decrement.dataset).toBe(true);
    expect("disabled" in input.dataset).toBe(true);

    await user.click(increment);
    await user.click(decrement);
    expect(input.value).toBe("4");
  });

  it("serializes named number field value into FormData", async () => {
    const user = userEvent.setup();
    render(<NamedQuantityForm />);

    await user.click(getIncrementButton());

    const form = screen.getByTestId("quantity-form") as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get(INPUT_NAME)).toBe("5");
  });
});
