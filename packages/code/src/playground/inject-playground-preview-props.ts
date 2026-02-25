export const injectPlaygroundPreviewProps = <
  TBaseProps extends Record<string, unknown>,
  TState extends Record<string, unknown>,
>(
  baseProps: TBaseProps | undefined,
  state: TState
): TBaseProps & TState => ({
  ...(baseProps ?? ({} as TBaseProps)),
  ...state,
});
