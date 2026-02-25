import { describe, expect, it } from "bun:test";

import { createMockColumns } from "./create-mock-columns";

describe("createMockColumns", () => {
  it("returns provided columns", () => {
    const columns = [{ accessorKey: "value", header: "Value" }];

    expect(createMockColumns(columns)).toEqual(columns);
  });
});
