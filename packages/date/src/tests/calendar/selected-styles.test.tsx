import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Day } from "../../components/calendar/day";
import { Month } from "../../components/calendar/month";
import { MonthsList } from "../../components/calendar/months-list";
import { YearsList } from "../../components/calendar/years-list";
import { DatesProvider } from "../../components/dates-provider";

afterEach(() => {
  cleanup();
});

describe("calendar selected styles", () => {
  it("keeps selected month controls visibly active without hover", () => {
    render(
      <DatesProvider locale="en-US">
        <MonthsList value={new Date(2033, 4, 1)} year={new Date(2033, 0, 1)} />
      </DatesProvider>
    );

    const selectedControl = screen.getByRole("button", { name: "May 2033" });

    expect(selectedControl.className.includes("bg-primary")).toBe(true);
    expect(selectedControl.className.includes("text-primary-foreground")).toBe(
      true
    );
  });

  it("keeps selected year controls visibly active without hover", () => {
    render(
      <DatesProvider locale="en-US">
        <YearsList value={new Date(2033, 0, 1)} year={new Date(2033, 0, 1)} />
      </DatesProvider>
    );

    const selectedControl = screen.getByRole("button", { name: "2033" });

    expect(selectedControl.className.includes("bg-primary")).toBe(true);
    expect(selectedControl.className.includes("text-primary-foreground")).toBe(
      true
    );
  });

  it("keeps selected + today day controls visibly active", () => {
    const { container } = render(
      <DatesProvider locale="en-US">
        <Day date={new Date(2033, 4, 15)} selected today />
      </DatesProvider>
    );

    const selectedDay = container.querySelector<HTMLButtonElement>(
      "button[data-selected='true']"
    );

    expect(selectedDay).not.toBeNull();
    expect(selectedDay?.className.includes("bg-primary")).toBe(true);
    expect(selectedDay?.className.includes("bg-card")).toBe(false);
  });

  it("keeps rounded range endpoints for day cells", () => {
    render(
      <DatesProvider locale="en-US">
        <Month
          month={new Date(2026, 1, 1)}
          getDayProps={(date) => {
            if (
              date.getMonth() !== 1 ||
              date.getDate() < 3 ||
              date.getDate() > 8
            ) {
              return {};
            }

            return {
              firstInRange: date.getDate() === 3,
              inRange: true,
              lastInRange: date.getDate() === 8,
              selected: date.getDate() === 3 || date.getDate() === 8,
            };
          }}
        />
      </DatesProvider>
    );

    const startDay = screen.getByRole("button", { name: "February 3, 2026" });
    const endDay = screen.getByRole("button", { name: "February 8, 2026" });

    expect(startDay.className.includes("rounded-md")).toBe(true);
    expect(endDay.className.includes("rounded-md")).toBe(true);
  });

  it("keeps rounded range endpoints for month and year controls", () => {
    const { container } = render(
      <DatesProvider locale="en-US">
        <div>
          <MonthsList
            year={new Date(2033, 0, 1)}
            getMonthControlProps={(date) => {
              const month = date.getMonth();

              if (month < 3 || month > 5) {
                return {};
              }

              return {
                firstInRange: month === 3,
                inRange: true,
                lastInRange: month === 5,
                selected: month === 3 || month === 5,
              };
            }}
          />
          <YearsList
            year={new Date(2033, 0, 1)}
            getYearControlProps={(date) => {
              const year = date.getFullYear();

              if (year < 2033 || year > 2035) {
                return {};
              }

              return {
                firstInRange: year === 2033,
                inRange: true,
                lastInRange: year === 2035,
                selected: year === 2033 || year === 2035,
              };
            }}
          />
        </div>
      </DatesProvider>
    );

    const april = screen.getByRole("button", { name: "April 2033" });
    const may = screen.getByRole("button", { name: "May 2033" });
    const june = screen.getByRole("button", { name: "June 2033" });
    const year2033 = screen.getByRole("button", { name: "2033" });
    const year2034 = screen.getByRole("button", { name: "2034" });
    const year2035 = screen.getByRole("button", { name: "2035" });

    expect(april.className.includes("rounded-md")).toBe(true);
    expect(may.className.includes("rounded-none")).toBe(true);
    expect(june.className.includes("rounded-md")).toBe(true);

    expect(year2033.className.includes("rounded-md")).toBe(true);
    expect(year2034.className.includes("rounded-none")).toBe(true);
    expect(year2035.className.includes("rounded-md")).toBe(true);

    expect(
      container.querySelectorAll("[data-slot='months-list'] button").length
    ).toBe(12);
  });
});
