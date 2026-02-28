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

const navigationListGroupVariants = tv({
  base: "list-none space-y-1",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    tone: {
      surface: "",
      sidebar: "",
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
