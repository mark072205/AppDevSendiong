import type { LoginCredentials } from '../../types/auth';

const REQUEST_TIMEOUT_MS = 10000;
const LOCAL_API_CANDIDATES = ['http://10.0.2.2:8000'];

function stringish(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value) && value.every((x) => typeof x === 'string')) {
    return value.join(', ');
  }
  return undefined;
}

//API auth

function loginErrorMessageFromBody(data: unknown): string {
  const d =
    data && typeof data === 'object' ? (data as Record<string, unknown>) : undefined;
  const errs =
    d?.errors && typeof d.errors === 'object'
      ? (d.errors as Record<string, unknown>)
      : undefined;

  return (
    stringish(d?.text) ||
    stringish(d?.message) ||
    stringish(d?.error) ||
    stringish(d?.detail) ||
    stringish(errs?.password) ||
    stringish(errs?.detail) ||
    stringish(errs?.message) ||
    stringish(errs?.non_field_errors) ||
    stringish(errs?.__all__) ||
    'Login failed'
  );
}

export async function userLogin({ username, password }: LoginCredentials): Promise<unknown> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };

  let lastConnectionError: Error | null = null;

  for (const baseUrl of LOCAL_API_CANDIDATES) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(`${baseUrl}/api/login`, {
        ...options,
        signal: controller.signal,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        lastConnectionError = new Error(
          `Connection timed out reaching ${baseUrl}. Check that the server is running and reachable.`,
        );
      } else if (err instanceof Error) {
        lastConnectionError = err;
      } else {
        lastConnectionError = new Error('Connection failed');
      }
      continue;
    }
    clearTimeout(timeoutId);

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      try {
        const text = await response.text();
        data = { text };
      } catch {
        data = null;
      }
    }

    if (response.ok) {
      console.log('Login success response:', data);
      return data;
    }

    const message = loginErrorMessageFromBody(data);
    const statusSuffix = response.status ? ` (HTTP ${response.status})` : '';
    throw new Error(`${message}${statusSuffix}`);
  }

  throw (
    lastConnectionError ||
    new Error('Connection failed. Check that the server is running and reachable.')
  );
}
