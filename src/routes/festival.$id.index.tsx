import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Star, Clock, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { festivalStrings, type FestivalCategory } from "@/lib/festival-i18n";
import {
  FESTIVALS,
  findFestival,
  filterFestivalRecipes,
  recipesForFestival,
  isFestivalActive,
} from "@/lib/festivals";

export const Route = createFileRoute("/festival/$id/")({
  head: ({ params }) => {
    const f = findFestival(params.id);
    const name = f ? f.i18n.en.name : "Festival";
    const title = `${name} Festival Hub — Adukkala`;
    const description = f
      ? f.i18n.en.about
      : "Explore traditional Kerala festival recipes in Malayalam, Hindi and English.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FestivalHub,
});

function FestivalHub() {
  const { id } = Route.useParams();
  const { lang, t } = useI18n();
  const s = festivalStrings[lang];
  const festival = findFestival(id);
  const [cat, setCat] = useState<FestivalCategory>("all");
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => (festival ? filterFestivalRecipes(festival.id, cat, query, lang) : []),
    [festival, cat, query, lang],
  );

  if (!festival) {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
        <div>
          <p className="text-sm text-muted-foreground">{s.noResults}</p>
          <Link to="/home" className="mt-3 inline-block text-sm font-bold text-primary">
            {s.back}
          </Link>
        </div>
      </div>
    );
  }

  const f = festival.i18n[lang];
  const chips: FestivalCategory[] = ["all", ...festival.categories];
  const total = recipesForFestival(festival.id).length;

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="mx-auto max-w-md">
        <header className="relative h-56 overflow-hidden">
          <img
            src={festival.image}
            alt={f.name}
            width={1200}
            height={700}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${festival.gradient} opacity-70`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

          <div className="relative flex items-center justify-between px-5 pt-4">
            <Link
              to="/home"
              className="grid h-10 w-10 place-items-center rounded-2xl bg-white/25 text-white backdrop-blur"
              aria-label={s.back}
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            {isFestivalActive(festival) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur"> {s.bannerBadgeActive}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-5 right-5">
            <h1 className={`${t.fontClass} text-2xl font-black leading-tight text-white drop-shadow`}>
              {f.name}
            </h1>
            <p className={`${t.fontClass} text-xs font-medium text-white/90`}>{f.tagline}</p>
            <p className="mt-1 text-[11px] text-white/80">{s.recipesCount(total)}</p>
          </div>
        </header>

        <div className="px-5">
          <p className={`${t.fontClass} mt-4 text-xs leading-relaxed text-muted-foreground`}>{f.about}</p>

          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 shadow-soft ring-1 ring-border">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={s.hubSearch}
              className={`${t.fontClass} min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70`}
            />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`${t.fontClass} shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  cat === c ? "text-white shadow-soft" : "bg-secondary text-foreground"
                }`}
                style={cat === c ? { backgroundColor: festival.accent } : undefined}
              >
                {s.categories[c]}
              </button>
            ))}
          </div>

          {results.length === 0 ? (
            <p className={`${t.fontClass} mt-10 text-center text-sm text-muted-foreground`}>{s.noResults}</p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {results.map((r) => (
                <Link
                  key={r.id}
                  to="/festival/$id/$recipe"
                  params={{ id: festival.id, recipe: r.id }}
                  className="overflow-hidden rounded-2xl bg-card shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={r.image}
                      alt={r.i18n[lang].name}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                    <span
                      className={`${t.fontClass} absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white`}
                      style={{ backgroundColor: festival.accent }}
                    >
                      {s.categories[r.category]}
                    </span>
                    {r.veg && (
                      <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-white/90">
                        <Leaf className="h-3.5 w-3.5 text-primary" />
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>
                      {r.i18n[lang].name}
                    </h3>
                    <p className={`${t.fontClass} truncate text-[11px] text-muted-foreground`}>
                      {r.i18n[lang].sub}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-semibold text-warm-foreground">
                        <Star className="h-3 w-3 fill-warm-foreground" /> {r.rating}
                      </span>
                      <span className="text-border">•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" /> {r.time}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <section className="mt-8">
            <h2 className={`${t.fontClass} mb-3 text-sm font-black text-foreground`}>{s.otherFestivals}</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FESTIVALS.filter((x) => x.id !== festival.id).map((x) => (
                <Link
                  key={x.id}
                  to="/festival/$id"
                  params={{ id: x.id }}
                  className="relative h-24 w-40 shrink-0 overflow-hidden rounded-2xl shadow-soft"
                >
                  <img
                    src={x.image}
                    alt={x.i18n[lang].name}
                    loading="lazy"
                    width={400}
                    height={240}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className={`${t.fontClass} absolute bottom-2 left-3 text-sm font-black text-white`}>
                    {x.i18n[lang].name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
