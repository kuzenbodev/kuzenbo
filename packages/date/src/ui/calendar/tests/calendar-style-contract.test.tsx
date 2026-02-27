import { KuzenboProvider } from "@kuzenbo/core/provider";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";
import { getDefaultClassNames } from "react-day-picker";

import { Calendar } from "../calendar";

afterEach(cleanup);

describe("Calendar style contracts", () => {
  it("sets the default calendar surface size contract", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} />);

    const root = document.querySelector("[data-slot=calendar]") as HTMLElement;

    expect(root.dataset.size).toBe("md");
    expect(root.className).toContain("[--cell-size:--spacing(8)]");
  });

  it("resolves size precedence as explicit prop -> component defaults -> provider default -> md", () => {
    const { rerender } = render(
      <KuzenboProvider defaultSize="lg">
        <Calendar defaultMonth={new Date(2025, 0)} mode="single" />
      </KuzenboProvider>
    );

    const providerRoot = document.querySelector(
      "[data-slot=calendar]"
    ) as HTMLElement;
    const providerDay = screen.getByRole("button", {
      name: /January 15th, 2025/i,
    }) as HTMLElement;

    expect(providerRoot.dataset.size).toBe("lg");
    expect(providerDay.dataset.size).toBe("lg");

    rerender(
      <KuzenboProvider
        components={{ Calendar: { defaultProps: { size: "sm" } } }}
        defaultSize="lg"
      >
        <Calendar defaultMonth={new Date(2025, 0)} mode="single" />
      </KuzenboProvider>
    );

    const componentDefaultRoot = document.querySelector(
      "[data-slot=calendar]"
    ) as HTMLElement;
    const componentDefaultDay = screen.getByRole("button", {
      name: /January 15th, 2025/i,
    }) as HTMLElement;

    expect(componentDefaultRoot.dataset.size).toBe("sm");
    expect(componentDefaultDay.dataset.size).toBe("sm");

    rerender(
      <KuzenboProvider
        components={{ Calendar: { defaultProps: { size: "sm" } } }}
        defaultSize="lg"
      >
        <Calendar defaultMonth={new Date(2025, 0)} mode="single" size="xs" />
      </KuzenboProvider>
    );

    const explicitRoot = document.querySelector(
      "[data-slot=calendar]"
    ) as HTMLElement;
    const explicitDay = screen.getByRole("button", {
      name: /January 15th, 2025/i,
    }) as HTMLElement;

    expect(explicitRoot.dataset.size).toBe("xs");
    expect(explicitDay.dataset.size).toBe("xs");
  });

  it("applies compact calendar cell scaling for xs and xl sizes", () => {
    const { rerender } = render(
      <Calendar defaultMonth={new Date(2025, 0)} mode="single" size="xs" />
    );

    const xsRoot = document.querySelector(
      "[data-slot=calendar]"
    ) as HTMLElement;
    const xsDay = screen.getByRole("button", {
      name: /January 15th, 2025/i,
    }) as HTMLElement;

    expect(xsRoot.dataset.size).toBe("xs");
    expect(xsRoot.className).toContain("[--cell-size:--spacing(6)]");
    expect(xsDay.dataset.size).toBe("xs");

    rerender(
      <Calendar defaultMonth={new Date(2025, 0)} mode="single" size="xl" />
    );

    const xlRoot = document.querySelector(
      "[data-slot=calendar]"
    ) as HTMLElement;
    const xlDay = screen.getByRole("button", {
      name: /January 15th, 2025/i,
    }) as HTMLElement;

    expect(xlRoot.dataset.size).toBe("xl");
    expect(xlRoot.className).toContain("[--cell-size:--spacing(10)]");
    expect(xlDay.dataset.size).toBe("xl");
  });

  it("wires the v9 month_grid class slot", () => {
    const defaultClassNames = getDefaultClassNames();
    const { container } = render(<Calendar defaultMonth={new Date(2025, 0)} />);
    const [monthGridSelectorClass = ""] =
      defaultClassNames.month_grid.split(" ");

    expect(
      container.querySelector(`.${monthGridSelectorClass}`)
    ).not.toBeNull();
  });

  it("wires the v9 day_button class slot in interactive mode", () => {
    const defaultClassNames = getDefaultClassNames();
    const [dayButtonSelectorClass = ""] =
      defaultClassNames.day_button.split(" ");

    render(<Calendar defaultMonth={new Date(2025, 0)} mode="single" />);
    const day15 = screen.getByRole("button", { name: /January 15th, 2025/i });
    const day15Cell = document.querySelector(
      'td[role="gridcell"][data-day="2025-01-15"]'
    ) as HTMLElement;

    expect(day15.className).toContain(dayButtonSelectorClass);
    expect(day15.className).toContain("min-w-(--cell-size)");
    expect(day15.className).toContain("data-[selected-single=true]:bg-primary");
    expect(day15.className).toContain(
      "group-data-[focused=true]/day:ring-inset"
    );
    expect(day15Cell.className).toContain("data-[focused=true]:z-20");
  });

  it("keeps default day selection rounding selector when week numbers are hidden", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} mode="single" />);
    const dayCell = document.querySelector(
      'td[role="gridcell"][data-day="2025-01-15"]'
    ) as HTMLElement;

    expect(dayCell.className).toContain(
      "[&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)"
    );
  });

  it("switches day selection rounding selector when week numbers are shown", () => {
    render(
      <Calendar defaultMonth={new Date(2025, 0)} mode="single" showWeekNumber />
    );
    const dayCell = document.querySelector(
      'td[role="gridcell"][data-day="2025-01-15"]'
    ) as HTMLElement;

    expect(dayCell.className).toContain(
      "[&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)"
    );
    expect(dayCell.className).not.toContain(
      "[&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)"
    );
  });

  it("supports normalized danger buttonVariant classes", () => {
    render(
      <Calendar buttonVariant="danger" defaultMonth={new Date(2025, 0)} />
    );

    const previousMonthButton = screen.getByRole("button", {
      name: /Go to the Previous Month/i,
    });

    expect(previousMonthButton.className).toContain("bg-danger");
    expect(previousMonthButton.className).toContain("text-danger-foreground");
  });

  it("includes explicit md and lg week-number typography selectors", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} showWeekNumber />);

    const weekNumberValue = document.querySelector(
      "td.rdp-week_number > div"
    ) as HTMLElement;

    expect(weekNumberValue.className).toContain(
      "group-data-[size=md]/calendar:text-[0.8rem]"
    );
    expect(weekNumberValue.className).toContain(
      "group-data-[size=lg]/calendar:text-sm"
    );
  });

  it("keeps compatibility aliases for table, row, and tbody mappings", () => {
    const defaultClassNames = getDefaultClassNames();
    const [weeksClass = ""] = defaultClassNames.weeks.split(" ");

    render(<Calendar defaultMonth={new Date(2025, 0)} />);

    const monthGrid = document.querySelector("table[role=grid]") as HTMLElement;
    const weekRow = document.querySelector("tr.rdp-week") as HTMLElement;
    const weeksBody = document.querySelector("tbody") as HTMLElement;

    expect(monthGrid.className).toContain("w-full");
    expect(monthGrid.className).toContain("border-collapse");
    expect(weekRow.className).toContain("mt-2");
    expect(weekRow.className).toContain("flex");
    expect(weeksBody.className).toContain(weeksClass);
  });

  it("merges classNames prop values with default class slots", () => {
    const defaultClassNames = getDefaultClassNames();
    const [monthGridSelectorClass = ""] =
      defaultClassNames.month_grid.split(" ");
    const [dayButtonSelectorClass = ""] =
      defaultClassNames.day_button.split(" ");
    const [dayCellSelectorClass = ""] = defaultClassNames.day.split(" ");
    const [rootSelectorClass = ""] = defaultClassNames.root.split(" ");

    render(
      <Calendar
        classNames={{
          day: "custom-day-cell",
          day_button: "custom-day-button",
          month_grid: "custom-month-grid",
          root: "custom-root",
        }}
        defaultMonth={new Date(2025, 0)}
        mode="single"
      />
    );

    const root = document.querySelector("[data-slot=calendar]") as HTMLElement;
    const monthGrid = document.querySelector("table[role=grid]") as HTMLElement;
    const dayButton = screen.getByRole("button", {
      name: /January 15th, 2025/i,
    });
    const dayCell = document.querySelector("td.custom-day-cell") as HTMLElement;

    expect(root.className).toContain("custom-root");
    expect(root.className).toContain(rootSelectorClass);
    expect(monthGrid.className).toContain("custom-month-grid");
    expect(monthGrid.className).toContain(monthGridSelectorClass);
    expect(dayButton.className).toContain("custom-day-button");
    expect(dayButton.className).toContain(dayButtonSelectorClass);
    expect(dayCell.className).toContain(dayCellSelectorClass);
  });

  it("keeps root slot marker stable for styling integration", () => {
    render(<Calendar />);

    expect(document.querySelector("[data-slot=calendar]")).not.toBeNull();
  });

  it("keeps display-only day cells visually styled without mode", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} />);

    const dayCell = document.querySelector(
      'td[role="gridcell"][data-day="2025-01-15"]'
    ) as HTMLElement;

    expect(dayCell.querySelector("button")).toBeNull();
    expect(dayCell.className).toContain("group/day");
    expect(dayCell.className).toContain("size-(--cell-size)");
  });
});
