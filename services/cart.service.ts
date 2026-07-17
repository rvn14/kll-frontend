import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export const cartService = {
  get: () => apiClient.get(apiEndpoints.cart.root),
  clear: () => apiClient.delete(apiEndpoints.cart.root),
  add: (payload: unknown) => apiClient.post(apiEndpoints.cart.items, payload),
  update: (itemId: string, payload: unknown) => apiClient.patch(apiEndpoints.cart.item(itemId), payload),
  remove: (itemId: string) => apiClient.delete(apiEndpoints.cart.item(itemId)),
  select: (itemId: string, payload?: unknown) => apiClient.patch(apiEndpoints.cart.select(itemId), payload),
};
