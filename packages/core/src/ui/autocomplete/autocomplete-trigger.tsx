import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type AutocompleteTriggerProps = ComponentProps<
  typeof BaseAutocomplete.Trigger
>;

export const AutocompleteTrigger = ({
  className,
  ...props
}: AutocompleteTriggerProps) => (
  <BaseAutocomplete.Trigger
    className={mergeBaseUIClassName<BaseAutocomplete.Trigger.State>(
      "cursor-pointer",
      className
    )}
    data-slot="autocomplete-trigger"
    {...props}
  />
);
