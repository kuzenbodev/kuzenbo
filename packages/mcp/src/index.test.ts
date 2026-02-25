import { describe, expect, it } from "bun:test";

import { createMcpPlaceholderMessage } from "./index";

describe("@kuzenbo/mcp placeholder", () => {
  it("returns the placeholder message", () => {
    expect(createMcpPlaceholderMessage()).toBe(
      "MCP server implementation is intentionally not added yet."
    );
  });
});
