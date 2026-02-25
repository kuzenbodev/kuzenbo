import type { UISize } from "../shared/size/size-system";

import { createSizeContext } from "../shared/size/size-context";

export type EmojiPickerSize = UISize;

const {
  SizeContext: EmojiPickerSizeContext,
  useResolvedSize: useEmojiPickerResolvedSize,
} = createSizeContext();

export { EmojiPickerSizeContext, useEmojiPickerResolvedSize };
