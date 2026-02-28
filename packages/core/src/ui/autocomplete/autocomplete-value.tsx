import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

export type AutocompleteValueProps = ComponentProps<
  typeof BaseAutocomplete.Value
>;

export const AutocompleteValue = (props: AutocompleteValueProps) => (
  <BaseAutocomplete.Value data-slot="autocomplete-value" {...props} />
);
