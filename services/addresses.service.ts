import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export const addressesService = {
  list: () => apiClient.get(apiEndpoints.profile.addresses),
  create: (payload: unknown) => apiClient.post(apiEndpoints.profile.addresses, payload),
  get: (addressId: string) => apiClient.get(apiEndpoints.profile.address(addressId)),
  update: (addressId: string, payload: unknown) => apiClient.put(apiEndpoints.profile.address(addressId), payload),
  remove: (addressId: string) => apiClient.delete(apiEndpoints.profile.address(addressId)),
};
