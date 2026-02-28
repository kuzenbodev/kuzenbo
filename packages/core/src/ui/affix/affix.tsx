"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { CSSProperties } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { OptionalPortal } from "../portal/optional-portal";
import type { BasePortalProps } from "../portal/portal";

export interface AffixPosition {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}

const getSpacing = (value?: number | string): string => {
  if (value === undefined) {
    return "";
  }
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
};

export const affixVariants = tv({
  base: [
    // Layout: fixed positioning
    "fixed",
    // Z-index: from CSS variable
    "z-affix",
    // Positioning: from CSS variables
    "top-(--affix-top)",
    "left-(--affix-left)",
    "bottom-(--affix-bottom)",
    "right-(--affix-right)",
  ],
});

type AffixVariants = VariantProps<typeof affixVariants>;

export type AffixProps = AffixVariants &
  useRender.ComponentProps<"div"> & {
    "data-slot"?: string;
    /**
     * Position of the affix element
     * @default { bottom: 0, right: 0 }
     */
    position?: AffixPosition;
    /**
     * Props passed down to the Portal component. Ignored when `withinPortal` is `false`.
     */
    portalProps?: BasePortalProps;
    /**
     * Whether to render the affix within a portal
     * @default true
     */
    withinPortal?: boolean;
    /**
     * Custom z-index value
     * @default token: --kb-z-affix
     */
    zIndex?: CSSProperties["zIndex"];
  };

const DEFAULT_POSITION: AffixPosition = { bottom: 0, right: 0 };

const buildPositionStyles = (
  position: AffixPosition,
  zIndex?: CSSProperties["zIndex"]
): CSSProperties & Record<`--${string}`, string> => {
  const styles = {} as CSSProperties & Record<`--${string}`, string>;

  if (zIndex !== undefined) {
    styles.zIndex = zIndex;
  }

  if (position.top !== undefined) {
    styles["--affix-top"] = getSpacing(position.top);
  }
  if (position.bottom !== undefined) {
    styles["--affix-bottom"] = getSpacing(position.bottom);
  }
  if (position.left !== undefined) {
    styles["--affix-left"] = getSpacing(position.left);
  }
  if (position.right !== undefined) {
    styles["--affix-right"] = getSpacing(position.right);
  }

  return styles;
};

export const Affix = ({
  className,
  position = DEFAULT_POSITION,
  portalProps,
  withinPortal = true,
  zIndex,
  render,
  children,
  ...props
}: AffixProps) => {
  const positionStyles = buildPositionStyles(position, zIndex);

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(affixVariants(), className),
        style: positionStyles,
        children,
      },
      {
        "data-slot": "affix",
        ...props,
      }
    ),
  });

  return (
    <OptionalPortal {...portalProps} withinPortal={withinPortal}>
      {element}
    </OptionalPortal>
  );
};
