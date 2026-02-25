import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { Field } from "../field/field";
import { Form } from "./form";

afterEach(cleanup);

const emailRequiredValidation = (value: unknown) => {
  if (typeof value !== "string" || !value.includes("@")) {
    return "Email is required";
  }

  return null;
};

describe("Form", () => {
  it("renders a form element with a data-slot", () => {
    render(
      <Form>
        <button type="submit">Submit</button>
      </Form>
    );

    const form = document.querySelector("[data-slot=form]");

    expect(form?.tagName).toBe("FORM");
  });

  it("submits only valid field values", async () => {
    const user = userEvent.setup();
    const onFormSubmit = mock();

    render(
      <Form onFormSubmit={onFormSubmit}>
        <Field name="email" validate={emailRequiredValidation}>
          <Field.Label>Email</Field.Label>
          <Field.Control />
          <Field.Error />
        </Field>
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.click(submitButton);

    expect(screen.getByText("Email is required")).toBeDefined();
    expect(onFormSubmit).not.toHaveBeenCalled();

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "you@example.com"
    );

    await user.click(submitButton);

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit.mock.calls[0]?.[0]).toEqual({
      email: "you@example.com",
    });
  });
});
