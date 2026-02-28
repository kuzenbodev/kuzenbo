import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FieldsetLegendProps = ComponentProps<typeof BaseFieldset.Legend>;

export const FieldsetLegend = ({
  className,
  ...props
}: FieldsetLegendProps) => (
  <BaseFieldset.Legend
    className={mergeBaseUIClassName("mb-1.5 text-base font-medium", className)}
    data-slot="fieldset-legend"
    {...props}
  />
);
