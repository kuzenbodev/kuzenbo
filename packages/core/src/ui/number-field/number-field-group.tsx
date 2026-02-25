import type { ComponentProps } from "react";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type NumberFieldGroupProps = ComponentProps<
  typeof BaseNumberField.Group
>;

export const NumberFieldGroup = ({
  className,
  ...props
}: NumberFieldGroupProps) => (
  <BaseNumberField.Group
    className={mergeBaseUIClassName(
      "flex rounded-md text-foreground shadow-xs transition-shadow focus-within:ring-[3px] focus-within:ring-ring/30",
      className
    )}
    data-slot="number-field-group"
    {...props}
  />
);
