import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Carousel } from "./carousel";

afterEach(cleanup);

describe("Carousel", () => {
  it("renders content", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    );
    expect(screen.getByText("Slide 1")).toBeDefined();
    expect(screen.getByText("Slide 2")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    );
    expect(document.querySelector("[data-slot=carousel]")).toBeDefined();
  });

  it("has next button", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel.Content>
        <Carousel.Next />
      </Carousel>
    );
    expect(document.querySelector("[data-slot=carousel-next]")).toBeDefined();
  });
});
