import { createElement } from "react";

import { TypographyText } from "./typography-text";
import type { TypographyTextAliasProps } from "./typography-text";
export type TypographyBodyProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographyBody = ({
  render = defaultRender,
  ...props
}: TypographyBodyProps) => (
  <TypographyText render={render} variant="body" {...props} />
);

export { TypographyBody };
