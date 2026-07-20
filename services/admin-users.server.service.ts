import { serverApiClient } from "@/lib/api/server-client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function getAdminUsersServer(page = 1, limit = 20) {
  try {
    return await serverApiClient.get<any>(apiEndpoints.adminUsers.list, { query: { page, limit } });
  } catch (error) {
    console.error("Failed to fetch admin users:", error);
    return null;
  }
}

export async function getAdminUserServer(userId: string) {
  try {
    return await serverApiClient.get<any>(apiEndpoints.adminUsers.byId(userId));
  } catch (error) {
    console.error(`Failed to fetch admin user ${userId}:`, error);
    return null;
  }
}
