"use client";

import type { Select as SelectPrimitive } from "@base-ui/react/select";

import { useContext } from "react";

import type { InputSize } from "../input/input";

import { SelectContext } from "./select-context";
import { SelectList } from "./select-list";
import { SelectOverlayContext } from "./select-overlay-context";
import { SelectPopup } from "./select-popup";
import { SelectPortal } from "./select-portal";
import { SelectPositioner } from "./select-positioner";
import { SelectScrollDownButton } from "./select-scroll-down-button";
import { SelectScrollUpButton } from "./select-scroll-up-button";

export type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & {
    size?: InputSize;
  };

const SelectContent = ({
  className,
  children,
  size,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectContentProps) => {
  const { size: rootSize } = useContext(SelectContext);
  const resolvedSize = size ?? rootSize ?? "md";

  return (
    <SelectOverlayContext.Provider value={{ size: resolvedSize }}>
      <SelectPortal>
        <SelectPositioner
          align={align}
          alignItemWithTrigger={alignItemWithTrigger}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
        >
          <SelectPopup
            className={className}
            data-size={resolvedSize}
            data-slot="select-content"
            size={resolvedSize}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectList>{children}</SelectList>
            <SelectScrollDownButton />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </SelectOverlayContext.Provider>
  );
};

export { SelectContent };
