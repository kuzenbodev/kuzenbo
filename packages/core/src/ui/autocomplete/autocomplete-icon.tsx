import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteIconProps = ComponentProps<
  typeof BaseAutocomplete.Icon
>;

export const AutocompleteIcon = (props: AutocompleteIconProps) => (
  <BaseAutocomplete.Icon data-slot="autocomplete-icon" {...props} />
);
