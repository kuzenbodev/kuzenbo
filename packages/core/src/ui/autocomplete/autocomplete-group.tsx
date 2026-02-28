import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

export type AutocompleteGroupProps = ComponentProps<
  typeof BaseAutocomplete.Group
>;

export const AutocompleteGroup = (props: AutocompleteGroupProps) => (
  <BaseAutocomplete.Group data-slot="autocomplete-group" {...props} />
);
