import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Avatar } from "./avatar";

afterEach(cleanup);

const ROOT_CLASS_NAME = () => "avatar-root-from-fn";
const IMAGE_CLASS_NAME = () => "avatar-image-from-fn";
const FALLBACK_CLASS_NAME = () => "avatar-fallback-from-fn";

describe("Avatar", () => {
  it("renders with fallback", () => {
    render(
      <Avatar>
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Avatar>
        <Avatar.Fallback>X</Avatar.Fallback>
      </Avatar>
    );
    expect(document.querySelector("[data-slot=avatar]")).toBeDefined();
  });

  it("preserves className callback support for root, image, and fallback", () => {
    render(
      <Avatar className={ROOT_CLASS_NAME}>
        <Avatar.Image
          alt="Demo user"
          className={IMAGE_CLASS_NAME}
          src="https://i.pravatar.cc/150?u=avatar-test"
        />
        <Avatar.Fallback className={FALLBACK_CLASS_NAME}>AB</Avatar.Fallback>
      </Avatar>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=avatar]");
    const image = document.querySelector<HTMLElement>(
      "[data-slot=avatar-image]"
    );
    const fallback = document.querySelector<HTMLElement>(
      "[data-slot=avatar-fallback]"
    );

    expect(root?.className.includes("avatar-root-from-fn")).toBe(true);
    expect(image?.className.includes("avatar-image-from-fn")).toBe(true);
    expect(fallback?.className.includes("avatar-fallback-from-fn")).toBe(true);
  });
});
