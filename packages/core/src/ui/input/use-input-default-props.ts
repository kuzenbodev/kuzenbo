import { useComponentDefaultProps } from "../shared/size/size-provider";
import type { InputProps } from "./input";

export const useInputDefaultProps = (incomingProps: InputProps): InputProps =>
  useComponentDefaultProps<InputProps>("Input", {}, incomingProps);
