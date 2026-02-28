import { describe, expect, it, vi } from "bun:test";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FunctionComponent } from "react";
import { useState } from "react";

import { useClickOutside } from "./use-click-outside";

interface UseClickOutsideProps {
  handler: () => void;
  events?: string[] | null;
  nodes?: (HTMLElement | null)[];
}

const Target: FunctionComponent<UseClickOutsideProps> = ({
  handler,
  events,
  nodes,
}) => {
  const ref = useClickOutside<HTMLDivElement>(handler, events, nodes);
  return <div data-testid="target" ref={ref} />;
};

describe("@kuzenbo/hooks/use-click-outside", () => {
  it("calls `handler` function when clicked outside target (no `events` given)", async () => {
    const handler = vi.fn();

    const { getByTestId } = render(
      <>
        <Target handler={handler} />
        <div data-testid="outside-target" />
      </>
    );

    const target = getByTestId("target");
    const outsideTarget = getByTestId("outside-target");

    expect(handler).not.toHaveBeenCalled();

    await userEvent.click(target);
    expect(handler).not.toHaveBeenCalled();

    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(1);

    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(2);

    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("calls `handler` only on given `events`", async () => {
    const handler = vi.fn();
    const events = ["keydown"];

    const { getByTestId } = render(
      <>
        <Target handler={handler} events={events} />
        <div data-testid="outside-target" />
      </>
    );

    const target = getByTestId("target");
    const outsideTarget = getByTestId("outside-target");

    await userEvent.click(target);
    await userEvent.click(outsideTarget);
    expect(handler).not.toHaveBeenCalled();

    await userEvent.type(target, "{enter}");
    await userEvent.type(outsideTarget, "{enter}");
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("ignores clicks outside the given `nodes`", async () => {
    const handler = vi.fn();

    const Wrapper: FunctionComponent = () => {
      const [ignore, setIgnore] = useState<HTMLDivElement | null>(null);
      return (
        <>
          <Target handler={handler} nodes={[ignore]} />
          <div data-testid="ignore-clicks" ref={setIgnore} />
        </>
      );
    };

    const { getByTestId } = render(
      <div>
        <Wrapper />
      </div>
    );

    const ignoreClicks = getByTestId("ignore-clicks");

    await userEvent.click(ignoreClicks);
    expect(handler).not.toHaveBeenCalled();

    const target = getByTestId("target");
    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("propagates event to handler", async () => {
    const handler = vi.fn();

    const { getByTestId } = render(
      <>
        <Target handler={handler} />
        <div data-testid="outside-target" />
      </>
    );

    const outsideTarget = getByTestId("outside-target");

    await userEvent.click(outsideTarget);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent));

    const event = handler.mock.calls[0]?.[0];
    expect(event).toHaveProperty("type", "mousedown");
    expect(event).toHaveProperty("target", outsideTarget);
  });
});
