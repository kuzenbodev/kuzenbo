import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Form } from "../form/form";
import { Field } from "./field";

afterEach(cleanup);

const usernameRequiredValidation = (value: unknown) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "Username is required";
  }

  return null;
};

describe("Field", () => {
  it("renders all canonical parts", () => {
    render(
      <Field name="fullName">
        <Field.Label>Full name</Field.Label>
        <Field.Item>
          <Field.Control />
        </Field.Item>
        <Field.Description>Shown on invoices.</Field.Description>
        <Field.Validity>
          {(state) => (
            <span data-slot="field-validity-output">
              {String(state.validity.valid)}
            </span>
          )}
        </Field.Validity>
        <Field.Error />
      </Field>
    );

    expect(document.querySelector("[data-slot=field]")).toBeDefined();
    expect(document.querySelector("[data-slot=field-label]")).toBeDefined();
    expect(document.querySelector("[data-slot=field-item]")).toBeDefined();
    expect(document.querySelector("[data-slot=field-control]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=field-description]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=field-validity-output]")
    ).toBeDefined();
  });

  it("renders validation errors after submit", async () => {
    const user = userEvent.setup();

    render(
      <Form>
        <Field name="username" validate={usernameRequiredValidation}>
          <Field.Label>Username</Field.Label>
          <Field.Control />
          <Field.Error />
        </Field>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Username is required")).toBeDefined();
  });
});
