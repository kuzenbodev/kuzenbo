import type { TextareaProps } from "./textarea";

import { useComponentDefaultProps } from "../shared/size/size-provider";

export const useTextareaDefaultProps = (
  incomingProps: TextareaProps
): TextareaProps =>
  useComponentDefaultProps<TextareaProps>("Textarea", {}, incomingProps);
