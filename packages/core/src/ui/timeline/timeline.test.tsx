import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Timeline } from "./timeline";

afterEach(cleanup);

describe("Timeline", () => {
  it("renders items", () => {
    render(
      <Timeline>
        <Timeline.Item index={0}>
          <Timeline.Content>
            <Timeline.Title>Event 1</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    );
    expect(screen.getByText("Event 1")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Timeline>
        <Timeline.Item index={0}>
          <Timeline.Content>Content</Timeline.Content>
        </Timeline.Item>
      </Timeline>
    );
    expect(document.querySelector("[data-slot=timeline]")).toBeDefined();
  });
});
