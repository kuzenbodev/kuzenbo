import {
  createSizeContext,
  DEFAULT_UI_SIZE,
  useGlobalUISize,
  useKuzenboComponentDefaults,
  type UISize,
} from "@kuzenbo/core/provider";

const { SizeContext: ToastSizeContext, useResolvedSize: useResolvedToastSize } =
  createSizeContext(DEFAULT_UI_SIZE);

export {
  DEFAULT_UI_SIZE,
  ToastSizeContext,
  useGlobalUISize,
  useKuzenboComponentDefaults,
  useResolvedToastSize,
};
export type { UISize };
