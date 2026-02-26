"use client";

import { useIsomorphicEffect } from "@kuzenbo/hooks/use-isomorphic-effect";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const createPortalNode = (
  props: ComponentPropsWithoutRef<"div">
): HTMLElement => {
  const node = document.createElement("div");
  node.dataset.portal = "true";

  if (typeof props.className === "string") {
    node.classList.add(...props.className.split(" ").filter(Boolean));
  }

  if (typeof props.style === "object" && props.style) {
    Object.assign(node.style, props.style);
  }

  if (typeof props.id === "string") {
    node.setAttribute("id", props.id);
  }

  return node;
};

export type BasePortalProps = ComponentPropsWithoutRef<"div"> & {
  /**
   * Element inside which portal should be created, by default a new div element is created and appended to the `document.body`
   */
  target?: HTMLElement | string | RefObject<HTMLElement | null>;
  /**
   * If set, all portals are rendered in the same DOM node
   * @default true
   */
  reuseTargetNode?: boolean;
};

export type PortalProps = BasePortalProps & {
  /**
   * Portal children, for example, custom modal or popover
   */
  children: ReactNode;
};

const getTargetNode = ({
  target,
  reuseTargetNode,
  ...others
}: BasePortalProps): HTMLElement | null => {
  if (target) {
    if (typeof target === "string") {
      return (
        document.querySelector<HTMLElement>(target) ?? createPortalNode(others)
      );
    }
    // Handle React refs
    if ("current" in target) {
      return target.current ?? createPortalNode(others);
    }
    // Handle HTMLElement directly
    if (target instanceof HTMLElement) {
      return target;
    }
  }

  if (reuseTargetNode) {
    const existingNode = document.querySelector<HTMLElement>(
      "[data-labs-shared-portal-node]"
    );
    if (existingNode) {
      return existingNode;
    }
    const node = createPortalNode(others);
    node.dataset.labsSharedPortalNode = "true";
    document.body.append(node);
    return node;
  }

  return createPortalNode(others);
};

export const Portal = ({
  children,
  target,
  reuseTargetNode = true,
  ...others
}: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);

  useIsomorphicEffect(() => {
    setMounted(true);
    nodeRef.current = getTargetNode({ target, reuseTargetNode, ...others });

    if (!(target || reuseTargetNode) && nodeRef.current) {
      document.body.append(nodeRef.current);
    }

    return () => {
      if (!(target || reuseTargetNode) && nodeRef.current) {
        nodeRef.current.remove();
      }
    };
  }, [target, reuseTargetNode]);

  if (!(mounted && nodeRef.current)) {
    return null;
  }

  return createPortal(children, nodeRef.current);
};
