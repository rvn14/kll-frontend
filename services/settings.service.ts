import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export const settingsService = {
  getTaxRate: () => apiClient.get(apiEndpoints.taxRate),
  updateTaxRate: (payload: unknown) => apiClient.patch(apiEndpoints.taxRate, payload),
};
