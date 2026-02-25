import { expect, test } from "bun:test";

import openGraphImage, {
  contentType as rootOgContentType,
  size as rootOgSize,
} from "../../app/opengraph-image";
import twitterImage, {
  contentType as rootTwitterContentType,
  size as rootTwitterSize,
} from "../../app/twitter-image";

test("root social image routes expose expected media metadata", () => {
  expect(rootOgContentType).toBe("image/png");
  expect(rootTwitterContentType).toBe("image/png");
  expect(rootOgSize).toEqual({ width: 1200, height: 630 });
  expect(rootTwitterSize).toEqual({ width: 1200, height: 630 });
});

test("root image generators return png responses", async () => {
  const ogResponse = openGraphImage();
  const twitterResponse = twitterImage();

  expect(ogResponse.headers.get("content-type")).toContain("image/png");
  expect(twitterResponse.headers.get("content-type")).toContain("image/png");
});
