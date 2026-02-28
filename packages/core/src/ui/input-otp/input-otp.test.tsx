import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { InputOTP } from "./input-otp";

afterEach(cleanup);

const queryRequiredElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Expected element to match selector: ${selector}`);
  }

  return element;
};

describe("InputOTP", () => {
  it("renders with slots", () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
        </InputOTP.Group>
      </InputOTP>
    );
    const slots = document.querySelectorAll("[data-slot=input-otp-slot]");
    expect(slots.length).toBe(4);
  });

  it("has data-slot on container", () => {
    render(
      <InputOTP maxLength={1}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
        </InputOTP.Group>
      </InputOTP>
    );
    expect(document.querySelector("[data-slot=input-otp]")).toBeDefined();
  });

  it("uses md as default size and cascades to group, slot, and separator", () => {
    render(
      <InputOTP maxLength={3}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
      </InputOTP>
    );

    const root = queryRequiredElement("[data-slot=input-otp]");
    const group = queryRequiredElement("[data-slot=input-otp-group]");
    const slot = queryRequiredElement("[data-slot=input-otp-slot]");
    const separator = queryRequiredElement("[data-slot=input-otp-separator]");

    expect(root.dataset.size).toBe("md");
    expect(group.dataset.size).toBe("md");
    expect(slot.dataset.size).toBe("md");
    expect(separator.dataset.size).toBe("md");
  });

  it("cascades explicit root size to group, slot, and separator", () => {
    render(
      <InputOTP maxLength={2} size="xl">
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={1} />
        </InputOTP.Group>
      </InputOTP>
    );

    const root = queryRequiredElement("[data-slot=input-otp]");
    const group = queryRequiredElement("[data-slot=input-otp-group]");
    const slot = queryRequiredElement("[data-slot=input-otp-slot]");
    const separator = queryRequiredElement("[data-slot=input-otp-separator]");

    expect(root.dataset.size).toBe("xl");
    expect(group.dataset.size).toBe("xl");
    expect(slot.dataset.size).toBe("xl");
    expect(separator.dataset.size).toBe("xl");
  });

  it("prefers explicit slot size over root size", () => {
    render(
      <InputOTP maxLength={1} size="sm">
        <InputOTP.Group>
          <InputOTP.Slot index={0} size="lg" />
        </InputOTP.Group>
      </InputOTP>
    );

    const root = queryRequiredElement("[data-slot=input-otp]");
    const group = queryRequiredElement("[data-slot=input-otp-group]");
    const slot = queryRequiredElement("[data-slot=input-otp-slot]");

    expect(root.dataset.size).toBe("sm");
    expect(group.dataset.size).toBe("sm");
    expect(slot.dataset.size).toBe("lg");
  });
});
