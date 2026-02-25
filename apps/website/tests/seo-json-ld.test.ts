import type {
  Article,
  BreadcrumbList,
  FAQPage,
  HowTo,
  Organization,
  WebSite,
  WithContext,
} from "schema-dts";

import { expect, test } from "bun:test";

import {
  createArticleJsonLd,
  createBreadcrumbListJsonLd,
  createFAQPageJsonLd,
  createHowToJsonLd,
  createOrganizationJsonLd,
  createWebSiteJsonLd,
  serializeJsonLd,
} from "../lib/seo/json-ld";

test("json-ld builders return supported schema-dts shapes", () => {
  const organization: WithContext<Organization> = createOrganizationJsonLd({
    "@type": "Organization",
    name: "Kuzenbo",
    url: "https://kuzenbo.com",
  });

  const website: WithContext<WebSite> = createWebSiteJsonLd({
    "@type": "WebSite",
    name: "Kuzenbo",
    url: "https://kuzenbo.com",
  });

  const breadcrumb: WithContext<BreadcrumbList> = createBreadcrumbListJsonLd({
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        item: "https://kuzenbo.com/docs",
        name: "Docs",
        position: 1,
      },
    ],
  });

  const article: WithContext<Article> = createArticleJsonLd({
    "@type": "Article",
    headline: "Typed JSON-LD for Kuzenbo",
  });

  const faqPage: WithContext<FAQPage> = createFAQPageJsonLd({
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why schema-dts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It provides strongly typed Schema.org payloads.",
        },
      },
    ],
  });

  const howTo: WithContext<HowTo> = createHowToJsonLd({
    "@type": "HowTo",
    name: "Add typed JSON-LD",
    step: [
      {
        "@type": "HowToStep",
        name: "Install schema-dts",
        text: "Add schema-dts to workspace dependencies.",
      },
    ],
  });

  expect(organization["@context"]).toBe("https://schema.org");
  expect(website["@context"]).toBe("https://schema.org");
  expect(breadcrumb["@context"]).toBe("https://schema.org");
  expect(article["@context"]).toBe("https://schema.org");
  expect(faqPage["@context"]).toBe("https://schema.org");
  expect(howTo["@context"]).toBe("https://schema.org");
});

test("serializeJsonLd returns valid JSON for single payload", () => {
  const jsonLd = createWebSiteJsonLd({
    "@type": "WebSite",
    name: "Kuzenbo",
    url: "https://kuzenbo.com",
  });

  const serialized = serializeJsonLd(jsonLd);
  const parsed = JSON.parse(serialized) as WithContext<WebSite>;

  expect(parsed["@type"]).toBe("WebSite");
  expect(parsed.name).toBe("Kuzenbo");
  expect(parsed["@context"]).toBe("https://schema.org");
});

test("serializeJsonLd escapes unsafe angle brackets", () => {
  const jsonLd = createOrganizationJsonLd({
    "@type": "Organization",
    name: "<script>alert('xss')</script>",
    url: "https://kuzenbo.com",
  });

  const serialized = serializeJsonLd(jsonLd);

  expect(serialized.includes("<")).toBe(false);
  expect(serialized).toContain("\\u003cscript>alert('xss')\\u003c/script>");
});

test("serializeJsonLd supports array payloads", () => {
  const payload = [
    createOrganizationJsonLd({
      "@type": "Organization",
      name: "Kuzenbo",
      url: "https://kuzenbo.com",
    }),
    createWebSiteJsonLd({
      "@type": "WebSite",
      name: "Kuzenbo",
      url: "https://kuzenbo.com",
    }),
  ] as const;

  const serialized = serializeJsonLd(payload);
  const parsed = JSON.parse(serialized) as { "@type"?: string }[];

  expect(parsed).toHaveLength(2);
  expect(parsed[0]?.["@type"]).toBe("Organization");
  expect(parsed[1]?.["@type"]).toBe("WebSite");
});
