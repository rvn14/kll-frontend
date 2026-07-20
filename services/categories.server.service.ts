import { serverApiClient } from "@/lib/api/server-client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { Category } from "@/types";

export async function getCategoriesServer(): Promise<Category[]> {
  try {
    const payload = await serverApiClient.get<any[]>(apiEndpoints.categories.list);
    return payload.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: c.description || "",
      icon: "package", // default icon
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
