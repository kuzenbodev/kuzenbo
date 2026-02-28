"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ActionIcon } from "../action-icon/action-icon";
import type { InputSize } from "../input/input";
import { ComboboxContext } from "./combobox-context";

export type ComboboxChipRemoveProps = ComboboxPrimitive.ChipRemove.Props & {
  size?: InputSize;
};

const mapComboboxSizeToActionIconSize = (size: InputSize) => {
  if (size === "xl") {
    return "sm";
  }

  return "xs";
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
        <ActionIcon
          size={mapComboboxSizeToActionIconSize(resolvedSize)}
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
