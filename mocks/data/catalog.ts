import type { Address, Category, Order, Product, UserSummary } from "@/types";

type StockSeed = {
  category: string;
  slug: string;
  description: string;
  visual: Product["visual"];
  items: Array<readonly [name: string, quantity: number | null, visual?: Product["visual"]]>;
};

// Hardcoded from STOCK SHOP.pdf. Repeated rows in the report are represented once.
// null means the source quantity was blank or invalid and must be confirmed.
const stockGroups: StockSeed[] = [
  {
    category: "Televisions & Audio", slug: "televisions-audio", visual: "tv",
    description: "Televisions, radios and speakers currently listed by the shop.",
    items: [
      ['32" Unic TV', 26], ['55" Google TV', 1], ['43" Google TV', 3], ['32" Google TV', 2],
      ["Radio – Unic", 13, "audio"], ["Speaker SIN-BT5-69", 2, "audio"], ["Speaker SIN-PSY-618", 3, "audio"],
    ],
  },
  {
    category: "Home & Kitchen Appliances", slug: "home-kitchen-appliances", visual: "kitchen",
    description: "Everyday small appliances and useful products for the home.",
    items: [
      ["Hand Mixer", 3], ["Pressure Cooker", 3], ["Pressure Cooker 5L", 5], ["Toaster – Singer", 3],
      ["Pop-up Toaster", 3], ["Blender", 3], ["Grinder – Sisil", 3], ["Grinder – Singer", 3],
      ["Coconut Scraper", 1], ["Kettle KA-PRISMA 17-31", 13], ["Wall Clock", 4, "clock"],
    ],
  },
  {
    category: "Rice Cookers", slug: "rice-cookers", visual: "kitchen",
    description: "Unic and Singer rice cookers in a range of household capacities.",
    items: [
      ["Rice Cooker 2.8L – Unic", 3], ["Rice Cooker 1.8L – Unic", 3], ["Rice Cooker 1.5L – Unic", 2],
      ["Rice Cooker 4.5L – Unic", 2], ["Rice Cooker 2.8L – Singer", 5], ["Rice Cooker 1.0L – Singer", 1],
    ],
  },
  {
    category: "Ovens & Microwaves", slug: "ovens-microwaves", visual: "kitchen",
    description: "Ovens and microwave models included in the current stock report.",
    items: [
      ["1kg Oven", 2], ["34L Oven", 3], ["1800W Oven", 2], ["Microwave SMW 823AY7", 1],
      ["Microwave SMW 929 AS3", 1], ["Microwave SMW720CGN", 1],
    ],
  },
  {
    category: "Refrigerators & Freezers", slug: "refrigerators-freezers", visual: "fridge",
    description: "Refrigerators, freezers and cold-storage equipment listed by the shop.",
    items: [
      ["IN P.R.C Freezer", 2], ["SL-157 GI Freezer", 2], ["SDF-336 GI Freezer", 1], ["SL-ECO 72-R1 Freezer", 2],
      ["Chest Freezer", 1], ["Glass Door SL-ECO-245-TG", 1], ["Samsung Refrigerator", 1],
      ["SL-ECO-245 Refrigerator", 1], ["SL-XLS 215 BC", 1], ["Eco-252 WR SV Refrigerator", 1],
      ["Ice Maker", 1, "kitchen"],
    ],
  },
  {
    category: "Fans", slug: "fans", visual: "fan",
    description: "Household and industrial fan stock.",
    items: [["Ceiling Fan", 3], ["Ceiling Fan – Industrial", 3], ["Pedestal Fan", 12]],
  },
  {
    category: "Shower Heaters", slug: "shower-heaters", visual: "heater",
    description: "Shower heater models in the reported inventory.",
    items: [["Singer Shower Heater", 4], ["Midea Shower Heater", 1]],
  },
  {
    category: "Washing & Industrial Machines", slug: "washing-industrial-machines", visual: "washer",
    description: "Washing machines and industrial sewing equipment.",
    items: [
      ["Samsung Washing Machine", 1], ["SWM-MAE 120 Automatic W/M", 1], ["SWM-SAR 6", 5],
      ["SWM-FAR 75 T-WR", 3], ["MC-15N1", 1], ["Zoje Machine", 1, "sewing"],
      ["Overlock Sewing Machine", 1, "sewing"],
    ],
  },
  {
    category: "Pumps & Motors", slug: "pumps-motors", visual: "pump",
    description: "Pumps, motors and supporting machinery included in the report.",
    items: [
      ["Compressor", 2], ["Singer Motor/Pump 0.5 HP", 5], ["Singer Motor/Pump 0.75 HP", 6],
      ["Singer Motor/Pump 1 HP", 3], ["Singer Motor/Pump 3 HP", 1], ["Singer Pressure Pump 0.5", 2],
      ["Singer Pressure Pump 0.75", 1],
    ],
  },
  {
    category: "Air Conditioning", slug: "air-conditioning", visual: "air",
    description: "Singer and Sisil indoor, outdoor and installation stock.",
    items: [
      ["Singer Inverter SAS 12 TCNR Indoor", 2], ["Singer Inverter SAS 18 TCNR Indoor", 1],
      ["Singer Inverter SAS 12 TCNR Outdoor", 3], ["Sisil Inverter SAS 18 TCNR Indoor", 2],
      ["Sisil Inverter SAS 18 TCNR Outdoor", 2], ["Non-Inverter SAS 12 TCNR Indoor", 3],
      ["Non-Inverter SAS 18 TCNR Indoor", 4], ["Non-Inverter SAS 12 TCNR Outdoor", 3],
      ["Non-Inverter SAS 18 TCNR Outdoor", 4], ["Singer AC Bracket", 3, "parts"],
    ],
  },
  {
    category: "Presser Feet & Attachments", slug: "presser-feet-attachments", visual: "sewing",
    description: "Presser feet and attachments for sewing-machine work.",
    items: [
      ["Presser Foot – Susei", 30], ["Presser Foot P952", 8], ["Presser Foot (pcs)", 14],
      ["Presser Foot 5518N", 9], ["Presser Foot T35", 12], ["Presser Foot T36", 4],
      ["Zig Zag Presser Foot", 31], ["Presser Foot P351", 2], ["Presser Foot P36N", 2],
      ["Rolled Hem Presser", 2], ["Buttonholer", 2],
    ],
  },
  {
    category: "Needles & Needle Parts", slug: "needles-needle-parts", visual: "sewing",
    description: "Needles and related sewing-machine components.",
    items: [["Needles", 570], ["Needle Bar Crank", 5], ["Needle Clamp", 5], ["Needle Bar Connecting Link", 5]],
  },
  {
    category: "Core Sewing Machine Parts", slug: "core-sewing-machine-parts", visual: "parts",
    description: "Bobbins, hooks, plates, gears and other core sewing-machine parts.",
    items: [
      ["Feed Dog (combined)", 44], ["Shuttle – Zoje", 7], ["Shuttle – Singer", 14], ["Shuttle Hook", 3],
      ["Hook (general)", 5], ["Bobbin Case", 12], ["Zig Zag Bobbins", 71], ["Zoje Bobbins", 70],
      ["Bobbin Winder", 5], ["Plate", 79], ["S.B. Machine Plate", 3], ["Thread Assembly", 15],
      ["Tension Assembly", 8], ["Presser Bar", 5], ["Bevel Gear", 16], ["Gear Wheel", null],
      ["Hinges", 6], ["Sewing Parts (general)", 16],
    ],
  },
  {
    category: "Belts", slug: "belts", visual: "parts",
    description: "Replacement belts listed for sewing-machine servicing.",
    items: [["M Belt", 6], ["T Belt", 15], ["Z.M.M Belt", 27], ["L Belts", 2]],
  },
  {
    category: "Tools", slug: "tools", visual: "tool",
    description: "Workshop and sewing tools in the shop inventory.",
    items: [["Scissors", 10], ["Thread Scissors", 11], ["Screwdriver", 13]],
  },
  {
    category: "Electrical & Motor Components", slug: "electrical-motor-components", visual: "parts",
    description: "Electrical and motor components for equipment servicing.",
    items: [
      ["Sewing Machine Motor & Controller", 2, "pump"], ["CBB61 Capacitor", 10],
      ["P.B Switch", 4], ["TAHE-LE Unit", 3],
    ],
  },
  {
    category: "Oils & Consumables", slug: "oils-consumables", visual: "oil",
    description: "Machine oils and consumables currently listed by the shop.",
    items: [["Singer Oil", 4], ["Zoje Oil", 9]],
  },
  {
    category: "Miscellaneous Parts", slug: "miscellaneous-parts", visual: "parts",
    description: "Additional parts and components recorded in the stock report.",
    items: [
      ["Radar", 22], ["CREAT X", 4], ["Maxi", 5], ["Stainless Part", 5], ["Metal Rod", 5],
      ["M.S Guide", 4], ["W.P Component", 1], ["F.P with Tension Dial", 6], ["F.D.D Cam", 5],
    ],
  },
];

