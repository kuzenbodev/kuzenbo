import { KuzenboProvider } from "@kuzenbo/core/provider";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";
import { useCallback, useRef, useState } from "react";

import { createToastManager, Toast, useToast, useToastManager } from "./toast";

afterEach(cleanup);

describe("Toast", () => {
  it("Toast.Provider renders children", () => {
    render(
      <Toast.Provider>
        <span>App content</span>
      </Toast.Provider>
    );
    expect(screen.getByText("App content")).toBeDefined();
  });

  it("has data-slot on provider", () => {
    render(
      <Toast.Provider>
        <span>x</span>
      </Toast.Provider>
    );
    expect(document.querySelector("[data-slot=toast]")).toBeDefined();
  });

  it("propagates provider size to viewport and toast roots", async () => {
    const Demo = () => {
      const toast = useToast();
      const handleCompact = useCallback(() => {
        toast.add({
          description: "Compact toast",
          title: "Sized",
        });
      }, [toast]);

      return (
        <button onClick={handleCompact} type="button">
          Add compact
        </button>
      );
    };

    render(
      <Toast.Provider size="xs">
        <Demo />
      </Toast.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add compact" }));

    await waitFor(() => {
      expect(screen.getByText("Compact toast")).toBeDefined();
    });

    const viewport = document.querySelector("[data-slot=toast-viewport]");
    const root = document.querySelector("[data-slot=toast-root]");

    expect((viewport as HTMLElement).dataset.size).toBe("xs");
    expect((root as HTMLElement).dataset.size).toBe("xs");
    expect((root as HTMLElement).className).toContain("p-2.5");
  });

  it("uses global size when provider size is omitted", async () => {
    const Demo = () => {
      const toast = useToast();
      const handleAdd = useCallback(() => {
        toast.add({
          description: "Global toast",
          title: "Global",
        });
      }, [toast]);

      return (
        <button onClick={handleAdd} type="button">
          Add global toast
        </button>
      );
    };

    render(
      <KuzenboProvider defaultSize="lg">
        <Toast.Provider>
          <Demo />
        </Toast.Provider>
      </KuzenboProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add global toast" }));

    await waitFor(() => {
      expect(screen.getByText("Global toast")).toBeDefined();
    });

    const viewport = document.querySelector("[data-slot=toast-viewport]");
    const root = document.querySelector("[data-slot=toast-root]");

    expect((viewport as HTMLElement).dataset.size).toBe("lg");
    expect((root as HTMLElement).dataset.size).toBe("lg");
  });

  it("prefers local provider size over global size", async () => {
    const Demo = () => {
      const toast = useToast();
      const handleAdd = useCallback(() => {
        toast.add({
          description: "Local toast",
          title: "Local",
        });
      }, [toast]);

      return (
        <button onClick={handleAdd} type="button">
          Add local toast
        </button>
      );
    };

    render(
      <KuzenboProvider defaultSize="lg">
        <Toast.Provider size="sm">
          <Demo />
        </Toast.Provider>
      </KuzenboProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add local toast" }));

    await waitFor(() => {
      expect(screen.getByText("Local toast")).toBeDefined();
    });

    const viewport = document.querySelector("[data-slot=toast-viewport]");
    const root = document.querySelector("[data-slot=toast-root]");

    expect((viewport as HTMLElement).dataset.size).toBe("sm");
    expect((root as HTMLElement).dataset.size).toBe("sm");
  });

  it("prefers explicit root size over local provider and global sizes", async () => {
    const toastManager = createToastManager();

    const ExplicitRootToasts = () => {
      const { toasts } = useToastManager();

      return (
        <Toast.Portal>
          <Toast.Viewport>
            {toasts.map((toast) => (
              <Toast.Root key={toast.id} size="xs" toast={toast}>
                <Toast.Content>
                  <Toast.Description />
                </Toast.Content>
              </Toast.Root>
            ))}
          </Toast.Viewport>
        </Toast.Portal>
      );
    };

    const Demo = () => {
      const handleAdd = useCallback(() => {
        toastManager.add({
          description: "Explicit root toast",
          title: "Explicit",
        });
      }, []);

      return (
        <button onClick={handleAdd} type="button">
          Add explicit root toast
        </button>
      );
    };

    render(
      <KuzenboProvider defaultSize="lg">
        <Toast size="sm" toastManager={toastManager}>
          <Demo />
          <ExplicitRootToasts />
        </Toast>
      </KuzenboProvider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add explicit root toast" })
    );

    await waitFor(() => {
      expect(screen.getByText("Explicit root toast")).toBeDefined();
    });

    const viewport = document.querySelector("[data-slot=toast-viewport]");
    const root = document.querySelector("[data-slot=toast-root]");

    expect((viewport as HTMLElement).dataset.size).toBe("sm");
    expect((root as HTMLElement).dataset.size).toBe("xs");
  });

  it("forwards provider toastManager to BaseToast provider", async () => {
    const customToastManager = createToastManager();

    const Demo = () => {
      const handleManaged = useCallback(() => {
        customToastManager.add({
          description: "Managed toast description",
          title: "Managed toast",
        });
      }, []);

      return (
        <button onClick={handleManaged} type="button">
          Add managed toast
        </button>
      );
    };

    render(
      <Toast.Provider toastManager={customToastManager}>
        <Demo />
      </Toast.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add managed toast" }));

    await waitFor(() => {
      expect(screen.getByText("Managed toast description")).toBeDefined();
    });
  });

  it("renders default toast action when actionProps are provided", async () => {
    const Demo = () => {
      const toast = useToast();
      const handleActionToast = useCallback(() => {
        toast.add({
          actionProps: {
            children: "Undo",
          },
          description: "Action toast description",
          title: "Action toast",
        });
      }, [toast]);

      return (
        <button onClick={handleActionToast} type="button">
          Add action toast
        </button>
      );
    };

    render(
      <Toast.Provider>
        <Demo />
      </Toast.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add action toast" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Undo" })).toBeDefined();
    });
  });

  it("renders multiple toast variants via useToast helpers", async () => {
    const Demo = () => {
      const toast = useToast();
      const handleSuccess = useCallback(() => {
        toast.success({
          title: "Saved",
          description: "Preferences updated.",
        });
      }, [toast]);
      const handleError = useCallback(() => {
        toast.error({
          title: "Failed",
          description: "Retry request.",
        });
      }, [toast]);

      return (
        <>
          <button onClick={handleSuccess} type="button">
            Add success
          </button>
          <button onClick={handleError} type="button">
            Add error
          </button>
        </>
      );
    };

    render(
      <Toast.Provider>
        <Demo />
      </Toast.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add success" }));
    fireEvent.click(screen.getByRole("button", { name: "Add error" }));

    expect(screen.getByText("Saved")).toBeDefined();
    expect(screen.getByText("Failed")).toBeDefined();

    const stackedRoot = document.querySelector("[data-slot=toast-root]");
    const content = document.querySelector("[data-slot=toast-content]");

    expect(stackedRoot).not.toBeNull();
    expect(content).not.toBeNull();
    expect((stackedRoot as HTMLElement).className).toContain("absolute");
    expect((stackedRoot as HTMLElement).className).toContain("origin-bottom");
    expect((stackedRoot as HTMLElement).className).toContain("p-4");
    expect((stackedRoot as HTMLElement).dataset.size).toBe("md");
    expect((stackedRoot as HTMLElement).className).not.toContain("w-max");
    expect((content as HTMLElement).className).toContain("overflow-hidden");
    expect((content as HTMLElement).className).toContain("duration-250");
  });

  it("closes a toast by id through useToast.close", async () => {
    const Demo = () => {
      const toast = useToast();
      const [toastId, setToastId] = useState("");
      const handleInfo = useCallback(() => {
        const id = toast.info({
          title: "Queued",
          description: "Waiting for deployment window.",
        });
        setToastId(id);
      }, [toast]);
      const handleClose = useCallback(() => {
        toast.close(toastId);
      }, [toast, toastId]);

      return (
        <>
          <button onClick={handleInfo} type="button">
            Add info
          </button>
          <button disabled={!toastId} onClick={handleClose} type="button">
            Close info
          </button>
        </>
      );
    };

    render(
      <Toast.Provider>
        <Demo />
      </Toast.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add info" }));
    expect(screen.getByText("Queued")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Close info" }));

    await waitFor(() => {
      expect(screen.queryByText("Queued")).toBeNull();
    });
  });

  it("renders anchored toasts via Positioner and Arrow wrappers", async () => {
    const anchoredToastManager = createToastManager();

    const AnchoredToasts = () => {
      const { toasts } = useToastManager();

      return (
        <Toast.Portal>
          <Toast.Viewport>
            {toasts.map((toast) => (
              <Toast.Positioner key={toast.id} toast={toast}>
                <Toast.Root toast={toast}>
                  <Toast.Arrow>
                    <span className="block h-2 w-2 rotate-45 border border-border border-r-0 border-b-0 bg-popover" />
                  </Toast.Arrow>
                  <Toast.Content>
                    <Toast.Description />
                  </Toast.Content>
                </Toast.Root>
              </Toast.Positioner>
            ))}
          </Toast.Viewport>
        </Toast.Portal>
      );
    };

    const Demo = () => {
      const anchorRef = useRef<HTMLButtonElement | null>(null);
      const handleAnchoredToast = useCallback(() => {
        anchoredToastManager.add({
          description: "Anchored toast",
          positionerProps: {
            anchor: anchorRef.current,
            sideOffset: 8,
          },
        });
      }, []);

      return (
        <Toast toastManager={anchoredToastManager}>
          <button onClick={handleAnchoredToast} ref={anchorRef} type="button">
            Add anchored
          </button>
          <AnchoredToasts />
        </Toast>
      );
    };

    render(<Demo />);

    fireEvent.click(screen.getByRole("button", { name: "Add anchored" }));

    await waitFor(() => {
      expect(screen.getByText("Anchored toast")).toBeDefined();
    });

    expect(
      document.querySelector("[data-slot=toast-positioner]")
    ).toBeDefined();
    expect(document.querySelector("[data-slot=toast-arrow]")).toBeDefined();

    const anchoredRoot = document.querySelector("[data-slot=toast-root]");
    expect(anchoredRoot).not.toBeNull();
    expect((anchoredRoot as HTMLElement).className).toContain("w-max");
    expect((anchoredRoot as HTMLElement).className).toContain(
      "origin-(--transform-origin)"
    );
    expect((anchoredRoot as HTMLElement).className).not.toContain("absolute");
  });
});
