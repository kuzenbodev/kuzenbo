import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, mock } from "bun:test";

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
            type: "boolean",
            prop: "disabled",
            initialValue: false,
            defaultValue: false,
          }}
          onChange={onBooleanChange}
          value={false}
        />
        <PlaygroundControlField
          control={{
            type: "number",
            prop: "radius",
            initialValue: 4,
            defaultValue: 4,
            min: 0,
            max: 12,
          }}
          onChange={onNumberChange}
          value={4}
        />
        <PlaygroundControlField
          control={{
            type: "string",
            prop: "label",
            initialValue: "Click",
            defaultValue: "Click",
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
            type: "select",
            prop: "variant",
            options: ["filled", "outline"],
            initialValue: "filled",
            defaultValue: "filled",
          }}
          onChange={onSelectChange}
          value="filled"
        />
        <PlaygroundControlField
          control={{
            type: "segmented",
            prop: "position",
            options: ["left", "center", "right"],
            initialValue: "center",
            defaultValue: "center",
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
          type: "color",
          prop: "color",
          initialValue: "#112233",
          defaultValue: "#112233",
          swatches: ["#ff0000", "#00ff00"],
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
          type: "size",
          prop: "size",
          initialValue: "md",
          defaultValue: "md",
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
