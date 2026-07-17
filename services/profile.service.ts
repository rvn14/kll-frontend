import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export const profileService = {
  get: () => apiClient.get(apiEndpoints.profile.root),
  update: (payload: unknown) => apiClient.put(apiEndpoints.profile.root, payload),
  updateEmail: (payload: unknown) => apiClient.put(apiEndpoints.profile.email, payload),
  updatePassword: (payload: unknown) => apiClient.put(apiEndpoints.profile.password, payload),
};
