import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Globe, LogOut, Moon, Sun, User } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const COPY: Record<Lang, {
  title: string; appearance: string; darkMode: string; darkModeSub: string;
  language: string; account: string; guest: string; signOut: string;
  terms: string; termsIntro: string; termsPoints: string[]; version: string;
}> = {
  ml: {
    title: "ക്രമീകരണങ്ങൾ",
    appearance: "കാഴ്ച",
    darkMode: "ഡാർക്ക് മോഡ്",
    darkModeSub: "ഇരുണ്ട തീം ഓൺ/ഓഫ് ചെയ്യുക",
    language: "ഭാഷ",
    account: "അക്കൗണ്ട്",
    guest: "അതിഥി ഉപയോക്താവ്",
    signOut: "സൈൻ ഔട്ട്",
    terms: "നിബന്ധനകളും വ്യവസ്ഥകളും",
    termsIntro: "അടുക്കള ആപ്പ് ഉപയോഗിക്കുന്നതിലൂടെ താഴെ പറയുന്ന നിബന്ധനകൾ നിങ്ങൾ അംഗീകരിക്കുന്നു.",
    termsPoints: [
      "ഈ ആപ്പിലെ റെസിപ്പികളും നിർദ്ദേശങ്ങളും വിവരത്തിനു വേണ്ടി മാത്രമാണ്; പാചകം ചെയ്യുമ്പോൾ സ്വന്തം വിവേചനം ഉപയോഗിക്കുക.",
      "ചേരുവകൾക്ക് പകരം നിർദ്ദേശിക്കുന്ന ഓപ്ഷനുകൾ പൊതുവായ മാർഗ്ഗനിർദ്ദേശമാണ്. അലർജി ഉള്ളവർ ചേരുവകൾ പരിശോധിക്കുക.",
      "നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും ഈ ഉപകരണത്തിൽ മാത്രം സൂക്ഷിക്കുന്നു; മറ്റാർക്കും കൈമാറില്ല.",
      "പ്രിയപ്പെട്ട വിഭവങ്ങൾ ഉപകരണ ഐഡിയുമായി ബന്ധിപ്പിച്ചാണ് സൂക്ഷിക്കുന്നത്.",
      "ആപ്പിലെ ഉള്ളടക്കം പകർത്തി വാണിജ്യപരമായി ഉപയോഗിക്കാൻ പാടില്ല.",
    ],
    version: "പതിപ്പ്",
  },
  en: {
    title: "Settings",
    appearance: "Appearance",
    darkMode: "Dark mode",
    darkModeSub: "Turn the dark theme on or off",
    language: "Language",
    account: "Account",
    guest: "Guest user",
    signOut: "Sign out",
    terms: "Terms and Conditions",
    termsIntro: "By using the Adukkala app you agree to the terms below.",
    termsPoints: [
      "Recipes and suggestions are provided for information only; always use your own judgement while cooking.",
      "Ingredient substitutes are general guidance. Check ingredients carefully if you have allergies.",
      "Your name and phone number are stored only on this device and are never shared.",
      "Favourites are saved against an anonymous device ID, not a personal account.",
      "App content may not be copied or reused commercially without permission.",
    ],
    version: "Version",
  },
  hi: {
    title: "सेटिंग्स",
    appearance: "रूप",
    darkMode: "डार्क मोड",
    darkModeSub: "डार्क थीम चालू/बंद करें",
    language: "भाषा",
    account: "खाता",
    guest: "अतिथि उपयोगकर्ता",
    signOut: "साइन आउट",
    terms: "नियम और शर्तें",
    termsIntro: "अडूक्कला ऐप का उपयोग करके आप नीचे दी गई शर्तों से सहमत होते हैं।",
    termsPoints: [
      "रेसिपी और सुझाव केवल जानकारी के लिए हैं; पकाते समय अपने विवेक का उपयोग करें।",
      "सामग्री विकल्प सामान्य मार्गदर्शन हैं। एलर्जी होने पर सामग्री जाँच लें।",
      "आपका नाम और फोन नंबर केवल इसी डिवाइस पर सहेजा जाता है, साझा नहीं किया जाता।",
      "पसंदीदा व्यंजन एक अनाम डिवाइस आईडी से जुड़े होते हैं।",
      "ऐप की सामग्री की व्यावसायिक नकल की अनुमति नहीं है।",
    ],
    version: "संस्करण",
  },
};

