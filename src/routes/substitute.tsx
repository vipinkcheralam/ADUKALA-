import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Search, Replace, ArrowRight, Loader2 } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { searchSubstitutes, SUB_I18N } from "@/lib/substitutes";
import { lookupSubstitute } from "@/lib/substitute.functions";

const AI_I18N: Record<Lang, { cta: string; loading: string; empty: string; error: string; result: string; hint: string }> = {
  ml: { cta: "തിരയൂ", loading: "പകരം ചേരുവകൾ തിരയുന്നു...", empty: "ഈ ചേരുവയ്ക്ക് പകരം കണ്ടെത്താനായില്ല", error: "ഒന്നുകൂടി ശ്രമിക്കൂ", result: "തിരയൽ ഫലം", hint: "ലോകത്തിലെ ഏത് ചേരുവയും തിരയാം" },
  en: { cta: "Search", loading: "Finding substitutes...", empty: "No substitutes found for that ingredient", error: "Something went wrong, try again", result: "Result", hint: "Search any ingredient in the world" },
  hi: { cta: "खोजें", loading: "विकल्प खोजे जा रहे हैं...", empty: "इस सामग्री का विकल्प नहीं मिला", error: "कुछ गलत हुआ, फिर कोशिश करें", result: "परिणाम", hint: "दुनिया की कोई भी सामग्री खोजें" },
};
export const Route = createFileRoute("/substitute")({
  head: () => ({
    meta: [
      { title: "പകരം ചേരുവകൾ — അടുക്കള Adukkala" },
      { name: "description", content: "Missing an ingredient? Find smart kitchen alternatives like curd, milk, cashew and oats with the right substitution ratios." },
      { property: "og:title", content: "Ingredient Substitute — Adukkala" },
      { property: "og:description", content: "Find the best alternative for any missing cooking ingredient, with ratios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubstituteScreen,
});

function SubstituteScreen() {
  const { t, lang } = useI18n();
  const s = SUB_I18N[lang];
  const ai = AI_I18N[lang];
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = searchSubstitutes(query, lang);

  const aiSearch = useMutation({
    mutationFn: (q: string) => lookupSubstitute({ data: { query: q, lang } }),
  });
  const runAi = () => {
    const q = query.trim();
    if (q) aiSearch.mutate(q);
  };
  const aiData = aiSearch.data;

  // Dynamically look up any ingredient in the world as the user types
  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) return;
    const timer = window.setTimeout(() => aiSearch.mutate(q), 700);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, lang]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label={s.back}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{s.title}</div>
        </header>

        <div className="px-5">
          <section className="rounded-3xl bg-gradient-hero p-5 shadow-soft">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-warm/70 text-warm-foreground">
                <Replace className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h1 className={`${t.fontClass} text-lg font-black leading-tight text-foreground`}>{s.title}</h1>
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); runAi(); }}
              className="mt-4 flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 shadow-soft"
            >
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={s.placeholder}
                className={`${t.fontClass} min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70`}
              />
              <button
                type="submit"
                disabled={!query.trim() || aiSearch.isPending}
                aria-label={ai.cta}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft active:scale-95 disabled:opacity-40"
              >
                {aiSearch.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </button>
            </form>
            <p className="mt-2 text-[10px] text-muted-foreground">{ai.hint}</p>
          </section>

          {(aiSearch.isPending || aiSearch.isError || aiData) && (
            <section className="mt-5 rounded-3xl bg-card p-5 shadow-card ring-1 ring-border">
              <div className={`${t.fontClass} flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary`}>
<Replace className="h-3 w-3" /> {ai.result}
              </div>
              {aiSearch.isPending && (
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> {ai.loading}
                </div>
              )}
              {aiSearch.isError && <p className="mt-3 text-xs text-spice">{ai.error}</p>}
              {aiData && !aiSearch.isPending && (
                <>
                  <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">{aiData.emoji}</span>
                    <div className="min-w-0">
                      <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{aiData.name}</div>
                      <div className="line-clamp-2 text-[11px] text-muted-foreground">{aiData.note}</div>
                    </div>
                  </div>
                  {aiData.options.length === 0 ? (
                    <p className="mt-3 text-xs text-muted-foreground">{ai.empty}</p>
                  ) : (
                    <ul className="mt-3 grid gap-1.5">
                      {aiData.options.map((o, i) => (
                        <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 rounded-xl bg-secondary/60 px-3 py-2.5">
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <div className={`${t.fontClass} text-xs font-bold text-foreground`}>{o.name}</div>
                            {o.ratio && (
                              <div className="mt-1 inline-block rounded-md bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                {o.ratio}
                              </div>
                            )}
                            {o.tip && <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{o.tip}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </section>
          )}

          <h2 className={`${t.fontClass} mt-6 mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground`}>
            {results.length > 0 ? s.popular : s.noResults}
          </h2>

          <div className="grid gap-3">
            {results.map((item) => {
              const d = item.i18n[lang];
              return (
                <article key={item.slug} className="rounded-2xl bg-card p-4 shadow-soft">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">{item.emoji}</span>
                    <div className="min-w-0">
                      <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{d.name}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{d.note}</div>
                    </div>
                  </div>
                  <div className={`${t.fontClass} mt-3 text-[10px] font-bold uppercase tracking-wider text-primary`}>{s.alternatives}</div>
                  <ul className="mt-1.5 grid gap-1.5">
                    {d.options.map((o, i) => (
                      <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className={`${t.fontClass} truncate text-xs font-semibold text-foreground`}>{o.name}</span>
                        <span className="shrink-0 text-[10px] font-medium text-muted-foreground">{o.ratio}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
