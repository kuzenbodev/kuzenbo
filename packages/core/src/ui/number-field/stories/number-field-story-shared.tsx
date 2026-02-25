import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useId, useMemo, useState } from "react";

import { Label } from "../../label/label";
import { NumberField } from "../number-field";

export const baseMeta = {
  title: "Components/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof NumberField>;

type Story = StoryObj<typeof baseMeta>;

const CART_MIN_QUANTITY = 1;
const CART_MAX_QUANTITY = 10;
const CART_ITEM_PRICE = 24.99;
const PACK_SIZE_STEP = 6;

const ComposedExample = () => {
  const id = useId();

  return (
    <NumberField defaultValue={0} id={id}>
      <Label htmlFor={id}>Quantity</Label>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  );
};

const ScrubAreaExample = () => {
  const id = useId();

  return (
    <NumberField defaultValue={100} id={id}>
      <NumberField.ScrubArea className="flex items-center gap-2">
        <Label className="cursor-ew-resize" htmlFor={id}>
          Amount
        </Label>
        <NumberField.ScrubAreaCursor />
      </NumberField.ScrubArea>

      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  );
};

const CartQuantityExample = () => {
  const id = useId();
  const [quantity, setQuantity] = useState<number | null>(2);
  const handleQuantityChange = useCallback((value: number | null) => {
    if (value === null) {
      setQuantity(CART_MIN_QUANTITY);
      return;
    }

    setQuantity(value);
  }, []);
  const lineTotal = useMemo(() => {
    const resolvedQuantity = quantity ?? 0;
    return resolvedQuantity * CART_ITEM_PRICE;
  }, [quantity]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <NumberField
        id={id}
        max={CART_MAX_QUANTITY}
        min={CART_MIN_QUANTITY}
        onValueChange={handleQuantityChange}
        step={1}
        value={quantity}
      >
        <Label htmlFor={id}>Cart quantity</Label>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
      <p className="text-sm text-muted-foreground">
        Line total:{" "}
        {lineTotal.toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
        })}
      </p>
    </div>
  );
};

const BudgetAmountExample = () => {
  const id = useId();

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <NumberField
        defaultValue={2500}
        format={{ currency: "USD", style: "currency" }}
        id={id}
        largeStep={500}
        min={0}
        smallStep={10}
        step={50}
      >
        <Label htmlFor={id}>Monthly ad budget</Label>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
      <p className="text-sm text-muted-foreground">
        Step: $50 (Shift: $500, Meta: $10)
      </p>
    </div>
  );
};

const PackSizeSelectorExample = () => {
  const id = useId();

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <NumberField
        defaultValue={12}
        id={id}
        max={120}
        min={PACK_SIZE_STEP}
        step={PACK_SIZE_STEP}
      >
        <Label htmlFor={id}>Units per shipment</Label>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
      <p className="text-sm text-muted-foreground">
        Ordered in packs of {PACK_SIZE_STEP} units.
      </p>
    </div>
  );
};

const ReadOnlyReviewExample = () => {
  const id = useId();

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <NumberField defaultValue={3} id={id} readOnly>
        <Label htmlFor={id}>Approved quantity</Label>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
      <p className="text-sm text-muted-foreground">
        Review mode: value is visible but not editable.
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <ComposedExample />,
};

export const WithScrubArea: Story = {
  render: () => <ScrubAreaExample />,
};

export const CartQuantity: Story = {
  render: () => <CartQuantityExample />,
};

export const BudgetAmount: Story = {
  render: () => <BudgetAmountExample />,
};

export const PackSizeSelector: Story = {
  render: () => <PackSizeSelectorExample />,
};

export const ReadOnlyReview: Story = {
  render: () => <ReadOnlyReviewExample />,
};
