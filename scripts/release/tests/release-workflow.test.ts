import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const workflowPath = path.resolve(
  testsDir,
  "../../../.github/workflows/release.yml"
);

describe("trusted publishing workflow assertions", () => {
  it("uses workflow_dispatch trigger", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("workflow_dispatch:")).toBe(true);
    expect(workflow.includes("push:")).toBe(false);
    expect(workflow.includes("workflow_call:")).toBe(false);
  });

  it("requires id-token write permission", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("id-token: write")).toBe(true);
  });

  it("references provenance publishing", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("--provenance")).toBe(true);
  });

  it("runs quality commands from release config script", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("bun scripts/release/quality.ts")).toBe(true);
  });

  it("limits release ref inputs to channel branches", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("type: choice")).toBe(true);
    expect(workflow.includes("- next")).toBe(true);
    expect(workflow.includes("- main")).toBe(true);
  });

  it("validates channel and ref mapping in preflight", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("Validate channel and ref mapping")).toBe(true);
    expect(workflow.includes('next) expected_ref="main"')).toBe(true);
    expect(workflow.includes('stable) expected_ref="main"')).toBe(true);
  });

  it("passes --ref to validate, dry-run, and publish scripts", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("release:validate -- --version")).toBe(true);
    expect(workflow.includes('--ref "')).toBe(true);
    expect(workflow.includes("inputs.ref")).toBe(true);
    expect(workflow.includes("release:dry-run -- --version")).toBe(true);
    expect(workflow.includes("publish.ts --version")).toBe(true);
  });

  it("requires publish job to depend on preflight and use npm-publish environment", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("needs: preflight")).toBe(true);
    expect(workflow.includes("environment: npm-publish")).toBe(true);
  });

  it("builds workspaces in publish job before publishing", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(
      /publish:[\s\S]*- name: Build all workspaces[\s\S]*run: bun run build[\s\S]*- name: Publish allowlist packages/.test(
        workflow
      )
    ).toBe(true);
  });

  it("supports dedicated recovery publish mode", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("publish_mode:")).toBe(true);
    expect(workflow.includes("- recovery")).toBe(true);
    expect(workflow.includes("--mode")).toBe(true);
    expect(workflow.includes("inputs.publish_mode")).toBe(true);
  });

  it("uses trusted publishing compatible Node runtime", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("node-version: 22.14.0")).toBe(true);
  });

  it("uses channel-scoped concurrency group", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("group: release-")).toBe(true);
    expect(workflow.includes("inputs.channel")).toBe(true);
  });
});
