"use client";

import type { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext, useMemo } from "react";

import type { InputSize } from "../input/input";
import { ComboboxContext } from "./combobox-context";
import { ComboboxOverlayContext } from "./combobox-overlay-context";
import { ComboboxPopup } from "./combobox-popup";
import { ComboboxPortal } from "./combobox-portal";
import { ComboboxPositioner } from "./combobox-positioner";

export type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  > & {
    size?: InputSize;
  };

const ComboboxContent = ({
  className,
  size,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxContentProps) => {
  const { size: rootSize } = useContext(ComboboxContext);
  const resolvedSize = size ?? rootSize ?? "md";
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <ComboboxOverlayContext.Provider value={contextValue}>
      <ComboboxPortal>
        <ComboboxPositioner
          align={align}
          alignOffset={alignOffset}
          anchor={anchor}
          side={side}
          sideOffset={sideOffset}
        >
          <ComboboxPopup
            className={className}
            data-chips={!!anchor}
            data-size={resolvedSize}
            data-slot="combobox-content"
            size={resolvedSize}
            {...props}
          />
        </ComboboxPositioner>
      </ComboboxPortal>
    </ComboboxOverlayContext.Provider>
  );
};

export { ComboboxContent };
