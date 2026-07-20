import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function searchBrands(query: string): Promise<{id: number, name: string}[]> {
  try {
    return await apiClient.get(apiEndpoints.brands.search, { query: { query } });
  } catch (error) {
    console.error("Failed to search brands:", error);
    return [];
  }
}
