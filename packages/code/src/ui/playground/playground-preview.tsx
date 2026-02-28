import { cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";

import { injectPlaygroundPreviewProps } from "../../playground/inject-playground-preview-props";

export interface PlaygroundPreviewProps<
  TState extends Record<string, unknown>,
  TStaticProps extends Record<string, unknown> = Record<string, unknown>,
> {
  state: TState;
  staticProps?: TStaticProps;
  children: ReactNode;
  fallback?: ReactNode;
}

export const PlaygroundPreview = <
  TState extends Record<string, unknown>,
  TStaticProps extends Record<string, unknown> = Record<string, unknown>,
>({
  state,
  staticProps,
  children,
  fallback = null,
}: PlaygroundPreviewProps<TState, TStaticProps>) => {
  if (!isValidElement(children)) {
    return <>{fallback}</>;
  }

  const injectedProps = injectPlaygroundPreviewProps(staticProps, state);

  return cloneElement(children, injectedProps);
};
