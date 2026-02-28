import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Card } from "./card";

afterEach(cleanup);

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
        </Card.Header>
      </Card>
    );
    expect(screen.getByText("Title")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Card>Content</Card>);
    expect(document.querySelector("[data-slot=card]")).toBeDefined();
  });
});
