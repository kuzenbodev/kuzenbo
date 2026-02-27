/* eslint-disable react-perf/jsx-no-new-function-as-prop, react-hooks/exhaustive-deps */
import type { ComponentProps, ReactNode } from "react";

import { useEffect, useRef, useState } from "react";
import { cn, tv } from "tailwind-variants";

const pickerInputBaseRootVariants = tv({
  base: "relative w-full",
});

const pickerInputBaseFieldVariants = tv({
  base: "h-9 w-full rounded-md border border-input bg-background px-3 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
});

const pickerInputBaseTriggerVariants = tv({
  base: "absolute top-1/2 right-1 inline-flex h-7 w-7 -translate-y-1/2 cursor-clickable items-center justify-center rounded-md border border-transparent bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
});

const pickerInputBaseDropdownVariants = tv({
  base: "absolute top-[calc(100%+0.5rem)] left-0 z-50 min-w-[16rem]",
});

export type PickerInputBaseProps = Omit<
  ComponentProps<"input">,
  "onChange" | "value"
> & {
  dropdown?: ReactNode;
  opened?: boolean;
  value?: string;
  onOpenedChange?: (opened: boolean) => void;
  onValueChange?: (value: string) => void;
};

const PickerInputBase = ({
  className,
  dropdown,
  opened,
  value,
  onOpenedChange,
  onValueChange,
  ...props
}: PickerInputBaseProps) => {
  const [uncontrolledOpened, setUncontrolledOpened] = useState(false);
  const resolvedOpened = opened ?? uncontrolledOpened;
  const rootRef = useRef<HTMLDivElement | null>(null);

  const setResolvedOpened = (nextOpened: boolean) => {
    if (opened === undefined) {
      setUncontrolledOpened(nextOpened);
    }

    onOpenedChange?.(nextOpened);
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!resolvedOpened) {
        return;
      }

      if (!rootRef.current) {
        return;
      }

      if (
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setResolvedOpened(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [resolvedOpened]);

  return (
    <div className={cn(pickerInputBaseRootVariants(), className)} ref={rootRef}>
      <input
        className={pickerInputBaseFieldVariants()}
        value={value}
        onChange={(event) => {
          onValueChange?.(event.currentTarget.value);
        }}
        onFocus={() => {
          if (dropdown) {
            setResolvedOpened(true);
          }
        }}
        {...props}
      />
      {dropdown ? (
        <button
          aria-expanded={resolvedOpened}
          aria-label="Toggle picker"
          className={pickerInputBaseTriggerVariants()}
          type="button"
          onClick={() => {
            setResolvedOpened(!resolvedOpened);
          }}
        >
          v
        </button>
      ) : null}
      {dropdown && resolvedOpened ? (
        <div className={pickerInputBaseDropdownVariants()} role="dialog">
          {dropdown}
        </div>
      ) : null}
    </div>
  );
};

export { PickerInputBase };
