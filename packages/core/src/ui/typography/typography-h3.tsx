import { createElement } from "react";

import { TypographyHeading } from "./typography-heading";
import type { TypographyHeadingAliasProps } from "./typography-heading";
export type TypographyH3Props = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h3", props);

const TypographyH3 = ({
  render = defaultRender,
  ...props
}: TypographyH3Props) => (
  <TypographyHeading render={render} variant="h3" {...props} />
);

export { TypographyH3 };
