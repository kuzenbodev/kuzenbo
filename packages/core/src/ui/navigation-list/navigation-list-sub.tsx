import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  type NavigationListTone,
  type NavigationListVariant,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
} from "./navigation-list-context";
import { useNavigationListItemContext } from "./navigation-list-item-context";

const navigationListSubVariants = tv({
  base: "mx-2 mt-1 flex min-w-0 list-none flex-col overflow-hidden border-l data-[open=false]:pointer-events-none data-[open=false]:mt-0 data-[open=false]:max-h-0 data-[open=false]:border-transparent data-[open=false]:py-0 data-[open=false]:opacity-0 data-[open=true]:max-h-[48rem] data-[open=true]:opacity-100 [&[hidden]:not([hidden='until-found'])]:hidden",
  variants: {
    size: {
      xs: "gap-0.5 px-1 py-0.5",
      sm: "gap-0.5 px-1.5 py-0.5",
      md: "gap-1 px-2 py-0.5",
      lg: "gap-1 px-2.5 py-1",
      xl: "gap-1.5 px-3 py-1",
    },
    tone: {
      surface: "border-border",
      sidebar: "border-sidebar-border",
    },
    variant: {
      subtle: "",
      light: "",
      filled: "",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
  },
});

export type NavigationListSubProps = ComponentProps<"ul"> & {
  keepMounted?: boolean;
  size?: UISize;
  tone?: NavigationListTone;
  variant?: NavigationListVariant;
} & VariantProps<typeof navigationListSubVariants>;

const NavigationListSub = ({
  className,
  keepMounted = true,
  size,
  tone,
  variant,
  ...props
}: NavigationListSubProps) => {
  const itemContext = useNavigationListItemContext();
  const resolvedSize = useResolvedNavigationListSize(size, itemContext.size);
  const resolvedTone = useResolvedNavigationListTone(tone, itemContext.tone);
  const resolvedVariant = useResolvedNavigationListVariant(
    variant,
    itemContext.variant
  );

  const resolvedClassName = cn(
    navigationListSubVariants({
      size: resolvedSize,
      tone: resolvedTone,
      variant: resolvedVariant,
    }),
    className
  );

  if (!itemContext.collapsible) {
    return (
      <ul
        className={resolvedClassName}
        data-open="true"
        data-size={resolvedSize}
        data-slot="navigation-list-sub"
        data-tone={resolvedTone}
        data-variant={resolvedVariant}
        {...props}
      />
    );
  }

  return (
    <CollapsiblePrimitive.Panel keepMounted={keepMounted}>
      <ul
        className={resolvedClassName}
        data-open={itemContext.open ? "true" : "false"}
        data-size={resolvedSize}
        data-slot="navigation-list-sub"
        data-tone={resolvedTone}
        data-variant={resolvedVariant}
        hidden={keepMounted && !itemContext.open}
        {...props}
      />
    </CollapsiblePrimitive.Panel>
  );
};

export { NavigationListSub };
