import { cookies } from "next/headers";
import { normalizeApiError } from "./errors";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, query?: ApiRequestOptions["query"]): string {
  const queryString = new URLSearchParams();
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) queryString.set(key, String(value));
  });
  const suffix = queryString.size ? `?${queryString.toString()}` : "";
  return `${API_BASE_URL}${path}${suffix}`;
}

export async function serverApiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, headers, query, ...requestOptions } = options;
  const isFormData = body instanceof FormData;
  
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  
  const response = await fetch(buildUrl(path, query), {
    ...requestOptions,
    headers: { 
      ...(isFormData ? {} : { "Content-Type": "application/json" }), 
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...headers 
    },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    cache: "no-store", // typically we don't want Next.js to aggressively cache API requests unless specified
  });

  if (!response.ok) throw await normalizeApiError(response);
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const serverApiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) => serverApiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: ApiRequestOptions) => serverApiRequest<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: ApiRequestOptions) => serverApiRequest<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: ApiRequestOptions) => serverApiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: ApiRequestOptions) => serverApiRequest<T>(path, { ...options, method: "DELETE" }),
};
