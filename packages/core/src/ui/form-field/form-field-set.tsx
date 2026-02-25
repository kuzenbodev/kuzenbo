import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { Fieldset } from "../fieldset/fieldset";
export type FormFieldSetProps = ComponentProps<typeof Fieldset.Root>;

const FormFieldSet = ({ className, ...props }: FormFieldSetProps) => (
  <Fieldset.Root
    className={cn(
      "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
      className
    )}
    data-slot="field-set"
    {...props}
  />
);

export { FormFieldSet };
