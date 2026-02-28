import {
  createSizeContext,
  DEFAULT_UI_SIZE,
  useGlobalUISize,
  useKuzenboComponentDefaults,
  type UISize,
} from "@kuzenbo/core/provider";
import type { Context } from "react";

interface ToastSizeContextValue {
  size?: UISize;
}

const {
  SizeContext: ToastSizeContext,
  useResolvedSize: useResolvedToastSize,
}: {
  SizeContext: Context<ToastSizeContextValue>;
  useResolvedSize: (...candidates: (UISize | undefined | null)[]) => UISize;
} = createSizeContext(DEFAULT_UI_SIZE);

export {
  DEFAULT_UI_SIZE,
  ToastSizeContext,
  useGlobalUISize,
  useKuzenboComponentDefaults,
  useResolvedToastSize,
};
export type { UISize };
