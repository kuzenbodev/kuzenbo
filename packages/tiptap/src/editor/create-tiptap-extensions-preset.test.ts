import { describe, expect, it } from "bun:test";

import { createTiptapExtensionsPreset } from "./create-tiptap-extensions-preset";

const getExtensionNames = (
  preset: Parameters<typeof createTiptapExtensionsPreset>[0]
) => createTiptapExtensionsPreset(preset).map((extension) => extension.name);

describe("createTiptapExtensionsPreset", () => {
  it("returns minimal starter extensions by default", () => {
    const names = getExtensionNames("minimal");

    expect(names).toContain("starterKit");
    expect(names).toContain("placeholder");
  });

  it("returns advanced extensions for document preset", () => {
    const names = getExtensionNames("document");

    expect(names).toContain("underline");
    expect(names).toContain("link");
    expect(names).toContain("textAlign");
    expect(names).toContain("textStyle");
    expect(names).toContain("color");
    expect(names).toContain("highlight");
    expect(names).toContain("taskList");
    expect(names).toContain("taskItem");
    expect(names).toContain("table");
    expect(names).toContain("tableRow");
    expect(names).toContain("tableCell");
    expect(names).toContain("tableHeader");
  });

  it("allows removing placeholder with empty placeholder text", () => {
    const names = createTiptapExtensionsPreset("comment", {
      placeholder: "",
    }).map((extension) => extension.name);

    expect(names).not.toContain("placeholder");
  });
});
