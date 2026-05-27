import { PredictStackError } from './errors.js';
import { SDK_NAME, SDK_VERSION } from './version.js';

export type Fetcher = <T>(path: string, init?: RequestInit) => Promise<T>;

export function createFetcher(baseUrl: string): Fetcher {
  const base = baseUrl.replace(/\/$/, '');

  return async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${base}${path}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `${SDK_NAME}/${SDK_VERSION}`,
        ...init?.headers,
      },
    });

    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = null;
    }

    if (!res.ok) {
      const message =
        typeof body === 'object' && body !== null && 'error' in body
          ? String((body as Record<string, unknown>).error)
          : `HTTP ${res.status}`;
      throw new PredictStackError(message, res.status, body);
    }

    return body as T;
  };
}
