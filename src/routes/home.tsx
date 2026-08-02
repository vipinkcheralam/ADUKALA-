import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Search, Heart, Star, Clock, Flame, ChefHat, Barcode,
  ArrowRight, Replace, Trophy, Settings,
  MessageCircle,
} from "lucide-react";
import chefRobot from "@/assets/chef-robot.png";
import { useI18n } from "@/lib/i18n";
import { searchRecipes } from "@/lib/recipes";
import { FestivalBanner } from "@/components/FestivalBanner";
import { PRICE_I18N } from "@/lib/price-scan";
import { InlineAdBanner } from "@/components/InlineAdBanner";
import { AccountButton, NotificationsButton } from "@/components/HeaderMenus";
import {
  dailySpecials, fetchDishes, fetchFavorites, getDeviceId, localizeDish, toggleFavorite,
} from "@/lib/dishes";



export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "അടുക്കള — Today's Kitchen" },
      { name: "description", content: "Discover Kerala recipes, scan your ingredients and cook smarter every day." },
      { property: "og:title", content: "അടുക്കള — Today's Kitchen" },
      { property: "og:description", content: "Discover Kerala recipes, festival specials and ingredient substitutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const priceT = PRICE_I18N[lang];
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState("fav");
  const [query, setQuery] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const results = searchRecipes(query, lang);

  useEffect(() => setDeviceId(getDeviceId()), []);

  const dishesQ = useQuery({ queryKey: ["dishes"], queryFn: fetchDishes, staleTime: 5 * 60_000 });
  const favQ = useQuery({
    queryKey: ["favorites", deviceId],
    queryFn: () => fetchFavorites(deviceId),
    enabled: !!deviceId,
  });
  const favSlugs = favQ.data ?? [];
  const specials = dailySpecials(dishesQ.data ?? []).map((d) => localizeDish(d, lang));

  const favMutation = useMutation({
    mutationFn: ({ slug, isFav }: { slug: string; isFav: boolean }) => toggleFavorite(deviceId, slug, isFav),
    onMutate: async ({ slug, isFav }) => {
      await qc.cancelQueries({ queryKey: ["favorites", deviceId] });
      const prev = qc.getQueryData<string[]>(["favorites", deviceId]) ?? [];
      qc.setQueryData<string[]>(["favorites", deviceId], isFav ? prev.filter((s) => s !== slug) : [slug, ...prev]);
      return { prev };
    },
    onError: (_e, _v, ctx) => qc.setQueryData(["favorites", deviceId], ctx?.prev ?? []),
    onSettled: () => qc.invalidateQueries({ queryKey: ["favorites", deviceId] }),
  });



  const greetingByLang: Record<string, [string, string, string, string]> = {
    ml: ["സുപ്രഭാതം", "ഉച്ചവന്ദനം", "ശുഭ സായാഹ്നം", "ശുഭരാത്രി"],
    en: ["Good morning", "Good afternoon", "Good evening", "Good night"],
    hi: ["सुप्रभात", "नमस्कार", "शुभ संध्या", "शुभ रात्रि"],
  };
  const hour = new Date().getHours();
  const slot = hour < 12 ? 0 : hour < 17 ? 1 : hour < 21 ? 2 : 3;
  const timeGreeting = (greetingByLang[lang] ?? greetingByLang.en)[slot];

  const tabs = [
    { id: "fav", label: t.tabs.fav, Icon: Heart },
    { id: "more", label: t.tabs.more, Icon: Settings },
  ];

  return (
    <div
      className="relative min-h-screen bg-background pb-24"
      style={{ paddingBottom: "calc(6rem + var(--ad-banner-h, 0px))" }}
    >
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-background/85 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <div
                className={
                  lang === "ml"
                    ? `${t.fontClass} text-lg font-black leading-none text-primary`
                    : "font-display text-xl leading-none tracking-[0.14em] text-primary"
                }
              >
                {lang === "ml" ? t.appName : "ADUKKALA"}
              </div>
              <div className="text-[10px] font-medium tracking-wide text-muted-foreground">{t.aiSmartChef}</div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/inbox"
              aria-label="Chats"
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground active:scale-90"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
            <NotificationsButton />
            <AccountButton />
          </div>
        </header>

        <div className="px-5">
          <div className="mt-2">
            <FestivalBanner compact />
            <InlineAdBanner />
          </div>

          <section className="mt-4 rounded-3xl bg-gradient-hero p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <span className={`${t.fontClass} rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold text-primary`}>
                {t.greeting}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">{timeGreeting}</span>
            </div>
            <h1 className={`${t.fontClass} mt-2 text-2xl font-black leading-tight text-foreground whitespace-pre-line`}>
              {t.heroTitle}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">{t.heroSub}</p>

            <div className="relative">
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 shadow-soft">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`${t.fontClass} min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70`}
                />
              </div>


              {query.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border">
                  <div className={`${t.fontClass} px-4 pt-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground`}>
                    {results.length > 0 ? t.recipe.results : t.recipe.noResults}
                  </div>
                  <div className="max-h-72 overflow-y-auto p-2">
                    {results.map((r) => (
                      <Link
                        key={r.slug}
                        to="/recipe/$slug"
                        params={{ slug: r.slug }}
                        onClick={() => setQuery("")}
                        className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl p-2 hover:bg-secondary"
                      >
                        <img
                          src={r.image}
                          alt={r.i18n[lang].name}
                          loading="lazy"
                          width={800}
                          height={600}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{r.i18n[lang].name}</div>
                          <div className="truncate text-[11px] text-muted-foreground">{r.i18n[lang].sub}</div>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
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

                    <Link
                      to="/recipe/$slug"
                      params={{ slug: "ai" }}
                      search={{ q: query.trim() }}
                      onClick={() => setQuery("")}
                      className="mt-1 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-gradient-scanner p-3 text-primary-foreground"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20">
                        <ChefHat className="h-4 w-4" />
                      </span>
                      <span className={`${t.fontClass} truncate text-xs font-bold`}>{t.recipe.askAi}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </section>

          <section className="mt-5 overflow-hidden rounded-3xl bg-gradient-scanner p-5 text-primary-foreground shadow-glow">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">

              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                  {t.aiScannerBadge}
                </span>
                <h3 className={`${t.fontClass} mt-2 text-lg font-black leading-tight whitespace-pre-line`}>
                  {t.aiScannerTitle}
                </h3>
                <p className="mt-1 text-[11px] text-white/85">{t.aiScannerSub}</p>
                <Link
                  to="/scan"
                  className={`${t.fontClass} mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-soft active:scale-95`}
                >
                  {t.aiScannerCta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <img
                src={chefRobot}
                alt="Smart chef mascot"
                width={140}
                height={140}
                className="h-32 w-32 shrink-0 object-contain drop-shadow-2xl"
              />
            </div>
          </section>

          <section className="mt-6">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 className={`${t.fontClass} text-lg font-black text-foreground`}>
                  {t.smartFeaturesTitle}
                </h2>
                <p className="text-[11px] text-muted-foreground">{t.smartFeaturesSub}</p>
              </div>
            </div>
            <Link
              to="/substitute"
              className="group relative block overflow-hidden rounded-3xl bg-card p-5 shadow-card ring-1 ring-border transition-transform active:scale-[0.99]"
            >
              <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-warm/50 blur-2xl" />
              <div className="relative flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Replace className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className={`${t.fontClass} truncate text-base font-black text-foreground`}>
                    {t.smart.substituteTitle}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                    {t.smart.substituteSub}
                  </p>
                </div>
              </div>
              <div className="relative mt-4 flex items-center justify-end">
                <span className={`${t.fontClass} inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-soft`}>
                  {t.smart.substituteCta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            <Link
              to="/price-scan"
              className="group relative mt-3 block overflow-hidden rounded-3xl bg-card p-5 shadow-card ring-1 ring-border transition-transform active:scale-[0.99]"
            >
              <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
              <div className="relative flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Barcode className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className={`${t.fontClass} truncate text-base font-black text-foreground`}>
                    {priceT.homeCardTitle}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                    {priceT.homeCardSub}
                  </p>
                </div>
              </div>
              <div className="relative mt-4 flex items-center justify-end">
                <span className={`${t.fontClass} inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-soft`}>
                  {priceT.scanCta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            <Link
              to="/contest"
              className="group relative mt-3 block overflow-hidden rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-glow transition-transform active:scale-[0.99]"
            >
              <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
              <div className="relative flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <Trophy className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className={`${t.fontClass} truncate text-base font-black`}>{t.contest.title}</div>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-primary-foreground/85">
                    {t.contest.sub}
                  </p>
                </div>
              </div>
              <div className="relative mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                  {t.contest.badge}
                </span>
                <span className={`${t.fontClass} inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-soft`}>
                  {t.contest.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </section>

          <section className="mt-6">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 className={`${t.fontClass} text-lg font-black text-foreground`}>{t.todaysSpecial}</h2>
                <p className="text-[11px] text-muted-foreground">{t.todaysSpecialSub}</p>
              </div>
              <Link to="/favorites" className={`${t.fontClass} text-xs font-semibold text-primary`}>{t.seeAll}</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dishesQ.isLoading &&
                [0, 1, 2, 3].map((i) => <div key={i} className="h-52 animate-pulse rounded-2xl bg-muted" />)}
              {specials.map((d) => {
                const tagColor =
                  d.tagKind === "spice" ? "bg-spice text-white"
                  : d.tagKind === "premium" ? "bg-foreground text-background"
                  : "bg-primary text-primary-foreground";
                const isFav = favSlugs.includes(d.slug);
                return (
                  <article key={d.slug} className="relative overflow-hidden rounded-2xl bg-card shadow-soft transition-transform hover:-translate-y-0.5">
                    <Link to="/recipe/$slug" params={{ slug: d.slug }} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={d.image}
                          alt={d.sub}
                          loading="lazy"
                          width={400}
                          height={300}
                          className="h-full w-full object-cover"
                        />
                        <span className={`${t.fontClass} absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${tagColor}`}>
                          {d.tagKind === "spice" && <Flame className="mr-0.5 inline h-2.5 w-2.5" />}
                          {d.tag}
                        </span>
                      </div>
                      <div className="p-3">
                        <h3 className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{d.name}</h3>
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
                      onClick={() => favMutation.mutate({ slug: d.slug, isFav })}
                      aria-label="Favorite"
                      className="absolute top-2 right-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-card/90 backdrop-blur active:scale-90"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? "fill-spice text-spice" : "text-foreground"}`} />
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

        </div>
      </div>

      <nav
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4 pb-4"
        style={{ paddingBottom: "calc(1rem + var(--ad-banner-h, 0px))" }}
      >
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-3xl bg-card p-2 shadow-card ring-1 ring-border">
          {(() => {
            const renderTab = ({ id, label, Icon }: (typeof tabs)[number]) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    if (id === "fav") navigate({ to: "/favorites" });
                    if (id === "more") navigate({ to: "/settings" });
                  }}
                  className={`flex items-center justify-center gap-2 rounded-2xl py-3 transition-colors ${
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className={`${t.fontClass} text-xs font-bold`}>{label}</span>
                </button>
              );
            };
            return (
              <>
                {tabs[0] && renderTab(tabs[0])}
                <button
                  onClick={() => navigate({ to: "/community" })}
                  aria-label="Community Feed"
                  className="relative -mt-9 grid h-16 w-16 place-items-center rounded-full shadow-card ring-4 ring-card transition-transform active:scale-90"
                >
                  <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-spice to-primary opacity-60 blur-md" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-spice via-primary to-warm-foreground" />
                  <ChefHat className="relative h-7 w-7 text-primary-foreground drop-shadow" />
                  <span className="absolute -bottom-2.5 rounded-full bg-card px-1.5 py-0.5 text-[8px] font-extrabold tracking-wide text-foreground shadow-soft">
                    COMMUNITY
                  </span>
                </button>
                {tabs[1] && renderTab(tabs[1])}
              </>
            );
          })()}
        </div>
      </nav>

      <Link to="/" className="sr-only">Back to login</Link>
    </div>
  );
}
