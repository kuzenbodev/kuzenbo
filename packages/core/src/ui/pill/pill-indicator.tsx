import { cn } from "tailwind-variants";

export interface PillIndicatorProps {
  variant?: "success" | "error" | "warning" | "info";
  pulse?: boolean;
}

export const PillIndicator = ({
  variant = "success",
  pulse = false,
}: PillIndicatorProps) => (
  <span className="relative flex size-2 group-data-[size=lg]/badge:size-2.5 group-data-[size=md]/badge:size-2 group-data-[size=sm]/badge:size-2 group-data-[size=xl]/badge:size-3 group-data-[size=xs]/badge:size-1.5">
    {pulse && (
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          variant === "success" && "bg-success/70",
          variant === "error" && "bg-danger/70",
          variant === "warning" && "bg-warning/70",
          variant === "info" && "bg-info/70"
        )}
      />
    )}
    <span
      className={cn(
        "relative inline-flex size-2 rounded-full group-data-[size=lg]/badge:size-2.5 group-data-[size=md]/badge:size-2 group-data-[size=sm]/badge:size-2 group-data-[size=xl]/badge:size-3 group-data-[size=xs]/badge:size-1.5",
        variant === "success" && "bg-success",
        variant === "error" && "bg-danger",
        variant === "warning" && "bg-warning",
        variant === "info" && "bg-info"
      )}
    />
  </span>
);
