const BASE_URL = 'http://localhost:8080/api';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message || `Помилка запиту (${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}
