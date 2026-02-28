import { createElement } from "react";

import { TypographyText } from "./typography-text";
import type { TypographyTextAliasProps } from "./typography-text";
export type TypographyEyebrowProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographyEyebrow = ({
  render = defaultRender,
  ...props
}: TypographyEyebrowProps) => (
  <TypographyText render={render} variant="eyebrow" {...props} />
);

export { TypographyEyebrow };
