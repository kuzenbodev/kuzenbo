const TABBABLE_NODES = /input|select|textarea|button|object/;
export const FOCUS_SELECTOR =
  "a, input, select, textarea, button, object, [tabindex]";

const hidden = (element: HTMLElement): boolean => {
  if (process.env.NODE_ENV === "test") {
    return false;
  }

  return element.style.display === "none";
};

const visible = (element: HTMLElement): boolean => {
  const isHidden =
    element.getAttribute("aria-hidden") ||
    element.getAttribute("hidden") ||
    element.getAttribute("type") === "hidden";

  if (isHidden) {
    return false;
  }

  let parentElement: HTMLElement = element;
  while (parentElement) {
    if (parentElement === document.body || parentElement.nodeType === 11) {
      break;
    }

    if (hidden(parentElement)) {
      return false;
    }

    parentElement = parentElement.parentNode as HTMLElement;
  }

  return true;
};

const getElementTabIndex = (element: HTMLElement): number => {
  let tabIndex: string | null | undefined = element.getAttribute("tabindex");
  if (tabIndex === null) {
    tabIndex = undefined;
  }
  return Number.parseInt(tabIndex as string, 10);
};

export const focusable = (element: HTMLElement): boolean => {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
  const res =
    // @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition
    (TABBABLE_NODES.test(nodeName) && !element.disabled) ||
    (element instanceof HTMLAnchorElement
      ? element.href !== "" || isTabIndexNotNaN
      : isTabIndexNotNaN);

  return res && visible(element);
};

export const tabbable = (element: HTMLElement): boolean => {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = Number.isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
};

export const findTabbableDescendants = (element: HTMLElement): HTMLElement[] =>
  [...element.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)].filter(tabbable);
