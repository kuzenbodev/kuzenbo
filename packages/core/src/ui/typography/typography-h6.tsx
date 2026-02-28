import { createElement } from "react";

import { TypographyHeading } from "./typography-heading";
import type { TypographyHeadingAliasProps } from "./typography-heading";
export type TypographyH6Props = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h6", props);

const TypographyH6 = ({
  render = defaultRender,
  ...props
}: TypographyH6Props) => (
  <TypographyHeading render={render} variant="h6" {...props} />
);

export { TypographyH6 };
