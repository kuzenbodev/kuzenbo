import { createElement } from "react";

import {
  TypographyText,
  type TypographyTextAliasProps,
} from "./typography-text";
export type TypographySmallProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographySmall = ({
  render = defaultRender,
  ...props
}: TypographySmallProps) => (
  <TypographyText render={render} variant="small" {...props} />
);

export { TypographySmall };
