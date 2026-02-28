"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";
import { useMemo } from "react";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { AutocompleteArrow } from "./autocomplete-arrow";
import { AutocompleteBackdrop } from "./autocomplete-backdrop";
import { AutocompleteClear } from "./autocomplete-clear";
import { AutocompleteCollection } from "./autocomplete-collection";
import { AutocompleteContent } from "./autocomplete-content";
import { AutocompleteContext } from "./autocomplete-context";
import { AutocompleteEmpty } from "./autocomplete-empty";
import { AutocompleteGroup } from "./autocomplete-group";
import { AutocompleteGroupLabel } from "./autocomplete-group-label";
import { AutocompleteIcon } from "./autocomplete-icon";
import { AutocompleteInput } from "./autocomplete-input";
import { AutocompleteItem } from "./autocomplete-item";
import { AutocompleteList } from "./autocomplete-list";
import { AutocompletePopup } from "./autocomplete-popup";
import { AutocompletePortal } from "./autocomplete-portal";
import { AutocompletePositioner } from "./autocomplete-positioner";
import { AutocompleteRow } from "./autocomplete-row";
import { AutocompleteSeparator } from "./autocomplete-separator";
import { AutocompleteStatus } from "./autocomplete-status";
import { AutocompleteTrigger } from "./autocomplete-trigger";
import { AutocompleteValue } from "./autocomplete-value";

export type AutocompleteProps = ComponentProps<typeof BaseAutocomplete.Root> & {
  size?: InputSize;
};

const Autocomplete = ({ size: providedSize, ...props }: AutocompleteProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <AutocompleteContext.Provider value={contextValue}>
      <BaseAutocomplete.Root
        data-size={size}
        data-slot="autocomplete"
        {...props}
      />
    </AutocompleteContext.Provider>
  );
};

Autocomplete.Arrow = AutocompleteArrow;
Autocomplete.Backdrop = AutocompleteBackdrop;
Autocomplete.Clear = AutocompleteClear;
Autocomplete.Collection = AutocompleteCollection;
Autocomplete.Content = AutocompleteContent;
Autocomplete.Empty = AutocompleteEmpty;
Autocomplete.Group = AutocompleteGroup;
Autocomplete.GroupLabel = AutocompleteGroupLabel;
Autocomplete.Icon = AutocompleteIcon;
Autocomplete.Input = AutocompleteInput;
Autocomplete.Item = AutocompleteItem;
Autocomplete.List = AutocompleteList;
Autocomplete.Popup = AutocompletePopup;
Autocomplete.Portal = AutocompletePortal;
Autocomplete.Positioner = AutocompletePositioner;
Autocomplete.Row = AutocompleteRow;
Autocomplete.Separator = AutocompleteSeparator;
Autocomplete.Status = AutocompleteStatus;
Autocomplete.Trigger = AutocompleteTrigger;
Autocomplete.Value = AutocompleteValue;

export const { useFilter, useFilteredItems } = BaseAutocomplete;

export type { AutocompleteArrowProps } from "./autocomplete-arrow";
export type { AutocompleteBackdropProps } from "./autocomplete-backdrop";
export type { AutocompleteClearProps } from "./autocomplete-clear";
export type { AutocompleteCollectionProps } from "./autocomplete-collection";
export type { AutocompleteContentProps } from "./autocomplete-content";
export type { AutocompleteEmptyProps } from "./autocomplete-empty";
export type { AutocompleteGroupProps } from "./autocomplete-group";
export type { AutocompleteGroupLabelProps } from "./autocomplete-group-label";
export type { AutocompleteIconProps } from "./autocomplete-icon";
export type { AutocompleteInputProps } from "./autocomplete-input";
export type { AutocompleteItemProps } from "./autocomplete-item";
export type { AutocompleteListProps } from "./autocomplete-list";
export type { AutocompletePortalProps } from "./autocomplete-portal";
export type { AutocompletePositionerProps } from "./autocomplete-positioner";
export type { AutocompletePopupProps } from "./autocomplete-popup";
export type { AutocompleteRowProps } from "./autocomplete-row";
export type { AutocompleteSeparatorProps } from "./autocomplete-separator";
export type { AutocompleteStatusProps } from "./autocomplete-status";
export type { AutocompleteTriggerProps } from "./autocomplete-trigger";
export type { AutocompleteValueProps } from "./autocomplete-value";

export {
  Autocomplete,
  AutocompleteArrow,
  AutocompleteBackdrop,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
};
