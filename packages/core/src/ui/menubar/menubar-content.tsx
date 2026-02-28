import type { Menu as MenuPrimitive } from "@base-ui/react/menu";
import type { ComponentProps } from "react";
import { useContext, useMemo } from "react";

import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";
import { MenubarPopup } from "./menubar-popup";
import { MenubarPortal } from "./menubar-portal";
import { MenubarPositioner } from "./menubar-positioner";
export type MenubarContentProps = ComponentProps<typeof MenubarPopup> &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    size?: InputSize;
  };

const MenubarContent = ({
  className,
  align = "start",
  alignOffset = -4,
  side = "bottom",
  sideOffset = 8,
  size,
  ...props
}: MenubarContentProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const resolvedSize = size ?? rootSize ?? "md";
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <MenubarOverlayContext.Provider value={contextValue}>
      <MenubarPortal>
        <MenubarPositioner
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
        >
          <MenubarPopup
            className={className}
            data-size={resolvedSize}
            data-slot="menubar-content"
            size={resolvedSize}
            {...props}
          />
        </MenubarPositioner>
      </MenubarPortal>
    </MenubarOverlayContext.Provider>
  );
};

export { MenubarContent };
