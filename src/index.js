function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

const removeFocusHelper = (elementToFocus = null) => {
  document.removeEventListener("focusin", focusHandlers.focusin);
  document.removeEventListener("focusout", focusHandlers.focusout);
  document.removeEventListener("keydown", focusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
};

const focusHandlers = {};

const focusHelper = (container, elementToFocus = container) => {
  const elements = getFocusableElements(container);
  const first = elements[0];
  const last = elements[elements.length - 1];

  removeFocusHelper();

  focusHandlers.focusin = (event) => {
    if (event.target !== container && event.target !== last && event.target !== first) return;
    document.addEventListener("keydown", focusHandlers.keydown);
  };

  focusHandlers.focusout = function () {
    document.removeEventListener("keydown", focusHandlers.keydown);
  };

  focusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== "TAB") return; // if not TAB key
    // on the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    // on the first focusable element and tab backward, focus the last element
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener("focusout", focusHandlers.focusout);
  document.addEventListener("focusin", focusHandlers.focusin);

  elementToFocus.focus();
};

export { focusHelper, removeFocusHelper };
