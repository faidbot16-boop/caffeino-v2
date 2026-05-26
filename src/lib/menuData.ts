import menuDataJson from "./menuData.json";

export interface MenuItem {
  name: string;
  image?: string;
  description?: string;
  price: number;
  tags?: string[];
}

export interface MenuCategory {
  name: string;
  slug: string;
  items: MenuItem[];
}

const img = (name: string) => `/images/menu/${name.toLowerCase().replace(/^_|_$/g, "").replace(/\s+/g, "_")}.jpg`;
const imgj = (name: string) => `/images/menu/${name.toLowerCase().replace(/^_|_$/g, "").replace(/\s+/g, "_")}.jpeg`;

// Helper: try both .jpg and .jpeg fallback
function i(name: string, ext: "jpg" | "jpeg" = "jpg"): string {
  if (ext === "jpg") return img(name);
  return imgj(name);
}

// Load old V2 images as fallback
const oldImgs: Record<string, string> = {};
for (const [, items] of Object.entries(menuDataJson)) {
  for (const item of items as { name: string; image?: string }[]) {
    if (item.image) oldImgs[item.name.toLowerCase().trim()] = item.image;
  }
}
function oldImg(name: string): string | undefined {
  const k = name.toLowerCase().trim();
  return oldImgs[k] || undefined;
}

