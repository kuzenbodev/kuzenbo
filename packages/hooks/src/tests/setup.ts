import { afterEach, vi } from "bun:test";

import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { cleanup } from "@testing-library/react";

if (!GlobalRegistrator.isRegistered) {
  GlobalRegistrator.register({
    url: "http://localhost:3000",
  });
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";

  vi.restoreAllMocks();
  vi.clearAllMocks();

  try {
    vi.clearAllTimers();
  } catch {
    // Ignore when fake timers are not enabled in the current test.
  }
});

(
  globalThis as {
    __KUZENBO_ALLOW_MISSING_PROVIDER__?: boolean;
  }
).__KUZENBO_ALLOW_MISSING_PROVIDER__ = true;
