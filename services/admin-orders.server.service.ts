import { serverApiClient } from "@/lib/api/server-client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function getAdminOrdersServer(page = 1, limit = 20) {
  try {
    return await serverApiClient.get<any>(apiEndpoints.adminOrders.list, { query: { page, limit } });
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    return null;
  }
}

export async function getAdminOrderServer(orderId: string) {
  try {
    return await serverApiClient.get<any>(apiEndpoints.adminOrders.byId(orderId));
  } catch (error) {
    console.error(`Failed to fetch admin order ${orderId}:`, error);
    return null;
  }
}
