"use client";

import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { useComponentSize } from "../shared/size/size-provider";

export const ratingStarVariants = tv({
  base: [
    // Layout: relative container for star
    "relative inline-flex shrink-0",
    // Cursor: clickable when editable
    "cursor-clickable",
    // Transitions: smooth color transitions
    "transition-colors duration-150",
  ],
  variants: {
    size: {
      xs: [
        // Extra small size: smallest star
        "size-3",
      ],
      sm: [
        // Small size: smaller star
        "size-3.5",
      ],
      md: [
        // Medium size: default star
        "size-4",
      ],
      lg: [
        // Large size: larger star
        "size-5",
      ],
      xl: [
        // Extra large size: largest star
        "size-6",
      ],
    },
    editable: {
      true: [
        // Hover: slight scale on hover when editable
        "hover:scale-110",
      ],
      false: [
        // Non-editable: no pointer cursor
        "cursor-default",
      ],
    },
  },
  defaultVariants: {
    size: "md",
    editable: false,
  },
});

export const ratingStarFilledVariants = tv({
  base: [
    // Layout: absolute positioned filled star
    "absolute inset-0",
    // Fill: semantic warning token for filled stars
    "fill-warning-foreground text-warning-foreground",
  ],
  variants: {
    visible: {
      true: [
        // Visible: show filled star
        "opacity-100",
      ],
      false: [
        // Hidden: hide filled star
        "opacity-0",
      ],
    },
  },
  defaultVariants: {
    visible: true,
  },
});

export const ratingStarHalfVariants = tv({
  base: [
    // Layout: absolute positioned half-filled star
    "absolute inset-0 overflow-hidden",
    // Fill: semantic warning token for half-filled stars
    "fill-warning-foreground text-warning-foreground",
  ],
  variants: {
    visible: {
      true: [
        // Visible: show half-filled star
        "opacity-100",
      ],
      false: [
        // Hidden: hide half-filled star
        "opacity-0",
      ],
    },
  },
  defaultVariants: {
    visible: true,
  },
});

export const ratingStarOutlineVariants = tv({
  base: [
    // Layout: relative positioned outline star
    "relative",
    // Color: muted color for outline
    "text-muted-foreground",
  ],
  variants: {
    active: {
      true: [
        // Active: slightly visible outline
        "opacity-30",
      ],
      false: [
        // Inactive: more visible outline
        "opacity-100",
      ],
    },
  },
  defaultVariants: {
    active: false,
  },
});

type RatingStarVariants = VariantProps<typeof ratingStarVariants>;

export type RatingStarProps = RatingStarVariants &
  ComponentProps<"button"> & {
    filled?: boolean;
    halfFilled?: boolean;
    active?: boolean;
    starClassName?: string;
  };

export const RatingStar = ({
  className,
  size,
  filled = false,
  halfFilled = false,
  active = false,
  editable = false,
  starClassName,
  onClick,
  ...props
}: RatingStarProps) => {
  const resolvedSize = useComponentSize(size);

  const getStarSize = () => {
    if (resolvedSize === "xs") {
      return 12;
    }
    if (resolvedSize === "sm") {
      return 14;
    }
    if (resolvedSize === "lg") {
      return 20;
    }
    if (resolvedSize === "xl") {
      return 24;
    }
    return 16;
  };

  const getAriaLabel = () => {
    if (filled) {
      return "Filled star";
    }
    if (halfFilled) {
      return "Half-filled star";
    }
    return "Empty star";
  };

  const starSize = getStarSize();

  return (
    <button
      aria-label={getAriaLabel()}
      className={cn(
        ratingStarVariants({ size: resolvedSize, editable }),
        className
      )}
      data-size={resolvedSize}
      data-slot="rating-star"
      disabled={!editable}
      onClick={onClick}
      type="button"
      {...props}
    >
      {/* Filled star overlay */}
      <span
        className={cn(
          ratingStarFilledVariants({ visible: filled }),
          starClassName
        )}
      >
        <HugeiconsIcon
          className="fill-warning-foreground text-warning-foreground"
          icon={StarIcon}
          size={starSize}
          strokeWidth={1.5}
        />
      </span>

      {/* Half-filled star overlay */}
      {halfFilled && (
        <span
          className={cn(
            ratingStarHalfVariants({ visible: true }),
            starClassName
          )}
        >
          <div className="w-1/2 overflow-hidden">
            <HugeiconsIcon
              className="fill-warning-foreground text-warning-foreground"
              icon={StarIcon}
              size={starSize}
              strokeWidth={1.5}
            />
          </div>
        </span>
      )}

      {/* Outline star */}
      <span
        className={cn(ratingStarOutlineVariants({ active }), starClassName)}
      >
        <HugeiconsIcon icon={StarIcon} size={starSize} strokeWidth={1.5} />
      </span>
    </button>
  );
};
