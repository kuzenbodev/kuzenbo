import type { Meta, StoryObj } from "@storybook/react";

import { TerminalBlock } from "../terminal-block";

const CYAN = "\u001B[36m";
const YELLOW = "\u001B[33m";
const RED = "\u001B[31m";
const GREEN = "\u001B[32m";
const DIM = "\u001B[2m";
const RESET = "\u001B[0m";

const meta = {
  title: "Code/TerminalBlock/Default",
  component: TerminalBlock,
  tags: ["autodocs"],
  args: {
    title: "build",
    command: "bun run typecheck",
    output: `${CYAN}$ bun run typecheck${RESET}
Checking workspace...
${GREEN}All checks passed${RESET}`,
  },
} satisfies Meta<typeof TerminalBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CiPipelineSuccess: Story = {
  args: {
    title: "ci / code quality",
    command: "bun turbo run lint typecheck test --filter=@kuzenbo/code",
    output: `${CYAN}$ bun turbo run lint typecheck test --filter=@kuzenbo/code${RESET}
${DIM}• Packages in scope: @kuzenbo/code${RESET}
${GREEN}✓ lint completed in 2.8s${RESET}
${GREEN}✓ typecheck completed in 3.1s${RESET}
${GREEN}✓ test completed in 4.2s${RESET}
${GREEN}Pipeline succeeded${RESET}`,
  },
};

export const CiPipelineFailure: Story = {
  args: {
    title: "ci / release dry run",
    command: "bun run release:dry-run -- --channel stable",
    output: `${CYAN}$ bun run release:dry-run -- --channel stable${RESET}
${YELLOW}Warning:${RESET} missing changeset for @kuzenbo/code
Validating package manifests...
${RED}Error:${RESET} publish allowlist denied package @kuzenbo/code
${RED}Release dry run failed${RESET}`,
  },
};

export const RuntimeErrorWithoutCommand: Story = {
  args: {
    title: "runtime logs",
    command: undefined,
    output: `${DIM}[2026-02-25T08:11:24.002Z] request_id=01752c8f${RESET}
${RED}TypeError: Cannot read properties of undefined (reading 'slug')${RESET}
    at GET (app/api/docs/route.ts:27:18)
    at async executeRoute (/app/.next/server/app-route.js:122:17)`,
  },
};
