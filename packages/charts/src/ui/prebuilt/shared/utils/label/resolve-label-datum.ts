const resolveLabelDatum = <TData>(payload: unknown, fallbackDatum: TData) => {
  if (payload !== null && typeof payload === "object") {
    const payloadRecord = payload as Record<string, unknown>;
    const nestedPayload = payloadRecord.payload;

    if (nestedPayload !== null && typeof nestedPayload === "object") {
      return nestedPayload as TData;
    }

    return payload as TData;
  }

  return fallbackDatum;
};

export { resolveLabelDatum };
