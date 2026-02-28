import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

export type AutocompletePortalProps = ComponentProps<
  typeof BaseAutocomplete.Portal
>;

export const AutocompletePortal = (props: AutocompletePortalProps) => (
  <BaseAutocomplete.Portal data-slot="autocomplete-portal" {...props} />
);
