import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { ActionIcon } from "../action-icon/action-icon";
import { useCarousel } from "./use-carousel";
export type CarouselPreviousProps = ComponentProps<typeof ActionIcon>;

const CarouselPrevious = ({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: CarouselPreviousProps) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <ActionIcon
      className={cn(
        "cursor-clickable absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      size={size}
      variant={variant}
      {...props}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
      <span className="sr-only">Previous slide</span>
    </ActionIcon>
  );
};

export { CarouselPrevious };
