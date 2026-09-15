/**
 * Sehr kleiner Markdown-Renderer für KI-Antworten.
 * Erzeugt echte DOM-Knoten statt HTML-Strings – dadurch ist keine
 * Escaping-Lücke möglich, selbst wenn die Antwort HTML enthält.
 * Unterstützt: Überschriften (##/###), Listen, Zitate (>), Trennlinien,
 * **fett**, *kursiv*, `code`.
 */

import { el, fragment } from './dom.js';

export function renderMarkdown(text) {
  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = null;
  let quote = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(el('p', {}, renderInline(paragraph.join(' '))));
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      blocks.push(el(list.ordered ? 'ol' : 'ul', {}, list.items));
      list = null;
    }
  };

  const flushQuote = () => {
    if (quote) {
      blocks.push(el('blockquote', {}, quote.map((line) => el('p', {}, renderInline(line)))));
      quote = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    const quoted = /^>\s?(.*)$/.exec(line);
    if (quoted) {
      flushParagraph();
      flushList();
      if (!quote) quote = [];
      if (quoted[1].trim()) quote.push(quoted[1].trim());
      continue;
    }

    flushQuote();

    if (/^(-{3,}|_{3,})$/.test(line.trim())) {
      flushParagraph();
      flushList();
      blocks.push(el('hr'));
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(el('h3', {}, renderInline(heading[2])));
      continue;
    }

    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const ordered = /^\s*(\d+)[.)]\s+(.*)$/.exec(line);

    if (bullet || ordered) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      if (!list || list.ordered !== isOrdered) {
        flushList();
        list = { ordered: isOrdered, items: [] };
      }
      list.items.push(el('li', {}, renderInline(isOrdered ? ordered[2] : bullet[1])));
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushQuote();

  return fragment(blocks);
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;

function renderInline(text) {
  const parts = String(text).split(INLINE_PATTERN).filter((part) => part !== '' && part !== undefined);

  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return el('strong', { text: part.slice(2, -2) });
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return el('code', { text: part.slice(1, -1) });
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return el('em', { text: part.slice(1, -1) });
    }
    return document.createTextNode(part);
  });
}
