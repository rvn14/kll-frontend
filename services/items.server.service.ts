import { serverApiClient } from "@/lib/api/server-client";
import { adaptItemListResponse, adaptItemResponse } from "@/lib/api/adapters/items";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ListParams, Product } from "@/types";

export async function getItemsServer(params?: ListParams): Promise<Product[]> {
  try {
    const payload = await serverApiClient.get<unknown>(apiEndpoints.items.list, { query: params });
    return adaptItemListResponse(payload);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return [];
  }
}

export async function getItemByIdServer(itemId: string): Promise<Product | null> {
  try {
    const payload = await serverApiClient.get(apiEndpoints.items.byId(itemId));
    return adaptItemResponse(payload);
  } catch (error) {
    console.error(`Failed to fetch item ${itemId}:`, error);
    return null;
  }
}

export async function getItemsPaginatedServer(params?: ListParams): Promise<{ items: Product[], total: number, pages: number }> {
  try {
    const payload = await serverApiClient.get<any>(apiEndpoints.items.list, { query: params });
    const items = adaptItemListResponse(payload);
    return {
      items,
      total: payload.total || items.length,
      pages: payload.pages || 1
    };
  } catch (error) {
    console.error("Failed to fetch paginated items:", error);
    return { items: [], total: 0, pages: 1 };
  }
}
