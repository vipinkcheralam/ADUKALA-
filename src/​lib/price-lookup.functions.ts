import { createServerFn } from "@tanstack/react-start";

export type LivePrice = {
  barcode: string;
  name: string;
  brand: string;
  unit: string;
  image: string | null;
  emoji: string;
  price: number | null;
  mrp: number | null;
  currency: string;
  store: string;
  source: "live" | "catalogue" | "unknown";
};

/** Look up a scanned barcode against Open Food Facts + Open Prices (live data). */
export const lookupProductPrice = createServerFn({ method: "POST" })
  .inputValidator((input: { barcode: string }) => {
    const barcode = String(input?.barcode ?? "").replace(/\D/g, "");
    if (barcode.length < 6) throw new Error("INVALID_BARCODE");
    return { barcode };
  })
  .handler(async ({ data }): Promise<LivePrice> => {
    const { barcode } = data;
    const headers = { "User-Agent": "Adukkala/1.0 (kitchen app)" };

    const [offRes, priceRes] = await Promise.allSettled([
      fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,product_name_en,brands,quantity,image_front_small_url,categories_tags`,
        { headers },
      ),
      fetch(
        `https://prices.openfoodfacts.org/api/v1/prices?product_code=${barcode}&order_by=-date&size=10`,
        { headers },
      ),
    ]);

    let name = "";
    let brand = "";
    let unit = "";
    let image: string | null = null;
    let categories: string[] = [];

    if (offRes.status === "fulfilled" && offRes.value.ok) {
      const j = (await offRes.value.json()) as {
        product?: {
          product_name?: string;
          product_name_en?: string;
          brands?: string;
          quantity?: string;
          image_front_small_url?: string;
          categories_tags?: string[];
        };
      };
      const p = j.product;
      if (p) {
        name = p.product_name_en || p.product_name || "";
        brand = p.brands || "";
        unit = p.quantity || "";
        image = p.image_front_small_url || null;
        categories = Array.isArray(p.categories_tags) ? p.categories_tags : [];
      }
    }

    let price: number | null = null;
    let currency = "INR";
    let store = "";

    if (priceRes.status === "fulfilled" && priceRes.value.ok) {
      const j = (await priceRes.value.json()) as {
        items?: { price?: number; currency?: string; location?: { osm_name?: string } | null }[];
      };
      const items = (j.items ?? []).filter((i) => typeof i.price === "number");
      const inr = items.filter((i) => (i.currency ?? "INR") === "INR");
      const pick = (inr.length ? inr : items).slice(0, 5);
      if (pick.length) {
        const avg = pick.reduce((s, i) => s + (i.price ?? 0), 0) / pick.length;
        price = Math.round(avg * 100) / 100;
        currency = pick[0]?.currency ?? "INR";
        store = pick[0]?.location?.osm_name ?? "";
      }
    }

    return {
      barcode,
      name,
      brand,
      unit,
      image,
      emoji: emojiFor(categories, name),
      price,
      mrp: price != null ? Math.round(price * 1.1) : null,
      currency,
      store,
      source: name || price != null ? "live" : "unknown",
    };
  });

function emojiFor(tags: string[], name: string): string {
  const hay = `${tags.join(" ")} ${name}`.toLowerCase();
  const map: [string, string][] = [
    ["rice", "🌾"],
    ["oil", "🫒"],
    ["milk", "🥛"],
    ["coffee", "☕"],
    ["tea", "🍵"],
    ["chocolate", "🍫"],
    ["biscuit", "🍪"],
    ["cookie", "🍪"],
    ["bread", "🍞"],
    ["water", "💧"],
    ["juice", "🧃"],
    ["soda", "🥤"],
    ["snack", "🍿"],
    ["cheese", "🧀"],
    ["egg", "🥚"],
    ["fish", "🐟"],
    ["meat", "🍖"],
    ["sugar", "🍬"],
    ["salt", "🧂"],
    ["spice", "🌶️"],
    ["flour", "🫓"],
    ["fruit", "🍎"],
    ["vegetable", "🥦"],
    ["soap", "🧼"],
  ];
  for (const [k, e] of map) if (hay.includes(k)) return e;
  return "🛒";
}
