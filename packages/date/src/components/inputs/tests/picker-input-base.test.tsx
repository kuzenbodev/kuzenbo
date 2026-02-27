import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";
import { useState } from "react";

import { PickerInputBase } from "../picker-input-base";

afterEach(() => {
  cleanup();
});

const dropdown = <div data-testid="picker-dropdown">Dropdown content</div>;

describe("PickerInputBase", () => {
  it("opens the dropdown on input focus when dropdown is provided", async () => {
    render(
      <PickerInputBase
        dropdown={dropdown}
        placeholder="Pick a value"
        value=""
      />
    );

    fireEvent.focus(screen.getByPlaceholderText("Pick a value"));

    await waitFor(() => {
      expect(screen.getByTestId("picker-dropdown")).toBeDefined();
    });
  });

  it("toggles dropdown from trigger button and closes on outside interaction", async () => {
    render(
      <PickerInputBase
        dropdown={dropdown}
        placeholder="Pick a value"
        value=""
      />
    );

    const trigger = screen.getByLabelText("Toggle picker");

    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByTestId("picker-dropdown")).toBeDefined();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByTestId("picker-dropdown")).toBeNull();
    });
  });

  it("keeps controlled open state in sync through onOpenedChange", async () => {
    const Controlled = () => {
      const [opened, setOpened] = useState(false);

      return (
        <PickerInputBase
          dropdown={dropdown}
          opened={opened}
          placeholder="Controlled picker"
          value=""
          onOpenedChange={setOpened}
        />
      );
    };

    render(<Controlled />);

    fireEvent.focus(screen.getByPlaceholderText("Controlled picker"));

    await waitFor(() => {
      expect(screen.getByTestId("picker-dropdown")).toBeDefined();
    });

    fireEvent.click(screen.getByLabelText("Toggle picker"));

    await waitFor(() => {
      expect(screen.queryByTestId("picker-dropdown")).toBeNull();
    });
  });

  it("uses transparent popup shell to avoid nested framed surfaces", async () => {
    render(
      <PickerInputBase
        dropdown={dropdown}
        placeholder="Pick a value"
        value=""
      />
    );

    fireEvent.focus(screen.getByPlaceholderText("Pick a value"));

    const popup = (await waitFor(() =>
      document.querySelector("[data-slot='popover-popup']")
    )) as HTMLElement | null;

    expect(popup).not.toBeNull();
    expect(popup?.className.includes("bg-transparent")).toBe(true);
    expect(popup?.className.includes("p-0")).toBe(true);
  });
});
