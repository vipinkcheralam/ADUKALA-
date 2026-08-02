import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Gauge, ScanLine, ChefHat, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SCAN_I18N } from "@/lib/scan-i18n";
import { loadScan } from "@/lib/scan-store";
import type { ScanResult } from "@/lib/scan.functions";
import { VoiceAssistant } from "@/components/VoiceAssistant";

export const Route = createFileRoute("/scan/results")({
  head: () => ({
    meta: [
      { title: "Scanned ingredients & recipes — അടുക്കള Adukkala" },
      { name: "description", content: "Ingredients detected from your fridge scan and the recipes you can cook with them right now." },
      { property: "og:title", content: "Scanned ingredients & recipes — Adukkala" },
      { property: "og:description", content: "See detected ingredients and matching recipes from your scan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScanResults,
});

function ScanResults() {
  const { t, lang } = useI18n();
  const s = SCAN_I18N[lang];
  const router = useRouter();
  const [data, setData] = useState<ScanResult | null>(null);

  useEffect(() => {
    setData(loadScan());
  }, []);

  const diffLabel = (d: "easy" | "medium" | "hard") => t.recipe[d];

  const voiceContext = data
    ? [
        `The user just scanned their fridge/kitchen.`,
        `Detected ingredients: ${data.ingredients.join(", ")}`,
        `Suggested recipes: ${data.recipes.map((r) => `${r.name} (${r.time}, ${r.difficulty})`).join("; ")}`,
      ].join("\n")
    : undefined;

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label={t.recipe.back}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{s.title}</div>
        </header>

        <div className="px-5">
          {!data || data.ingredients.length === 0 ? (
            <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
              <ChefHat className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className={`${t.fontClass} mt-2 text-sm font-semibold text-foreground`}>{s.noIngredients}</p>
              <Link
                to="/scan/camera"
                className={`${t.fontClass} mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground`}
              >
                <ScanLine className="h-4 w-4" /> {s.rescan}
              </Link>
            </div>
          ) : (
            <>
              <section className="rounded-3xl bg-gradient-hero p-5 shadow-soft">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary"> {t.aiScannerBadge}
                </span>
                <h1 className={`${t.fontClass} mt-2 text-lg font-black text-foreground`}>{s.detected}</h1>
                <p className="text-[11px] text-muted-foreground">{s.detectedSub}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className={`${t.fontClass} rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft`}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-6">
                <h2 className={`${t.fontClass} text-lg font-black text-foreground`}>{s.matches}</h2>
                <p className="text-[11px] text-muted-foreground">{s.matchesSub}</p>

                <div className="mt-3 grid gap-3">
                  {data.recipes.map((r, i) => (
                    <Link
                      key={i}
                      to="/recipe/$slug"
                      params={{ slug: "ai" }}
                      search={{ q: r.name }}
                      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-card p-4 shadow-soft transition-transform hover:-translate-y-0.5"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <ChefHat className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className={`${t.fontClass} block truncate text-sm font-bold text-foreground`}>{r.name}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">{r.sub}</span>
                        <span className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {r.time}</span>
                          <span className="text-border">•</span>
                          <span className={`${t.fontClass} flex items-center gap-0.5`}><Gauge className="h-3 w-3" /> {diffLabel(r.difficulty)}</span>
                        </span>
                        {r.uses.length > 0 && (
                          <span className={`${t.fontClass} mt-1.5 flex flex-wrap gap-1`}>
                            {r.uses.map((u, k) => (
                              <span key={k} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary">
                                {u}
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 bg-gradient-to-t from-background via-background to-transparent px-5 pb-5 pt-6">
        <Link
          to="/scan/camera"
          className={`${t.fontClass} flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-sm font-black text-primary-foreground shadow-glow active:scale-[0.98]`}
        >
          <ScanLine className="h-4 w-4" /> {s.rescan}
        </Link>
      </div>

      <VoiceAssistant context={voiceContext} />
    </div>
  );
}
