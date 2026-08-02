import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star, Clock, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { festivalStrings } from "@/lib/festival-i18n";
import { findFestival, findFestivalRecipe } from "@/lib/festivals";

export const Route = createFileRoute("/festival/$id/$recipe")({
  head: ({ params }) => {
    const r = findFestivalRecipe(params.id, params.recipe);
    const title = r ? `${r.i18n.en.name} — Festival Recipe | Adukkala` : "Festival Recipe | Adukkala";
    const description = r
      ? `${r.i18n.en.sub}. Ingredients and step-by-step method in Malayalam, Hindi and English.`
      : "Traditional Kerala festival recipe with ingredients and steps.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FestivalRecipePage,
});

function FestivalRecipePage() {
  const { id, recipe } = Route.useParams();
  const { lang, t } = useI18n();
  const s = festivalStrings[lang];
  const festival = findFestival(id);
  const r = findFestivalRecipe(id, recipe);

  if (!festival || !r) {
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

  const d = r.i18n[lang];

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-md">
        <div className="relative h-60 overflow-hidden">
          <img
            src={r.image}
            alt={d.name}
            width={1200}
            height={700}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />
          <Link
            to="/festival/$id"
            params={{ id: festival.id }}
            className="absolute left-5 top-4 grid h-10 w-10 place-items-center rounded-2xl bg-white/25 text-white backdrop-blur"
            aria-label={s.back}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="absolute bottom-4 left-5 right-5">
            <span
              className={`${t.fontClass} rounded-full px-2.5 py-1 text-[10px] font-bold text-white`}
              style={{ backgroundColor: festival.accent }}
            >
              {festival.i18n[lang].name} · {s.categories[r.category]}
            </span>
            <h1 className={`${t.fontClass} mt-2 text-2xl font-black leading-tight text-white`}>{d.name}</h1>
            <p className={`${t.fontClass} text-xs text-white/90`}>{d.sub}</p>
          </div>
        </div>

        <div className="px-5">
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-warm-foreground">
              <Star className="h-3.5 w-3.5 fill-warm-foreground" /> {r.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {r.time}
            </span>
            {r.veg && (
              <span className="flex items-center gap-1 text-primary">
                <Leaf className="h-3.5 w-3.5" /> {lang === "ml" ? "വെജ്" : lang === "hi" ? "शाकाहारी" : "Veg"}
              </span>
            )}
          </div>

          <section className="mt-5 rounded-2xl bg-card p-4 shadow-soft">
            <h2 className={`${t.fontClass} text-sm font-black text-foreground`}>{s.ingredients}</h2>
            <ul className="mt-2 grid gap-2">
              {d.ingredients.map((ing, i) => (
                <li key={i} className={`${t.fontClass} flex gap-2 text-sm text-muted-foreground`}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: festival.accent }} />
                  {ing}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4 rounded-2xl bg-card p-4 shadow-soft">
            <h2 className={`${t.fontClass} text-sm font-black text-foreground`}>{s.steps}</h2>
            <ol className="mt-2 grid gap-3">
              {d.steps.map((step, i) => (
                <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                  <span
                    className="grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: festival.accent }}
                  >
                    {i + 1}
                  </span>
                  <p className={`${t.fontClass} text-sm leading-relaxed text-muted-foreground`}>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
