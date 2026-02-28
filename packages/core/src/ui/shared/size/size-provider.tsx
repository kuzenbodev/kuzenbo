"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo } from "react";

import { createStrictContext } from "../provider/create-strict-context";
import { DEFAULT_UI_SIZE, resolveSize } from "./resolve-size";
import type { UISize } from "./size-system";

export type KuzenboEnv = "default" | "test";
export type KuzenboComponentDefaultProps = Record<string, unknown>;

export interface KuzenboComponentConfig {
  defaultProps?: KuzenboComponentDefaultProps;
}

export type KuzenboComponentsConfig = Record<
  string,
  KuzenboComponentConfig | undefined
>;

export interface KuzenboContextValue {
  components: KuzenboComponentsConfig;
  defaultRadius?: number | string;
  defaultSize?: UISize;
  env: KuzenboEnv;
  reducedMotion: boolean;
}

export interface KuzenboProviderProps {
  children: ReactNode;
  components?: KuzenboComponentsConfig;
  defaultRadius?: number | string;
  defaultSize?: UISize;
  env?: KuzenboEnv;
  inherit?: boolean;
  reducedMotion?: boolean;
}

export const KUZENBO_PROVIDER_MISSING_ERROR =
  "[@kuzenbo/core] KuzenboProvider was not found in tree. Wrap app root with <KuzenboProvider>.";

const {
  StrictContext: KuzenboContext,
  useOptionalContext: useOptionalKuzenboContextInternal,
} = createStrictContext<KuzenboContextValue>(KUZENBO_PROVIDER_MISSING_ERROR);

const KUZENBO_TEST_CONTEXT_FALLBACK: KuzenboContextValue = {
  components: {},
  defaultRadius: undefined,
  defaultSize: undefined,
  env: "test",
  reducedMotion: false,
};

const isMissingProviderAllowed = (): boolean =>
  (
    globalThis as {
      __KUZENBO_ALLOW_MISSING_PROVIDER__?: boolean;
    }
  ).__KUZENBO_ALLOW_MISSING_PROVIDER__ === true;

const mergeComponentConfigs = (
  parent: KuzenboComponentsConfig | undefined,
  own: KuzenboComponentsConfig | undefined
): KuzenboComponentsConfig => {
  const merged: KuzenboComponentsConfig = { ...parent };

  if (!own) {
    return merged;
  }

  for (const [componentName, componentConfig] of Object.entries(own)) {
    const parentConfig = merged[componentName];

    if (!componentConfig) {
      merged[componentName] = parentConfig;
      continue;
    }

    merged[componentName] = {
      ...parentConfig,
      ...componentConfig,
      defaultProps: {
        ...parentConfig?.defaultProps,
        ...componentConfig.defaultProps,
      },
    };
  }

  return merged;
};

const toRadiusVariableValue = (value: number | string): string =>
  typeof value === "number" ? `${value}px` : value;

export const filterUndefinedProps = <T extends object>(
  input: Partial<T> | undefined
): Partial<T> => {
  if (!input) {
    return {};
  }

  const filtered: Partial<T> = {};

  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      filtered[key as keyof T] = value as T[keyof T];
    }
  }

  return filtered;
};

export const KuzenboProvider = ({
  children,
  components,
  defaultRadius,
  defaultSize,
  env,
  inherit = true,
  reducedMotion,
}: KuzenboProviderProps) => {
  const parentContext = useOptionalKuzenboContextInternal();
  const inheritedContext = inherit ? parentContext : null;

  const contextValue = useMemo<KuzenboContextValue>(
    () => ({
      components: mergeComponentConfigs(
        inheritedContext?.components,
        components
      ),
      defaultRadius: defaultRadius ?? inheritedContext?.defaultRadius,
      defaultSize: defaultSize ?? inheritedContext?.defaultSize,
      env: env ?? inheritedContext?.env ?? "default",
      reducedMotion: reducedMotion ?? inheritedContext?.reducedMotion ?? false,
    }),
    [
      components,
      defaultRadius,
      defaultSize,
      env,
      inheritedContext,
      reducedMotion,
    ]
  );

  const providerStyle = useMemo(() => {
    const style: CSSProperties = {
      display: "contents",
    };

    if (contextValue.defaultRadius !== undefined) {
      (
        style as CSSProperties & {
          "--kb-radius": string;
        }
      )["--kb-radius"] = toRadiusVariableValue(contextValue.defaultRadius);
    }

    return style;
  }, [contextValue.defaultRadius]);

  return (
    <KuzenboContext.Provider value={contextValue}>
      <div
        data-kb-env={contextValue.env}
        data-kb-motion={contextValue.reducedMotion ? "reduce" : "allow"}
        data-slot="kuzenbo-provider"
        style={providerStyle}
      >
        {children}
      </div>
    </KuzenboContext.Provider>
  );
};

export const useKuzenboContext = (): KuzenboContextValue => {
  const context = useOptionalKuzenboContextInternal();

  if (context) {
    return context;
  }

  if (isMissingProviderAllowed()) {
    return KUZENBO_TEST_CONTEXT_FALLBACK;
  }

  throw new Error(KUZENBO_PROVIDER_MISSING_ERROR);
};

export const useOptionalKuzenboContext = (): KuzenboContextValue | null =>
  useOptionalKuzenboContextInternal();

export const useKuzenboEnv = (): KuzenboEnv => useKuzenboContext().env;

export const useKuzenboReducedMotion = (): boolean =>
  useKuzenboContext().reducedMotion;

export const useKuzenboComponentDefaults = <T extends object>(
  componentName: string
): Partial<T> => {
  const context = useKuzenboContext();

  return (context.components[componentName]?.defaultProps ?? {}) as Partial<T>;
};

export const useComponentDefaultProps = <T extends object>(
  componentName: string,
  defaultProps: Partial<T>,
  props: T
): T => {
  const componentDefaults = useKuzenboComponentDefaults<T>(componentName);

  return {
    ...filterUndefinedProps(defaultProps),
    ...filterUndefinedProps(componentDefaults),
    ...filterUndefinedProps(props),
  } as T;
};

export const useGlobalUISize = (): UISize | undefined =>
  useKuzenboContext().defaultSize;

export const useComponentSize = (
  ...candidates: (UISize | undefined | null)[]
): UISize => {
  const globalSize = useGlobalUISize();

  return resolveSize(...candidates, globalSize, DEFAULT_UI_SIZE);
};
