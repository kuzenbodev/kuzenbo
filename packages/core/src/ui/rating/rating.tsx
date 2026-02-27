"use client";

import type { ComponentProps, MouseEvent } from "react";

import { useCallback } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import {
  useComponentSize,
  useKuzenboComponentDefaults,
} from "../shared/size/size-provider";
import { RatingStar } from "./rating-star";

export const ratingVariants = tv({
  base: [
    // Layout: flex container with centered items
    "inline-flex items-center gap-1",
  ],
  variants: {
    size: {
      xs: [
        // Extra small size: compact gap
        "gap-0.5",
      ],
      sm: [
        // Small size: smaller gap and text
        "gap-0.5",
      ],
      md: [
        // Medium size: default gap
        "gap-1",
      ],
      lg: [
        // Large size: larger gap
        "gap-1.5",
      ],
      xl: [
        // Extra large size: largest spacing
        "gap-2",
      ],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const ratingValueVariants = tv({
  base: [
    // Typography: rating value text styling
    "text-sm font-medium",
  ],
  variants: {
    size: {
      xs: [
        // Extra small size: smallest text
        "text-xs",
      ],
      sm: [
        // Small size: smaller text
        "text-xs",
      ],
      md: [
        // Medium size: default text
        "text-sm",
      ],
      lg: [
        // Large size: larger text
        "text-base",
      ],
      xl: [
        // Extra large size: largest text
        "text-base",
      ],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RatingVariants = VariantProps<typeof ratingVariants>;

export type RatingProps = RatingVariants &
  Omit<ComponentProps<"div">, "onClick"> & {
    rating: number;
    maxRating?: number;
    showValue?: boolean;
    editable?: boolean;
    onRatingChange?: (rating: number) => void;
    starClassName?: string;
  };

const Rating = ({
  className,
  size,
  rating,
  maxRating = 5,
  showValue = false,
  editable = false,
  onRatingChange,
  starClassName,
  ...props
}: RatingProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<RatingProps>("Rating");
  const resolvedSize = useComponentSize(size, componentDefaultSize);

  const handleStarClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.dataset.value);
      if (editable && onRatingChange) {
        onRatingChange(value);
      }
    },
    [editable, onRatingChange]
  );

  return (
    <div
      className={cn(ratingVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="rating"
      {...props}
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.floor(rating);
        const isHalfFilled =
          !isFilled && starValue - 0.5 <= rating && rating < starValue;
        const isActive = starValue <= rating;

        return (
          <RatingStar
            active={isActive}
            className={starClassName}
            data-value={starValue}
            editable={editable}
            filled={isFilled}
            halfFilled={isHalfFilled}
            key={starValue}
            onClick={handleStarClick}
            size={resolvedSize}
          />
        );
      })}
      {showValue && (
        <span
          className={cn(ratingValueVariants({ size: resolvedSize }), "ml-1")}
          data-size={resolvedSize}
          data-slot="rating-value"
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

Rating.Star = RatingStar;

export { Rating, RatingStar };

export type { RatingStarProps } from "./rating-star";
