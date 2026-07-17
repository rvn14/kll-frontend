import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ListParams } from "@/types";

export const adminOrdersService = {
  list: (params?: ListParams) => apiClient.get(apiEndpoints.adminOrders.list, { query: params }),
  get: (orderId: string) => apiClient.get(apiEndpoints.adminOrders.byId(orderId)),
  update: (orderId: string, payload: unknown) => apiClient.patch(apiEndpoints.adminOrders.byId(orderId), payload),
  updateStatus: (orderId: string, payload: unknown) => apiClient.patch(apiEndpoints.adminOrders.status(orderId), payload),
};
