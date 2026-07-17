import type { Address, Category, Order, Product, UserSummary } from "@/types";

export const categories: Category[] = [
  { name: "Televisions", slug: "televisions", description: "Cinematic screens for every room", icon: "tv" },
  { name: "Refrigerators", slug: "refrigerators", description: "Freshness designed around daily life", icon: "fridge" },
  { name: "Washing machines", slug: "washing-machines", description: "Reliable care for every load", icon: "washer" },
  { name: "Air conditioners", slug: "air-conditioners", description: "Comfort with efficient cooling", icon: "air" },
  { name: "Kitchen appliances", slug: "kitchen-appliances", description: "Smart essentials for faster meals", icon: "kitchen" },
  { name: "Audio", slug: "audio", description: "Clear, room-filling sound", icon: "audio" },
];

export const products: Product[] = [
  {
    id: "KLL-TV-001", slug: "vision-pro-55-4k-smart-tv", name: "VisionPro 55\" 4K Smart Television",
    category: "Televisions", categorySlug: "televisions", description: "A vivid 4K display with a streamlined smart TV experience for movies, sport and everyday viewing.",
    price: 149990, originalPrice: 169990, stock: "in-stock", warranty: "2 year warranty", badge: "Best seller", visual: "tv",
    specifications: [{ label: "Display", value: "55-inch 4K UHD" }, { label: "Connectivity", value: "Wi-Fi, HDMI, USB" }, { label: "Audio", value: "Dolby Audio" }, { label: "Energy rating", value: "4 star" }],
  },
  {
    id: "KLL-RF-102", slug: "frostline-340l-inverter-refrigerator", name: "FrostLine 340L Inverter Refrigerator",
    category: "Refrigerators", categorySlug: "refrigerators", description: "Quiet inverter cooling and flexible storage that keeps family groceries organized and fresh.",
    price: 189990, originalPrice: 205000, stock: "low-stock", warranty: "10 year compressor warranty", badge: "Offer", visual: "fridge",
    specifications: [{ label: "Capacity", value: "340 litres" }, { label: "Cooling", value: "No frost inverter" }, { label: "Finish", value: "Steel blue" }, { label: "Shelves", value: "Toughened glass" }],
  },
  {
    id: "KLL-WM-214", slug: "purewash-8kg-front-load-washer", name: "PureWash 8kg Front Load Washer",
    category: "Washing machines", categorySlug: "washing-machines", description: "An efficient front loader with thoughtful wash programs and a gentle, quiet drum.",
    price: 129500, stock: "in-stock", warranty: "2 year warranty", badge: "New", visual: "washer",
    specifications: [{ label: "Capacity", value: "8 kg" }, { label: "Motor", value: "Inverter direct drive" }, { label: "Programs", value: "14 wash modes" }, { label: "Spin speed", value: "1200 RPM" }],
  },
  {
    id: "KLL-AC-318", slug: "breezeflow-12000-btu-inverter-ac", name: "BreezeFlow 12,000 BTU Inverter AC",
    category: "Air conditioners", categorySlug: "air-conditioners", description: "Fast, efficient room cooling with sleep mode and low-noise operation.",
    price: 164990, stock: "in-stock", warranty: "5 year compressor warranty", visual: "air",
    specifications: [{ label: "Capacity", value: "12,000 BTU" }, { label: "Technology", value: "DC inverter" }, { label: "Modes", value: "Cool, dry, fan, sleep" }, { label: "Filter", value: "Washable dust filter" }],
  },
  {
    id: "KLL-KT-404", slug: "quickchef-25l-digital-microwave", name: "QuickChef 25L Digital Microwave",
    category: "Kitchen appliances", categorySlug: "kitchen-appliances", description: "Everyday cooking made simpler with intuitive controls and useful presets.",
    price: 44990, originalPrice: 49990, stock: "in-stock", warranty: "1 year warranty", badge: "Offer", visual: "kitchen",
    specifications: [{ label: "Capacity", value: "25 litres" }, { label: "Power", value: "900 W" }, { label: "Controls", value: "Digital touch" }, { label: "Presets", value: "8 auto menus" }],
  },
  {
    id: "KLL-AU-510", slug: "soundarc-wireless-soundbar", name: "SoundArc Wireless Soundbar",
    category: "Audio", categorySlug: "audio", description: "A compact soundbar that brings clearer dialogue and fuller sound to your television.",
    price: 32990, stock: "low-stock", warranty: "1 year warranty", visual: "audio",
    specifications: [{ label: "Output", value: "120 W" }, { label: "Connectivity", value: "Bluetooth, HDMI ARC" }, { label: "Channels", value: "2.1 channel" }, { label: "Mounting", value: "Wall mount ready" }],
  },
  {
    id: "KLL-PH-612", slug: "nova-x5-5g-smartphone", name: "Nova X5 5G Smartphone 256GB",
    category: "Mobile", categorySlug: "mobile", description: "A polished everyday phone with a bright display, dependable battery and generous storage.",
    price: 89990, stock: "in-stock", warranty: "1 year warranty", badge: "New", visual: "phone",
    specifications: [{ label: "Storage", value: "256 GB" }, { label: "Memory", value: "8 GB RAM" }, { label: "Display", value: "6.6-inch AMOLED" }, { label: "Network", value: "5G dual SIM" }],
  },
  {
    id: "KLL-FN-710", slug: "aircircle-pedestal-fan", name: "AirCircle 16\" Pedestal Fan",
    category: "Home appliances", categorySlug: "home-appliances", description: "Quiet air movement with simple controls and adjustable height.",
    price: 15990, stock: "in-stock", warranty: "1 year warranty", visual: "fan",
    specifications: [{ label: "Blade size", value: "16 inch" }, { label: "Speeds", value: "3" }, { label: "Timer", value: "Up to 2 hours" }, { label: "Oscillation", value: "Wide-angle" }],
  },
];

export const mockOrders: Order[] = [
  { id: "KLL-2026-1048", date: "12 July 2026", status: "shipped", itemCount: 2, total: 194980, paymentMethod: "Card on delivery" },
  { id: "KLL-2026-0872", date: "28 June 2026", status: "delivered", itemCount: 1, total: 149990, paymentMethod: "Bank transfer" },
  { id: "KLL-2026-0615", date: "03 May 2026", status: "processing", itemCount: 1, total: 32990, paymentMethod: "Cash on delivery" },
];

export const mockAddresses: Address[] = [
  { id: "address-1", label: "Home", recipient: "Ayesha Perera", summary: "42 Lake Road, Colombo 05", phone: "+94 77 123 4567", isDefault: true },
  { id: "address-2", label: "Office", recipient: "Ayesha Perera", summary: "Union Place, Colombo 02", phone: "+94 77 123 4567" },
];

export const mockUsers: UserSummary[] = [
  { id: "user-1", name: "Ayesha Perera", email: "ayesha@example.com", role: "customer", active: true, createdAt: "12 Jul 2026" },
  { id: "user-2", name: "Nimal Silva", email: "nimal@example.com", role: "customer", active: true, createdAt: "09 Jul 2026" },
  { id: "user-3", name: "Kasun Fernando", email: "kasun@klltraders.lk", role: "admin", active: true, createdAt: "22 Jun 2026" },
  { id: "user-4", name: "Fathima Rizvi", email: "fathima@example.com", role: "customer", active: false, createdAt: "11 May 2026" },
];

export function getProduct(itemId: string): Product | undefined {
  return products.find((product) => product.id === itemId || product.slug === itemId);
}
