import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { EmojiPicker } from "./emoji-picker";

afterEach(cleanup);

describe("EmojiPicker", () => {
  it("renders without crashing", () => {
    const { container } = render(<EmojiPicker />);
    expect(container.firstChild).toBeDefined();
  });

  it("has data-slot on root", () => {
    const { container } = render(<EmojiPicker />);
    expect(container.querySelector("[data-slot=emoji-picker]")).toBeDefined();
  });

  it("uses md as the default root and descendant size token", () => {
    const { container } = render(
      <EmojiPicker>
        <EmojiPicker.Search />
        <EmojiPicker.Content>
          <EmojiPicker.List />
          <EmojiPicker.Loading>Loading</EmojiPicker.Loading>
          <EmojiPicker.Empty>No results</EmojiPicker.Empty>
        </EmojiPicker.Content>
        <EmojiPicker.ActiveEmojiPreview />
        <EmojiPicker.SkinToneSelector />
      </EmojiPicker>
    );

    const root = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker]"
    );
    const searchWrapper = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-search-wrapper]"
    );
    const search = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-search]"
    );
    const list = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-list]"
    );
    const loading = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-loading]"
    );
    const activePreview = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-active-emoji-preview]"
    );
    const skinToneSelector = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-skin-tone-selector]"
    );

    expect(root?.dataset.size).toBe("md");
    expect(searchWrapper?.dataset.size).toBe("md");
    expect(search?.dataset.size).toBe("md");
    expect(list?.dataset.size).toBe("md");
    expect(loading?.dataset.size).toBe("md");
    expect(activePreview?.dataset.size).toBe("md");
    expect(skinToneSelector?.dataset.size).toBe("md");
  });

  it("cascades root size and preserves child override precedence", () => {
    const { container } = render(
      <EmojiPicker size="xl">
        <EmojiPicker.Search size="sm" />
        <EmojiPicker.Content size="lg">
          <EmojiPicker.List size="sm" />
          <EmojiPicker.Loading size="lg">Loading</EmojiPicker.Loading>
          <EmojiPicker.Empty size="md">No results</EmojiPicker.Empty>
        </EmojiPicker.Content>
        <EmojiPicker.ActiveEmojiPreview size="xs" />
        <EmojiPicker.SkinToneSelector />
      </EmojiPicker>
    );

    const root = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker]"
    );
    const searchWrapper = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-search-wrapper]"
    );
    const content = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-content]"
    );
    const list = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-list]"
    );
    const loading = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-loading]"
    );
    const activePreview = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-active-emoji-preview]"
    );
    const skinToneSelector = container.querySelector<HTMLElement>(
      "[data-slot=emoji-picker-skin-tone-selector]"
    );

    expect(root?.dataset.size).toBe("xl");
    expect(searchWrapper?.dataset.size).toBe("sm");
    expect(content?.dataset.size).toBe("lg");
    expect(list?.dataset.size).toBe("sm");
    expect(loading?.dataset.size).toBe("lg");
    expect(activePreview?.dataset.size).toBe("xs");
    expect(skinToneSelector?.dataset.size).toBe("xl");
  });
});
