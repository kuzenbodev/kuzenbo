import type { MDXComponents } from "mdx/types";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@kuzenbo/core/ui/tabs";

import { MdxPreAdapter } from "@/lib/docs/mdx-pre-adapter";

const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  pre: MdxPreAdapter,
  ...components,
});

export { useMDXComponents };
