"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useComponentSize } from "../shared/size/size-provider";
import { CardAction } from "./card-action";
import { CardContent } from "./card-content";
import { CardDescription } from "./card-description";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardTitle } from "./card-title";
import { useCardDefaultProps } from "./use-card-default-props";
export type CardProps = ComponentProps<"div"> & { size?: UISize };

const Card = (incomingProps: CardProps) => {
  const {
    className,
    size: providedSize,
    ...props
  } = useCardDefaultProps(incomingProps);
  const size = useComponentSize(providedSize);

  return (
    <div
      className={cn(
        "group/card flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xs has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=xs]:gap-2.5 data-[size=xs]:py-2.5 data-[size=xs]:text-xs data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:text-sm data-[size=md]:gap-5 data-[size=md]:py-5 data-[size=md]:text-sm data-[size=lg]:gap-6 data-[size=lg]:py-6 data-[size=lg]:text-sm data-[size=xl]:gap-7 data-[size=xl]:py-6 data-[size=xl]:text-base *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      data-size={size}
      data-slot="card"
      {...props}
    />
  );
};

Card.Action = CardAction;
Card.Content = CardContent;
Card.Description = CardDescription;
Card.Footer = CardFooter;
Card.Header = CardHeader;
Card.Title = CardTitle;

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};

export type { CardActionProps } from "./card-action";
export type { CardContentProps } from "./card-content";
export type { CardDescriptionProps } from "./card-description";
export type { CardFooterProps } from "./card-footer";
export type { CardHeaderProps } from "./card-header";
export type { CardTitleProps } from "./card-title";
