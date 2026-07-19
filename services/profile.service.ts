import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export const profileService = {
  get: () => apiClient.get(apiEndpoints.profile.root),
  update: (payload: unknown) => apiClient.put(apiEndpoints.profile.root, payload),
  updateEmail: (payload: unknown) => apiClient.put(apiEndpoints.profile.email, payload),
  updatePassword: (payload: unknown) => apiClient.put(apiEndpoints.profile.password, payload),
  
  getAddresses: () => apiClient.get(apiEndpoints.profile.addresses),
  getAddress: (id: string) => apiClient.get(apiEndpoints.profile.address(id)),
  createAddress: (payload: unknown) => apiClient.post(apiEndpoints.profile.addresses, payload),
  updateAddress: (id: string, payload: unknown) => apiClient.put(apiEndpoints.profile.address(id), payload),
  deleteAddress: (id: string) => apiClient.delete(apiEndpoints.profile.address(id)),
};
