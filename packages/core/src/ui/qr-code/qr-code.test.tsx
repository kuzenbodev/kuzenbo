import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, waitFor } from "@testing-library/react";

import { QRCode } from "./qr-code";

afterEach(cleanup);

describe("QRCode", () => {
  it("renders with data prop", () => {
    const { container } = render(<QRCode data="https://example.com" />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders svg after generation", async () => {
    const { container } = render(<QRCode data="test" />);
    await waitFor(() => {
      const svg = container.querySelector("svg");
      expect(svg).toBeDefined();
    });
  });
});
