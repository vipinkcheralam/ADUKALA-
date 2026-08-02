import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Gauge, Star, ChefHat, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { findRecipe, type Difficulty } from "@/lib/recipes";
import { generateAiRecipe, type AiRecipe } from "@/lib/ai-recipe.functions";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import chefRobot from "@/assets/chef-robot.png";

export const Route = createFileRoute("/recipe/$slug")({
  validateSearch: (search: Record<string, unknown>): { q?: string } =>
    typeof search.q === "string" ? { q: search.q } : {},
  head: () => ({
    meta: [
      { title: "Recipe — അടുക്കള Adukkala" },
      { name: "description", content: "Step-by-step cooking instructions, ingredients and timing for your dish." },
      { property: "og:title", content: "Recipe — Adukkala" },
      { property: "og:description", content: "Step-by-step cooking instructions, ingredients and timing." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecipeScreen,
});

function RecipeScreen() {
  const { slug } = Route.useParams();
  const { q } = Route.useSearch();
  const { t, lang } = useI18n();
  const router = useRouter();

  const local = findRecipe(slug);
  const [ai, setAi] = useState<AiRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (local || !q) return;
    let cancelled = false;
    setLoading(true);
    setError(false);
    generateAiRecipe({ data: { query: q, lang } })
      .then((r) => { if (!cancelled) setAi(r); })
      .catch(() => { if (!cancelled) setError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [local, q, lang]);

  const diffLabel = (d: Difficulty) => (d === "easy" ? t.recipe.easy : d === "hard" ? t.recipe.hard : t.recipe.medium);

  const view = local
    ? {
        name: local.i18n[lang].name,
        sub: local.i18n[lang].sub,
        time: local.time,
        difficulty: local.difficulty as Difficulty,
        ingredients: local.i18n[lang].ingredients,
        steps: local.i18n[lang].steps,
        image: local.image,
        rating: local.rating,
        isAi: false,
      }
    : ai
    ? {
        name: ai.name,
        sub: ai.sub,
        time: ai.time,
        difficulty: ai.difficulty as Difficulty,
        ingredients: ai.ingredients,
        steps: ai.steps,
        image: null,
        rating: null,
        isAi: true,
      }
    : null;

  const voiceContext = view
    ? [
        `Recipe: ${view.name}${view.sub ? ` (${view.sub})` : ""}`,
        `Total time: ${view.time}. Difficulty: ${view.difficulty}.`,
        `Ingredients: ${view.ingredients.join(", ")}`,
        `Steps:\n${view.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
      ].join("\n")
    : undefined;

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label={t.recipe.back}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>
            {view?.name ?? q ?? t.recipe.results}
          </div>
        </header>

        {loading && (
          <div className="px-5">
            <div className="grid place-items-center rounded-3xl bg-gradient-hero p-8 text-center shadow-soft">
              <img src={chefRobot} alt="Chef mascot" width={120} height={120} className="h-24 w-24 object-contain" />
              <div className={`${t.fontClass} mt-3 flex items-center gap-2 text-sm font-bold text-primary`}>
                <Loader2 className="h-4 w-4 animate-spin" /> {t.recipe.generating}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded-full bg-muted" />
              ))}
            </div>
          </div>
        )}

        {!loading && !view && (
          <div className="px-5">
            <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
              <ChefHat className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className={`${t.fontClass} mt-2 text-sm font-semibold text-foreground`}>
                {error ? t.recipe.error : t.recipe.noResults}
              </p>
              <Link
                to="/home"
                className={`${t.fontClass} mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground`}
              >
                {t.recipe.back}
              </Link>
            </div>
          </div>
        )}

        {!loading && view && (
          <div className="px-5">
            {view.image ? (
              <div className="overflow-hidden rounded-3xl shadow-card">
                <img
                  src={view.image}
                  alt={view.name}
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-3xl bg-gradient-scanner p-5 text-primary-foreground shadow-glow">
                <img src={chefRobot} alt="Chef mascot" width={96} height={96} className="h-20 w-20 object-contain" loading="lazy" />
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"> {t.recipe.aiGenerated}
                  </span>
                  <p className={`${t.fontClass} mt-1 truncate text-base font-black`}>{view.name}</p>
                </div>
              </div>
            )}

            <h1 className={`${t.fontClass} mt-4 text-2xl font-black leading-tight text-foreground`}>{view.name}</h1>
            {view.sub && <p className="mt-1 text-xs text-muted-foreground">{view.sub}</p>}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-card p-3 text-center shadow-soft">
                <Clock className="mx-auto h-4 w-4 text-primary" />
                <div className={`${t.fontClass} mt-1 text-[10px] text-muted-foreground`}>{t.recipe.cookTime}</div>
                <div className="text-xs font-bold text-foreground">{view.time}</div>
              </div>
              <div className="rounded-2xl bg-card p-3 text-center shadow-soft">
                <Gauge className="mx-auto h-4 w-4 text-spice" />
                <div className={`${t.fontClass} mt-1 text-[10px] text-muted-foreground`}>{t.recipe.difficulty}</div>
                <div className={`${t.fontClass} text-xs font-bold text-foreground`}>{diffLabel(view.difficulty)}</div>
              </div>
              <div className="rounded-2xl bg-card p-3 text-center shadow-soft">
                <Star className="mx-auto h-4 w-4 fill-warm-foreground text-warm-foreground" />
                <div className={`${t.fontClass} mt-1 text-[10px] text-muted-foreground`}>Rating</div>
                <div className="text-xs font-bold text-foreground">{view.rating ?? "—"}</div>
              </div>
            </div>

            <section className="mt-6">
              <h2 className={`${t.fontClass} mb-3 text-lg font-black text-foreground`}>{t.recipe.ingredients}</h2>
              <ul className="grid gap-2 rounded-2xl bg-card p-4 shadow-soft">
                {view.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className={t.fontClass}>{ing}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h2 className={`${t.fontClass} mb-3 text-lg font-black text-foreground`}>{t.recipe.steps}</h2>
              <ol className="grid gap-3">
                {view.steps.map((s, i) => (
                  <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl bg-card p-4 shadow-soft">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-black text-primary-foreground">
                      {i + 1}
                    </span>
                    <p className={`${t.fontClass} text-sm leading-relaxed text-foreground`}>{s}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        )}
      </div>

      <VoiceAssistant context={voiceContext} />
    </div>
  );
}
