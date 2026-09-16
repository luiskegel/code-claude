/** Gemeinsamer Fehlertyp aller KI-Anbieter. */

export class ProviderError extends Error {
  constructor(message, status = 502, details = '') {
    super(message);
    this.name = 'ProviderError';
    this.status = status;
    this.details = details;
  }
}
