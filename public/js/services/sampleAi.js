/**
 * KI-Antworten direkt über Claude – ohne eigenen API-Schlüssel.
 *
 * Läuft die App als Artifact auf claude.ai, fragt sie Claude über das Konto
 * der Person, die die App geöffnet hat. Beim ersten Mal fragt die Plattform
 * um Erlaubnis; danach läuft es ohne weitere Rückfragen.
 *
 * Fotos der Aufgabe werden direkt mitgeschickt, sodass Claude sie lesen
 * und die Aufgabe daraus lösen kann.
 */

import { getCloudSample } from '../data/cloud.js';
import { getAttachmentFile } from '../data/attachments.js';
import { buildSystemPrompt, buildUserPrompt } from './aiModes.js';
import { AI_IMAGE_TYPES, describeSkipped, planAttachments } from './attachmentPlan.js';

let limitsPromise = null;

/** Steht Claude in dieser Umgebung zur Verfügung? */
export async function getSampleApi() {
  return getCloudSample();
}

/**
 * Die Grenzwerte dieser Ansicht – nur zum Zuschneiden, nicht als Verbot.
 *
 * Ein Fehlschlag wird bewusst nicht gemerkt: Sonst bliebe eine einmalige
 * Störung für die ganze Sitzung hängen und die App hielte Fotos für
 * unmöglich, obwohl sie längst wieder gingen.
 */
function getLimits(sample) {
  if (!limitsPromise) {
    limitsPromise = Promise.resolve()
      .then(() => sample.limits())
      .catch(() => {
        limitsPromise = null;
        return null;
      });
  }
  return limitsPromise;
}

/**
 * Stellt die Anfrage an Claude.
 *
 * Fotos werden immer mitgeschickt und erst dann weggelassen, wenn die Ansicht
 * sie tatsächlich ablehnt. Früher entschied `limits()` allein darüber – meldete
 * es keine Bildunterstützung (oder war es kurz nicht erreichbar), blieb das
 * Foto des Arbeitsblatts liegen und Claude fragte nach einer Aufgabe, die es
 * längst vor sich gehabt hätte.
 *
 * @param {object} payload mode, question, subject, taskTitle, userSolution,
 *                 attachments, history
 * @param {{onText?: Function, signal?: AbortSignal}} [options]
 * @returns {Promise<{content: string, provider: string, notice?: string}>}
 */
export async function askClaude(payload, { onText, signal } = {}) {
  const sample = await getSampleApi();
  if (!sample) throw new SampleUnavailable();

  const limits = await getLimits(sample);

  // Claude über die Plattform nimmt nur Bilder entgegen – PDFs müssen draussen
  // bleiben, und das wird gesagt statt verschwiegen.
  const plan = planAttachments(payload.attachments, {
    maxCount: limits?.images?.maxCount ?? 4,
    imageTypes: limits?.images?.mediaTypes ?? AI_IMAGE_TYPES,
    allowPdf: false,
  });

  const { files: images, failed } = await loadFiles(plan.images, limits?.images);
  const history = normalizeHistory(payload.history);
  const skipped = [...plan.skipped];

  /** Ein Anlauf – der Prompt nennt genau die Bilder, die auch mitgehen. */
  const attempt = (files) => {
    // Es gibt keinen System-Prompt: Die Regeln stehen am Anfang der Nachricht.
    const prompt = `${buildSystemPrompt(payload.mode)}\n\n---\n\n${buildUserPrompt({
      ...payload,
      images: files,
    })}`;

    return sample(history.length ? [{ role: 'user', content: prompt }, ...history] : prompt, {
      images: files.length ? files : undefined,
      modelTier: 'default',
      onText,
      signal,
      // Eine Nachfrage muss eine neue Antwort bringen, keine Wiederholung.
      ...(history.length ? { cache: false } : {}),
    });
  };

  let result;
  try {
    result = await attempt(images);
  } catch (error) {
    const reason = imageRefusal(error);

    // Die Ansicht nimmt die Bilder nicht – dann ohne sie, aber mit Ansage.
    if (!images.length || !reason) {
      throw new SampleError(messageFor(error), error?.code, error?.text);
    }

    skipped.push(...plan.images.map((entry) => ({ name: entry.name, reason })));

    try {
      result = await attempt([]);
    } catch (retryError) {
      throw new SampleError(messageFor(retryError), retryError?.code, retryError?.text);
    }
  }

  return {
    content: result.text,
    provider: 'Claude',
    notice: buildNotice({
      truncated: result.truncated,
      skippedText: describeSkipped(skipped, failed),
    }),
  };
}

