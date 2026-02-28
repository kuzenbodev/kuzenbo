import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Dropzone } from "./dropzone";

const noop = (_files: File[]): void => (_files ? undefined : undefined);

afterEach(cleanup);

describe("Dropzone", () => {
  it("renders idle state", () => {
    render(
      <Dropzone onDrop={noop}>
        <Dropzone.Idle>Drop files here</Dropzone.Idle>
      </Dropzone>
    );
    expect(screen.getByText("Drop files here")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Dropzone onDrop={noop}>
        <Dropzone.Idle>x</Dropzone.Idle>
      </Dropzone>
    );
    expect(document.querySelector("[data-slot=dropzone]")).toBeDefined();
  });
});
