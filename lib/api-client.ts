/**
 * Single shared client for calling the corporate-portfolio-api backend.
 * Components should call `apiClient.post(...)` instead of `fetch(...)`
 * directly, so the base URL, headers, and error handling live in one place.
 */

import { API_CONFIG } from "@/lib/env";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_CONFIG.URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
};
