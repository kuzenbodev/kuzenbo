import { expect, test } from "bun:test";

import { GET as getLlms } from "../app/llms.txt/route";
import sitemap from "../app/sitemap";

test("sitemap includes canonical docs routes and excludes dropped aliases", () => {
  const entries = sitemap();

  expect(
    entries.some(
      (entry) => entry.url === "https://kuzenbo.com/docs/components/button"
    )
  ).toBe(true);
  expect(
    entries.some(
      (entry) => entry.url === "https://kuzenbo.com/docs/hooks/use-clipboard"
    )
  ).toBe(true);

  expect(
    entries.some(
      (entry) =>
        entry.url === "https://kuzenbo.com/docs/components/inputs/button"
    )
  ).toBe(false);
});

test("llms route emits canonical docs list", async () => {
  const response = await getLlms();
  const body = await response.text();

  expect(body).toContain("- /docs/components/button | Button");
  expect(body).toContain("- /docs/getting-started/installation | Installation");
  expect(body).toContain("- /docs/hooks/use-clipboard | useClipboard");
  expect(body).not.toContain("/docs/components/inputs/button");
});
