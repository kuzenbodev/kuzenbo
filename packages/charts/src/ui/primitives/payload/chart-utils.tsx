import type { ChartConfig } from "../types/chart-types";

const toConfigKey = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }
};

const resolveConfigEntry = (config: ChartConfig, key: string) => {
  if (key in config) {
    return config[key];
  }

  if (key.includes(".")) {
    const parts = key.split(".");

    for (let index = parts.length - 1; index >= 0; index -= 1) {
      const candidate = parts[index];

      if (!candidate) {
        continue;
      }

      if (candidate in config) {
        return config[candidate];
      }
    }
  }
};

const getPayloadConfigFromPayload = (
  config: ChartConfig,
  payload: unknown,
  key: string
) => {
  if (typeof payload !== "object" || payload === null) {
    return;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && toConfigKey(payload[key as keyof typeof payload])) {
    configLabelKey = toConfigKey(payload[key as keyof typeof payload]) ?? key;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    toConfigKey(payloadPayload[key as keyof typeof payloadPayload])
  ) {
    configLabelKey =
      toConfigKey(payloadPayload[key as keyof typeof payloadPayload]) ?? key;
  }

  return (
    resolveConfigEntry(config, configLabelKey) ??
    resolveConfigEntry(config, key) ??
    config[key as keyof typeof config]
  );
};

export { getPayloadConfigFromPayload };
