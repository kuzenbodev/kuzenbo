import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Announcement } from "./announcement";

afterEach(cleanup);

describe("Announcement", () => {
  it("renders children correctly", () => {
    render(<Announcement>New feature</Announcement>);
    expect(screen.getByText("New feature")).toBeDefined();
  });

  it("has data-slot from Badge", () => {
    render(<Announcement>Test</Announcement>);
    expect(document.querySelector("[data-slot=badge]")).toBeDefined();
  });
});
