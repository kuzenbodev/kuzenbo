import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import type { KbdSize } from "./kbd-size-context";
import { KbdSizeContext, useKbdResolvedSize } from "./kbd-size-context";

export type KbdGroupProps = ComponentProps<"kbd"> & {
  size?: KbdSize;
};

const KbdGroup = ({ className, size, ...props }: KbdGroupProps) => {
  const resolvedSize = useKbdResolvedSize(size);

  return (
    <KbdSizeContext.Provider value={resolvedSize}>
      <kbd
        className={cn(
          "group/kbd-group inline-flex items-center data-[size=lg]:gap-1 data-[size=md]:gap-1 data-[size=sm]:gap-0.5 data-[size=xl]:gap-1.5 data-[size=xs]:gap-0.5",
          className
        )}
        data-size={resolvedSize}
        data-slot="kbd-group"
        {...props}
      />
    </KbdSizeContext.Provider>
  );
};

export { KbdGroup };
export type { KbdSize as KbdGroupSize };
