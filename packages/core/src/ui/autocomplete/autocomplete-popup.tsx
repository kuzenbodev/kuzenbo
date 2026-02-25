import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompletePopupProps = ComponentProps<
  typeof BaseAutocomplete.Popup
> &
  VariantProps<typeof autocompletePopupVariants>;

const autocompletePopupVariants = tv({
  base: "relative z-50 max-h-[min(var(--available-height),20rem)] min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto overscroll-contain border border-border bg-popover text-popover-foreground shadow-md",
  variants: {
    size: {
      xs: "rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "rounded-[min(var(--radius-md),10px)] p-1",
      md: "rounded-md p-1",
      lg: "rounded-md p-1.5",
      xl: "rounded-md p-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AutocompletePopup = ({
  className,
  size,
  ...props
}: AutocompletePopupProps) => {
  const { size: overlaySize } = useContext(AutocompleteOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <BaseAutocomplete.Popup
      className={mergeBaseUIClassName<BaseAutocomplete.Popup.State>(
        autocompletePopupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-popup"
      {...props}
    />
  );
};
