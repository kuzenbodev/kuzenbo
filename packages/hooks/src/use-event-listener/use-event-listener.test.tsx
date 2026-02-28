import { describe, expect, it, vi } from "bun:test";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useEventListener } from "./use-event-listener";

const Test = ({ spy }: { spy: () => void }) => {
  const ref = useEventListener("click", () => spy());
  return (
    <button ref={ref} type="button">
      Test button
    </button>
  );
};

describe("@kuzenbo/hooks/use-event-listener", () => {
  it("calls given function when event is fired", async () => {
    const spy = vi.fn();
    const { getByRole } = render(<Test spy={spy} />);
    await userEvent.click(getByRole("button"));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
