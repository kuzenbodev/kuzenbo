import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompletePopupProps = ComponentProps<
  typeof BaseAutocomplete.Popup
> &
  VariantProps<typeof autocompletePopupVariants>;

const autocompletePopupVariants = tv({
  base: "z-overlay border-border bg-popover text-popover-foreground relative max-h-[min(var(--available-height),20rem)] min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto overscroll-contain border shadow-md",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "rounded-md p-1.5",
      md: "rounded-md p-1",
      sm: "rounded-[min(var(--radius-md),10px)] p-1",
      xl: "rounded-md p-2",
      xs: "rounded-[min(var(--radius-md),8px)] p-0.5",
    },
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
