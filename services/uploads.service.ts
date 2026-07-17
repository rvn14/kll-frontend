import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export function uploadFile(file: File, metadata?: Record<string, string>) {
  const body = new FormData();
  body.append("file", file);
  Object.entries(metadata ?? {}).forEach(([key, value]) => body.append(key, value));
  // TODO(api-contract): Normalize the confirmed uploaded-file response in an adapter.
  return apiClient.post<unknown>(apiEndpoints.uploads, body);
}
