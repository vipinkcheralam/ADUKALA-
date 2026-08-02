import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Trophy, CalendarClock, Users, Medal } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/contest")({
  head: () => ({
    meta: [
      { title: "Cooking Contest — അടുക്കള Adukkala" },
      { name: "description", content: "Adukkala Cooking Contest: compete with home chefs, submit your best dish and win. Launching soon." },
      { property: "og:title", content: "Cooking Contest — Adukkala" },
      { property: "og:description", content: "Compete with home chefs, submit your best dish and win. Launching soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContestScreen,
});

export const CONTEST_I18N: Record<Lang, {
  title: string; sub: string; soon: string; soonSub: string; back: string;
  f1: string; f1s: string; f2: string; f2s: string; f3: string; f3s: string; note: string;
}> = {
  ml: {
    title: "കുക്കിംഗ് മത്സരം", sub: "നിങ്ങളുടെ പാചകം ലോകത്തിന് കാണിക്കൂ",
    soon: "ഉടൻ വരുന്നു", soonSub: "മത്സരം തയ്യാറാകുന്നു. ആദ്യ സീസൺ ഉടൻ പ്രഖ്യാപിക്കും.",
    back: "തിരികെ",
    f1: "പ്രതിവാര ചലഞ്ച്", f1s: "ഓരോ ആഴ്ചയും പുതിയ വിഭവം",
    f2: "ജഡ്ജിംഗ് & വോട്ടിംഗ്", f2s: "സമൂഹം വോട്ട് ചെയ്യും",
    f3: "സമ്മാനങ്ങൾ", f3s: "വിജയികൾക്ക് ബാഡ്ജും സമ്മാനവും",
    note: "ലോഞ്ച് ചെയ്യുമ്പോൾ നിങ്ങൾക്ക് അറിയിപ്പ് ലഭിക്കും",
  },
  en: {
    title: "Cooking Contest", sub: "Show the world what your kitchen can do",
    soon: "Coming Soon", soonSub: "The contest is being prepared. Season one will be announced shortly.",
    back: "Back",
    f1: "Weekly Challenge", f1s: "A new dish theme every week",
    f2: "Judging & Voting", f2s: "The community picks the winners",
    f3: "Prizes", f3s: "Badges and rewards for top chefs",
    note: "You'll be notified the moment it launches",
  },
  hi: {
    title: "कुकिंग प्रतियोगिता", sub: "अपनी रसोई का हुनर दुनिया को दिखाएं",
    soon: "जल्द आ रहा है", soonSub: "प्रतियोगिता तैयार हो रही है। पहला सीज़न जल्द घोषित होगा।",
    back: "वापस",
    f1: "साप्ताहिक चैलेंज", f1s: "हर हफ्ते नया व्यंजन",
    f2: "जजिंग और वोटिंग", f2s: "समुदाय विजेता चुनेगा",
    f3: "इनाम", f3s: "टॉप शेफ के लिए बैज और इनाम",
    note: "लॉन्च होते ही आपको सूचना मिलेगी",
  },
};

function ContestScreen() {
  const { t, lang } = useI18n();
  const c = CONTEST_I18N[lang];
  const router = useRouter();

  const features = [
    { icon: CalendarClock, title: c.f1, sub: c.f1s },
    { icon: Users, title: c.f2, sub: c.f2s },
    { icon: Medal, title: c.f3, sub: c.f3s },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label={c.back}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{c.title}</div>
        </header>

        <div className="px-5">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-glow">
            <span aria-hidden className="pointer-events-none absolute -top-12 -right-8 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur"> {c.soon}
            </span>
            <div className="relative mt-4 grid place-items-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/20 backdrop-blur">
                <Trophy className="h-10 w-10" />
              </span>
              <h1 className={`${t.fontClass} mt-4 text-2xl font-black leading-tight`}>{c.title}</h1>
              <p className="mt-1 text-xs text-primary-foreground/85">{c.sub}</p>
            </div>
          </section>

          <section className="mt-6 rounded-3xl bg-card p-6 text-center shadow-card ring-1 ring-border">
            <div className={`${t.fontClass} text-xl font-black text-foreground`}>{c.soon}</div>
            <p className="mx-auto mt-2 max-w-xs text-[12px] leading-relaxed text-muted-foreground">{c.soonSub}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-semibold text-muted-foreground">
              <CalendarClock className="h-3 w-3" /> {c.note}
            </div>
          </section>

          <div className="mt-6 grid gap-3">
            {features.map((f) => (
              <div key={f.title} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-warm/70 text-warm-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{f.title}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
