import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Form } from "../form/form";
import { Input } from "../input/input";
import { FormField } from "./form-field";

afterEach(cleanup);

const emailRequiredValidation = (value: unknown) => {
  if (typeof value !== "string" || !value.includes("@")) {
    return "Email is required";
  }

  return null;
};

describe("FormField", () => {
  it("renders children", () => {
    render(
      <FormField>
        <FormField.Title>Email</FormField.Title>
      </FormField>
    );
    expect(screen.getByText("Email")).toBeDefined();
  });

  it("has data-slot and role group", () => {
    render(
      <FormField>
        <span>Content</span>
      </FormField>
    );
    const el = document.querySelector("[data-slot=field]");
    expect(el).toBeDefined();
    expect(el?.getAttribute("role")).toBe("group");
  });

  it("supports Base UI validation flow through FormField.Error", async () => {
    const user = userEvent.setup();

    render(
      <Form>
        <FormField name="email" validate={emailRequiredValidation}>
          <FormField.Label htmlFor="email">Email</FormField.Label>
          <FormField.Content>
            <Input id="email" placeholder="you@example.com" type="email" />
          </FormField.Content>
          <FormField.Error />
        </FormField>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Email is required")).toBeDefined();
  });
});
