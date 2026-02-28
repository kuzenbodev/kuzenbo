import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompleteGroupLabelProps = ComponentProps<
  typeof BaseAutocomplete.GroupLabel
> &
  VariantProps<typeof autocompleteGroupLabelVariants>;

const autocompleteGroupLabelVariants = tv({
  base: "text-muted-foreground font-medium",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "px-2.5 py-1.5 text-sm",
      md: "px-2 py-1.5 text-xs",
      sm: "px-2 py-1 text-xs",
      xl: "px-3 py-2 text-sm",
      xs: "px-1.5 py-1 text-xs",
    },
  },
});

export const AutocompleteGroupLabel = ({
  className,
  size,
  ...props
}: AutocompleteGroupLabelProps) => {
  const { size: overlaySize } = useContext(AutocompleteOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <BaseAutocomplete.GroupLabel
      className={mergeBaseUIClassName<BaseAutocomplete.GroupLabel.State>(
        autocompleteGroupLabelVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
};
