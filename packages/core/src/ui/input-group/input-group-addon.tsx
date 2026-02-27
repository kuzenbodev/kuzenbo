"use client";

import type { ComponentProps, MouseEvent } from "react";

import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { InputGroupContext } from "./input-group-context";
export type InputGroupAddonProps = ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>;

const inputGroupAddonVariants = tv({
  base: "flex h-auto cursor-text items-center justify-center font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--kb-radius)-5px)]",
  variants: {
    align: {
      "inline-start":
        "order-first pl-2 has-[>button]:ml-[-0.25rem] has-[>kbd]:ml-[-0.15rem]",
      "inline-end":
        "order-last pr-2 has-[>button]:mr-[-0.25rem] has-[>kbd]:mr-[-0.15rem]",
      "block-start":
        "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
      "block-end":
        "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
    },
    size: {
      xs: "gap-1 py-0.5 text-xs [&>svg:not([class*='size-'])]:size-3",
      sm: "gap-1.5 py-1 text-sm [&>svg:not([class*='size-'])]:size-3.5",
      md: "gap-2 py-1.5 text-sm [&>svg:not([class*='size-'])]:size-4",
      lg: "gap-2 py-2 text-sm [&>svg:not([class*='size-'])]:size-4",
      xl: "gap-2.5 py-2 text-base [&>svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    align: "inline-start",
    size: "md",
  },
});

const focusInput = (e: MouseEvent<HTMLDivElement>) => {
  if ((e.target as HTMLElement).closest("button")) {
    return;
  }
  const control =
    e.currentTarget.parentElement?.querySelector<HTMLElement>(
      "input, textarea"
    );
  control?.focus();
};

const InputGroupAddon = ({
  className,
  align = "inline-start",
  size,
  ...props
}: InputGroupAddonProps) => {
  const { size: contextSize } = useContext(InputGroupContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <div
      className={cn(
        inputGroupAddonVariants({ align, size: resolvedSize }),
        className
      )}
      data-align={align}
      data-size={resolvedSize}
      data-slot="input-group-addon"
      onMouseDown={focusInput}
      {...props}
    />
  );
};

export { InputGroupAddon, inputGroupAddonVariants };
