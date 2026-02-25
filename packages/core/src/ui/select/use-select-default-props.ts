import type { SelectProps } from "./select";

import { useComponentDefaultProps } from "../shared/size/size-provider";

export const useSelectDefaultProps = <
  Value,
  Multiple extends boolean | undefined = false,
>(
  incomingProps: SelectProps<Value, Multiple>
): SelectProps<Value, Multiple> =>
  useComponentDefaultProps<SelectProps<Value, Multiple>>(
    "Select",
    {},
    incomingProps
  );
