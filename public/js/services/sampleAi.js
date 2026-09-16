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
import { getAttachmentFile, isImageType } from '../data/attachments.js';
import { buildSystemPrompt, buildUserPrompt } from './aiModes.js';

let limitsPromise = null;

/** Steht Claude in dieser Umgebung zur Verfügung? */
export async function getSampleApi() {
  return getCloudSample();
}

function getLimits(sample) {
  if (!limitsPromise) limitsPromise = sample.limits().catch(() => null);
  return limitsPromise;
}

/**
 * Stellt die Anfrage an Claude.
 * @param {object} payload mode, question, subject, taskTitle, userSolution, attachments
 * @param {{onText?: Function, signal?: AbortSignal}} [options]
 * @returns {Promise<{content: string, provider: string, notice?: string}>}
 */
export async function askClaude(payload, { onText, signal } = {}) {
  const sample = await getSampleApi();
  if (!sample) throw new SampleUnavailable();

  const limits = await getLimits(sample);
  const images = limits?.images ? await collectImages(payload.attachments, limits.images) : [];

  // Es gibt keinen System-Prompt: Die Regeln stehen am Anfang der Nachricht.
  const prompt = `${buildSystemPrompt(payload.mode)}\n\n---\n\n${buildUserPrompt({
    ...payload,
    images,
  })}`;

  try {
    const result = await sample(prompt, {
      images: images.length ? images : undefined,
      modelTier: 'default',
      onText,
      signal,
    });

    const hadImages = Boolean(payload.attachments?.some((entry) => isImageType(entry.type)));

    return {
      content: result.text,
      provider: 'Claude',
      notice: buildNotice({ truncated: result.truncated, hadImages, sentImages: images.length }),
    };
  } catch (error) {
    throw new SampleError(messageFor(error), error?.code, error?.text);
  }
}

/** Fotos als Dateien laden – so viele, wie die Plattform zulässt. */
async function collectImages(attachments = [], imageLimits) {
  const candidates = attachments.filter((entry) => isImageType(entry.type));
  const files = [];

  for (const attachment of candidates.slice(0, imageLimits.maxCount ?? 4)) {
    const blob = await getAttachmentFile(attachment);
    if (!blob) continue;
    if (imageLimits.maxInputBytes && blob.size > imageLimits.maxInputBytes) continue;
    if (imageLimits.mediaTypes?.length && !imageLimits.mediaTypes.includes(blob.type)) continue;
    files.push(blob);
  }

  return files;
}

function buildNotice({ truncated, hadImages, sentImages }) {
  if (truncated) return 'Die Antwort wurde gekürzt. Frag nach einem kleineren Teil der Aufgabe.';
  if (hadImages && !sentImages) return 'Die Fotos konnten nicht mitgeschickt werden – die Antwort bezieht sich nur auf den Text.';
  return null;
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
