import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Marquee } from "./marquee";

afterEach(cleanup);

describe("Marquee", () => {
  it("renders children", () => {
    render(
      <Marquee>
        <Marquee.Content>
          <Marquee.Item>Item 1</Marquee.Item>
        </Marquee.Content>
      </Marquee>
    );
    expect(screen.getAllByText("Item 1").length).toBeGreaterThan(0);
  });

  it("renders without crashing", () => {
    const { container } = render(
      <Marquee>
        <Marquee.Content>
          <Marquee.Item>Test</Marquee.Item>
        </Marquee.Content>
      </Marquee>
    );
    expect(container.firstChild).toBeDefined();
  });
});
