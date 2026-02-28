"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import type { ComponentProps } from "react";
import { useMemo } from "react";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { ComboboxArrow } from "./combobox-arrow";
import { ComboboxBackdrop } from "./combobox-backdrop";
import { ComboboxChip } from "./combobox-chip";
import { ComboboxChipRemove } from "./combobox-chip-remove";
import { ComboboxChips } from "./combobox-chips";
import { ComboboxChipsInput } from "./combobox-chips-input";
import { ComboboxClear } from "./combobox-clear";
import { ComboboxCollection } from "./combobox-collection";
import { ComboboxContent } from "./combobox-content";
import { ComboboxContext } from "./combobox-context";
import { ComboboxEmpty } from "./combobox-empty";
import { ComboboxGroup } from "./combobox-group";
import { ComboboxGroupLabel } from "./combobox-group-label";
import { ComboboxIcon } from "./combobox-icon";
import { ComboboxInput } from "./combobox-input";
import { ComboboxItem } from "./combobox-item";
import { ComboboxItemIndicator } from "./combobox-item-indicator";
import { ComboboxLabel } from "./combobox-label";
import { ComboboxList } from "./combobox-list";
import { ComboboxPopup } from "./combobox-popup";
import { ComboboxPortal } from "./combobox-portal";
import { ComboboxPositioner } from "./combobox-positioner";
import { ComboboxRow } from "./combobox-row";
import { ComboboxSeparator } from "./combobox-separator";
import { ComboboxStatus } from "./combobox-status";
import { ComboboxTrigger } from "./combobox-trigger";
import { ComboboxValue } from "./combobox-value";
import { useComboboxAnchor } from "./use-combobox-anchor";

export type ComboboxProps<
  ItemValue,
  Multiple extends boolean | undefined = false,
> = ComponentProps<typeof ComboboxPrimitive.Root<ItemValue, Multiple>> & {
  size?: InputSize;
};

const Combobox = <ItemValue, Multiple extends boolean | undefined = false>({
  size: providedSize,
  ...props
}: ComboboxProps<ItemValue, Multiple>) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <ComboboxContext.Provider value={contextValue}>
      <ComboboxPrimitive.Root<ItemValue, Multiple>
        data-size={size}
        data-slot="combobox"
        {...props}
      />
    </ComboboxContext.Provider>
  );
};

Combobox.Arrow = ComboboxArrow;
Combobox.Backdrop = ComboboxBackdrop;
Combobox.Chip = ComboboxChip;
Combobox.ChipRemove = ComboboxChipRemove;
Combobox.Chips = ComboboxChips;
Combobox.ChipsInput = ComboboxChipsInput;
Combobox.Clear = ComboboxClear;
Combobox.Collection = ComboboxCollection;
Combobox.Content = ComboboxContent;
Combobox.Empty = ComboboxEmpty;
Combobox.Group = ComboboxGroup;
Combobox.GroupLabel = ComboboxGroupLabel;
Combobox.Icon = ComboboxIcon;
Combobox.Input = ComboboxInput;
Combobox.Item = ComboboxItem;
Combobox.ItemIndicator = ComboboxItemIndicator;
Combobox.Label = ComboboxLabel;
Combobox.List = ComboboxList;
Combobox.Popup = ComboboxPopup;
Combobox.Portal = ComboboxPortal;
Combobox.Positioner = ComboboxPositioner;
Combobox.Row = ComboboxRow;
Combobox.Separator = ComboboxSeparator;
Combobox.Status = ComboboxStatus;
Combobox.Trigger = ComboboxTrigger;
Combobox.Value = ComboboxValue;

export const { useFilter, useFilteredItems } = ComboboxPrimitive;

export type { ComboboxArrowProps } from "./combobox-arrow";
export type { ComboboxBackdropProps } from "./combobox-backdrop";
export type { ComboboxChipProps } from "./combobox-chip";
export type { ComboboxChipRemoveProps } from "./combobox-chip-remove";
export type { ComboboxChipsProps } from "./combobox-chips";
export type { ComboboxChipsInputProps } from "./combobox-chips-input";
export type { ComboboxClearProps } from "./combobox-clear";
export type { ComboboxCollectionProps } from "./combobox-collection";
export type { ComboboxContentProps } from "./combobox-content";
export type { ComboboxEmptyProps } from "./combobox-empty";
export type { ComboboxGroupProps } from "./combobox-group";
export type { ComboboxGroupLabelProps } from "./combobox-group-label";
export type { ComboboxIconProps } from "./combobox-icon";
export type { ComboboxInputProps } from "./combobox-input";
export type { ComboboxItemProps } from "./combobox-item";
export type { ComboboxItemIndicatorProps } from "./combobox-item-indicator";
export type { ComboboxLabelProps } from "./combobox-label";
export type { ComboboxListProps } from "./combobox-list";
export type { ComboboxPopupProps } from "./combobox-popup";
export type { ComboboxPortalProps } from "./combobox-portal";
export type { ComboboxPositionerProps } from "./combobox-positioner";
export type { ComboboxRowProps } from "./combobox-row";
export type { ComboboxSeparatorProps } from "./combobox-separator";
export type { ComboboxStatusProps } from "./combobox-status";
export type { ComboboxTriggerProps } from "./combobox-trigger";
export type { ComboboxValueProps } from "./combobox-value";

export {
  ComboboxArrow,
  ComboboxBackdrop,
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
