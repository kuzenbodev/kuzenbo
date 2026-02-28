import { describe, expect, it } from "bun:test";

import { renderHook } from "@testing-library/react";

import { DatesProvider, useDatesContext } from "../../context";

describe("useDatesContext", () => {
  it("returns default values without provider", () => {
    const hook = renderHook(() => useDatesContext());

    expect(hook.result.current.locale).toBe("en");
    expect(hook.result.current.weekStartsOn).toBe(1);
    expect(hook.result.current.firstDayOfWeek).toBe(1);
    expect(hook.result.current.weekendDays).toEqual([0, 6]);

    expect(hook.result.current.getLocale()).toBe("en");
    expect(hook.result.current.getLocale("fr")).toBe("fr");

    expect(hook.result.current.getWeekStartsOn()).toBe(1);
    expect(hook.result.current.getWeekStartsOn(0)).toBe(0);

    expect(hook.result.current.getWeekendDays()).toEqual([0, 6]);
    expect(hook.result.current.getWeekendDays([1, 5])).toEqual([1, 5]);
  });

  it("returns merged values from provider settings", () => {
    const hook = renderHook(() => useDatesContext(), {
      wrapper: ({ children }) => (
        <DatesProvider
          settings={{
            direction: "rtl",
            firstDayOfWeek: 0,
            labelSeparator: " - ",
            locale: "ru",
            weekendDays: [1, 2],
          }}
        >
          {children}
        </DatesProvider>
      ),
    });

    expect(hook.result.current.locale).toBe("ru");
    expect(hook.result.current.weekStartsOn).toBe(0);
    expect(hook.result.current.firstDayOfWeek).toBe(0);
    expect(hook.result.current.weekendDays).toEqual([1, 2]);
    expect(hook.result.current.direction).toBe("rtl");
    expect(hook.result.current.labelSeparator).toBe(" - ");

    expect(hook.result.current.getLocale()).toBe("ru");
    expect(hook.result.current.getFirstDayOfWeek()).toBe(0);
    expect(hook.result.current.getWeekStartsOn()).toBe(0);
    expect(hook.result.current.getWeekendDays()).toEqual([1, 2]);
  });

  it("keeps weekStartsOn and firstDayOfWeek in sync", () => {
    const hook = renderHook(() => useDatesContext(), {
      wrapper: ({ children }) => (
        <DatesProvider
          settings={{
            weekStartsOn: 5,
          }}
        >
          {children}
        </DatesProvider>
      ),
    });

    expect(hook.result.current.weekStartsOn).toBe(5);
    expect(hook.result.current.firstDayOfWeek).toBe(5);
    expect(hook.result.current.getWeekStartsOn()).toBe(5);
    expect(hook.result.current.getFirstDayOfWeek()).toBe(5);
  });

  it("creates scoped adapters from getAdapter without mutating provider adapter", () => {
    const hook = renderHook(() => useDatesContext(), {
      wrapper: ({ children }) => (
        <DatesProvider
          settings={{
            locale: "en-US",
            timeZone: "UTC",
          }}
        >
          {children}
        </DatesProvider>
      ),
    });

    const baseAdapter = hook.result.current.adapter;
    const scopedAdapter = hook.result.current.getAdapter({
      timeZone: "America/New_York",
    });

    expect(hook.result.current.getAdapter()).toBe(baseAdapter);
    expect(scopedAdapter).not.toBe(baseAdapter);
    expect(baseAdapter.context.timeZone).toBe("UTC");
    expect(scopedAdapter.context.timeZone).toBe("America/New_York");
    expect(baseAdapter.toDateString("2024-01-01T02:30:00.000Z")).toBe(
      "2024-01-01"
    );
    expect(scopedAdapter.toDateString("2024-01-01T02:30:00.000Z")).toBe(
      "2023-12-31"
    );
  });
});
