import { createElement } from "react";

import {
  TypographyText,
  type TypographyTextAliasProps,
} from "./typography-text";
export type TypographyCaptionProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographyCaption = ({
  render = defaultRender,
  ...props
}: TypographyCaptionProps) => (
  <TypographyText render={render} variant="caption" {...props} />
);

export { TypographyCaption };
