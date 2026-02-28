import type { ButtonProps } from "@kuzenbo/core/ui/button";
import { Button } from "@kuzenbo/core/ui/button";
import { cn } from "tailwind-variants";

export type DateControlButtonProps = ButtonProps;

const DateControlButton = ({
  className,
  variant = "ghost",
  ...props
}: DateControlButtonProps) => (
  <Button
    className={cn("cursor-clickable", className)}
    variant={variant}
    {...props}
  />
);

export { DateControlButton };
