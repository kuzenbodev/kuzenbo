import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { CalendarHeader } from "../../components/calendar/calendar-header";
import { DatesProvider } from "../../components/dates-provider";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("CalendarHeader core button shell", () => {
  it("preserves aria labels and disabled state wiring", () => {
    render(
      <DatesProvider locale="en-US">
        <CalendarHeader
          level="month"
          nextDisabled
          previousDisabled
          viewDate={new Date(2026, 1, 1)}
        />
      </DatesProvider>
    );

    const previousButton = screen.getByRole("button", { name: "Previous" });
    const nextButton = screen.getByRole("button", { name: "Next" });

    expect(previousButton.hasAttribute("disabled")).toBe(true);
    expect(nextButton.hasAttribute("disabled")).toBe(true);
  });

  it("keeps keyboard activation on the level control", async () => {
    const user = userEvent.setup();
    const onLevelClick = mock();

    render(
      <DatesProvider locale="en-US">
        <CalendarHeader
          level="month"
          viewDate={new Date(2026, 1, 1)}
          onLevelClick={onLevelClick}
        />
      </DatesProvider>
    );

    const levelControl = screen.getByRole("button", { name: /February 2026/ });
    levelControl.focus();

    await user.keyboard("{Enter}");

    expect(onLevelClick).toHaveBeenCalledTimes(1);

    fireEvent.click(levelControl);

    expect(onLevelClick).toHaveBeenCalledTimes(2);
  });
});
