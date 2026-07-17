import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ListParams } from "@/types";

export const adminUsersService = {
  list: (params?: ListParams) => apiClient.get(apiEndpoints.adminUsers.list, { query: params }),
  byEmail: (params: ListParams) => apiClient.get(apiEndpoints.adminUsers.byEmail, { query: params }),
  get: (userId: string) => apiClient.get(apiEndpoints.adminUsers.byId(userId)),
  create: (payload: unknown) => apiClient.post(apiEndpoints.adminUsers.create, payload),
  update: (userId: string, payload: unknown) => apiClient.put(apiEndpoints.adminUsers.byId(userId), payload),
  remove: (userId: string) => apiClient.delete(apiEndpoints.adminUsers.byId(userId)),
  activate: (userId: string) => apiClient.post(apiEndpoints.adminUsers.activate(userId)),
  deactivate: (userId: string) => apiClient.post(apiEndpoints.adminUsers.deactivate(userId)),
};
