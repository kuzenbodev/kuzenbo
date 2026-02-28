import { createElement } from "react";

import { TypographyText } from "./typography-text";
import type { TypographyTextAliasProps } from "./typography-text";
export type TypographyOverlineProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographyOverline = ({
  render = defaultRender,
  ...props
}: TypographyOverlineProps) => (
  <TypographyText render={render} variant="overline" {...props} />
);

export { TypographyOverline };
