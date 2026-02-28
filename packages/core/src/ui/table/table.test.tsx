import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Table } from "./table";

afterEach(cleanup);

describe("Table", () => {
  it("renders table content", () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
  });

  it("has data-slot on table", () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>x</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(document.querySelector("[data-slot=table]")).toBeDefined();
  });

  it("uses md as default size and cascades to descendants", () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Caption>People</Table.Caption>
      </Table>
    );

    const container = document.querySelector<HTMLElement>(
      "[data-slot=table-container]"
    );
    const table = document.querySelector<HTMLElement>("[data-slot=table]");
    const header = document.querySelector<HTMLElement>(
      "[data-slot=table-header]"
    );
    const row = document.querySelector<HTMLElement>("[data-slot=table-row]");
    const head = document.querySelector<HTMLElement>("[data-slot=table-head]");
    const body = document.querySelector<HTMLElement>("[data-slot=table-body]");
    const cell = document.querySelector<HTMLElement>("[data-slot=table-cell]");
    const caption = document.querySelector<HTMLElement>(
      "[data-slot=table-caption]"
    );

    expect(container?.dataset.size).toBe("md");
    expect(table?.dataset.size).toBe("md");
    expect(header?.dataset.size).toBe("md");
    expect(row?.dataset.size).toBe("md");
    expect(head?.dataset.size).toBe("md");
    expect(body?.dataset.size).toBe("md");
    expect(cell?.dataset.size).toBe("md");
    expect(caption?.dataset.size).toBe("md");
  });

  it("prefers explicit descendant size over inherited root size", () => {
    render(
      <Table size="xl">
        <Table.Header size="sm">
          <Table.Row>
            <Table.Head size="xs">Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row size="sm">
            <Table.Cell size="sm">Alice</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const header = document.querySelector<HTMLElement>(
      "[data-slot=table-header]"
    );
    const row = document.querySelector<HTMLElement>("[data-slot=table-row]");
    const head = document.querySelector<HTMLElement>("[data-slot=table-head]");
    const cell = document.querySelector<HTMLElement>("[data-slot=table-cell]");

    expect(header?.dataset.size).toBe("sm");
    expect(row?.dataset.size).toBe("sm");
    expect(head?.dataset.size).toBe("xs");
    expect(head?.className.includes("h-7")).toBe(true);
    expect(cell?.dataset.size).toBe("sm");
    expect(cell?.className.includes("px-2")).toBe(true);
  });
});
