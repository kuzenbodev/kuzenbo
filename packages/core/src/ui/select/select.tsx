"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";

import type { InputSize } from "../input/input";

import { useComponentSize } from "../shared/size/size-provider";
import { SelectArrow } from "./select-arrow";
import { SelectBackdrop } from "./select-backdrop";
import { SelectContent } from "./select-content";
import { SelectContext } from "./select-context";
import { SelectGroup } from "./select-group";
import { SelectIcon } from "./select-icon";
import { SelectItem } from "./select-item";
import { SelectItemIndicator } from "./select-item-indicator";
import { SelectItemText } from "./select-item-text";
import { SelectLabel } from "./select-label";
import { SelectList } from "./select-list";
import { SelectPopup } from "./select-popup";
import { SelectPortal } from "./select-portal";
import { SelectPositioner } from "./select-positioner";
import { SelectScrollDownButton } from "./select-scroll-down-button";
import { SelectScrollUpButton } from "./select-scroll-up-button";
import { SelectSeparator } from "./select-separator";
import { SelectTrigger } from "./select-trigger";
import { SelectValue } from "./select-value";
import { useSelectDefaultProps } from "./use-select-default-props";

export interface SelectOption<Value> {
  value: Value;
  label: string;
}

export type SelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComponentProps<typeof SelectPrimitive.Root<Value, Multiple>> & {
  size?: InputSize;
};

const SelectGroupLabel = SelectLabel;
const SelectScrollDownArrow = SelectScrollDownButton;
const SelectScrollUpArrow = SelectScrollUpButton;

export type SelectGroupLabelProps = ComponentProps<typeof SelectGroupLabel>;
export type SelectScrollDownArrowProps = ComponentProps<
  typeof SelectScrollDownArrow
>;
export type SelectScrollUpArrowProps = ComponentProps<
  typeof SelectScrollUpArrow
>;

const Select = <Value, Multiple extends boolean | undefined = false>(
  incomingProps: SelectProps<Value, Multiple>
) => {
  const { size: providedSize, ...props } = useSelectDefaultProps(incomingProps);
  const size = useComponentSize(providedSize);

  return (
    <SelectContext.Provider value={{ size }}>
      <SelectPrimitive.Root<Value, Multiple>
        data-size={size}
        data-slot="select"
        {...props}
      />
    </SelectContext.Provider>
  );
};

Select.Arrow = SelectArrow;
Select.Backdrop = SelectBackdrop;
Select.Content = SelectContent;
Select.Group = SelectGroup;
Select.GroupLabel = SelectLabel;
Select.Icon = SelectIcon;
Select.Item = SelectItem;
Select.ItemIndicator = SelectItemIndicator;
Select.ItemText = SelectItemText;
Select.Label = SelectLabel;
Select.List = SelectList;
Select.Popup = SelectPopup;
Select.Portal = SelectPortal;
Select.Positioner = SelectPositioner;
Select.ScrollDownArrow = SelectScrollDownArrow;
Select.ScrollDownButton = SelectScrollDownButton;
Select.ScrollUpArrow = SelectScrollUpArrow;
Select.ScrollUpButton = SelectScrollUpButton;
Select.Separator = SelectSeparator;
Select.Trigger = SelectTrigger;
Select.Value = SelectValue;

export type { SelectArrowProps } from "./select-arrow";
export type { SelectBackdropProps } from "./select-backdrop";
export type { SelectContentProps } from "./select-content";
export type { SelectGroupProps } from "./select-group";
export type { SelectIconProps } from "./select-icon";
export type { SelectItemProps } from "./select-item";
export type { SelectItemIndicatorProps } from "./select-item-indicator";
export type { SelectItemTextProps } from "./select-item-text";
export type { SelectLabelProps } from "./select-label";
export type { SelectListProps } from "./select-list";
export type { SelectPopupProps } from "./select-popup";
export type { SelectPortalProps } from "./select-portal";
export type { SelectPositionerProps } from "./select-positioner";
export type { SelectScrollDownButtonProps } from "./select-scroll-down-button";
export type { SelectScrollUpButtonProps } from "./select-scroll-up-button";
export type { SelectSeparatorProps } from "./select-separator";
export type { SelectTriggerProps } from "./select-trigger";
export type { SelectValueProps } from "./select-value";

export {
  Select,
  SelectArrow,
  SelectBackdrop,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectScrollDownArrow,
  SelectScrollDownButton,
  SelectScrollUpArrow,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
