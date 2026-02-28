import type { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContext, useMemo } from "react";

import type { InputSize } from "../input/input";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";
import { ContextMenuPopup } from "./context-menu-popup";
import { ContextMenuPortal } from "./context-menu-portal";
import { ContextMenuPositioner } from "./context-menu-positioner";
export type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    size?: InputSize;
  };

const ContextMenuContent = ({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  size,
  ...props
}: ContextMenuContentProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const resolvedSize = size ?? rootSize ?? "md";
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <ContextMenuOverlayContext.Provider value={contextValue}>
      <ContextMenuPortal>
        <ContextMenuPositioner
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
        >
          <ContextMenuPopup
            className={className}
            data-size={resolvedSize}
            data-slot="context-menu-content"
            size={resolvedSize}
            {...props}
          />
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuOverlayContext.Provider>
  );
};

export { ContextMenuContent };
