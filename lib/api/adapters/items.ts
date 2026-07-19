import type { Product } from "@/types";

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function adaptItemResponse(payload: any): Product {
  // Map backend ItemResponse to frontend Product type
  const firstImage = payload.images && payload.images.length > 0 ? payload.images[0].image_url : null;
  
  // Default to a visual category icon if no image
  const visual = firstImage ? firstImage : (payload.category?.name ? slugify(payload.category.name) : "package");

  // Determine stock level based on quantity
  let stockLevel: "in-stock" | "low-stock" | "out-of-stock" | "stock-unknown" = "stock-unknown";
  if (payload.stock_quantity === null || payload.stock_quantity === undefined) {
    stockLevel = "stock-unknown";
  } else if (payload.stock_quantity <= 0) {
    stockLevel = "out-of-stock";
  } else if (payload.stock_quantity < 5) {
    stockLevel = "low-stock";
  } else {
    stockLevel = "in-stock";
  }

  // Handle specifications parsing. Backend might return a string or dict, depending on schema.
  // Assuming it returns a dict of { "Color": "Black", "Size": "Large" } or a JSON string.
  let specifications: { label: string; value: string }[] = [];
  if (payload.specifications) {
    try {
      const specsObj = typeof payload.specifications === "string" 
        ? JSON.parse(payload.specifications) 
        : payload.specifications;
      
      specifications = Object.entries(specsObj).map(([key, value]) => ({
        label: key,
        value: String(value)
      }));
    } catch (e) {
      console.warn("Could not parse specifications for item", payload.id);
    }
  }

  return {
    id: String(payload.id),
    slug: slugify(payload.name),
    name: payload.name,
    category: payload.category?.name || "Uncategorized",
    categorySlug: payload.category?.name ? slugify(payload.category.name) : "uncategorized",
    description: payload.description || "",
    price: payload.discount_price ?? payload.price ?? null,
    originalPrice: payload.discount_price ? payload.price : null,
    stockQuantity: payload.stock_quantity ?? null,
    stock: stockLevel,
    warranty: payload.warranty_details || "Standard Warranty",
    badge: payload.discount_price ? "Offer" : undefined,
    visual: visual,
    specifications: specifications,
  };
}

export function adaptItemListResponse(payload: unknown): Product[] {
  // Handle both direct array and paginated response { items: [...] }
  const items = Array.isArray(payload) ? payload : (payload as { items?: unknown[] })?.items;
  return Array.isArray(items) ? items.map(adaptItemResponse) : [];
}
