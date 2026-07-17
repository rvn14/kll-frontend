import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export const ordersService = {
  checkoutCart: (payload: unknown) => apiClient.post(apiEndpoints.orders.checkoutCart, payload),
  directPreview: (payload: unknown) => apiClient.post(apiEndpoints.orders.directPreview, payload),
  direct: (payload: unknown) => apiClient.post(apiEndpoints.orders.direct, payload),
  list: () => apiClient.get(apiEndpoints.orders.list),
  history: () => apiClient.get(apiEndpoints.orders.history),
  get: (orderId: string) => apiClient.get(apiEndpoints.orders.byId(orderId)),
  bill: (orderId: string) => apiClient.get(apiEndpoints.orders.bill(orderId)),
};
