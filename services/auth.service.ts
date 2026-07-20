import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export const authService = {
  register: (payload: unknown) => apiClient.post(apiEndpoints.auth.register, payload),
  login: (payload: unknown) => apiClient.post(apiEndpoints.auth.login, payload),
  me: <T>() => apiClient.get<T>(apiEndpoints.auth.me),
  refresh: () => apiClient.post(apiEndpoints.auth.refresh),
  logout: () => apiClient.post(apiEndpoints.auth.logout),
  googleStartUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}${apiEndpoints.auth.googleStart}`,
};
