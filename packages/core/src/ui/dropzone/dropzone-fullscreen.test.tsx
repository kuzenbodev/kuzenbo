import { afterEach, describe, expect, it } from "bun:test";

import { act, cleanup, render, waitFor } from "@testing-library/react";

import { Dropzone } from "./dropzone";
import { DropzoneFullScreen } from "./dropzone-fullscreen";

const noop = (): void => undefined;

const dispatchFileDragEvent = async (type: "dragenter" | "dragleave") => {
  await act(async () => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperty(event, "dataTransfer", {
      value: { types: ["Files"] },
    });
    document.dispatchEvent(event);
  });
};

afterEach(() => {
  cleanup();
  for (const node of document.querySelectorAll<HTMLElement>(
    "[data-portal=true]"
  )) {
    if (node.parentElement === document.body) {
      node.remove();
    }
  }
  document.querySelector("#dropzone-target")?.remove();
});

describe("DropzoneFullScreen", () => {
  it("renders inside portal node by default when file drag enters the page", async () => {
    render(
      <DropzoneFullScreen onDrop={noop}>
        <Dropzone.Idle>Drop files here</Dropzone.Idle>
      </DropzoneFullScreen>
    );

    await dispatchFileDragEvent("dragenter");

    await waitFor(() => {
      const dropzone = document.querySelector<HTMLElement>(
        "[data-slot=dropzone]"
      );
      expect(dropzone).not.toBeNull();
      expect(dropzone?.closest("[data-portal=true]")).not.toBeNull();
    });
  });

  it("renders without a portal wrapper when withinPortal is false", async () => {
    render(
      <DropzoneFullScreen onDrop={noop} withinPortal={false}>
        <Dropzone.Idle>Drop files here</Dropzone.Idle>
      </DropzoneFullScreen>
    );

    await dispatchFileDragEvent("dragenter");

    await waitFor(() => {
      const dropzone = document.querySelector<HTMLElement>(
        "[data-slot=dropzone]"
      );
      expect(dropzone).not.toBeNull();
      expect(dropzone?.closest("[data-portal=true]")).toBeNull();
    });
  });

  it("mounts into portalTarget when provided", async () => {
    const host = document.createElement("div");
    host.id = "dropzone-target";
    document.body.append(host);

    render(
      <DropzoneFullScreen onDrop={noop} portalTarget={host}>
        <Dropzone.Idle>Drop files here</Dropzone.Idle>
      </DropzoneFullScreen>
    );

    await dispatchFileDragEvent("dragenter");

    await waitFor(() => {
      expect(host.querySelector("[data-slot=dropzone]")).not.toBeNull();
    });
  });
});
