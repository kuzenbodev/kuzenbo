import { createElement } from "react";

import { TypographyHeading } from "./typography-heading";
import type { TypographyHeadingAliasProps } from "./typography-heading";
export type TypographySubheadingProps = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h2", props);

const TypographySubheading = ({
  render = defaultRender,
  ...props
}: TypographySubheadingProps) => (
  <TypographyHeading render={render} variant="subheading" {...props} />
);

export { TypographySubheading };
