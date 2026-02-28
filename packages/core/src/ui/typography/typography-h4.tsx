import { createElement } from "react";

import { TypographyHeading } from "./typography-heading";
import type { TypographyHeadingAliasProps } from "./typography-heading";
export type TypographyH4Props = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h4", props);

const TypographyH4 = ({
  render = defaultRender,
  ...props
}: TypographyH4Props) => (
  <TypographyHeading render={render} variant="h4" {...props} />
);

export { TypographyH4 };
