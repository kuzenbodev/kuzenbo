import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type AutocompletePositionerProps = ComponentProps<
  typeof BaseAutocomplete.Positioner
>;

export const AutocompletePositioner = ({
  className,
  ...props
}: AutocompletePositionerProps) => (
  <BaseAutocomplete.Positioner
    className={mergeBaseUIClassName<BaseAutocomplete.Positioner.State>(
      "z-50",
      className
    )}
    data-slot="autocomplete-positioner"
    {...props}
  />
);
