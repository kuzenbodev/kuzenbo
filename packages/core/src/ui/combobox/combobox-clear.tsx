"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { InputGroupButton } from "../input-group/input-group";
import type { InputSize } from "../input/input";
import { ComboboxContext } from "./combobox-context";

export type ComboboxClearProps = ComboboxPrimitive.Clear.Props & {
  size?: InputSize;
};

const mapComboboxSizeToInputGroupIconButtonSize = (size: InputSize) => {
  if (size === "xl") {
    return "icon-sm";
  }

  return "icon-xs";
};

const ComboboxClear = ({ className, size, ...props }: ComboboxClearProps) => {
  const { size: contextSize } = useContext(ComboboxContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <ComboboxPrimitive.Clear
      className={mergeBaseUIClassName<ComboboxPrimitive.Clear.State>(
        "cursor-clickable",
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-clear"
      render={
        <InputGroupButton
          size={mapComboboxSizeToInputGroupIconButtonSize(resolvedSize)}
          variant="ghost"
        />
      }
      {...props}
    >
      <HugeiconsIcon
        className="pointer-events-none"
        icon={Cancel01Icon}
        strokeWidth={2}
      />
    </ComboboxPrimitive.Clear>
  );
};

export { ComboboxClear };
