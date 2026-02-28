import type { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext, useMemo } from "react";

import type { InputSize } from "../input/input";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";
import { DropdownMenuPopup } from "./dropdown-menu-popup";
import { DropdownMenuPortal } from "./dropdown-menu-portal";
import { DropdownMenuPositioner } from "./dropdown-menu-positioner";
export type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    size?: InputSize;
  };

const DropdownMenuContent = ({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  size,
  ...props
}: DropdownMenuContentProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const resolvedSize = size ?? rootSize ?? "md";
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <DropdownMenuOverlayContext.Provider value={contextValue}>
      <DropdownMenuPortal>
        <DropdownMenuPositioner
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
        >
          <DropdownMenuPopup
            className={className}
            data-size={resolvedSize}
            data-slot="dropdown-menu-content"
            size={resolvedSize}
            {...props}
          />
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenuOverlayContext.Provider>
  );
};

export { DropdownMenuContent };
