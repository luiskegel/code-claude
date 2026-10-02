import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Exercise } from '../../domain/exercise/generator';
import { KEYBOARD_LAYOUTS } from '../../domain/keyboard/layouts';
import type { ErrorMode, SessionSummary } from '../../domain/typing/engine';
import { TypingSession } from './TypingSession';

const exercise: Exercise = {
  id: 'test-1',
  lessonId: 'asdf',
  seed: 1,
  text: 'as df',
  adaptiveChars: [],
};

function setup({
  errorMode = 'correct',
  showLiveWpm = true,
}: { errorMode?: ErrorMode; showLiveWpm?: boolean } = {}) {
  const onFinish = vi.fn<(summary: SessionSummary) => void>();
  render(
    <TypingSession
      exercise={exercise}
      layout={KEYBOARD_LAYOUTS['apple-de']}
      eyebrow="Modul 1 · Grundlagen"
      heading="Lektion 3 · A S D F"
      errorMode={errorMode}
      showErrorHints
      showLiveWpm={showLiveWpm}
      showHands={false}
      soundEnabled={false}
      reducedMotion
      activeChars={new Set(['a', 's', 'd', 'f', ' '])}
      onFinish={onFinish}
      onRestart={() => undefined}
      onExit={() => undefined}
    />,
  );
  const input = screen.getByLabelText('Übungstext abtippen');
  const type = (...keys: string[]) => {
    for (const key of keys) fireEvent.keyDown(input, { key });
  };
  return { input, type, onFinish };
}

describe('Übungsansicht', () => {
  it('fokussiert das Eingabefeld und zeigt Taste und Finger an', () => {
    const { input } = setup();
    expect(input).toHaveFocus();
    expect(screen.getByText('Linker kleiner Finger')).toBeInTheDocument();
  });

  it('schließt die Übung bei korrekter Eingabe ab', () => {
    const { type, onFinish } = setup();
    type('a', 's', ' ', 'd', 'f');
    expect(onFinish).toHaveBeenCalledTimes(1);
    const summary = onFinish.mock.calls[0]![0];
    expect(summary.correctChars).toBe(5);
    expect(summary.errors).toBe(0);
    expect(summary.accuracy).toBe(100);
  });

  it('markiert Fehler, zählt sie und zeigt einen hilfreichen Hinweis', () => {
    const { type } = setup();
    type('s');
    expect(screen.getByText(/Du hast „s“ getippt\. Richtig ist „a“/)).toBeInTheDocument();
    expect(screen.getByText('Fehler').nextSibling?.textContent).toBe('1');
    // Die richtige Taste bleibt das Ziel.
    expect(screen.getByText('Linker kleiner Finger')).toBeInTheDocument();
  });

  it('ignoriert Tastenkürzel wie cmd+R', () => {
    const { input, type, onFinish } = setup();
    fireEvent.keyDown(input, { key: 'r', metaKey: true });
    expect(screen.getByText('Fehler').nextSibling?.textContent).toBe('0');
    type('a', 's', ' ', 'd', 'f');
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('erlaubt im Modus „Weiterschreiben" Korrekturen mit der Rücktaste', () => {
    const { type, onFinish } = setup({ errorMode: 'continue' });
    type('a', 'x', 'Backspace', 's', ' ', 'd', 'f');
    const summary = onFinish.mock.calls[0]![0];
    expect(summary.errors).toBe(1);
    expect(summary.correctChars).toBe(5);
  });

  it('blendet die Live-Geschwindigkeit aus, wenn sie deaktiviert ist', () => {
    setup({ showLiveWpm: false });
    expect(screen.queryByText('Geschwindigkeit')).not.toBeInTheDocument();
    expect(screen.getByText('Genauigkeit')).toBeInTheDocument();
  });

  it('pausiert beim Verlassen des Eingabefelds', () => {
    const { input, type } = setup();
    type('a');
    fireEvent.blur(input);
    expect(screen.getByText('Pausiert')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Weiter tippen' })).toBeInTheDocument();
  });
});
