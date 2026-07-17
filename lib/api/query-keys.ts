export const queryKeys = {
  items: (filters?: Record<string, unknown>) => ["items", filters] as const,
  item: (itemId: string) => ["items", itemId] as const,
  cart: ["cart"] as const,
  profile: ["profile"] as const,
  addresses: ["profile", "addresses"] as const,
  orders: ["orders"] as const,
  order: (orderId: string) => ["orders", orderId] as const,
  adminUsers: ["admin", "users"] as const,
  adminOrders: ["admin", "orders"] as const,
  taxRate: ["admin", "settings", "tax-rate"] as const,
};
