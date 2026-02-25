import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { createMockColumns } from "../../utils/create-mock-columns/create-mock-columns";
import { MockDataTable } from "./mock-data-table";

afterEach(cleanup);

describe("MockDataTable", () => {
  it("renders headers and rows", () => {
    const data = [{ id: "1", label: "Alpha" }];
    const columns = createMockColumns<(typeof data)[number]>([
      { accessorKey: "label", header: "Label" },
    ]);

    render(<MockDataTable columns={columns} data={data} />);

    expect(screen.getByText("Label")).toBeDefined();
    expect(screen.getByText("Alpha")).toBeDefined();

    const table = document.querySelector(
      "[data-slot=mock-data-table]"
    ) as HTMLElement;
    const root = table.parentElement as HTMLElement;
    const headerCell = screen.getByText("Label").closest("th") as HTMLElement;
    const bodyRow = screen.getByText("Alpha").closest("tr") as HTMLElement;
    const bodyCell = screen.getByText("Alpha").closest("td") as HTMLElement;

    expect(root.className).toContain("rounded-lg");
    expect(root.className).toContain("border-border");
    expect(table.className).toContain("w-full");
    expect(table.className).toContain("border-collapse");
    expect(table.className).toContain("text-sm");
    expect(headerCell.className).toContain("px-3");
    expect(headerCell.className).toContain("text-left");
    expect(bodyRow.className).toContain("border-border/60");
    expect(bodyCell.className).toContain("py-2");
  });

  it("renders headers when there is no row data", () => {
    const data: { id: string; label: string }[] = [];
    const columns = createMockColumns<{ id: string; label: string }>([
      { accessorKey: "label", header: "Label" },
    ]);

    render(<MockDataTable columns={columns} data={data} />);

    expect(screen.getByText("Label")).toBeDefined();
    expect(document.querySelectorAll("tbody tr").length).toBe(0);
  });

  it("merges custom className on root container", () => {
    const data = [{ id: "1", label: "Alpha" }];
    const columns = createMockColumns<(typeof data)[number]>([
      { accessorKey: "label", header: "Label" },
    ]);

    render(
      <MockDataTable className="custom-table" columns={columns} data={data} />
    );

    expect(document.querySelector(".custom-table")).toBeDefined();
    expect(document.querySelector("[data-slot=mock-data-table]")).toBeDefined();
  });
});
