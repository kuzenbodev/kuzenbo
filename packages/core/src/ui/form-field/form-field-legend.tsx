import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { Fieldset } from "../fieldset/fieldset";
export type FormFieldLegendProps = ComponentProps<typeof Fieldset.Legend> & {
  variant?: "legend" | "label";
};

const FormFieldLegend = ({
  className,
  variant = "legend",
  ...props
}: FormFieldLegendProps) => (
  <Fieldset.Legend
    className={cn(
      "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
      className
    )}
    data-slot="field-legend"
    data-variant={variant}
    {...props}
  />
);

export { FormFieldLegend };
