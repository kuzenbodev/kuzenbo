import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { FileTree, type FileTreeNode } from "./file-tree";

afterEach(cleanup);

const sampleTreeData: FileTreeNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "src-index",
        name: "index.ts",
      },
      {
        id: "src-ui",
        name: "ui",
        children: [
          {
            id: "src-ui-code",
            name: "code-line-highlight.tsx",
          },
        ],
      },
    ],
  },
  {
    id: "package-json",
    name: "package.json",
  },
];

describe("FileTree", () => {
  it("renders tree rows", () => {
    render(<FileTree data={sampleTreeData} openByDefault width={540} />);

    expect(screen.getByText("src")).toBeDefined();
    expect(screen.getByText("package.json")).toBeDefined();
  });

  it("expands a directory when toggle button is clicked", async () => {
    render(
      <FileTree data={sampleTreeData} openByDefault={false} width={540} />
    );

    expect(screen.queryByText("index.ts")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Toggle src" }));

    await waitFor(() => {
      expect(screen.getByText("index.ts")).toBeDefined();
    });
  });

  it("calls onSelect with selected node data", () => {
    let selectedNodeId = "";

    render(
      <FileTree
        data={sampleTreeData}
        onSelect={(node) => {
          selectedNodeId = node.id;
        }}
        openByDefault
        width={540}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Select package.json" })
    );

    expect(selectedNodeId).toBe("package-json");
  });

  it("merges custom className on root", () => {
    render(
      <FileTree
        className="custom-file-tree"
        data={sampleTreeData}
        openByDefault
        width={540}
      />
    );

    expect(document.querySelector(".custom-file-tree")).toBeDefined();
  });
});
