import { afterEach, describe, expect, it, mock } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { PlaygroundControlField } from "../ui/playground/playground-control-field";

afterEach(cleanup);

describe("PlaygroundControlField size fallback", () => {
  it("falls back to built-in size values when values is empty", () => {
    const onChange = mock();

    const { container } = render(
      <PlaygroundControlField
        control={{
          type: "size",
          prop: "size",
          initialValue: "md",
          defaultValue: "md",
          values: [] as const,
        }}
        onChange={onChange}
        value="md"
      />
    );

    const rangeInput = container.querySelector("input[type='range']");
    expect(rangeInput).not.toBeNull();
    fireEvent.change(rangeInput as HTMLInputElement, {
      target: { value: "0" },
    });

    expect(onChange).toHaveBeenCalledWith("xs");
    expect(screen.getByText("md")).toBeDefined();
  });
});
