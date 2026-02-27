"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { Button } from "../button/button";
import { ComboboxContext } from "./combobox-context";

export type ComboboxChipRemoveProps = ComboboxPrimitive.ChipRemove.Props & {
  size?: InputSize;
};

const mapComboboxSizeToButtonIconSize = (size: InputSize) => {
  if (size === "xl") {
    return "icon-sm";
  }

  return "icon-xs";
};

const ComboboxChipRemove = ({
  className,
  size,
  ...props
}: ComboboxChipRemoveProps) => {
  const { size: contextSize } = useContext(ComboboxContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <ComboboxPrimitive.ChipRemove
      className={mergeBaseUIClassName<ComboboxPrimitive.ChipRemove.State>(
        "-ml-1 cursor-clickable opacity-50 hover:opacity-100",
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-chip-remove"
      render={
        <Button
          size={mapComboboxSizeToButtonIconSize(resolvedSize)}
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
    </ComboboxPrimitive.ChipRemove>
  );
};

export { ComboboxChipRemove };
