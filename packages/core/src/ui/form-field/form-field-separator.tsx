import type { ComponentProps, ReactNode } from "react";

import { cn } from "tailwind-variants";

import { Separator } from "../separator/separator";
export type FormFieldSeparatorProps = ComponentProps<"div"> & {
  children?: ReactNode;
};

const FormFieldSeparator = ({
  children,
  className,
  ...props
}: FormFieldSeparatorProps) => (
  <div
    className={cn(
      "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
      className
    )}
    data-content={!!children}
    data-slot="field-separator"
    {...props}
  >
    <Separator className="absolute inset-0 top-1/2" />
    {children && (
      <span
        className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
        data-slot="field-separator-content"
      >
        {children}
      </span>
    )}
  </div>
);

export { FormFieldSeparator };
