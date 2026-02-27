import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { Button } from "../button/button";

export type PillButtonProps = ComponentProps<typeof Button>;

export const PillButton = ({ className, ...props }: PillButtonProps) => (
  <Button
    className={cn(
      "-my-2 -mr-2 size-6 cursor-clickable rounded-full p-0.5 hover:bg-foreground/5 group-data-[size=xs]/badge:-my-1.5 group-data-[size=xs]/badge:-mr-1.5 group-data-[size=xs]/badge:size-5 group-data-[size=sm]/badge:-my-1.5 group-data-[size=sm]/badge:-mr-1.5 group-data-[size=sm]/badge:size-6 group-data-[size=md]/badge:-my-2 group-data-[size=md]/badge:-mr-2 group-data-[size=md]/badge:size-6 group-data-[size=lg]/badge:-my-2.5 group-data-[size=lg]/badge:-mr-2.5 group-data-[size=lg]/badge:size-7 group-data-[size=xl]/badge:-my-3 group-data-[size=xl]/badge:-mr-3 group-data-[size=xl]/badge:size-8",
      className
    )}
    size="icon"
    variant="ghost"
    {...props}
  />
);
