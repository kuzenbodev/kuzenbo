"use client";

import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn } from "tailwind-variants";

import { InputGroup, InputGroupAddon } from "../input-group/input-group";
import type { InputSize } from "../input/input";
import { CommandContext } from "./command-context";
type NativeCommandInputProps = ComponentProps<typeof CommandPrimitive.Input>;
type NativeCommandInputSize = NativeCommandInputProps["size"];

export type CommandInputProps = Omit<NativeCommandInputProps, "size"> & {
  htmlSize?: NativeCommandInputSize;
  size?: InputSize;
};

const getCommandSearchIconSizeClassName = (size: InputSize) => {
  if (size === "xs") {
    return "size-3";
  }

  if (size === "sm") {
    return "size-3.5";
  }

  if (size === "xl") {
    return "size-5";
  }

  return "size-4";
};

const getCommandInputTextSizeClassName = (size: InputSize) => {
  if (size === "xs") {
    return "text-xs";
  }

  if (size === "xl") {
    return "text-base";
  }

  return "text-sm";
};

const CommandInput = ({
  className,
  htmlSize,
  size,
  ...props
}: CommandInputProps) => {
  const { size: rootSize } = useContext(CommandContext);
  const resolvedSize = size ?? rootSize ?? "md";

  return (
    <div
      className="p-1 pb-0"
      data-size={resolvedSize}
      data-slot="command-input-wrapper"
    >
      <InputGroup
        className="border-input/30 bg-input/30 rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!"
        size={resolvedSize}
      >
        <CommandPrimitive.Input
          className={cn(
            "w-full outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            getCommandInputTextSizeClassName(resolvedSize),
            className
          )}
          data-size={resolvedSize}
          data-slot="command-input"
          size={htmlSize}
          {...props}
        />
        <InputGroupAddon>
          <HugeiconsIcon
            className={cn(
              getCommandSearchIconSizeClassName(resolvedSize),
              "shrink-0 opacity-50"
            )}
            icon={SearchIcon}
            strokeWidth={2}
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export { CommandInput };
