export function appendElement(container, component) {
  container.element.appendChild(component.element);
}

export function byChecked(a, b) {
  if (a.checked !== b.checked) {
    return Number(b.checked) - Number(a.checked);
  }
  return 0;
}
