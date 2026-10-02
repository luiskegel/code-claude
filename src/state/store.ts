import { STORAGE_KEYS } from '../config/storageKeys';
import type { KeyboardLayoutId } from '../domain/keyboard/layouts';
import {
  applyExerciseResult,
  buildExerciseResult,
  createEmptyProgress,
  type CompletedExercise,
  type ResultOutcome,
} from '../domain/progress/progress';
import type { ProgressState } from '../domain/progress/types';
import {
  DEFAULT_SETTINGS,
  settingsForGoal,
  type LearningGoal,
  type UserSettings,
} from '../domain/settings/settings';
import { parseProgress, parseSettings } from '../domain/storage/schema';
import {
  readJson,
  removeKey,
  writeJson,
  writeRaw,
  type KeyValueStorage,
} from '../domain/storage/storage';

export interface StorageStatus {
  /** Daten überleben einen Neustart des Browsers */
  persistent: boolean;
  /** Der letzte Speicherversuch ist fehlgeschlagen */
  lastWriteFailed: boolean;
  /** Beim Laden wurden beschädigte Daten gefunden und ersetzt */
  recoveredFromCorruption: boolean;
}

export interface AppState {
  settings: UserSettings;
  progress: ProgressState;
  storage: StorageStatus;
}

export interface AppActions {
  updateSettings(patch: Partial<Omit<UserSettings, 'version'>>): void;
  completeOnboarding(choice: { keyboardLayout: KeyboardLayoutId; goal: LearningGoal }): void;
  recordExercise(completed: CompletedExercise): ResultOutcome;
  resetProgress(): void;
  resetAll(): void;
  reloadFromStorage(): void;
}

export interface AppStore extends AppActions {
  getState(): AppState;
  subscribe(listener: () => void): () => void;
}

const CORRUPT_BACKUP_SUFFIX = ':backup';

interface LoadedSlice<T> {
  value: T;
  corrupt: boolean;
}

function loadSlice<T>(
  storage: KeyValueStorage,
  key: string,
  parse: (raw: unknown) => T,
): LoadedSlice<T> {
  const read = readJson(storage, key);
  if (read.status === 'ok') return { value: parse(read.value), corrupt: false };
  if (read.status === 'corrupt') {
    // Beschädigte Rohdaten sichern, bevor sie überschrieben werden.
    writeRaw(storage, key + CORRUPT_BACKUP_SUFFIX, read.raw);
    return { value: parse(undefined), corrupt: true };
  }
  return { value: parse(undefined), corrupt: false };
}

/** Speichert den Fortschritt; bei vollem Speicher wird der Verlauf schrittweise gekürzt. */
function saveProgress(storage: KeyValueStorage, progress: ProgressState): boolean {
  if (writeJson(storage, STORAGE_KEYS.progress, progress)) return true;
  let history = progress.history;
  while (history.length > 1) {
    history = history.slice(Math.ceil(history.length / 2));
    if (writeJson(storage, STORAGE_KEYS.progress, { ...progress, history })) return true;
  }
  return writeJson(storage, STORAGE_KEYS.progress, { ...progress, history: [] });
}

export function createAppStore(storage: KeyValueStorage, persistent: boolean): AppStore {
  const listeners = new Set<() => void>();

  const load = (): AppState => {
    const settings = loadSlice(storage, STORAGE_KEYS.settings, parseSettings);
    const progress = loadSlice(storage, STORAGE_KEYS.progress, parseProgress);
    return {
      settings: settings.value,
      progress: progress.value,
      storage: {
        persistent,
        lastWriteFailed: false,
        recoveredFromCorruption: settings.corrupt || progress.corrupt,
      },
    };
  };

  let state = load();

  const emit = () => {
    for (const listener of listeners) listener();
  };

  const setState = (next: AppState) => {
    state = next;
    emit();
  };

  const withWriteResult = (ok: boolean): StorageStatus =>
    ok === !state.storage.lastWriteFailed
      ? state.storage
      : { ...state.storage, lastWriteFailed: !ok };

  const commitSettings = (settings: UserSettings) => {
    const ok = writeJson(storage, STORAGE_KEYS.settings, settings);
    setState({ ...state, settings, storage: withWriteResult(ok) });
  };

  const commitProgress = (progress: ProgressState) => {
    const ok = saveProgress(storage, progress);
    setState({ ...state, progress, storage: withWriteResult(ok) });
  };

  return {
    getState: () => state,

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    updateSettings(patch) {
      commitSettings({ ...state.settings, ...patch });
    },

    completeOnboarding({ keyboardLayout, goal }) {
      commitSettings({
        ...state.settings,
        ...settingsForGoal(goal),
        keyboardLayout,
        onboardingCompleted: true,
      });
    },

    recordExercise(completed) {
      const built = buildExerciseResult(completed);
      const { progress, outcome } = applyExerciseResult(state.progress, built);
      commitProgress(progress);
      return outcome;
    },

    resetProgress() {
      removeKey(storage, STORAGE_KEYS.progress + CORRUPT_BACKUP_SUFFIX);
      commitProgress(createEmptyProgress());
    },

    resetAll() {
      for (const key of Object.values(STORAGE_KEYS)) {
        removeKey(storage, key);
        removeKey(storage, key + CORRUPT_BACKUP_SUFFIX);
      }
      setState({
        settings: { ...DEFAULT_SETTINGS },
        progress: createEmptyProgress(),
        storage: { persistent, lastWriteFailed: false, recoveredFromCorruption: false },
      });
    },

    reloadFromStorage() {
      const loaded = load();
      setState({
        ...loaded,
        storage: { ...loaded.storage, lastWriteFailed: state.storage.lastWriteFailed },
      });
    },
  };
}
