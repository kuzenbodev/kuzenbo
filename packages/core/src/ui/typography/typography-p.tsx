import { createElement } from "react";

import {
  TypographyText,
  type TypographyTextAliasProps,
} from "./typography-text";
export type TypographyPProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographyP = ({
  render = defaultRender,
  ...props
}: TypographyPProps) => (
  <TypographyText render={render} variant="body" {...props} />
);

export { TypographyP };
