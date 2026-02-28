"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { resolveDefaultNestedIconClassBySize } from "../shared/size/size-system";

export const themeIconVariants = tv({
  base: [
    // Layout: flex container with centered items
    "inline-flex shrink-0 items-center justify-center",
    // Styling: rounded corners, typography
    "rounded-md text-sm",
    // Focus: remove default outline, add transitions
    "transition-all outline-none",
    // SVG icons: default sizing and behavior
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      lg: [
        // Dimensions: large square size
        "size-10",
      ],
      md: [
        // Dimensions: standard square size
        "size-9",
      ],
      sm: [
        // Dimensions: small square size
        "size-8 rounded-[min(var(--radius-md),10px)]",
        resolveDefaultNestedIconClassBySize("sm"),
      ],
      xl: [
        // Dimensions: extra large square size
        "size-11",
        resolveDefaultNestedIconClassBySize("xl"),
      ],
      xs: [
        // Dimensions: compact square size
        "size-6 rounded-[min(var(--radius-md),8px)]",
        resolveDefaultNestedIconClassBySize("xs"),
      ],
    },
    variant: {
      danger: [
        // Border: danger border color
        "border-danger-border",
        // Background: danger color scheme with shadow
        "bg-danger text-danger-foreground shadow-xs",
      ],
      default: [
        // Background: primary color scheme with shadow
        "bg-primary text-primary-foreground shadow-xs",
      ],
      ghost: [
        // No additional styles for ghost variant
      ],
      info: [
        // Border: info border color
        "border-info-border",
        // Background: info color scheme with shadow
        "bg-info text-info-foreground shadow-xs",
      ],
      link: [
        // Typography: primary text color
        "text-primary-foreground",
      ],
      outline: [
        // Border: visible border with background
        "border-border bg-background border shadow-xs",
        // Dark mode: adjusted border and background
        "dark:border-input dark:bg-input/30",
      ],
      secondary: [
        // Background: secondary color scheme with shadow
        "bg-secondary text-secondary-foreground shadow-xs",
      ],
      success: [
        // Border: success border color
        "border-success-border",
        // Background: success color scheme with shadow
        "bg-success text-success-foreground shadow-xs",
      ],
      warning: [
        // Border: warning border color
        "border-warning-border",
        // Background: warning color scheme with shadow
        "bg-warning text-warning-foreground shadow-xs",
      ],
    },
  },
});

type ThemeIconVariants = VariantProps<typeof themeIconVariants>;

export type ThemeIconProps = ThemeIconVariants &
  useRender.ComponentProps<"div"> & {
    "data-slot"?: string;
  };

export const ThemeIcon = ({
  className,
  variant,
  size,
  render,
  ...props
}: ThemeIconProps) => {
  const element = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: themeIconVariants({ className, size, variant }),
      },
      {
        "data-slot": "theme-icon",
        ...props,
      }
    ),
    render,
  });

  return element;
};
