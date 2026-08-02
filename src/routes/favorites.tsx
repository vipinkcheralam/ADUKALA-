import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ArrowLeft, Clock, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchDishes, fetchFavorites, getDeviceId, localizeDish, toggleFavorite } from "@/lib/dishes";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "ഫേവറിറ്റ് — Saved Recipes | Adukkala" },
      { name: "description", content: "All the Kerala dishes you saved with a tap of the heart, in one place." },
      { property: "og:title", content: "Your saved recipes — Adukkala" },
      { property: "og:description", content: "Every dish you favorited, ready to cook." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritesScreen,
});

const COPY = {
  ml: { title: "ഫേവറിറ്റ്", sub: "നിങ്ങൾ സേവ് ചെയ്ത വിഭവങ്ങൾ", empty: "ഇതുവരെ ഫേവറിറ്റ് ഒന്നുമില്ല", emptySub: "ഹോമിലെ ഹൃദയ ചിഹ്നം അമർത്തി വിഭവങ്ങൾ സേവ് ചെയ്യൂ." },
  en: { title: "Favorites", sub: "Dishes you saved", empty: "No favorites yet", emptySub: "Tap the heart on any dish to save it here." },
  hi: { title: "पसंदीदा", sub: "आपके सहेजे व्यंजन", empty: "अभी कोई पसंदीदा नहीं", emptySub: "किसी भी व्यंजन पर दिल दबाकर सहेजें।" },
} as const;

function FavoritesScreen() {
  const { t, lang } = useI18n();
  const c = COPY[lang];
  const router = useRouter();
  const qc = useQueryClient();
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => setDeviceId(getDeviceId()), []);

  const dishesQ = useQuery({ queryKey: ["dishes"], queryFn: fetchDishes, staleTime: 5 * 60_000 });
  const favQ = useQuery({
    queryKey: ["favorites", deviceId],
    queryFn: () => fetchFavorites(deviceId),
    enabled: !!deviceId,
  });

  const mutation = useMutation({
    mutationFn: (slug: string) => toggleFavorite(deviceId, slug, true),
    onMutate: async (slug: string) => {
      await qc.cancelQueries({ queryKey: ["favorites", deviceId] });
      const prev = qc.getQueryData<string[]>(["favorites", deviceId]) ?? [];
      qc.setQueryData<string[]>(["favorites", deviceId], prev.filter((s) => s !== slug));
      return { prev };
    },
    onError: (_e, _slug, ctx) => qc.setQueryData(["favorites", deviceId], ctx?.prev ?? []),
    onSettled: () => qc.invalidateQueries({ queryKey: ["favorites", deviceId] }),
  });

  const favSlugs = favQ.data ?? [];
  const dishes = (dishesQ.data ?? []).filter((d) => favSlugs.includes(d.slug)).map((d) => localizeDish(d, lang));
  const loading = dishesQ.isLoading || favQ.isLoading || !deviceId;

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="mx-auto max-w-md px-5">
        <header className="sticky top-0 z-30 -mx-5 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label={t.recipe.back}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className={`${t.fontClass} truncate text-lg font-black text-foreground`}>{c.title}</h1>
            <p className="truncate text-[11px] text-muted-foreground">{c.sub}</p>
          </div>
        </header>

        {loading ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : dishes.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="grid h-16 w-16 place-items-center rounded-3xl bg-spice/10">
              <Heart className="h-7 w-7 text-spice" />
            </span>
            <p className={`${t.fontClass} mt-4 text-base font-bold text-foreground`}>{c.empty}</p>
            <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">{c.emptySub}</p>
            <Link
              to="/home"
              className={`${t.fontClass} mt-5 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft`}
            >
              {t.tabs.home}
            </Link>
          </div>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-3">
            {dishes.map((d) => (
              <article key={d.slug} className="relative overflow-hidden rounded-2xl bg-card shadow-soft">
                <Link to="/recipe/$slug" params={{ slug: d.slug }} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img src={d.image} alt={d.sub} loading="lazy" width={400} height={300} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h2 className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{d.name}</h2>
                    <p className="truncate text-[11px] text-muted-foreground">{d.sub}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-semibold text-warm-foreground">
                        <Star className="h-3 w-3 fill-warm-foreground" /> {d.rating}
                      </span>
                      <span className="text-border">•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" /> {d.time}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => mutation.mutate(d.slug)}
                  aria-label="Remove favorite"
                  className="absolute top-2 right-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 backdrop-blur active:scale-90"
                >
                  <Heart className="h-4 w-4 fill-spice text-spice" />
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
