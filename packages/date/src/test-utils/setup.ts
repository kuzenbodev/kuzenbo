import { GlobalRegistrator } from "@happy-dom/global-registrator";

if (!GlobalRegistrator.isRegistered) {
  GlobalRegistrator.register({
    url: "http://localhost:3000",
  });
}

(
  globalThis as {
    __KUZENBO_ALLOW_MISSING_PROVIDER__?: boolean;
  }
).__KUZENBO_ALLOW_MISSING_PROVIDER__ = true;
