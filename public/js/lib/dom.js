/** Minimale DOM-Helfer – ersetzen ein Framework für diesen überschaubaren Umfang. */

const DIRECT_PROPERTIES = new Set(['value', 'checked', 'selected', 'disabled', 'hidden', 'indeterminate']);

/**
 * Erzeugt ein Element.
 * @param {string} tag z.B. "div", "button"
 * @param {object} [attrs] class, text, data, on (Event-Map), aria-*, …
 * @param {Array<Node|string|null|false|undefined>} [children]
 */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;

    if (key === 'class') {
      node.className = Array.isArray(value) ? value.filter(Boolean).join(' ') : String(value);
    } else if (key === 'text') {
      node.textContent = String(value);
    } else if (key === 'style' && typeof value === 'object') {
      for (const [property, propertyValue] of Object.entries(value)) {
        // CSS-Variablen brauchen setProperty, normale Eigenschaften nicht.
        if (property.startsWith('--')) node.style.setProperty(property, propertyValue);
        else node.style[property] = propertyValue;
      }
    } else if (key === 'data' && typeof value === 'object') {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        if (dataValue === null || dataValue === undefined) continue;
        node.dataset[dataKey] = String(dataValue);
      }
    } else if (key === 'on' && typeof value === 'object') {
      for (const [eventName, handler] of Object.entries(value)) {
        if (typeof handler === 'function') node.addEventListener(eventName, handler);
      }
    } else if (DIRECT_PROPERTIES.has(key)) {
      // Diese Werte gehören als Property gesetzt (z.B. der aktuelle Wert eines Feldes).
      node[key] = value;
    } else {
      // Alles andere als Attribut – so können auch schreibgeschützte
      // Properties wie `list` oder `form` gesetzt werden.
      node.setAttribute(key, value === true ? '' : String(value));
    }
  }

  append(node, children);
  return node;
}

/** Hängt Kinder an; Strings werden als Text eingefügt, falsy Werte ignoriert. */
export function append(parent, children) {
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false || child === '') continue;
    parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return parent;
}

/** Leert einen Container und setzt neue Kinder. */
export function render(container, children) {
  container.replaceChildren();
  append(container, children);
  return container;
}

/** Fragment aus mehreren Knoten. */
export function fragment(children) {
  return append(document.createDocumentFragment(), children);
}

/** Inline-SVG-Icon aus dem Icon-Set. */
export function icon(name, size = 18) {
  const paths = ICONS[name];
  if (!paths) return null;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  for (const d of paths) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.append(path);
  }
  return svg;
}

const ICONS = {
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h14V9.5'],
  list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
  calendar: ['M7 3v4', 'M17 3v4', 'M3 9h18', 'M4 5h16v16H4z'],
  sparkles: ['M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z', 'M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z'],
  book: ['M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z', 'M8 3v18'],
  plus: ['M12 5v14', 'M5 12h14'],
  check: ['M4 12.5 9.5 18 20 6.5'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'],
  edit: ['M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z'],
  trash: ['M4 7h16', 'M9 7V4h6v3', 'M6 7l1 13h10l1-13'],
  copy: ['M9 9h11v11H9z', 'M5 15V4h11'],
  sun: ['M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z', 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M19.1 4.9l-1.4 1.4', 'M6.3 17.7l-1.4 1.4'],
  moon: ['M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  chevronLeft: ['M15 5l-7 7 7 7'],
  chevronRight: ['M9 5l7 7-7 7'],
  send: ['M4 12l16-8-6 16-2.5-6z'],
  alert: ['M12 8v5', 'M12 17h.01', 'M12 3l9 17H3z'],
};
