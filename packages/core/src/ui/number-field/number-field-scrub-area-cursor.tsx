import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { ArrowHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type NumberFieldScrubAreaCursorProps = ComponentProps<
  typeof BaseNumberField.ScrubAreaCursor
>;

export const NumberFieldScrubAreaCursor = ({
  className,
  children,
  ...props
}: NumberFieldScrubAreaCursorProps) => (
  <BaseNumberField.ScrubAreaCursor
    className={mergeBaseUIClassName("drop-shadow-sm filter", className)}
    data-slot="number-field-scrub-area-cursor"
    {...props}
  >
    {children ?? (
      <HugeiconsIcon className="size-4.5" icon={ArrowHorizontalIcon} />
    )}
  </BaseNumberField.ScrubAreaCursor>
);
