import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { ActionIcon } from "../action-icon/action-icon";
import { useCarousel } from "./use-carousel";
export type CarouselNextProps = ComponentProps<typeof ActionIcon>;

const CarouselNext = ({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: CarouselNextProps) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <ActionIcon
      className={cn(
        "cursor-clickable absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      size={size}
      variant={variant}
      {...props}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
      <span className="sr-only">Next slide</span>
    </ActionIcon>
  );
};

export { CarouselNext };
