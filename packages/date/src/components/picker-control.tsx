import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

const pickerControlVariants = tv({
  base: "cursor-clickable text-foreground focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-40",
  compoundVariants: [],
  defaultVariants: {
    disabled: false,
    firstInRange: false,
    hidden: false,
    inRange: false,
    lastInRange: false,
    outside: false,
    selected: false,
  },
  variants: {
    disabled: {
      false: "hover:bg-muted",
      true: "",
    },
    firstInRange: {
      false: "",
      true: "bg-primary/15 !rounded-md",
    },
    hidden: {
      false: "",
      true: "invisible",
    },
    inRange: {
      false: "",
      true: "bg-primary/15 rounded-none",
    },
    lastInRange: {
      false: "",
      true: "bg-primary/15 !rounded-md",
    },
    outside: {
      false: "",
      true: "text-muted-foreground/70",
    },
    selected: {
      false: "",
      true: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
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
