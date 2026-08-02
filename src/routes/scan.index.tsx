import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Video, ChefHat, ScanLine } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SCAN_I18N } from "@/lib/scan-i18n";
import chefRobot from "@/assets/chef-robot.png";

export const Route = createFileRoute("/scan/")({
  head: () => ({
    meta: [
      { title: "Smart Scanner — അടുക്കള Adukkala" },
      { name: "description", content: "Scan your fridge with a short video and let the smart chef suggest recipes from what you already have." },
      { property: "og:title", content: "Smart Scanner — Adukkala" },
      { property: "og:description", content: "Scan your fridge and get instant recipe ideas from your ingredients." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScanOverview,
});

const ICONS = [Video, ScanLine, ChefHat];

function ScanOverview() {
  const { t, lang } = useI18n();
  const s = SCAN_I18N[lang];
  const router = useRouter();

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
          <section className="overflow-hidden rounded-3xl bg-gradient-scanner p-5 text-primary-foreground shadow-glow">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur"> {t.aiScannerBadge}
            </span>
            <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <h1 className={`${t.fontClass} text-xl font-black leading-tight`}>{s.title}</h1>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/85">{s.sub}</p>
              </div>
              <img src={chefRobot} alt="Smart chef mascot" width={140} height={140} className="h-28 w-28 shrink-0 object-contain drop-shadow-2xl" />
            </div>
          </section>

          <section className="mt-6">
            <h2 className={`${t.fontClass} text-lg font-black text-foreground`}>{s.howTitle}</h2>
            <div className="mt-3 grid gap-3">
              {s.steps.map((step, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={i} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{step.title}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{step.sub}</div>
                    </div>
                    <span className={`${t.fontClass} grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-black text-primary`}>
                      {i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 bg-gradient-to-t from-background via-background to-transparent px-5 pb-5 pt-6">
        <Link
          to="/scan/camera"
          className={`${t.fontClass} flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-sm font-black text-primary-foreground shadow-glow active:scale-[0.98]`}
        >
          <ScanLine className="h-4 w-4" /> {s.startScan}
        </Link>
      </div>
    </div>
  );
}
