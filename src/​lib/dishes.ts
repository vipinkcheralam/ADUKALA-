import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/lib/i18n";

import meenCurry from "@/assets/meen-curry.jpg";
import appam from "@/assets/appam.jpg";
import thoran from "@/assets/thoran.jpg";
import puttu from "@/assets/puttu.jpg";
import biryani from "@/assets/biryani.jpg";
import dosa from "@/assets/dosa.jpg";
import sambar from "@/assets/sambar.jpg";
import payasam from "@/assets/payasam.jpg";

export const DISH_IMAGES: Record<string, string> = {
  "meen-curry": meenCurry,
  appam,
  thoran,
  puttu,
  biryani,
  dosa,
  sambar,
  payasam,
};

export type DishRow = {
  slug: string;
  image_key: string;
  time_label: string;
  rating: number;
  tag_kind: string;
  name_ml: string; name_en: string; name_hi: string;
  sub_ml: string; sub_en: string; sub_hi: string;
  tag_ml: string; tag_en: string; tag_hi: string;
  sort_order: number;
};

export type Dish = {
  slug: string;
  image: string;
  time: string;
  rating: number;
  tagKind: string;
  name: string;
  sub: string;
  tag: string;
};

export function localizeDish(row: DishRow, lang: Lang): Dish {
  return {
    slug: row.slug,
    image: DISH_IMAGES[row.image_key] ?? meenCurry,
    time: row.time_label,
    rating: Number(row.rating),
    tagKind: row.tag_kind,
    name: row[`name_${lang}` as const],
    sub: row[`sub_${lang}` as const],
    tag: row[`tag_${lang}` as const],
  };
}

export async function fetchDishes(): Promise<DishRow[]> {
  const { data, error } = await supabase
    .from("dishes")
    .select(
      "slug, image_key, time_label, rating, tag_kind, name_ml, name_en, name_hi, sub_ml, sub_en, sub_hi, tag_ml, tag_en, tag_hi, sort_order",
    )
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as DishRow[];
}

/** Days since epoch — changes at local midnight so the picks rotate daily. */
export function dayIndex(now = new Date()): number {
  const local = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor(local.getTime() / 86_400_000);
}

/** Small deterministic PRNG so a given day always yields the same order. */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = items.slice();
  let s = (seed * 9301 + 49297) % 233280 || 1;
  const next = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Deterministic daily rotation: the same dishes all day, a fresh set tomorrow.
 * Yesterday's picks are pushed to the back so nothing repeats on consecutive
 * days while there are enough dishes to fill the slot.
 */
export function dailySpecials(rows: DishRow[], count = 4, day = dayIndex()): DishRow[] {
  if (rows.length === 0) return [];
  const take = Math.min(count, rows.length);
  const yesterday = new Set(seededShuffle(rows, day - 1).slice(0, take).map((r) => r.slug));
  const today = seededShuffle(rows, day);
  const fresh = today.filter((r) => !yesterday.has(r.slug));
  const repeats = today.filter((r) => yesterday.has(r.slug));
  return [...fresh, ...repeats].slice(0, take);
}

const DEVICE_KEY = "adukkala_device_id";

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = (crypto.randomUUID?.() ?? `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(/-/g, "");
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export async function fetchFavorites(deviceId: string): Promise<string[]> {
  if (!deviceId) return [];
  const { data, error } = await supabase
    .from("favorites")
    .select("dish_slug")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => r.dish_slug as string);
}

export async function toggleFavorite(deviceId: string, slug: string, isFav: boolean) {
  if (!deviceId) return;
  if (isFav) {
    const { error } = await supabase.from("favorites").delete().eq("device_id", deviceId).eq("dish_slug", slug);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("favorites").insert({ device_id: deviceId, dish_slug: slug });
    if (error && error.code !== "23505") throw error;
  }
}
