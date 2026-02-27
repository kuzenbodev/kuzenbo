import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { KuzenboProvider } from "../../provider";
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

  it("emits resolved data-size markers on root and stars", () => {
    render(<Rating rating={2.5} size="lg" />);

    const root = document.querySelector("[data-slot=rating]") as HTMLElement;
    const stars = document.querySelectorAll(
      "[data-slot=rating-star]"
    ) as NodeListOf<HTMLElement>;

    expect(root.dataset.size).toBe("lg");
    expect(stars.length).toBe(5);

    for (const star of stars) {
      expect(star.dataset.size).toBe("lg");
    }
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

  it("resolves size precedence as explicit prop -> component defaults -> provider default -> md", () => {
    const { rerender } = render(
      <KuzenboProvider defaultSize="xl">
        <Rating rating={3.5} />
      </KuzenboProvider>
    );

    expect(
      (document.querySelector("[data-slot=rating]") as HTMLElement).dataset.size
    ).toBe("xl");

    rerender(
      <KuzenboProvider
        components={{ Rating: { defaultProps: { size: "sm" } } }}
        defaultSize="xl"
      >
        <Rating rating={3.5} />
      </KuzenboProvider>
    );

    expect(
      (document.querySelector("[data-slot=rating]") as HTMLElement).dataset.size
    ).toBe("sm");

    rerender(
      <KuzenboProvider
        components={{ Rating: { defaultProps: { size: "sm" } } }}
        defaultSize="xl"
      >
        <Rating rating={3.5} size="xs" />
      </KuzenboProvider>
    );

    expect(
      (document.querySelector("[data-slot=rating]") as HTMLElement).dataset.size
    ).toBe("xs");
  });
});