export const menuCategories: MenuCategory[] = [
  {
    name: "Breakfast",
    slug: "breakfast",
    items: [
      { name: "Australian Folded Eggs", description: "Folded Eggs, Avocado smash, locally grown micro greens, served on round cruffine", price: 52, image: i("australian_folded_eggs") },
      { name: "Halloumi Breakfast Bowl", description: "Poached Egg, Avocado, kale chips, grilled halloumi, quinoa freekeh mix, Asparagus, chopped Almonds, smoked garlic hummus, rocket leaves with tahini lemon dressing & crispy zaatar Crackers", price: 60, image: i("halloumi_breakfast_bowl") },
      { name: "Eggs Benedict", description: "Crispy beef bacon, poached eggs, hollandaise sauce on multigrain English muffins with roasted tomatoes on the vine and micro greens", price: 50, image: i("eggs_benedict") },
      { name: "Bread Basket (Butter & Jam)", description: "A selection of freshly baked breads, croissants and Scones from our oven served with homemade butter & jam", price: 50, image: i("bread_basket_butter_jam") },
      { name: "Classic Brioche French Toast", description: "Served with Berry compote, vanilla custard, edible flowers with your choice of local honey", price: 50, image: i("classic_brioche_french_toast") },
      { name: "Acai Bowl With 3 Toppings", description: "Homemade light Acai with full antioxidants delicious pulp blended with tropical toppings, natural sweet taste with your choice of toppings", price: 50, image: i("acai_bowl_with_3_toppings") },
      { name: "Shakhshuka", description: "Poached Eggs in a delicately spiced tomato sauce featuring peppers, onions, goat cheese, coriander leaves, zaatar, and basil pesto served with toasted bread", price: 52, image: i("shakhshuka", "jpeg") },
      { name: "Oriental Egg", description: "Egg, Tomato, Onion, Bell pepper, Olives sauteed with Chef special spices served with Feta pickled onion and toast", price: 52, image: i("oriental_egg") },
      { name: "Caffeino Classic Breakfast", description: "Toasted Bread, Beetroot Hummus, Slice Avocado, Rocket Leaves, Pomegranate, Grilled Halloumi, Feta Cheese and Sunny side up with Sesame and chili flakes", price: 50, image: i("caffeino_classic_breakfast", "jpeg") },
      { name: "Chicken Pesto Ciabatta", description: "Freshly baked Ciabatta bread served with home made pesto sauce, grilled chicken and rocket leaves", price: 52, image: i("chicken_pesto_ciabatta", "jpeg") },
      { name: "Mushroom Benedict", description: "Toasted brioche bread served with sauteed spinach, poached egg, mushroom sauce garnished with chilli flakes and microgreens", price: 45, image: i("mushroom_benedict", "jpeg") },
      { name: "Egg Danish", description: "Freshly baked danish pastry served with smashed avocado, poached egg and mushroom sauce", price: 45, image: i("egg_danish", "jpeg") },
      { name: "Cream Bagel", description: "Plain Bagel with cheese Cream filling", price: 30, image: i("cream_bagel", "jpeg") },
      { name: "Zaatar Labneh Toastie", description: "Multigrain toasty with zaatar labneh and poached egg with pickled olives", price: 45, image: i("zaatar_labneh_toastie", "jpeg") },
    ],
  },
  {
    name: "Bagel Sandwiches",
    slug: "bagel_sandwich",
    items: [
      { name: "Caprese", description: "Fresh Mozzarella, tomato, basil pesto sauce with spicy pickled olives and lettuce", price: 50, image: i("caprese") || oldImg("Caprese") },
      { name: "Halloumi Bagel", description: "Grilled halloumi, Bell peppers and rocket leaves with a hint of Zaatar", price: 50, image: i("halloumi_bagel") || oldImg("Halloumi Bagel") },
      { name: "Beef & Brie", description: "Thin sliced beef fillet, caramelized onion, mushrooms, brie cheese, micro greens and salad", price: 60, image: i("beef_brie") || oldImg("Beef & Brie") },
      { name: "Caffeino Signature Bagel", description: "Grilled chicken breast, smashed avocado, tomato, caramelized onion, beef bacon and lettuce", price: 60, image: i("caffeino_signature_bagel") || oldImg("Caffeino Signature Bagel") },
      { name: "Egg and Avocado Bagel", description: "Avocado smash, Scrambled egg with onion, tomato and cheese with roasted cherry tomato, micro greens & chili flakes", price: 50, image: i("egg_and_avocado_bagel") || oldImg("Egg and Avocado Bagel") },
      { name: "Breakfast Bagel", description: "Egg, Cheese, Tomato, Avocado and Bacon served on your choice of bagel with Dill cream", price: 55, image: i("breakfast_bagel") || oldImg("Breakfast Bagel") },
      { name: "Cajun Chicken Bagel", description: "Cajun Chicken, Cheese, Tomato, Lettuce, Sriracha Mayo served on your choice of Bagel", price: 52, image: i("cajun_chicken_bagel") || oldImg("Cajun Chicken Bagel") },
      { name: "Cranberry Jeweled Turkey Melts", description: "Cranberry Sauce, Turkey and Cheddar Cheese Salad served on your choice of Bagel", price: 50, image: i("cranberry_jeweled_turkey_melts") || oldImg("Cranberry Jeweled Turkey Melts") },
    ],
  },
  {
    name: "Toasties",
    slug: "toasties",
    items: [
      { name: "Avocado & Egg", description: "Mashed Avocado with Micro green, feta cheese, mix seeds and chili flakes", price: 45, image: oldImg("Avocado & Egg (Pouched -Boiled - Fried)") || i("avocado_egg_poached_boiled_fried", "jpeg") },
      { name: "Caffeino PB Jam", description: "Toasted bread, peanut butter, granola & mixed fruit jam", price: 45, image: i("caffeino_pb_jam") || oldImg("Caffeino PB Jam") },
      { name: "Omelette", description: "Served on a multigrain toast with cherry tomatoes, pomegranate sauce, mix seeds and parsley", price: 45, image: i("omelette") || oldImg("Omelette") },
      { name: "Scrambled", description: "Served on a multigrain toast with cherry tomatoes, micro greens, mix seeds and chili flakes", price: 45, image: i("scrambled") || oldImg("Scrambled") },
    ],
  },
  {
    name: "Main Course",
    slug: "main_course",
    items: [
      { name: "Risotto", description: "Creamy Labneh Risotto with shaved parmesan, Parsely and Fried Onion", price: 55, image: i("risotto") || oldImg("Risotto") },
      { name: "Chicken Alfredo", description: "Pasta with chicken, spring onion cooked in a fresh creamy sauce, and parmesan cheese", price: 55, image: i("chicken_alfredo", "jpeg") },
      { name: "Arrabiata", description: "Pasta cooked in homemade tomato sauce, red chilli and parmesan cheese", price: 50, image: i("arrabiata", "jpeg") },
      { name: "Creamy Neapolitan", description: "Pasta, bell pepper, olives cooked in creamy pizza sauce topped with cheese", price: 50, image: i("creamy_nepolitan", "jpeg") },
    ],
  },
  {
    name: "Salads",
    slug: "salads",
    items: [
      { name: "Kale Salad", description: "Toasted Quinoa, dried cranberries, toasted almonds, grated parmesan cheese, green apple and fresh kale tossed in a creamy tahini lemon dressing", price: 55, image: i("kale_salad") || oldImg("Kale Salad") },
      { name: "Rustic Salad", description: "Roasted fingerling potatoes, sun dried tomato, toasted pecans, fresh mix leaves, shredded carrots, beetroots, crispy beef bacon and balsamic dressing", price: 60, image: i("rustic_salad") || oldImg("Rustic Salad") },
      { name: "Caffeino Super Salad", description: "Beetroot, sweet potato, rocket leaves, pomegranate, feta cheese, quinoa, mashed Avocado, Tahini dressing", price: 55, image: i("caffeino_super_salad", "jpeg") },
    ],
  },
  {
    name: "Croissants",
    slug: "croissants",
    items: [
      { name: "Butter Croissant", price: 13, image: i("butter_croissant_") || oldImg("Butter Croissant") },
      { name: "Chocolate Croissant", price: 16, image: i("chocolate_croissant_") || oldImg("Chocolate Croissant") },
      { name: "Cheese Croissant", price: 20, image: i("cheese_croissant") || oldImg("Cheese Croissant") },
      { name: "Almond Croissant", price: 20, image: i("almond_croissant") || oldImg("Almond Croissant") },
      { name: "Halloumi Croissant", price: 20, image: i("halloumi_croissant_") || oldImg("Halloumi Croissant") },
      { name: "Zaatar Croissant", price: 17, image: i("zaatar_croissant") || oldImg("Zaatar Croissant") },
      { name: "Zaatar and Mozzarella Croissant", price: 22, image: i("zaatar_and_mozzarella_croissant_") || oldImg("Zaatar and Mozzarella Croissant") },
    ],
  },
  {
    name: "Pastries",
    slug: "pastries",
    items: [
      { name: "Cookie", price: 12, image: i("cookie") || oldImg("Cookie") },
      { name: "Chocolate Chip Cookie (Filled)", price: 15, image: i("chocolate_chip_cookie_filled") },
      { name: "Raisin Cinnamon Swirls", price: 17, image: i("raisin_cinnamon_swirls_") || oldImg("Raisin Cinnamon Swirls") },
      { name: "Babka Cheese and Olive", price: 20, image: i("babka_cheese_and_olive_") || oldImg("Babka Cheese and Olive") },
      { name: "Danish Strawberry", price: 20, image: i("danish_strawberry_") || oldImg("Danish Strawberry") },
      { name: "English Scones", price: 20, image: i("english_scones", "jpeg") || oldImg("English Scones") },
      { name: "Babka Nutella", price: 22, image: i("babka_nutella_") || oldImg("Babka Nutella") },
      { name: "Babka Pistachio", price: 22, image: i("babka_pistachio") || oldImg("Babka Pistachio") },
      { name: "Babka Zaatar", price: 22, image: i("babka_zaatar") },
      { name: "Pecan Pie (3 pcs)", price: 33, image: i("pecan_pie_3_pcs") || oldImg("Pecan Pie") },
      { name: "Salted Dates Pecan (4 Pcs)", price: 42, image: i("salted_dates_pecan_4_pcs_", "jpeg") },
      { name: "Brownie with Ice Cream", price: 32, image: oldImg("Brownie") || i("brownie_with_ice_cream", "jpeg") },
      { name: "Dates Pudding", description: "Dates Pudding served with homemade ice cream", price: 35, image: i("dates_pudding", "jpeg") },
      { name: "Choux Pastry", description: "Choux pastry filled with homemade ice cream and glazed with caramel or chocolate sauce", price: 35, image: i("choux_pastry") },
      { name: "Granola Bowl", price: 45, image: i("granola_bowl", "jpeg") },
      { name: "Mix Berry Danish", price: 25, image: i("mix_berry_danish", "jpeg") },
      { name: "Mastika Coconut Ice Cream", price: 35, image: i("mastika_coconut_ice_cream", "jpeg") },
      { name: "Umm Ali", price: 40, image: i("umm_ali", "jpeg") },
    ],
  },
  {
    name: "Cakes",
    slug: "cakes",
    items: [
      { name: "Latte Cake Slice", price: 33, image: i("latte_cake_slice") },
      { name: "Carrot Cake Slice", price: 33, image: i("best_ever_carrot_cake_slice") || oldImg("Carrot Cake") },
      { name: "One and Only Chocolate Cake", price: 33, image: i("one_and_only_chocolate_cake_slice") || oldImg("One and Only Chocolate Cake") },
      { name: "Coconut Cake", price: 33, image: i("coconut_cake_slice") || oldImg("Coconut cake") },
      { name: "Strawberry Short Cake Slice", price: 33, image: i("strawberry_short_cake_slice") || oldImg("Strawberry  Cake") },
      { name: "Honey Cake", price: 35, image: i("honey_cake") || oldImg("Honey Cake") },
      { name: "Chocolate Fudge Cake", price: 35, image: i("chocolate_fudge_cake", "jpeg") || oldImg("Chocolate Fudge Cake") },
      { name: "Pistachio Rahash Cake", description: "Pistachio Pound cake served with rahash and Mistica sauce", price: 35, image: i("pistachio_rahash_cake", "jpeg") || oldImg("Pistachio Rahash Cake") },
      { name: "Burnt Cheese Cake", price: 35, image: i("burnt_cheese_cake", "jpeg") },
      { name: "Tiramisu", price: 35, image: i("tiramisu", "jpeg") },
      { name: "Pistachio Dream Cake with Berry", description: "Pistachio cake served with Mix berry", price: 40, image: i("pistachio_dream_cake_with_berry", "jpeg") || oldImg("Pistachio Cake") },
      { name: "Vanilla Brulee Toast", description: "French toast served with vanilla cream brulee", price: 40, image: i("vanilla_brulee_toast", "jpeg") },
      { name: "Choco Brulee Toast", description: "Chocolate toasty served with Coffee Creme Brule", price: 40, image: i("choco_brulee_toast", "jpeg") },
    ],
  },
  {
    name: "Caffeino Crepes",
    slug: "crepes",
    items: [
      { name: "Cinnamon Sugar Crepe", price: 28, image: i("cinnamon_sugar_crepe", "jpeg") },
      { name: "Cheese Crepe", price: 30, image: i("cheese_crepe", "jpeg") },
      { name: "Nutella Crepe", price: 32, image: i("nutella_crepe", "jpeg") },
      { name: "Pistachio Crepe", price: 38, image: i("pistachio_crepe", "jpeg") },
      { name: "Strawberry Chocolate Cup", price: 55, image: i("strawberry_chocolate_cup", "jpeg") },
      { name: "Craft your Crepe", price: 25 },
    ],
  },
  {
    name: "Winter Specials",
    slug: "winter_specials",
    items: [
      { name: "Fresh Lemon Honey Ginger Tea", price: 20, image: i("fresh_lemon_honey_ginger_tea", "jpeg") },
      { name: "Pumpkin Spice Latte", description: "Oatly milk, Pumpkin spice, whipped cream, cinnamon powder, espresso", price: 30, image: i("pumpkin_spice_latte_", "jpeg") },
      { name: "Pumpkin Spice Latte Cold", description: "Oatly milk, Pumpkin spice, whipped cream, cinnamon powder, espresso", price: 30, image: i("pumpkin_spice_latte_cold", "jpeg") },
      { name: "Aseeda", price: 35, image: i("aseeda", "jpeg") },
      { name: "Caramel'O", price: 35, image: i("caramel_o", "jpeg") },
      { name: "Banana Apple Tart", description: "A tart shell filled with smooth Banana sauce and topped with perfectly toasted Apple slices", price: 35, image: i("banana_apple_tart", "jpeg") },
      { name: "Tiramisu Latte", price: 35, image: i("tiramisu_latte_", "jpeg") },
      { name: "Tiramisu Latte Cold", price: 35, image: i("tiramisu_latte_cold", "jpeg") },
      { name: "Caramel Brulee Latte Cold", price: 35, image: i("caramel_brulee_latte_cold", "jpeg") },
      { name: "Caramel Brulee Latte", price: 35, image: i("caramel_brulee_latte", "jpeg") },
      { name: "Strawberry Vanilla Creamo", price: 35, image: i("strawberry_vanilla_creamo", "jpeg") },
      { name: "Chocoffeino", description: "Hot chocolate with spices, served with cream and marshmallow", price: 35, image: i("chocoffeino", "jpeg") },
      { name: "Sky Blue Refresher", description: "Mix of berries, blue curacao with fresh homemade coconut ice cream and Lemon juice", price: 35, image: i("sky_blue_refresher", "jpeg") },
      { name: "Lemon Grass Mojito", description: "Fresh lemon, Mint leaves, lemon grass served with crushed ice and 7up", price: 32, image: i("lemon_grass_mojito", "jpeg") },
      { name: "Hazelnut Delight", description: "A rich Hazelnut Cake, layered and fully covered in smooth chocolate", price: 37, image: i("hazelnut_delight", "jpeg") },
      { name: "Coconut Matcha", description: "Matcha with tender coconut water & coconut slices", price: 38, image: i("coconut_matcha", "jpeg") },
      { name: "Mango Punch", description: "Blend of orange juice, Ginger Syrup and fresh mango with mint", price: 35, image: i("mango_punch", "jpeg") },
      { name: "Coconut Creamy Mojito", description: "Coconut Milk blend with homemade coconut ice cream served with rosemary", price: 35, image: i("coconut_creamy_mojito", "jpeg") },
      { name: "Mangoffeino", price: 40, image: i("mangoffeino", "jpeg") },
    ],
  },
  {
    name: "Coffee",
    slug: "coffee",
    items: [
      { name: "Espresso Single", price: 18 },
      { name: "Espresso Double", price: 20 },
      { name: "Americano", price: 20 },
      { name: "Cortado", price: 20 },
      { name: "Piccolo", price: 18 },
      { name: "Macchiato Single", price: 19 },
      { name: "Macchiato Double", price: 22 },
      { name: "Cappuccino", price: 27 },
      { name: "Latte", price: 27 },
      { name: "Flat White", price: 28 },
      { name: "Mocha", price: 28 },
      { name: "Saffron Latte", price: 28 },
      { name: "Spanish Latte", price: 30 },
      { name: "Spanish Cortado Regular", price: 24 },
      { name: "Spanish Cortado Large", price: 28 },
      { name: "Spanish Piccolo Regular", price: 24 },
      { name: "Spanish Piccolo Large", price: 28 },
    ],
  },
  {
    name: "Hot Caffeino Signature",
    slug: "hot_signature",
    items: [
      { name: "Caffeino", price: 30, image: i("caffeino", "jpeg") },
      { name: "Rose Latte", price: 28 },
      { name: "Creamy Hot Spanish Latte", price: 35, image: i("creamy_hot_spanish_latte", "jpeg") },
      { name: "Salted Caramel Latte with Marshmallow", price: 30, image: i("salted_caramel_latte_with_marshmallow") },
      { name: "Hot Chocolate With Cream and Chocolate Stick", price: 30, image: i("hot_chocolate_with_cream_and_chocolate_stick") },
      { name: "Creamy Americano", price: 22, image: i("creamy_americano", "jpeg") },
      { name: "Chai Latte", price: 28, image: i("chai_latte", "jpeg") },
      { name: "Pistachio Latte", price: 30 },
    ],
  },
  {
    name: "Cold Caffeino Signature",
    slug: "cold_signature",
    items: [
      { name: "Iced Americano", price: 20, image: i("iced_americano", "jpeg") },
      { name: "Iced Latte", price: 27 },
      { name: "Vanilla Iced Latte", price: 35, image: i("vanilla_iced_latte", "jpeg") },
      { name: "Spanish Latte (Cold)", price: 30, image: i("spanish_latte", "jpeg") },
      { name: "Rose Latte (Cold)", price: 30 },
      { name: "Salted Caramel Latte (Cold)", price: 32 },
      { name: "Creamy Cold Spanish Latte", price: 35, image: i("creamy_cold_spanish_latte", "jpeg") },
    ],
  },
  {
    name: "Brew Bar Single Origin",
    slug: "brew_bar",
    items: [
      { name: "French Press", price: 35 },
      { name: "V60", price: 35 },
      { name: "Chemex", price: 35 },
      { name: "Syphon", price: 40 },
      { name: "Cold Drip", price: 40 },
    ],
  },
  {
    name: "Caffeino Specials",
    slug: "specials",
    items: [
      { name: "Fresh Lemon Mint", price: 26, image: i("fresh_lemon_mint") },
      { name: "Hibiscus Iced Tea", price: 25, image: i("hibiscus_iced_tea", "jpeg") },
      { name: "Blue Berry Mojito", price: 32, image: i("blue_berry_mojito", "jpeg") },
      { name: "Strawberry Mojito", price: 32, image: i("strawberry_mojito", "jpeg") },
      { name: "Passion Fruit Mojito", price: 38, image: i("passion_fruit_mojito", "jpeg") },
      { name: "Acai Smoothie", price: 42, image: i("acai_smoothie") },
      { name: "Red Bull Mojito", price: 42, image: i("red_bull_mojito", "jpeg") },
      { name: "Affogato", description: "Homemade ice cream served with Espresso and chocolate stick", price: 30, image: i("affogato") },
      { name: "Matcha Latte", price: 32, image: i("matcha_latte", "jpeg") },
      { name: "Hot Matcha Chocolate", price: 38, image: i("hot_matcha_chocolate", "jpeg") },
      { name: "Matcha Affogato", price: 38, image: i("matcha_affogato", "jpeg") },
      { name: "Iced Matcha", price: 35, image: i("iced_matcha", "jpeg") },
      { name: "Strawberry Matcha", price: 38, image: i("strawberry_matcha", "jpeg") },
      { name: "Saint Pear", price: 35, image: i("saint_pear", "jpeg") },
      { name: "Caramel Frappuccino", description: "Espresso, Vanilla Frappe, Caramel Syrup, and Fresh Milk", price: 38, image: i("caramel_frappuccino", "jpeg") },
      { name: "Oreo Frappuccino", description: "Espresso, Oreo Frappe, Vanilla Syrup and Fresh Milk", price: 38, image: i("oreo_frappuccino", "jpeg") },
    ],
  },
  {
    name: "Caffeino Shakes",
    slug: "shakes",
    items: [
      { name: "Vanilla Milkshake", price: 35 },
      { name: "Oreo Milkshake", price: 35 },
      { name: "Lotus Milkshake", price: 35, image: i("lotus_milk_shake", "jpeg") },
      { name: "Pistachio Milkshake", price: 38 },
    ],
  },
  {
    name: "Tea",
    slug: "tea",
    items: [
      { name: "Fresh Mint Tea", price: 17 },
      { name: "English Breakfast", price: 17 },
      { name: "Chamomile", price: 17 },
      { name: "Earl Grey", price: 17 },
      { name: "Peppermint", price: 17 },
      { name: "Japan Sencha", price: 17 },
      { name: "Wild Berry", price: 17 },
      { name: "Alpine Herbs", price: 17 },
    ],
  },
  {
    name: "Fresh Juice",
    slug: "fresh_juice",
    items: [
      { name: "Orange Juice", price: 22 },
      { name: "Apple Juice", price: 24 },
    ],
  },
  {
    name: "Soft Beverages",
    slug: "soft_beverages",
    items: [
      { name: "Still Water (250ml)", price: 7 },
      { name: "Still Water (750ml)", price: 17 },
      { name: "Sparkling Water (250ml)", price: 12 },
      { name: "Ginger Ale", price: 12 },
      { name: "Rose Lemonade", price: 16 },
      { name: "Curiosity Cola", price: 16 },
    ],
  },
];

