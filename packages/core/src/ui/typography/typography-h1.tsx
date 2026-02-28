import { createElement } from "react";

import { TypographyHeading } from "./typography-heading";
import type { TypographyHeadingAliasProps } from "./typography-heading";
export type TypographyH1Props = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h1", props);

const TypographyH1 = ({
  render = defaultRender,
  ...props
}: TypographyH1Props) => (
  <TypographyHeading render={render} variant="h1" {...props} />
);

export { TypographyH1 };
