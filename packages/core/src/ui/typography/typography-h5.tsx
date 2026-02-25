import { createElement } from "react";

import {
  TypographyHeading,
  type TypographyHeadingAliasProps,
} from "./typography-heading";
export type TypographyH5Props = TypographyHeadingAliasProps;

const defaultRender: NonNullable<TypographyHeadingAliasProps["render"]> = (
  props
) => createElement("h5", props);

const TypographyH5 = ({
  render = defaultRender,
  ...props
}: TypographyH5Props) => (
  <TypographyHeading render={render} variant="h5" {...props} />
);

export { TypographyH5 };
