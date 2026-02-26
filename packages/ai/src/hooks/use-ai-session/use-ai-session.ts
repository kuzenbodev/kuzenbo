"use client";

import { useMemo, useState } from "react";

export interface UseAiSessionResult {
  active: boolean;
  messages: number;
  reset: () => void;
  start: () => void;
}

export const useAiSession = (): UseAiSessionResult => {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState(0);

  return useMemo(
    () => ({
      active,
      messages,
      start: () => {
        setActive(true);
        setMessages((value) => value + 1);
      },
      reset: () => {
        setActive(false);
        setMessages(0);
      },
    }),
    [active, messages]
  );
};
