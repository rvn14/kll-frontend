import { serverApiClient } from "@/lib/api/server-client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function getMyOrdersServer(page = 1, limit = 20) {
  try {
    return await serverApiClient.get<any>(apiEndpoints.orders.list, { query: { page, limit } });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return null;
  }
}

export async function getMyOrderServer(orderId: string) {
  try {
    return await serverApiClient.get<any>(apiEndpoints.orders.byId(orderId));
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
}

export async function getMyOrderBillServer(orderId: string) {
  try {
    return await serverApiClient.get<any>(apiEndpoints.orders.bill(orderId));
  } catch (error) {
    console.error(`Failed to fetch bill ${orderId}:`, error);
    return null;
  }
}
