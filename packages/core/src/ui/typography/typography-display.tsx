import { createElement } from "react";

import {
  TypographyHeading,
  type TypographyHeadingAliasProps,
} from "./typography-heading";
export type TypographyDisplayProps = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h1", props);

const TypographyDisplay = ({
  render = defaultRender,
  ...props
}: TypographyDisplayProps) => (
  <TypographyHeading render={render} variant="display" {...props} />
);

export { TypographyDisplay };
