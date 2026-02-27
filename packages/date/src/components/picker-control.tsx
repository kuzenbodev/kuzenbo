import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

const pickerControlVariants = tv({
  base: "inline-flex h-9 w-9 cursor-clickable items-center justify-center rounded-md border border-transparent text-sm font-medium text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40",
  variants: {
    disabled: {
      true: "",
      false: "hover:bg-muted",
    },
    hidden: {
      true: "invisible",
      false: "",
    },
    inRange: {
      true: "rounded-none bg-primary/15",
      false: "",
    },
    firstInRange: {
      true: "rounded-l-md bg-primary/15",
      false: "",
    },
    lastInRange: {
      true: "rounded-r-md bg-primary/15",
      false: "",
    },
    outside: {
      true: "text-muted-foreground/70",
      false: "",
    },
    selected: {
      true: "bg-primary text-primary-foreground hover:bg-primary/90",
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
    firstInRange: false,
    hidden: false,
    inRange: false,
    lastInRange: false,
    outside: false,
    selected: false,
  },
});

export type PickerControlProps = Omit<ComponentProps<"button">, "children"> & {
  children?: ComponentProps<"button">["children"];
  date?: string;
  firstInRange?: boolean;
  hidden?: boolean;
  inRange?: boolean;
  lastInRange?: boolean;
  outside?: boolean;
  selected?: boolean;
};

export const PickerControl = ({
  children,
  className,
  date,
  firstInRange = false,
  hidden = false,
  inRange = false,
  lastInRange = false,
  outside = false,
  selected = false,
  ...props
}: PickerControlProps) => (
  <button
    className={cn(
      pickerControlVariants({
        disabled: Boolean(props.disabled),
        firstInRange,
        hidden,
        inRange,
        lastInRange,
        outside,
        selected,
      }),
      className
    )}
    data-date={date}
    data-hidden={hidden || undefined}
    data-outside={outside || undefined}
    data-selected={selected || undefined}
    type="button"
    {...props}
  >
    {children}
  </button>
);
