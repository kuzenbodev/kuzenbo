import type { ComponentProps } from "react";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type NumberFieldScrubAreaProps = ComponentProps<
  typeof BaseNumberField.ScrubArea
>;

export const NumberFieldScrubArea = ({
  className,
  children,
  ...props
}: NumberFieldScrubAreaProps) => (
  <BaseNumberField.ScrubArea
    className={mergeBaseUIClassName("cursor-ew-resize", className)}
    data-slot="number-field-scrub-area"
    {...props}
  >
    {children}
  </BaseNumberField.ScrubArea>
);
