import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyLi,
  TypographyLink,
  TypographyOl,
  TypographyP,
  TypographyUl,
} from "@kuzenbo/core/ui/typography";
import type { MDXComponents } from "mdx/types";
import { cn } from "tailwind-variants";

import { MdxInlineCode } from "@/lib/docs/mdx-inline-code";
import { MdxPreCodeBlock } from "@/lib/docs/mdx-pre-code-block";

const defaultMdxComponents: MDXComponents = {
  a: TypographyLink,
  blockquote: (props) => (
    <TypographyBlockquote {...props} className={cn("my-4", props.className)} />
  ),
  code: MdxInlineCode,
  h1: (props) => (
    <TypographyH1 {...props} className={cn("mb-3 text-3xl", props.className)} />
  ),
  h2: (props) => (
    <TypographyH2 {...props} className={cn("mb-3 text-2xl", props.className)} />
  ),
  h3: (props) => (
    <TypographyH3 {...props} className={cn("mb-2 text-xl", props.className)} />
  ),
  h4: (props) => (
    <TypographyH4 {...props} className={cn("mb-2 text-lg", props.className)} />
  ),
  h5: (props) => (
    <TypographyH5
      {...props}
      className={cn("mb-2 text-base", props.className)}
    />
  ),
  h6: (props) => (
    <TypographyH6 {...props} className={cn("mb-2 text-sm", props.className)} />
  ),
  li: (props) => (
    <TypographyLi {...props} className={cn("mt-1", props.className)} />
  ),
  ol: (props) => (
    <TypographyOl {...props} className={cn("mb-4", props.className)} />
  ),
  p: (props) => (
    <TypographyP {...props} className={cn("mb-6", props.className)} />
  ),
  pre: MdxPreCodeBlock,
  ul: (props) => (
    <TypographyUl {...props} className={cn("mb-4", props.className)} />
  ),
};

const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  ...defaultMdxComponents,
  ...components,
});

export { useMDXComponents };
