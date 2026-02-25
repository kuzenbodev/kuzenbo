import { expect, test } from "bun:test";

import { createDocsPageMetadata } from "../lib/docs/page-runtime";

test("docs metadata uses explicit description when provided", () => {
  const metadata = createDocsPageMetadata({
    href: "/docs/components/button",
    title: "Button",
    description: "Action buttons, loading states, and grouped controls.",
  });

  expect(metadata.description).toBe(
    "Action buttons, loading states, and grouped controls."
  );
  expect(metadata.alternates?.canonical).toBe(
    "https://kuzenbo.com/docs/components/button"
  );
});

test("docs metadata falls back to route-based description", () => {
  const metadata = createDocsPageMetadata({
    href: "/docs/hooks/use-mobile",
    title: "useMobile",
  });

  expect(metadata.description).toBe("useMobile documentation page.");
  expect(metadata.alternates?.canonical).toBe(
    "https://kuzenbo.com/docs/hooks/use-mobile"
  );
});

test("docs home metadata uses home fallback copy", () => {
  const metadata = createDocsPageMetadata({
    href: "/docs",
    title: "Documentation",
  });

  expect(metadata.description).toBe("Kuzenbo documentation home.");
  expect(metadata.alternates?.canonical).toBe("https://kuzenbo.com/docs");
});
