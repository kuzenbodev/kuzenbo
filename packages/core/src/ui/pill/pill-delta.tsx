import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  MinusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, tv } from "tailwind-variants";

export interface PillDeltaProps {
  className?: string;
  delta: number;
}

const pillDeltaIconVariants = tv({
  base: "size-3 group-data-[size=lg]/badge:size-3.5 group-data-[size=md]/badge:size-3 group-data-[size=sm]/badge:size-3 group-data-[size=xl]/badge:size-4 group-data-[size=xs]/badge:size-2.5",
  defaultVariants: {
    tone: "neutral",
  },
  variants: {
    tone: {
      negative: "text-danger-foreground",
      neutral: "text-muted-foreground",
      positive: "text-success-foreground",
    },
  },
});

export const PillDelta = ({ className, delta }: PillDeltaProps) => {
  let tone: "negative" | "neutral" | "positive";
  let icon = MinusSignIcon;

  if (delta === 0) {
    tone = "neutral";
  } else if (delta > 0) {
    tone = "positive";
    icon = ArrowUp01Icon;
  } else {
    tone = "negative";
    icon = ArrowDown01Icon;
  }

  return (
    <HugeiconsIcon
      className={cn(pillDeltaIconVariants({ tone }), className)}
      icon={icon}
    />
  );
};
