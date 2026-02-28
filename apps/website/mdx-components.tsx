import type { MDXComponents } from "mdx/types";

import { MdxInlineCode } from "@/lib/docs/mdx-inline-code";
import { MdxPreCodeBlock } from "@/lib/docs/mdx-pre-code-block";

const defaultMdxComponents: MDXComponents = {
  code: MdxInlineCode,
  pre: MdxPreCodeBlock,
};

const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  ...defaultMdxComponents,
  ...components,
});

export { useMDXComponents };
