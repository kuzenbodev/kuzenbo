import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { Field } from "../field/field";
export type FormFieldDescriptionProps = ComponentProps<
  typeof Field.Description
>;

const FormFieldDescription = ({
  className,
  ...props
}: FormFieldDescriptionProps) => (
  <Field.Description
    className={cn(
      "text-left text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
      "last:mt-0 nth-last-2:-mt-1",
      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-foreground",
      className
    )}
    data-slot="field-description"
    {...props}
  />
);

export { FormFieldDescription };