const LANGS: { code: Lang; label: string }[] = [
  { code: "ml", label: "മലയാളം" },
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
];

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "ക്രമീകരണങ്ങൾ — അടുക്കള Settings" },
      { name: "description", content: "Adukkala settings: switch dark mode on or off, change language and read the app terms and conditions." },
      { property: "og:title", content: "Settings — അടുക്കള Adukkala" },
      { property: "og:description", content: "Dark mode, language and terms and conditions for the Adukkala kitchen app." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsScreen,
});

function SettingsScreen() {
  const { t, lang, setLang } = useI18n();
  const c = COPY[lang];
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const navigate = useNavigate();
  const [auth, setAuth] = useState<{ name?: string; phone?: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("adukkala_auth");
      setAuth(raw ? JSON.parse(raw) : null);
    } catch { setAuth(null); }
  }, []);

  const signOut = () => {
    try { localStorage.removeItem("adukkala_auth"); } catch {}
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label={c.title}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className={`${t.fontClass} truncate text-base font-black text-foreground`}>{c.title}</h1>
        </header>

        <div className="space-y-5 px-5">
          <section className="rounded-3xl bg-card p-5 shadow-card ring-1 ring-border">
            <h2 className={`${t.fontClass} text-[10px] font-bold uppercase tracking-wider text-muted-foreground`}>{c.appearance}</h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-foreground">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className={`${t.fontClass} text-sm font-bold text-foreground`}>{c.darkMode}</div>
                <p className="text-[11px] text-muted-foreground">{c.darkModeSub}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={theme === "dark"}
                aria-label={c.darkMode}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${theme === "dark" ? "bg-primary" : "bg-border"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-card shadow-soft transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-card p-5 shadow-card ring-1 ring-border">
            <h2 className={`${t.fontClass} flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground`}>
              <Globe className="h-3 w-3" /> {c.language}
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`rounded-2xl border-2 px-2 py-2.5 text-xs font-bold transition-colors ${
                    lang === l.code ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary/50 text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-card p-5 shadow-card ring-1 ring-border">
            <h2 className={`${t.fontClass} text-[10px] font-bold uppercase tracking-wider text-muted-foreground`}>{c.account}</h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                <User className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{auth?.name || c.guest}</div>
                <p className="truncate text-[11px] text-muted-foreground">{auth?.phone ? `+91 ${auth.phone}` : "—"}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className={`${t.fontClass} mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary py-3 text-xs font-bold text-foreground transition-colors hover:bg-accent`}
            >
              <LogOut className="h-4 w-4" /> {c.signOut}
            </button>
          </section>

          <section className="rounded-3xl bg-card p-5 shadow-card ring-1 ring-border">
            <h2 className={`${t.fontClass} flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground`}>
              <FileText className="h-3 w-3" /> {c.terms}
            </h2>
            <p className={`${t.fontClass} mt-2 text-xs leading-relaxed text-foreground`}>{c.termsIntro}</p>
            <ul className="mt-3 grid gap-2">
              {c.termsPoints.map((p, i) => (
                <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 rounded-xl bg-secondary/60 px-3 py-2.5">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className={`${t.fontClass} text-[11px] leading-snug text-muted-foreground`}>{p}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-[10px] text-muted-foreground">{c.version} 1.0.0</p>
          </section>
        </div>
      </div>
    </div>
  );
}
