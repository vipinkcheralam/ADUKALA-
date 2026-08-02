import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Leaf, User } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { SplashScreen } from "@/components/SplashScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adukkala — AI Smart Chef" },
      { name: "description", content: "Register once with your name to start cooking with Adukkala, your multilingual Kerala kitchen companion." },
      { property: "og:title", content: "Adukkala — AI Smart Chef" },
      { property: "og:description", content: "Register once and get instant access to Kerala recipes, ingredient substitutes and festival specials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Entry,
});

const AUTH_KEY = "adukkala_auth";

function readAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as { name?: string }) : null;
  } catch {
    return null;
  }
}

const SPLASH_MS = 2000;

function Entry() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"splash" | "register">("splash");
  const [progress, setProgress] = useState(8);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const registered = !!readAuth();

    const tick = setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      setProgress(Math.min(100, 8 + (elapsed / SPLASH_MS) * 92));
    }, 120);

    const timer = setTimeout(() => {
      if (registered) navigate({ to: "/home" });
      else setPhase("register");
    }, SPLASH_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(timer);
    };
  }, [navigate]);

  if (phase === "splash") return <SplashScreen progress={progress} />;
  return <RegisterScreen />;
}

const LANGS: { code: Lang; name: string; sub: string; glyph: string; font: string }[] = [
  { code: "ml", name: "മലയാളം", sub: "Malayalam", glyph: "അ", font: "font-mal" },
  { code: "en", name: "English", sub: "English", glyph: "A", font: "" },
  { code: "hi", name: "हिन्दी", sub: "Hindi", glyph: "ह", font: "" },
];

const REG: Record<Lang, { name: string; namePh: string; register: string; note: string }> = {
  ml: { name: "നിങ്ങളുടെ പേര്", namePh: "പേര് നൽകുക", register: "രജിസ്റ്റർ ചെയ്യുക", note: "ഒരിക്കൽ മാത്രം രജിസ്റ്റർ ചെയ്താൽ മതി" },
  en: { name: "Your name", namePh: "Enter your name", register: "Register", note: "You only need to register once" },
  hi: { name: "आपका नाम", namePh: "अपना नाम दर्ज करें", register: "रजिस्टर करें", note: "आपको केवल एक बार रजिस्टर करना है" },
};

function RegisterScreen() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useI18n();
  const r = REG[lang];
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const valid = name.trim().length >= 2;

  const handleRegister = () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ name: name.trim(), lang }));
    } catch {}
    navigate({ to: "/home" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-warm/40 blur-3xl" />
        <Leaf className="absolute top-24 right-8 h-16 w-16 rotate-12 text-primary/15" />
        <Leaf className="absolute bottom-40 left-4 h-12 w-12 -rotate-45 text-primary/15" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pt-14 pb-6">
        <header className="text-center">
          <h1 className="font-display text-5xl leading-none tracking-[0.2em] text-primary drop-shadow-sm">
            ADUKKALA
          </h1>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.34em] text-primary/75">
            AI Smart Chef
          </p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">{t.tagline}</p>
        </header>

        <div className="mt-8 flex-1 rounded-3xl bg-card p-6 shadow-card">
          <h2 className={`${t.fontClass} text-base font-bold text-foreground`}>{t.chooseLanguage}</h2>
          <p className="text-xs text-muted-foreground">{t.chooseLanguageSub}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {LANGS.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`relative flex flex-col items-center gap-1 rounded-2xl border-2 p-3 transition-all ${
                    active ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-secondary/50 hover:border-primary/40"
                  }`}
                >
                  {active && (
                    <span className="absolute top-1.5 right-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                  )}
                  <span className={`grid h-9 w-9 place-items-center rounded-xl text-lg font-black ${
                    active ? "bg-gradient-primary text-primary-foreground" : "bg-background text-primary"
                  }`}>
                    {l.glyph}
                  </span>
                  <span className={`text-xs font-semibold ${l.font}`}>{l.name}</span>
                  <span className="text-[10px] text-muted-foreground">{l.sub}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <label htmlFor="reg-name" className={`${t.fontClass} text-base font-bold text-foreground`}>{r.name}</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border-2 border-border bg-secondary/50 px-3 focus-within:border-primary">
              <User className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                id="reg-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={r.namePh}
                className={`${t.fontClass} h-12 min-w-0 flex-1 bg-transparent text-base font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/60`}
              />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">{r.note}</p>
          </div>

          <button
            onClick={handleRegister}
            disabled={!valid || saving}
            className={`mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary ${t.fontClass} text-base font-bold text-primary-foreground shadow-glow transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none`}
          >
            {r.register}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        
      </div>
    </div>
  );
}
