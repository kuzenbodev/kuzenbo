import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
} from "./navigation-list-context";
import type {
  NavigationListTone,
  NavigationListVariant,
} from "./navigation-list-context";

const navigationListGroupVariants = tv({
  base: "list-none space-y-1",
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
  },
  variants: {
    size: {
      lg: "",
      md: "",
      sm: "",
      xl: "",
      xs: "",
    },
    tone: {
      sidebar: "",
      surface: "",
    },
    variant: {
      filled: "",
      light: "",
      subtle: "",
    },
  },
});

export type NavigationListGroupProps = ComponentProps<"li"> &
  VariantProps<typeof navigationListGroupVariants> & {
    size?: UISize;
    tone?: NavigationListTone;
    variant?: NavigationListVariant;
  };

const NavigationListGroup = ({
  className,
  size,
  tone,
  variant,
  ...props
}: NavigationListGroupProps) => {
  const resolvedSize = useResolvedNavigationListSize(size);
  const resolvedTone = useResolvedNavigationListTone(tone);
  const resolvedVariant = useResolvedNavigationListVariant(variant);

  return (
    <li
      className={cn(
        navigationListGroupVariants({
          size: resolvedSize,
          tone: resolvedTone,
          variant: resolvedVariant,
        }),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-list-group"
      data-tone={resolvedTone}
      data-variant={resolvedVariant}
      {...props}
    />
  );
};

export { NavigationListGroup };
