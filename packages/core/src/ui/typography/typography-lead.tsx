import { createElement } from "react";

import { TypographyText } from "./typography-text";
import type { TypographyTextAliasProps } from "./typography-text";
export type TypographyLeadProps = TypographyTextAliasProps;

const defaultRender: NonNullable<TypographyTextAliasProps["render"]> = (
  props
) => createElement("p", props);

const TypographyLead = ({
  render = defaultRender,
  ...props
}: TypographyLeadProps) => (
  <TypographyText render={render} variant="lead" {...props} />
);

export { TypographyLead };
