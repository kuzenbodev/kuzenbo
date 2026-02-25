"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { MarqueeContent } from "./marquee-content";
import { MarqueeFade } from "./marquee-fade";
import { MarqueeItem } from "./marquee-item";

export type MarqueeProps = ComponentProps<"div">;

const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div
    className={cn("relative w-full overflow-hidden", className)}
    {...props}
  />
);

Marquee.Content = MarqueeContent;
Marquee.Fade = MarqueeFade;
Marquee.Item = MarqueeItem;

export type { MarqueeContentProps } from "./marquee-content";
export type { MarqueeFadeProps } from "./marquee-fade";
export type { MarqueeItemProps } from "./marquee-item";

export { Marquee, MarqueeContent, MarqueeFade, MarqueeItem };
