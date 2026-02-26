import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Typography } from "@kuzenbo/core/ui/typography";

import { createPageMetadata } from "@/lib/seo/metadata";

interface CreateDocsPageMetadataOptions {
  description?: string;
  href: string;
  title: string;
}

interface DocsMdxPageProps {
  children: ReactNode;
  description?: string;
  href: string;
  title: string;
}

const getDescription = ({
  description,
  href,
  title,
}: CreateDocsPageMetadataOptions): string => {
  if (description && description.trim().length > 0) {
    return description;
  }

  if (href === "/docs") {
    return "Kuzenbo documentation home.";
  }

  return `${title} documentation page.`;
};

export const createDocsPageMetadata = ({
  title,
  description,
  href,
}: CreateDocsPageMetadataOptions): Metadata => {
  const resolvedDescription = getDescription({ description, href, title });

  return createPageMetadata({
    title,
    description: resolvedDescription,
    canonicalPath: href,
    openGraphImagePath: "/opengraph-image",
    twitterImagePath: "/twitter-image",
  });
};

export const DocsMdxPage = ({
  title,
  description,
  href,
  children,
}: DocsMdxPageProps) => {
  const resolvedDescription = getDescription({ description, href, title });

  return (
    <article className="space-y-8">
      <header className="space-y-3 border-b border-border pb-5">
        <Typography.Small className="text-muted-foreground">
          {href}
        </Typography.Small>
        <Typography.H1>{title}</Typography.H1>
        <Typography.Muted>{resolvedDescription}</Typography.Muted>
      </header>

      <section className="space-y-4  [&_a]:font-medium [&_a]:text-primary [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_hr]:border-border [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-7 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/40 [&_pre]:p-4 [&_table]:w-full [&_tbody_tr]:border-b [&_tbody_tr]:border-border [&_td]:align-top [&_td]:p-2 [&_th]:border-b [&_th]:border-border [&_th]:p-2 [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </section>
    </article>
  );
};
