import { createElement } from "react";

import { TypographyText } from "./typography-text";
import type { TypographyTextAliasProps } from "./typography-text";
export type TypographyMutedProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographyMuted = ({
  render = defaultRender,
  ...props
}: TypographyMutedProps) => (
  <TypographyText render={render} variant="muted" {...props} />
);

export { TypographyMuted };
