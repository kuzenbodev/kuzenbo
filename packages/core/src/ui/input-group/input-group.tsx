"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { InputGroupAddon } from "./input-group-addon";
import { InputGroupButton } from "./input-group-button";
import { InputGroupContext } from "./input-group-context";
import { InputGroupInput } from "./input-group-input";
import { InputGroupText } from "./input-group-text";
import { InputGroupTextarea } from "./input-group-textarea";
export type InputGroupProps = ComponentProps<"div"> & {
  size?: InputSize;
};

const InputGroup = ({
  className,
  children,
  size: providedSize,
  ...props
}: InputGroupProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <div
      className={cn(
        "group/input-group border-input has-disabled:bg-input/50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-danger has-[[data-slot][aria-invalid=true]]:ring-danger/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-danger/40 relative flex w-full min-w-0 items-center border transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot][aria-invalid=true]]:ring-[3px] has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto data-[size=lg]:h-10 data-[size=lg]:rounded-md data-[size=md]:h-9 data-[size=md]:rounded-md data-[size=sm]:h-8 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=xl]:h-11 data-[size=xl]:rounded-md data-[size=xs]:h-6 data-[size=xs]:rounded-[min(var(--radius-md),8px)] has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      data-size={size}
      data-slot="input-group"
      role="group"
      {...props}
    >
      <InputGroupContext.Provider value={contextValue}>
        {children}
      </InputGroupContext.Provider>
    </div>
  );
};

InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;
InputGroup.Input = InputGroupInput;
InputGroup.Text = InputGroupText;
InputGroup.Textarea = InputGroupTextarea;

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};

export type { InputGroupAddonProps } from "./input-group-addon";
export type { InputGroupButtonProps } from "./input-group-button";
export type { InputGroupInputProps } from "./input-group-input";
export type { InputGroupTextProps } from "./input-group-text";
export type { InputGroupTextareaProps } from "./input-group-textarea";