export const allMenuItems: MenuItem[] = menuCategories.flatMap((c) => c.items);

export const featuredItems = [
  menuCategories[0]?.items[5],
  menuCategories[1]?.items[3],
  menuCategories[5]?.items[3],
  menuCategories[7]?.items[1],
].filter(Boolean) as MenuItem[];

export const categoryIcons: Record<string, string> = {
  "bagel_sandwich": "🥯",
  "brew_bar": "🫖",
  "breakfast": "🍳",
  "cakes": "🍰",
  "coffee": "☕",
  "cold_signature": "🧊",
  "crepes": "🥞",
  "croissants": "🥐",
  "fresh_juice": "🧃",
  "hot_signature": "☕",
  "main_course": "🍝",
  "pastries": "🧁",
  "salads": "🥗",
  "shakes": "🥤",
  "soft_beverages": "💧",
  "specials": "✨",
  "tea": "🍵",
  "toasties": "🥪",
  "winter_specials": "❄️",
};

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  inStock: boolean;
}

export const merchItems: MerchItem[] = [
  { id: "mug-01", name: "Caffeino Ceramic Mug", price: 45, description: "Premium ceramic mug with the iconic Caffeino logo.", inStock: true },
  { id: "tumbler-01", name: "Caffeino Glass Tumbler", price: 60, description: "Double-walled glass tumbler keeps your coffee hot.", inStock: true },
  { id: "tote-01", name: "Caffeino Canvas Tote", price: 55, description: "Sturdy canvas tote bag for your daily coffee run.", inStock: false },
  { id: "giftcard-01", name: "Caffeino Gift Card", price: 100, description: "The perfect gift for coffee lovers.", inStock: true },
];