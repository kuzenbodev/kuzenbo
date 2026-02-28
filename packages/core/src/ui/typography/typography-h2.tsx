import { createElement } from "react";

import { TypographyHeading } from "./typography-heading";
import type { TypographyHeadingAliasProps } from "./typography-heading";
export type TypographyH2Props = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h2", props);

const TypographyH2 = ({
  render = defaultRender,
  ...props
}: TypographyH2Props) => (
  <TypographyHeading render={render} variant="h2" {...props} />
);

export { TypographyH2 };
