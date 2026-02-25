import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type FormFieldTitleProps = ComponentProps<"div">;

const FormFieldTitle = ({ className, ...props }: FormFieldTitleProps) => (
  <div
    className={cn(
      "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
      className
    )}
    data-slot="field-label"
    {...props}
  />
);

export { FormFieldTitle };
