import type { Product } from "@/types";

export function adaptItemResponse(payload: unknown): Product {
  // TODO(api-contract): Map the confirmed backend item response to Product.
  return payload as Product;
}

export function adaptItemListResponse(payload: unknown): Product[] {
  // TODO(api-contract): Normalize confirmed pagination metadata separately.
  return Array.isArray(payload) ? payload.map(adaptItemResponse) : [];
}
