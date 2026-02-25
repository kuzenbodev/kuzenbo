import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type FormFieldGroupProps = ComponentProps<"div">;

const FormFieldGroup = ({ className, ...props }: FormFieldGroupProps) => (
  <div
    className={cn(
      "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
      className
    )}
    data-slot="field-group"
    {...props}
  />
);

export { FormFieldGroup };
