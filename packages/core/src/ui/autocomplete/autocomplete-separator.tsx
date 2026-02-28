import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type AutocompleteSeparatorProps = ComponentProps<
  typeof BaseAutocomplete.Separator
>;

export const AutocompleteSeparator = ({
  className,
  ...props
}: AutocompleteSeparatorProps) => (
  <BaseAutocomplete.Separator
    className={mergeBaseUIClassName<BaseAutocomplete.Separator.State>(
      "pointer-events-none -mx-1 my-1 h-px bg-border",
      className
    )}
    data-slot="autocomplete-separator"
    {...props}
  />
);
