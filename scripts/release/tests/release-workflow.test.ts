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

  it("validates channel and ref mapping in the release workflow", () => {
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

  it("uses a single release job with conditional publish environment", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(/^\s{2}release:\s*$/m.test(workflow)).toBe(true);
    expect(/^\s{2}preflight:\s*$/m.test(workflow)).toBe(false);
    expect(/^\s{2}publish:\s*$/m.test(workflow)).toBe(false);
    expect(workflow.includes("npm-publish")).toBe(true);
    expect(workflow.includes("release-dry-run")).toBe(true);
  });

  it("builds workspaces before conditional publish steps", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(
      /release:[\s\S]*- name: Build all workspaces[\s\S]*run: bun run build[\s\S]*- name: Pack dry-run allowlist packages[\s\S]*- name: Publish allowlist packages/.test(
        workflow
      )
    ).toBe(true);
  });

  it("gates publish, tag, and release steps behind dry_run=false", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("- name: Publish allowlist packages")).toBe(true);
    expect(workflow.includes("- name: Create and push git tag")).toBe(true);
    expect(workflow.includes("- name: Create GitHub Release")).toBe(true);
    expect(
      /if: \$\{\{ inputs\.dry_run == false \|\| inputs\.dry_run == 'false' \}\}/.test(
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

  it("upgrades npm runtime for trusted publishing", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("Ensure trusted publishing npm runtime")).toBe(
      true
    );
    expect(workflow.includes("npm install --global npm@11.5.1")).toBe(true);
  });

  it("caches Bun packages and Turborepo local cache in release jobs", () => {
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

  it("uses channel-scoped concurrency group", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    expect(workflow.includes("group: release-")).toBe(true);
    expect(workflow.includes("inputs.channel")).toBe(true);
  });
});
