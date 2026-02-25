"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../input-group/input-group";
import { ComboboxClear } from "./combobox-clear";
import { ComboboxContext } from "./combobox-context";
import { ComboboxTrigger } from "./combobox-trigger";

type NativeComboboxInputProps = ComboboxPrimitive.Input.Props;

export type ComboboxInputProps = Omit<NativeComboboxInputProps, "size"> & {
  htmlSize?: NativeComboboxInputProps["size"];
  size?: InputSize;
  showTrigger?: boolean;
  showClear?: boolean;
};

const mapComboboxSizeToInputGroupIconButtonSize = (size: InputSize) => {
  if (size === "xl") {
    return "icon-sm";
  }

  return "icon-xs";
};

const ComboboxInput = ({
  className,
  children,
  disabled = false,
  htmlSize,
  size,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxInputProps) => {
  const { size: contextSize } = useContext(ComboboxContext);
  const resolvedSize = size ?? contextSize ?? "md";
  const iconButtonSize =
    mapComboboxSizeToInputGroupIconButtonSize(resolvedSize);

  return (
    <InputGroup className="w-auto" size={resolvedSize}>
      <ComboboxPrimitive.Input
        className={mergeBaseUIClassName<ComboboxPrimitive.Input.State>(
          undefined,
          className
        )}
        data-size={resolvedSize}
        render={<InputGroupInput disabled={disabled} size={resolvedSize} />}
        size={htmlSize}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            className="group-has-data-[slot=combobox-clear]/input-group:hidden gap-0 data-pressed:bg-transparent"
            data-slot="input-group-button"
            disabled={disabled}
            render={<ComboboxTrigger />}
            size={iconButtonSize}
            variant="ghost"
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} size={resolvedSize} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
};

export { ComboboxInput };
