import { serverApiClient } from "@/lib/api/server-client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function getTaxRateServer() {
  try {
    return await serverApiClient.get<any>(apiEndpoints.taxRate);
  } catch (error) {
    console.error("Failed to fetch tax rate:", error);
    return null;
  }
}