function stockLevel(quantity: number | null): Product["stock"] {
  if (quantity === null) return "stock-unknown";
  if (quantity === 0) return "out-of-stock";
  if (quantity <= 5) return "low-stock";
  return "in-stock";
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const categories: Category[] = stockGroups.map((group) => ({
  name: group.category,
  slug: group.slug,
  description: group.description,
  icon: group.visual,
}));

export const products: Product[] = stockGroups.flatMap((group, groupIndex) =>
  group.items.map(([name, quantity, visual], itemIndex) => {
    const id = `KLL-${group.slug.slice(0, 3).toUpperCase()}-${String(groupIndex + 1).padStart(2, "0")}${String(itemIndex + 1).padStart(2, "0")}`;
    return {
      id,
      slug: `${slugify(name)}-${id.toLowerCase()}`,
      name,
      category: group.category,
      categorySlug: group.slug,
      description: `${name} is listed in the current K & LL Traders shop inventory under ${group.category}. Contact the shop to confirm price and product details.`,
      price: null,
      stockQuantity: quantity,
      stock: stockLevel(quantity),
      warranty: "Warranty details to confirm",
      visual: visual ?? group.visual,
      specifications: [
        { label: "Category", value: group.category },
        { label: "Reported stock", value: quantity === null ? "Confirm with shop" : `${quantity} unit${quantity === 1 ? "" : "s"}` },
        { label: "Price", value: "Contact shop" },
        { label: "Source", value: "STOCK SHOP.pdf" },
      ],
    } satisfies Product;
  }),
);

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
