/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, ReactNode } from "react";

import { InputGroup } from "@kuzenbo/core/ui/input-group";
import { Popover } from "@kuzenbo/core/ui/popover";
import { useRef, useState } from "react";
import { cn, tv } from "tailwind-variants";

import { DateInputTriggerButton } from "../internal/date-input-trigger-button";

const pickerInputBaseRootVariants = tv({
  base: "w-full",
});

const pickerInputBaseGroupVariants = tv({
  base: "w-full",
});

const pickerInputBaseDropdownVariants = tv({
  base: "w-auto min-w-[16rem] gap-0 rounded-none border-0 bg-transparent p-0 shadow-none ring-0",
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
  size,
  value,
  onOpenedChange,
  onValueChange,
  ...props
}: PickerInputBaseProps) => {
  const [uncontrolledOpened, setUncontrolledOpened] = useState(false);
  const resolvedOpened = opened ?? uncontrolledOpened;
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const setResolvedOpened = (nextOpened: boolean) => {
    if (opened === undefined) {
      setUncontrolledOpened(nextOpened);
    }

    onOpenedChange?.(nextOpened);
  };

  if (!dropdown) {
    return (
      <div
        className={cn(pickerInputBaseRootVariants(), className)}
        data-slot="picker-input-base"
      >
        <InputGroup className={pickerInputBaseGroupVariants()}>
          <InputGroup.Input
            {...props}
            htmlSize={size}
            value={value}
            onChange={(event) => {
              onValueChange?.(event.currentTarget.value);
            }}
          />
        </InputGroup>
      </div>
    );
  }

  return (
    <Popover
      onOpenChange={(nextOpened) => {
        setResolvedOpened(nextOpened);
      }}
      open={resolvedOpened}
    >
      <div
        className={cn(pickerInputBaseRootVariants(), className)}
        data-slot="picker-input-base"
        ref={anchorRef}
      >
        <InputGroup className={pickerInputBaseGroupVariants()}>
          <InputGroup.Input
            {...props}
            htmlSize={size}
            value={value}
            onChange={(event) => {
              onValueChange?.(event.currentTarget.value);
            }}
            onFocus={(event) => {
              setResolvedOpened(true);
              props.onFocus?.(event);
            }}
          />
          <Popover.Trigger
            render={
              <DateInputTriggerButton
                aria-expanded={resolvedOpened}
                aria-label="Toggle picker"
              />
            }
          />
        </InputGroup>
      </div>
      {resolvedOpened ? (
        <Popover.Portal>
          <Popover.Positioner
            align="start"
            anchor={anchorRef}
            side="bottom"
            sideOffset={8}
          >
            <Popover.Popup
              className={pickerInputBaseDropdownVariants()}
              role="dialog"
            >
              <Popover.Viewport>{dropdown}</Popover.Viewport>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      ) : null}
    </Popover>
  );
};

export { PickerInputBase };
