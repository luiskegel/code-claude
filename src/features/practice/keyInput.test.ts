import { describe, expect, it } from 'vitest';
import { interpretKey, type KeyEventLike } from './keyInput';

function key(overrides: Partial<KeyEventLike> & { key: string }): KeyEventLike {
  return { metaKey: false, ctrlKey: false, altKey: false, repeat: false, ...overrides };
}

describe('Tasteninterpretation', () => {
  it('erkennt Buchstaben, Umlaute, ß und Großbuchstaben', () => {
    for (const char of ['a', 'Z', 'ö', 'Ü', 'ß', '?', ',', ' ']) {
      expect(interpretKey(key({ key: char }))).toEqual({ type: 'char', char });
    }
  });

  it('übersetzt Enter in einen Zeilenumbruch', () => {
    expect(interpretKey(key({ key: 'Enter' }))).toEqual({ type: 'char', char: '\n' });
  });

  it('erkennt die Rücktaste und das wortweise Löschen', () => {
    expect(interpretKey(key({ key: 'Backspace' }))).toEqual({
      type: 'backspace',
      wholeWord: false,
    });
    expect(interpretKey(key({ key: 'Backspace', altKey: true }))).toEqual({
      type: 'backspace',
      wholeWord: true,
    });
    expect(interpretKey(key({ key: 'Backspace', ctrlKey: true }))).toEqual({
      type: 'backspace',
      wholeWord: true,
    });
  });

  it('erkennt Escape zum Pausieren', () => {
    expect(interpretKey(key({ key: 'Escape' }))).toEqual({ type: 'escape' });
  });

  it('ignoriert Kürzel mit cmd oder Strg – sie zählen nicht als Fehler', () => {
    expect(interpretKey(key({ key: 'r', metaKey: true }))).toBeNull();
    expect(interpretKey(key({ key: 'c', ctrlKey: true }))).toBeNull();
    expect(interpretKey(key({ key: 'Backspace', metaKey: true }))).toBeNull();
  });

  it('erlaubt AltGr- und Option-Zeichen', () => {
    expect(interpretKey(key({ key: '@', ctrlKey: true, altKey: true }))).toEqual({
      type: 'char',
      char: '@',
    });
    expect(interpretKey(key({ key: '€', altKey: true }))).toEqual({ type: 'char', char: '€' });
  });

  it('ignoriert Modifikatoren, Tottasten, Tab und Auto-Repeat', () => {
    for (const name of [
      'Shift',
      'CapsLock',
      'Control',
      'Alt',
      'Meta',
      'Dead',
      'Tab',
      'ArrowLeft',
    ]) {
      expect(interpretKey(key({ key: name }))).toBeNull();
    }
    expect(interpretKey(key({ key: 'a', repeat: true }))).toBeNull();
  });

  it('überlässt Kompositionen (IME, Bildschirmtastatur) dem Eingabe-Ereignis', () => {
    expect(interpretKey(key({ key: 'Process', isComposing: true }))).toBeNull();
    expect(interpretKey(key({ key: 'Unidentified', keyCode: 229 }))).toBeNull();
  });
});
