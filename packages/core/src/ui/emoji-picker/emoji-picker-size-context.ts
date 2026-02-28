import { createSizeContext } from "../shared/size/size-context";
import type { UISize } from "../shared/size/size-system";

export type EmojiPickerSize = UISize;

const {
  SizeContext: EmojiPickerSizeContext,
  useResolvedSize: useEmojiPickerResolvedSize,
} = createSizeContext();

export { EmojiPickerSizeContext, useEmojiPickerResolvedSize };
