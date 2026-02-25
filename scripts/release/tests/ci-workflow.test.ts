import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const workflowPath = path.resolve(
  testsDir,
  "../../../.github/workflows/ci.yml"
);

describe("ci workflow assertions", () => {
  it("runs on pull_request for main and supports workflow_dispatch", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("pull_request:")).toBe(true);
    expect(workflow.includes("push:")).toBe(false);
    expect(workflow.includes("workflow_dispatch:")).toBe(true);
    expect(workflow.includes("- main")).toBe(true);
    expect(workflow.includes("- alpha")).toBe(false);
    expect(workflow.includes("- beta")).toBe(false);
    expect(workflow.includes("- rc")).toBe(false);
  });

  it("uses read-only contents permission", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("permissions:")).toBe(true);
    expect(workflow.includes("contents: read")).toBe(true);
    expect(workflow.includes("id-token: write")).toBe(false);
  });

  it("defines quality and required jobs", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("quality:")).toBe(true);
    expect(workflow.includes("required:")).toBe(true);
  });

  it("delegates quality execution to shared ci:quality script", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("Run CI quality commands")).toBe(true);
    expect(workflow.includes("bun run ci:quality")).toBe(true);
    expect(workflow.includes("Run dependency audit")).toBe(false);
    expect(workflow.includes("Run lint")).toBe(false);
    expect(workflow.includes("Run typecheck")).toBe(false);
    expect(workflow.includes("Run test")).toBe(false);
    expect(workflow.includes("Run boundaries")).toBe(false);
    expect(workflow.includes("Run build")).toBe(false);
  });

  it("defines required aggregator job with quality dependency", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("required:")).toBe(true);
    expect(workflow.includes("needs:")).toBe(true);
    expect(workflow.includes("- quality")).toBe(true);
    expect(workflow.includes("All CI checks passed")).toBe(true);
  });

  it("uses concurrency cancel-in-progress", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("concurrency:")).toBe(true);
    expect(workflow.includes("group: ci-")).toBe(true);
    expect(workflow.includes("cancel-in-progress: true")).toBe(true);
  });

  it("caches Bun packages and Turborepo local cache", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("Restore Bun package cache")).toBe(true);
    expect(workflow.includes("~/.bun/install/cache")).toBe(true);
    expect(workflow.includes("Restore Turborepo local cache")).toBe(true);
    expect(workflow.includes(".turbo/cache")).toBe(true);
    expect(workflow.includes("actions/cache@")).toBe(true);
  });

  it("supports optional Turborepo remote cache env wiring", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("TURBO_TOKEN")).toBe(true);
    expect(workflow.includes("secrets.TURBO_TOKEN")).toBe(true);
    expect(workflow.includes("TURBO_TEAM")).toBe(true);
    expect(workflow.includes("vars.TURBO_TEAM")).toBe(true);
  });

  it("does not contain publish commands", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("npm publish")).toBe(false);
    expect(workflow.includes("--provenance")).toBe(false);
  });
});
