import type { TypographyBlockquoteProps } from "./typography-blockquote";
import { TypographyBlockquote } from "./typography-blockquote";
import { TypographyBody } from "./typography-body";
import { TypographyCaption } from "./typography-caption";
import { TypographyDisplay } from "./typography-display";
import { TypographyEyebrow } from "./typography-eyebrow";
import { TypographyH1 } from "./typography-h1";
import { TypographyH2 } from "./typography-h2";
import { TypographyH3 } from "./typography-h3";
import { TypographyH4 } from "./typography-h4";
import { TypographyH5 } from "./typography-h5";
import { TypographyH6 } from "./typography-h6";
import { TypographyHeading } from "./typography-heading";
import type {
  TypographyHeadingAliasProps,
  TypographyHeadingProps,
} from "./typography-heading";
import { TypographyLead } from "./typography-lead";
import { TypographyLi } from "./typography-li";
import type { TypographyLiProps } from "./typography-li";
import type { TypographyLinkProps } from "./typography-link";
import { TypographyLink } from "./typography-link";
import { TypographyMuted } from "./typography-muted";
import { TypographyOl } from "./typography-ol";
import type { TypographyOlProps } from "./typography-ol";
import { TypographyOverline } from "./typography-overline";
import { TypographyP } from "./typography-p";
import { TypographyProse, typographyProseVariants } from "./typography-prose";
import type { TypographyProseProps } from "./typography-prose";
import { TypographySmall } from "./typography-small";
import { TypographySubheading } from "./typography-subheading";
import { TypographyText } from "./typography-text";
import type {
  TypographyTextAliasProps,
  TypographyTextProps,
} from "./typography-text";
import { TypographyUl } from "./typography-ul";
import type { TypographyUlProps } from "./typography-ul";
import {
  typographyHeadingVariants,
  typographyTextVariants,
} from "./typography-variants";
export type TypographyProps = TypographyTextProps;

const Typography = Object.assign(TypographyText, {
  Blockquote: TypographyBlockquote,
  Body: TypographyBody,
  Caption: TypographyCaption,
  Display: TypographyDisplay,
  Eyebrow: TypographyEyebrow,
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  H5: TypographyH5,
  H6: TypographyH6,
  Heading: TypographyHeading,
  Lead: TypographyLead,
  Li: TypographyLi,
  Link: TypographyLink,
  Muted: TypographyMuted,
  Ol: TypographyOl,
  Overline: TypographyOverline,
  P: TypographyP,
  Prose: TypographyProse,
  Small: TypographySmall,
  Subheading: TypographySubheading,
  Text: TypographyText,
  Ul: TypographyUl,
});

export {
  Typography,
  TypographyBlockquote,
  TypographyBody,
  TypographyCaption,
  TypographyDisplay,
  TypographyEyebrow,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyHeading,
  TypographyLead,
  TypographyLink,
  TypographyLi,
  TypographyMuted,
  TypographyOl,
  TypographyOverline,
  TypographyP,
  TypographyProse,
  TypographySmall,
  TypographySubheading,
  TypographyText,
  TypographyUl,
  typographyHeadingVariants,
  typographyProseVariants,
  typographyTextVariants,
};

export type {
  TypographyBlockquoteProps,
  TypographyLinkProps,
  TypographyHeadingAliasProps,
  TypographyHeadingProps,
  TypographyLiProps,
  TypographyOlProps,
  TypographyProseProps,
  TypographyTextAliasProps,
  TypographyTextProps,
  TypographyUlProps,
};

export type { TypographyBodyProps } from "./typography-body";
export type { TypographyCaptionProps } from "./typography-caption";
export type { TypographyDisplayProps } from "./typography-display";
export type { TypographyEyebrowProps } from "./typography-eyebrow";
export type { TypographyH1Props } from "./typography-h1";
export type { TypographyH2Props } from "./typography-h2";
export type { TypographyH3Props } from "./typography-h3";
export type { TypographyH4Props } from "./typography-h4";
export type { TypographyH5Props } from "./typography-h5";
export type { TypographyH6Props } from "./typography-h6";
export type { TypographyLeadProps } from "./typography-lead";
export type { TypographyMutedProps } from "./typography-muted";
export type { TypographyOverlineProps } from "./typography-overline";
export type { TypographyPProps } from "./typography-p";
export type { TypographySmallProps } from "./typography-small";
export type { TypographySubheadingProps } from "./typography-subheading";
