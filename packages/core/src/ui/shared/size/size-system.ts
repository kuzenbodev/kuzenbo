import { tv } from "tailwind-variants";

export type UISize = "xs" | "sm" | "md" | "lg" | "xl";

export const UI_SIZE_ORDER: readonly UISize[] = ["xs", "sm", "md", "lg", "xl"];

const fieldHeightVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-10",
      md: "h-9",
      sm: "h-8",
      xl: "h-11",
      xs: "h-6",
    },
  },
});

const rowHeightVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-9",
      md: "h-8",
      sm: "h-7",
      xl: "h-10",
      xs: "h-6",
    },
  },
});

const compactVisualVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-[18px]",
      md: "size-4",
      sm: "size-3.5",
      xl: "size-5",
      xs: "size-3",
    },
  },
});

export const COMPACT_TARGET_SIZE_BY_SIZE: Record<UISize, number> = {
  lg: 36,
  md: 32,
  sm: 28,
  xl: 40,
  xs: 24,
};

const surfaceSpacingVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-3.5 p-5",
      md: "gap-3 p-4",
      sm: "gap-2 p-3",
      xl: "gap-4 p-6",
      xs: "gap-1.5 p-2",
    },
  },
});

const fieldTextVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-sm",
      xl: "text-base",
      xs: "text-xs",
    },
  },
});

const rowTextVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-xs",
      xl: "text-base",
      xs: "text-xs",
    },
  },
});

const defaultIconVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-4",
      md: "size-4",
      sm: "size-3.5",
      xl: "size-5",
      xs: "size-3",
    },
  },
});

const defaultNestedIconVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "[&_svg:not([class*='size-'])]:size-4",
      md: "[&_svg:not([class*='size-'])]:size-4",
      sm: "[&_svg:not([class*='size-'])]:size-3.5",
      xl: "[&_svg:not([class*='size-'])]:size-5",
      xs: "[&_svg:not([class*='size-'])]:size-3",
    },
  },
});

export const resolveFieldHeightClassBySize = (size: UISize): string =>
  fieldHeightVariants({ size });

export const resolveRowHeightClassBySize = (size: UISize): string =>
  rowHeightVariants({ size });

export const resolveCompactVisualClassBySize = (size: UISize): string =>
  compactVisualVariants({ size });

export const resolveSurfaceSpacingClassBySize = (size: UISize): string =>
  surfaceSpacingVariants({ size });

export const resolveFieldTextClassBySize = (size: UISize): string =>
  fieldTextVariants({ size });

export const resolveRowTextClassBySize = (size: UISize): string =>
  rowTextVariants({ size });

export const resolveDefaultIconClassBySize = (size: UISize): string =>
  defaultIconVariants({ size });

export const resolveDefaultNestedIconClassBySize = (size: UISize): string =>
  defaultNestedIconVariants({ size });