/** Lag es an den Bildern? Dann sagt der Rückgabewert, warum. */
function imageRefusal(error) {
  if (error?.code === 'images_unavailable') {
    return 'diese Ansicht schickt keine Bilder an Claude – öffne die App im Browser (claude.ai in Safari)';
  }
  if (error?.code === 'image_rejected') {
    return 'das Bild wurde abgelehnt (Format oder Grösse) – mach ein neues Foto als JPG';
  }
  return null;
}

/**
 * Der Verlauf nach der ersten Antwort, damit Nachfragen wie „mach es kürzer"
 * wissen, worauf sie sich beziehen. Claude erwartet abwechselnde Rollen und
 * eine Nutzerfrage am Schluss.
 */
function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];

  const turns = history
    .filter((turn) => turn && typeof turn.content === 'string' && turn.content.trim())
    .map((turn) => ({
      role: turn.role === 'assistant' ? 'assistant' : 'user',
      content: turn.content.trim(),
    }));

  // Ohne abschliessende Nutzerfrage gibt es nichts nachzufragen.
  while (turns.length && turns[turns.length - 1].role !== 'user') turns.pop();

  return turns;
}

/** Lädt die Dateien; was dabei ausfällt, wird gemeldet statt übergangen. */
async function loadFiles(attachments, imageLimits) {
  const files = [];
  const failed = [];

  for (const attachment of attachments) {
    const blob = await getAttachmentFile(attachment);

    if (!blob) {
      failed.push(attachment.name);
      continue;
    }
    if (imageLimits?.maxInputBytes && blob.size > imageLimits.maxInputBytes) {
      failed.push(`${attachment.name} – zu gross`);
      continue;
    }
    files.push(blob);
  }

  return { files, failed };
}

function buildNotice({ truncated, skippedText }) {
  const parts = [];
  if (truncated) parts.push('Die Antwort wurde gekürzt. Frag nach einem kleineren Teil der Aufgabe.');
  if (skippedText) parts.push(skippedText);
  return parts.length ? parts.join(' ') : null;
}

function messageFor(error) {
  switch (error?.code) {
    case 'not_granted':
      return 'Du hast der App noch nicht erlaubt, Claude zu nutzen. Lade die Seite neu und bestätige die Nachfrage.';
    case 'sampling_disabled':
      return 'Für dieses Konto steht Claude in Apps nicht zur Verfügung.';
    case 'rate_limited':
      return 'Dein Claude-Kontingent ist gerade erschöpft oder es kamen zu viele Anfragen. Versuch es später noch einmal.';
    case 'session_expired':
      return 'Bitte melde dich bei Claude neu an und versuch es erneut.';
    case 'image_rejected':
      return 'Das Foto wurde abgelehnt (zu gross oder falsches Format). Mach ein neues Foto als JPG oder PNG.';
    case 'images_unavailable':
      return 'In dieser Ansicht können keine Fotos an Claude geschickt werden. Tippe die Aufgabe bitte ab.';
    case 'refused':
      return 'Claude hat diese Anfrage abgelehnt. Formuliere die Aufgabe anders.';
    case 'empty_completion':
      return 'Es kam keine Antwort zurück. Formuliere die Aufgabe etwas ausführlicher.';
    case 'prompt_too_large':
      return 'Die Aufgabe ist zu lang. Kürze sie oder teile sie auf.';
    case 'cancelled':
      return 'Die Anfrage wurde abgebrochen.';
    default:
      return 'Die Anfrage an Claude ist fehlgeschlagen. Bitte versuch es noch einmal.';
  }
}

/** Claude steht in dieser Umgebung nicht bereit (z.B. lokaler Betrieb). */
export class SampleUnavailable extends Error {
  constructor() {
    super('Claude ist in dieser Umgebung nicht verfügbar.');
    this.name = 'SampleUnavailable';
  }
}

export class SampleError extends Error {
  constructor(message, code, partialText) {
    super(message);
    this.name = 'SampleError';
    this.code = code;
    this.partialText = partialText;
  }
}
