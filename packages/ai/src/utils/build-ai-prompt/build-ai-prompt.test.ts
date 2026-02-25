import { describe, expect, it } from "bun:test";

import { buildAiPrompt } from "./build-ai-prompt";

describe("buildAiPrompt", () => {
  it("joins instruction and subject", () => {
    expect(
      buildAiPrompt({
        instruction: "Summarize this",
        subject: "User analytics",
      })
    ).toBe("Summarize this\n\nSubject: User analytics");
  });
});
