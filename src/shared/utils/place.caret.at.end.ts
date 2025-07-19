export const placeCaretAtEnd = (element: HTMLElement) => {
  if (!element) return;
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false); // Collapse to the end
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus(); // Ensure the element is focused after placing caret
};
