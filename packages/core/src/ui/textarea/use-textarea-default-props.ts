import { useComponentDefaultProps } from "../shared/size/size-provider";
import type { TextareaProps } from "./textarea";

export const useTextareaDefaultProps = (
  incomingProps: TextareaProps
): TextareaProps =>
  useComponentDefaultProps<TextareaProps>("Textarea", {}, incomingProps);
