import menuJson from "./menuData.json";

export interface MenuItem {
  name: string;
  image: string;
  description?: string;
  price?: number;
  tags?: string[];
}

export interface MenuCategory {
  name: string;
  slug: string;
  items: MenuItem[];
}

// Real menu data scraped from caffeino.ae
export const menuCategories: MenuCategory[] = Object.entries(menuJson).map(
  ([name, items]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "_").replace(/&/g, "and"),
    items: items as MenuItem[],
  })
);

export const allMenuItems: MenuItem[] = menuCategories.flatMap((c) => c.items);

// Featured items for home page
export const featuredItems = [
  menuCategories[0]?.items[2], // Caffeino Signature Bagel
  menuCategories[1]?.items[3], // Acai Bowl
  menuCategories[2]?.items[5], // Carrot Cake
  menuCategories[3]?.items[0], // Chocolate Fudge Cake
].filter(Boolean);

// Merchandise data
export interface MerchItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  inStock: boolean;
}

export const merchItems: MerchItem[] = [
  {
    id: "mug-01",
    name: "Caffeino Ceramic Mug",
    price: 45,
    description: "Premium ceramic mug with the iconic Caffeino logo. Perfect for your morning brew.",
    inStock: true,
  },
  {
    id: "tumbler-01",
    name: "Caffeino Glass Tumbler",
    price: 60,
    description: "Double-walled glass tumbler keeps your coffee hot and your hands cool.",
    inStock: true,
  },
  {
    id: "beans-01",
    name: "House Coffee Beans 250g",
    price: 70,
    description: "Single-origin Ethiopian beans, medium roast. Notes of citrus and chocolate.",
    inStock: true,
  },
  {
    id: "tote-01",
    name: "Caffeino Canvas Tote",
    price: 55,
    description: "Sturdy canvas tote bag for your daily coffee run.",
    inStock: false,
  },
  {
    id: "giftcard-01",
    name: "Caffeino Gift Card",
    price: 100,
    description: "The perfect gift for coffee lovers. Redeemable at all branches.",
    inStock: true,
  },
];
