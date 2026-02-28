import { afterEach, describe, expect, it, mock } from "bun:test";

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { PlaygroundControlField } from "./playground-control-field";

afterEach(cleanup);

describe("PlaygroundControlField", () => {
  it("handles boolean, number and string controls", () => {
    const onBooleanChange = mock();
    const onNumberChange = mock();
    const onStringChange = mock();

    render(
      <div>
        <PlaygroundControlField
          control={{
            defaultValue: false,
            initialValue: false,
            prop: "disabled",
            type: "boolean",
          }}
          onChange={onBooleanChange}
          value={false}
        />
        <PlaygroundControlField
          control={{
            defaultValue: 4,
            initialValue: 4,
            max: 12,
            min: 0,
            prop: "radius",
            type: "number",
          }}
          onChange={onNumberChange}
          value={4}
        />
        <PlaygroundControlField
          control={{
            defaultValue: "Click",
            initialValue: "Click",
            prop: "label",
            type: "string",
          }}
          onChange={onStringChange}
          value="Click"
        />
      </div>
    );

    fireEvent.click(screen.getByRole("switch", { name: "Disabled" }));
    fireEvent.change(screen.getByLabelText("Radius"), {
      target: { value: "9" },
    });
    fireEvent.change(screen.getByLabelText("Label"), {
      target: { value: "Submit" },
    });

    expect(onBooleanChange).toHaveBeenCalledWith(true);
    expect(onNumberChange).toHaveBeenCalledWith(9);
    expect(onStringChange).toHaveBeenCalledWith("Submit");
  });

  it("handles select and segmented controls", async () => {
    const user = userEvent.setup();
    const onSelectChange = mock();
    const onSegmentedChange = mock();

    render(
      <div>
        <PlaygroundControlField
          control={{
            defaultValue: "filled",
            initialValue: "filled",
            options: ["filled", "outline"],
            prop: "variant",
            type: "select",
          }}
          onChange={onSelectChange}
          value="filled"
        />
        <PlaygroundControlField
          control={{
            defaultValue: "center",
            initialValue: "center",
            options: ["left", "center", "right"],
            prop: "position",
            type: "segmented",
          }}
          onChange={onSegmentedChange}
          value="center"
        />
      </div>
    );

    await user.click(screen.getByRole("combobox", { name: "Variant" }));
    await user.click(screen.getByRole("option", { name: "Outline" }));

    const leftSegment = screen.getByRole("button", { name: /Left/i });
    await user.click(leftSegment);

    const rightSegment = screen.getByRole("button", { name: /Right/i });
    await user.click(rightSegment);

    expect(onSelectChange).toHaveBeenCalledWith("outline");
    expect(onSegmentedChange).toHaveBeenCalledWith("left");
    expect(onSegmentedChange).toHaveBeenCalledWith("right");
  });

  it("supports color swatches and color text input", () => {
    const onColorChange = mock();

    render(
      <PlaygroundControlField
        control={{
          defaultValue: "#112233",
          initialValue: "#112233",
          prop: "color",
          swatches: ["#ff0000", "#00ff00"],
          type: "color",
        }}
        onChange={onColorChange}
        value="#112233"
      />
    );

    fireEvent.click(screen.getByLabelText("Color #ff0000"));
    fireEvent.change(screen.getByLabelText("Color"), {
      target: { value: "blue" },
    });

    expect(onColorChange).toHaveBeenNthCalledWith(1, "#ff0000");
    expect(onColorChange).toHaveBeenNthCalledWith(2, "blue");
  });

  it("supports size slider values", async () => {
    const user = userEvent.setup();
    const onSizeChange = mock();

    render(
      <PlaygroundControlField
        control={{
          defaultValue: "md",
          initialValue: "md",
          prop: "size",
          type: "size",
          values: ["xs", "sm", "md", "lg"],
        }}
        onChange={onSizeChange}
        value="sm"
      />
    );

    const slider = screen.getByRole("slider", { name: /Size/i });

    await act(async () => {
      slider.focus();
      await user.keyboard("{End}");
    });

    expect(onSizeChange).toHaveBeenCalledWith("lg");
  });
});
