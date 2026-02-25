import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { Field } from "../field/field";
export type FormFieldLabelProps = ComponentProps<typeof Field.Label>;

const FormFieldLabel = ({ className, ...props }: FormFieldLabelProps) => (
  <Field.Label
    className={cn(
      "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
      "has-[>[data-slot=field-control]]:w-full has-[>[data-slot=field-control]]:flex-col",
      className
    )}
    data-slot="field-label"
    {...props}
  />
);

export { FormFieldLabel };
