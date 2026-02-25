"use client";

import type { MarqueeProps as FastMarqueeProps } from "react-fast-marquee";

import FastMarquee from "react-fast-marquee";
import { cn } from "tailwind-variants";

export type MarqueeContentProps = FastMarqueeProps;

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  className,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee
    autoFill={autoFill}
    className={cn("py-0.5", className)}
    loop={loop}
    pauseOnHover={pauseOnHover}
    {...props}
  />
);
