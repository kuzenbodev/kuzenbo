import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Item } from "./item";

afterEach(cleanup);

describe("Item", () => {
  it("renders children", () => {
    render(
      <Item>
        <Item.Header>
          <Item.Title>Title</Item.Title>
          <Item.Description>Description</Item.Description>
        </Item.Header>
      </Item>
    );
    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Description")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Item>
        <Item.Title>Test</Item.Title>
      </Item>
    );
    expect(document.querySelector("[data-slot=item]")).toBeDefined();
  });
});
