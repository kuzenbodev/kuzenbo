import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { Rating } from "./rating";

afterEach(cleanup);

describe("Rating", () => {
  it("renders stars", () => {
    render(<Rating rating={3} />);
    const stars = document.querySelectorAll("[data-value]");
    expect(stars.length).toBe(5);
  });

  it("has data-slot on root", () => {
    render(<Rating rating={0} />);
    expect(document.querySelector("[data-slot=rating]")).toBeDefined();
  });

  it("calls onRatingChange when star clicked and editable", async () => {
    const user = userEvent.setup();
    const onRatingChange = mock();
    render(<Rating editable onRatingChange={onRatingChange} rating={0} />);
    const thirdStar = document.querySelector('[data-value="3"]');
    expect(thirdStar).toBeDefined();
    await user.click(thirdStar as HTMLElement);
    expect(onRatingChange).toHaveBeenCalledWith(3);
  });

  it("uses semantic warning tokens for filled stars", () => {
    render(<Rating rating={2.5} />);
    const markup = document.body.innerHTML;
    const rawPalettePattern = /(fill|text)-[a-z]+-\d{2,3}/;

    expect(markup.includes("fill-warning-foreground")).toBe(true);
    expect(markup.includes("text-warning-foreground")).toBe(true);
    expect(rawPalettePattern.test(markup)).toBe(false);
  });
});
