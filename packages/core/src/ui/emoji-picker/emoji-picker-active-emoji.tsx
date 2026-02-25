import type { ComponentProps } from "react";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";

export type EmojiPickerActiveEmojiProps = ComponentProps<
  typeof BaseEmojiPicker.ActiveEmoji
>;

export const EmojiPickerActiveEmoji = (props: EmojiPickerActiveEmojiProps) => (
  <BaseEmojiPicker.ActiveEmoji
    data-slot="emoji-picker-active-emoji"
    {...props}
  />
);
