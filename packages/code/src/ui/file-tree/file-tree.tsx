"use client";

import type { CSSProperties } from "react";

import { Button } from "@kuzenbo/core/ui/button";
import { Tree } from "react-arborist";
import { cn, tv } from "tailwind-variants";

export interface FileTreeNode {
  children?: FileTreeNode[];
  id: string;
  name: string;
}

export interface FileTreeProps {
  className?: string;
  data: FileTreeNode[];
  height?: number;
  indent?: number;
  onSelect?: (node: FileTreeNode) => void;
  openByDefault?: boolean;
  rowHeight?: number;
  width?: number;
}

const fileTreeVariants = tv({
  base: "overflow-hidden rounded-lg border border-border bg-muted/30 p-2",
});

export const FileTree = ({
  className,
  data,
  height = 280,
  indent = 20,
  onSelect,
  openByDefault = false,
  rowHeight = 32,
  width = 520,
}: FileTreeProps) => (
  <section className={cn(fileTreeVariants(), className)} data-slot="file-tree">
    <Tree<FileTreeNode>
      disableDrag
      disableDrop
      disableEdit
      height={height}
      indent={indent}
      initialData={data}
      onActivate={(nodeApi) => {
        onSelect?.(nodeApi.data);
      }}
      openByDefault={openByDefault}
      rowHeight={rowHeight}
      width={width}
    >
      {({ dragHandle, node, style }) => {
        let toggleLabel = " ";

        if (!node.isLeaf) {
          toggleLabel = node.isOpen ? "-" : "+";
        }

        return (
          <div
            className={cn(
              "flex items-center gap-1 rounded px-1 py-0.5",
              node.isSelected && "bg-primary/10 text-foreground"
            )}
            data-node-depth={node.level}
            data-slot="file-tree-row"
            ref={dragHandle}
            style={style as CSSProperties}
          >
            <Button
              aria-label={`Toggle ${node.data.name}`}
              className="h-6 w-6 p-0 text-xs"
              disabled={node.isLeaf}
              onClick={(event) => {
                event.stopPropagation();

                if (!node.isLeaf) {
                  node.toggle();
                }
              }}
              size="icon-xs"
              type="button"
              variant="ghost"
            >
              {toggleLabel}
            </Button>

            <Button
              aria-label={`Select ${node.data.name}`}
              className="h-auto min-h-0 min-w-0 flex-1 justify-start gap-2 px-1 py-1 text-left text-sm"
              onClick={() => {
                node.select();
                onSelect?.(node.data);
              }}
              size="sm"
              type="button"
              variant="ghost"
            >
              <span className="shrink-0 text-xs text-muted-foreground">
                {node.isLeaf ? "FILE" : "DIR"}
              </span>
              <span className="truncate text-foreground">{node.data.name}</span>
            </Button>
          </div>
        );
      }}
    </Tree>
  </section>
);
