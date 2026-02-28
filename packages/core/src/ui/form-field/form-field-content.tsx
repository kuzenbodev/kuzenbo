import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Field } from "../field/field";
export type FormFieldContentProps = ComponentProps<typeof Field.Item>;

const FormFieldContent = ({ className, ...props }: FormFieldContentProps) => (
  <Field.Item
    className={cn(
      "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
      className
    )}
    data-slot="field-content"
    {...props}
  />
);

export { FormFieldContent };
