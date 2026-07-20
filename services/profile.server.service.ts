import { serverApiClient } from "@/lib/api/server-client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function getProfileServer() {
  try {
    return await serverApiClient.get<any>(apiEndpoints.profile.root);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

export async function getAddressesServer() {
  try {
    return await serverApiClient.get<any>(apiEndpoints.profile.addresses);
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return null;
  }
}
