import type { InputProps } from "./input";

import { useComponentDefaultProps } from "../shared/size/size-provider";

export const useInputDefaultProps = (incomingProps: InputProps): InputProps =>
  useComponentDefaultProps<InputProps>("Input", {}, incomingProps);
