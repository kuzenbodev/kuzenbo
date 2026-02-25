import type { StoryObj } from "@storybook/react";

import {
  SearchResults as SearchResultsStory,
  baseMeta,
} from "./emoji-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/EmojiPicker/SearchResults",
};
type Story = StoryObj<typeof baseMeta>;

export const SearchResults: Story = SearchResultsStory;
