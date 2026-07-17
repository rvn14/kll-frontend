import { apiClient } from "@/lib/api/client";
import { adaptItemListResponse, adaptItemResponse } from "@/lib/api/adapters/items";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ListParams, Product } from "@/types";

export async function getItems(params?: ListParams): Promise<Product[]> {
  const payload = await apiClient.get<unknown>(apiEndpoints.items.list, { query: params });
  return adaptItemListResponse(payload);
}
export async function getItemById(itemId: string): Promise<Product> { return adaptItemResponse(await apiClient.get(apiEndpoints.items.byId(itemId))); }
export function createItem(payload: unknown) { return apiClient.post(apiEndpoints.items.create, payload); }
export function updateItem(itemId: string, payload: unknown) { return apiClient.patch(apiEndpoints.items.byId(itemId), payload); }
export function deleteItem(itemId: string) { return apiClient.delete(apiEndpoints.items.byId(itemId)); }
export function restoreItem(itemId: string) { return apiClient.patch(apiEndpoints.items.restore(itemId)); }
