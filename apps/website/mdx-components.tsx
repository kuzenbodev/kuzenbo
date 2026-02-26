import type { MDXComponents } from "mdx/types";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@kuzenbo/core/ui/tabs";
import { Typography } from "@kuzenbo/core/ui/typography";

import { MdxPreAdapter } from "@/lib/docs/mdx-pre-adapter";

const AutoTypeTable = ({ name, path }: { name?: string; path?: string }) => (
  <div className="space-y-2 rounded-md border border-border bg-muted/40 p-4">
    <Typography.Small className="text-muted-foreground">
      API table rendering is temporarily unavailable in this docs runtime.
    </Typography.Small>
    <Typography.Small className="text-muted-foreground">
      {name ? `Type: ${name}` : null}
      {name && path ? " · " : null}
      {path ? `Path: ${path}` : null}
    </Typography.Small>
  </div>
);

const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  pre: MdxPreAdapter,
  "auto-type-table": AutoTypeTable,
  ...components,
});

export { useMDXComponents };
