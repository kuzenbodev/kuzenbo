import { useState } from "react";

import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";

export type UseOSReturnValue =
  | "undetermined"
  | "macos"
  | "ios"
  | "windows"
  | "android"
  | "linux"
  | "chromeos";

const isMacOS = (userAgent: string): boolean => {
  const macosPattern = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;

  return macosPattern.test(userAgent);
};

const isIOS = (userAgent: string): boolean => {
  const iosPattern = /(iPhone)|(iPad)|(iPod)/i;

  return iosPattern.test(userAgent);
};

const isWindows = (userAgent: string): boolean => {
  const windowsPattern = /(Win32)|(Win64)|(Windows)|(WinCE)/i;

  return windowsPattern.test(userAgent);
};

const isAndroid = (userAgent: string): boolean => {
  const androidPattern = /Android/i;

  return androidPattern.test(userAgent);
};

const isLinux = (userAgent: string): boolean => {
  const linuxPattern = /Linux/i;

  return linuxPattern.test(userAgent);
};

const isChromeOS = (userAgent: string): boolean => {
  const chromePattern = /CrOS/i;
  return chromePattern.test(userAgent);
};

const getOS = (): UseOSReturnValue => {
  if (typeof window === "undefined") {
    return "undetermined";
  }

  const { userAgent } = window.navigator;

  if (isIOS(userAgent) || (isMacOS(userAgent) && "ontouchend" in document)) {
    return "ios";
  }
  if (isMacOS(userAgent)) {
    return "macos";
  }
  if (isWindows(userAgent)) {
    return "windows";
  }
  if (isAndroid(userAgent)) {
    return "android";
  }
  if (isLinux(userAgent)) {
    return "linux";
  }
  if (isChromeOS(userAgent)) {
    return "chromeos";
  }

  return "undetermined";
};

export interface UseOsOptions {
  getValueInEffect: boolean;
}

/**
 * Detects the current operating system from the browser user agent.
 *
 * @param {UseOsOptions} [options] - Hook configuration.
 * @param {boolean} [options.getValueInEffect] - If `true`, detect OS in
 * an effect for SSR safety; otherwise detect during initial render.
 */
export const useOs = (options?: UseOsOptions): UseOSReturnValue => {
  const getValueInEffect = options?.getValueInEffect ?? true;
  const [value, setValue] = useState<UseOSReturnValue>(
    getValueInEffect ? "undetermined" : getOS()
  );

  useIsomorphicEffect(() => {
    if (getValueInEffect) {
      setValue(getOS);
    }
  }, [getValueInEffect]);

  return value;
};

export type UseOsOptionsType = UseOsOptions;
export type UseOsReturnValueType = UseOSReturnValue;
