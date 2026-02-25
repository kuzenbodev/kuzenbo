import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import type { UISize } from "./size-system";

import { Checkbox } from "../../checkbox/checkbox";
import { Input } from "../../input/input";
import { RadioGroup } from "../../radio-group/radio-group";
import { Switch } from "../../switch/switch";
import { DEFAULT_UI_SIZE } from "./resolve-size";
import { createSizeContext } from "./size-context";
import {
  KUZENBO_PROVIDER_MISSING_ERROR,
  KuzenboProvider,
  useComponentSize,
} from "./size-provider";

afterEach(cleanup);

const setAllowMissingProvider = (allowed: boolean) => {
  (
    globalThis as {
      __KUZENBO_ALLOW_MISSING_PROVIDER__?: boolean;
    }
  ).__KUZENBO_ALLOW_MISSING_PROVIDER__ = allowed;
};

const { SizeContext: TestSizeContext, useResolvedSize: useResolvedTestSize } =
  createSizeContext("xs");

interface SizeProbeProps {
  candidate?: UISize;
  resolver?: "context" | "global";
}

const SizeProbe = ({ candidate, resolver = "context" }: SizeProbeProps) => {
  const resolvedContextSize = useResolvedTestSize(candidate);
  const resolvedGlobalSize = useComponentSize(candidate);
  const size =
    resolver === "context" ? resolvedContextSize : resolvedGlobalSize;

  return <span data-size={size} data-slot="size-probe" />;
};

describe("Unified size system contracts", () => {
  it("keeps compact controls visually smaller than field controls at xl", () => {
    render(
      <div>
        <Input size="xl" />
        <Checkbox size="xl" />
        <RadioGroup defaultValue="a">
          <RadioGroup.Item size="xl" value="a" />
        </RadioGroup>
        <Switch size="xl" />
      </div>
    );

    const input = document.querySelector<HTMLElement>("[data-slot=input]");
    const checkbox = document.querySelector<HTMLElement>(
      "[data-slot=checkbox]"
    );
    const radioItem = document.querySelector<HTMLElement>(
      "[data-slot=radio-group-item]"
    );
    const switchRoot =
      document.querySelector<HTMLElement>("[data-slot=switch]");

    expect(input?.className.includes("h-11")).toBe(true);

    expect(checkbox?.className.includes("size-5")).toBe(true);
    expect(checkbox?.className.includes("h-11")).toBe(false);

    expect(radioItem?.className.includes("size-5")).toBe(true);
    expect(radioItem?.className.includes("h-11")).toBe(false);

    expect(switchRoot?.className.includes("h-5")).toBe(true);
    expect(switchRoot?.className.includes("h-11")).toBe(false);
  });
});

describe("Size resolution precedence", () => {
  it("prioritizes explicit size prop candidates over local context and global default", () => {
    render(
      <KuzenboProvider defaultSize="lg">
        <TestSizeContext.Provider value={{ size: "sm" }}>
          <SizeProbe candidate="xl" />
        </TestSizeContext.Provider>
      </KuzenboProvider>
    );

    const probe = document.querySelector<HTMLElement>("[data-slot=size-probe]");

    expect(probe?.dataset.size).toBe("xl");
  });

  it("uses local size context before global default and fallback", () => {
    render(
      <KuzenboProvider defaultSize="lg">
        <TestSizeContext.Provider value={{ size: "sm" }}>
          <SizeProbe />
        </TestSizeContext.Provider>
      </KuzenboProvider>
    );

    const probe = document.querySelector<HTMLElement>("[data-slot=size-probe]");

    expect(probe?.dataset.size).toBe("sm");
  });

  it("uses global default when prop and local context are unset", () => {
    render(
      <KuzenboProvider defaultSize="lg">
        <SizeProbe />
      </KuzenboProvider>
    );

    const probe = document.querySelector<HTMLElement>("[data-slot=size-probe]");

    expect(probe?.dataset.size).toBe("lg");
  });

  it("falls back to local default when no prop, local context, or global default exist", () => {
    render(<SizeProbe />);

    const probe = document.querySelector<HTMLElement>("[data-slot=size-probe]");

    expect(probe?.dataset.size).toBe("xs");
  });
});

describe("Global size helper hook", () => {
  it("resolves candidate -> global default -> DEFAULT_UI_SIZE", () => {
    const { rerender } = render(
      <KuzenboProvider defaultSize="lg">
        <SizeProbe resolver="global" />
      </KuzenboProvider>
    );

    let probe = document.querySelector<HTMLElement>("[data-slot=size-probe]");
    expect(probe?.dataset.size).toBe("lg");

    rerender(
      <KuzenboProvider defaultSize="lg">
        <SizeProbe candidate="sm" resolver="global" />
      </KuzenboProvider>
    );

    probe = document.querySelector<HTMLElement>("[data-slot=size-probe]");
    expect(probe?.dataset.size).toBe("sm");

    rerender(<SizeProbe resolver="global" />);

    probe = document.querySelector<HTMLElement>("[data-slot=size-probe]");
    expect(probe?.dataset.size).toBe(DEFAULT_UI_SIZE);
  });
});

describe("KuzenboProvider strict contract", () => {
  it("throws when provider is missing and fallback flag is disabled", () => {
    setAllowMissingProvider(false);

    try {
      expect(() => render(<SizeProbe resolver="global" />)).toThrow(
        KUZENBO_PROVIDER_MISSING_ERROR
      );
    } finally {
      setAllowMissingProvider(true);
    }
  });
});
