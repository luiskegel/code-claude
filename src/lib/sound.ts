/**
 * Dezente Klänge, live per Web Audio erzeugt – keine Audiodateien nötig.
 * Ohne Audio-Unterstützung bleibt die App vollständig nutzbar.
 */
export type SoundKind = 'key' | 'error' | 'complete';

interface ToneOptions {
  frequency: number;
  endFrequency?: number;
  duration: number;
  volume: number;
  type: OscillatorType;
  delay?: number;
}

type AudioContextConstructor = typeof AudioContext;

let sharedContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Constructor: AudioContextConstructor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
  if (!Constructor) return null;
  if (!sharedContext) {
    try {
      sharedContext = new Constructor();
    } catch {
      return null;
    }
  }
  if (sharedContext.state === 'suspended') {
    sharedContext.resume().catch(() => undefined);
  }
  return sharedContext;
}

function playTone(context: AudioContext, options: ToneOptions): void {
  const start = context.currentTime + (options.delay ?? 0);
  const end = start + options.duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = options.type;
  oscillator.frequency.setValueAtTime(options.frequency, start);
  if (options.endFrequency)
    oscillator.frequency.exponentialRampToValueAtTime(options.endFrequency, end);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(options.volume, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(end + 0.02);
}

export function playSound(kind: SoundKind): void {
  const context = getContext();
  if (!context) return;
  try {
    switch (kind) {
      case 'key':
        playTone(context, { frequency: 1350, duration: 0.028, volume: 0.022, type: 'triangle' });
        break;
      case 'error':
        playTone(context, {
          frequency: 260,
          endFrequency: 190,
          duration: 0.13,
          volume: 0.045,
          type: 'sine',
        });
        break;
      case 'complete':
        playTone(context, { frequency: 523.25, duration: 0.18, volume: 0.05, type: 'sine' });
        playTone(context, {
          frequency: 659.25,
          duration: 0.18,
          volume: 0.05,
          type: 'sine',
          delay: 0.11,
        });
        playTone(context, {
          frequency: 783.99,
          duration: 0.32,
          volume: 0.05,
          type: 'sine',
          delay: 0.22,
        });
        break;
    }
  } catch {
    // Audio ist optional – Fehler werden bewusst ignoriert.
  }
}
