import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ml" | "en" | "hi";

type Dict = {
  aiSmartChef: string;
  appName: string;
  tagline: string;
  chooseLanguage: string;
  chooseLanguageSub: string;
  mobileNumber: string;
  mobileNumberSub: string;
  otpHint: string;
  login: string;
  getOtp: string;
  verifyLogin: string;
  otpLabel: string;
  otpSub: string;
  resendOtp: string;
  changeNumber: string;
  continueGoogle: string;
  orContinue: string;
  terms: string;
  privacy: string;
  agree: string;
  greeting: string;
  goodMorning: string;
  heroTitle: string;
  heroSub: string;
  searchPlaceholder: string;
  filters: { all: string; offers: string; favorites: string; veg: string; breakfast: string };
  aiScannerBadge: string;
  aiScannerTitle: string;
  aiScannerSub: string;
  aiScannerCta: string;
  smartFeaturesTitle: string;
  smartFeaturesSub: string;
  smart: {
    expiryTitle: string; expirySub: string; expiryCta: string;
    substituteTitle: string; substituteSub: string; substituteCta: string;
    quickTitle: string; quickSub: string; quickCta: string;
  };
  contest: { title: string; sub: string; badge: string; cta: string };
  todaysSpecial: string;
  todaysSpecialSub: string;
  seeAll: string;
  dishes: { name: string; sub: string; tag: string }[];
  tabs: { home: string; recipes: string; ai: string; fav: string; more: string };
  recipe: {
    results: string;
    noResults: string;
    askAi: string;
    generating: string;
    aiGenerated: string;
    error: string;
    ingredients: string;
    steps: string;
    cookTime: string;
    difficulty: string;
    easy: string;
    medium: string;
    hard: string;
    back: string;
  };

  fontClass: string; // font-mal for ml, "" otherwise
};

const dicts: Record<Lang, Dict> = {
  ml: {
    aiSmartChef: "AI Smart Chef",
    appName: "അടുക്കള",
    tagline: "നിങ്ങളുടെ സ്മാർട്ട് പാചക കൂട്ടുകാരൻ",
    chooseLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കൂ",
    chooseLanguageSub: "Choose your language",
    mobileNumber: "മൊബൈൽ നമ്പർ",
    mobileNumberSub: "Enter your mobile number",
    otpHint: "We'll send you an OTP for verification",
    login: "ലോഗിൻ ചെയ്യുക",
    getOtp: "ഓടിപി അയക്കുക",
    verifyLogin: "പരിശോധിച്ച് ലോഗിൻ ചെയ്യുക",
    otpLabel: "OTP നൽകുക",
    otpSub: "+91 {phone} എന്നതിലേക്ക് അയച്ചു",
    resendOtp: "വീണ്ടും അയക്കുക",
    changeNumber: "നമ്പർ മാറ്റുക",
    continueGoogle: "Google-ൽ തുടരുക",
    orContinue: "or continue with",
    terms: "Terms",
    privacy: "Privacy Policy",
    agree: "By continuing you agree to our",
    greeting: "നമസ്കാരം 👋",
    goodMorning: "Good morning",
    heroTitle: "ഇന്നത്തെ പാചകം\nചെയ്യാം?",
    heroSub: "What shall we cook today?",
    searchPlaceholder: "റെസിപ്പി തിരയുക...",
    filters: { all: "എല്ലാം", offers: "പ്രൊമോഷൻ", favorites: "പ്രിയപ്പെട്ടവ", veg: "വെജ്", breakfast: "ബ്രേക്ഫാസ്റ്റ്" },
    aiScannerBadge: "സ്മാർട്ട് സ്കാനർ",
    aiScannerTitle: "സ്കാനർ വഴി\nറെസിപ്പി കണ്ടെത്തുക",
    aiScannerSub: "Point your camera at ingredients",
    aiScannerCta: "തുടങ്ങുക",
    smartFeaturesTitle: "സ്മാർട്ട് ഫീച്ചറുകൾ",
    smartFeaturesSub: "Smart tools for your kitchen",
    smart: {
      expiryTitle: "എക്സ്പയറി ട്രാക്കിംഗ്", expirySub: "Track ingredient expiry", expiryCta: "സ്കാൻ ചെയ്യുക",
      substituteTitle: "പകരം ചേരുവകൾ", substituteSub: "സാധനം ഇല്ലേ? പകരം കണ്ടെത്തൂ", substituteCta: "കണ്ടെത്തൂ",
      quickTitle: "15 മിനിറ്റ് ഭക്ഷണം", quickSub: "Quick 15-min meals", quickCta: "കാണുക",
    },
    contest: { title: "കുക്കിംഗ് മത്സരം", sub: "നിങ്ങളുടെ പാചകം ലോകത്തിന് കാണിക്കൂ", badge: "പുതിയത്", cta: "കാണുക" },
    todaysSpecial: "ഇന്നത്തെ സ്പെഷ്യൽ",
    todaysSpecialSub: "Today's specials",
    seeAll: "എല്ലാം കാണുക",
    dishes: [
      { name: "മീൻ കറി", sub: "Meen Curry", tag: "എരിവുള്ളത്" },
      { name: "ആപ്പം", sub: "Appam & Stew", tag: "പ്രീമിയം" },
      { name: "തോരൻ", sub: "Cabbage Thoran", tag: "വെജ്" },
      { name: "പുട്ട് & കടല", sub: "Puttu & Kadala", tag: "ട്രെൻഡിംഗ്" },
    ],
    tabs: { home: "ഹോം", recipes: "റെസിപ്പികൾ", ai: "ഷെഫ്", fav: "ഫേവറിറ്റ്", more: "കൂടുതൽ" },
    recipe: {
      results: "തിരയൽ ഫലങ്ങൾ",
      noResults: "റെസിപ്പി കണ്ടെത്തിയില്ല",
      askAi: "ഷെഫിനോട് ഈ റെസിപ്പി ചോദിക്കൂ",
      generating: "ഷെഫ് റെസിപ്പി തയ്യാറാക്കുന്നു...",
      aiGenerated: "സ്മാർട്ട് റെസിപ്പി",
      error: "റെസിപ്പി ഉണ്ടാക്കാനായില്ല. വീണ്ടും ശ്രമിക്കൂ.",
      ingredients: "ചേരുവകൾ",
      steps: "തയ്യാറാക്കുന്ന വിധം",
      cookTime: "ആകെ സമയം",
      difficulty: "ബുദ്ധിമുട്ട്",
      easy: "എളുപ്പം",
      medium: "ഇടത്തരം",
      hard: "കഠിനം",
      back: "തിരികെ",
    },

    fontClass: "font-mal",
  },
  en: {
    aiSmartChef: "AI Smart Chef",
    appName: "Adukkala",
    tagline: "Your smart cooking companion",
    chooseLanguage: "Choose your language",
    chooseLanguageSub: "Pick your preferred language",
    mobileNumber: "Mobile Number",
    mobileNumberSub: "Enter your mobile number",
    otpHint: "We'll send you an OTP for verification",
    login: "Login",
    getOtp: "Get OTP",
    verifyLogin: "Verify & Login",
    otpLabel: "Enter OTP",
    otpSub: "Sent to +91 {phone}",
    resendOtp: "Resend OTP",
    changeNumber: "Change number",
    continueGoogle: "Continue with Google",
    orContinue: "or continue with",
    terms: "Terms",
    privacy: "Privacy Policy",
    agree: "By continuing you agree to our",
    greeting: "Hello 👋",
    goodMorning: "Good morning",
    heroTitle: "What shall we\ncook today?",
    heroSub: "Discover recipes crafted for you",
    searchPlaceholder: "Search recipes...",
    filters: { all: "All", offers: "Offers", favorites: "Favorites", veg: "Veg", breakfast: "Breakfast" },
    aiScannerBadge: "Smart Scanner",
    aiScannerTitle: "Find recipes with\nthe Smart Scanner",
    aiScannerSub: "Point your camera at ingredients",
    aiScannerCta: "Start",
    smartFeaturesTitle: "Smart Features",
    smartFeaturesSub: "Smart tools for your kitchen",
    smart: {
      expiryTitle: "Expiry Tracking", expirySub: "Track ingredient expiry", expiryCta: "Scan",
      substituteTitle: "Ingredient Substitute", substituteSub: "Missing something? Find alternatives", substituteCta: "Find",
      quickTitle: "15-Minute Meals", quickSub: "Quick 15-min meals", quickCta: "View",
    },
    contest: { title: "Cooking Contest", sub: "Show the world what your kitchen can do", badge: "New", cta: "Enter" },
    todaysSpecial: "Today's Specials",
    todaysSpecialSub: "Curated for today",
    seeAll: "See all",
    dishes: [
      { name: "Meen Curry", sub: "Kerala Fish Curry", tag: "Spicy" },
      { name: "Appam & Stew", sub: "Lace hoppers with stew", tag: "Premium" },
      { name: "Cabbage Thoran", sub: "Coconut stir-fry", tag: "Veg" },
      { name: "Puttu & Kadala", sub: "Steamed rice cake", tag: "Trending" },
    ],
    tabs: { home: "Home", recipes: "Recipes", ai: "Chef", fav: "Favorites", more: "More" },
    recipe: {
      results: "Search results",
      noResults: "No recipe found",
      askAi: "Ask the chef for this recipe",
      generating: "Cooking up the recipe...",
      aiGenerated: "Smart recipe",
      error: "Couldn't generate the recipe. Please try again.",
      ingredients: "Ingredients",
      steps: "Preparation steps",
      cookTime: "Total time",
      difficulty: "Difficulty",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      back: "Back",
    },

    fontClass: "",
  },
  hi: {
    aiSmartChef: "AI Smart Chef",
    appName: "अडूक्कला",
    tagline: "आपका स्मार्ट रसोई साथी",
    chooseLanguage: "अपनी भाषा चुनें",
    chooseLanguageSub: "Choose your language",
    mobileNumber: "मोबाइल नंबर",
    mobileNumberSub: "अपना मोबाइल नंबर दर्ज करें",
    otpHint: "हम सत्यापन के लिए OTP भेजेंगे",
    login: "लॉग इन करें",
    getOtp: "OTP भेजें",
    verifyLogin: "सत्यापित करें व लॉगिन करें",
    otpLabel: "OTP दर्ज करें",
    otpSub: "+91 {phone} पर भेजा गया",
    resendOtp: "पुनः भेजें",
    changeNumber: "नंबर बदलें",
    continueGoogle: "Google से जारी रखें",
    orContinue: "या इसके साथ जारी रखें",
    terms: "शर्तें",
    privacy: "गोपनीयता नीति",
    agree: "जारी रखते हुए आप हमारी",
    greeting: "नमस्ते 👋",
    goodMorning: "सुप्रभात",
    heroTitle: "आज क्या\nपकाएँ?",
    heroSub: "आज के लिए रेसिपी खोजें",
    searchPlaceholder: "रेसिपी खोजें...",
    filters: { all: "सभी", offers: "ऑफर", favorites: "पसंदीदा", veg: "शाकाहारी", breakfast: "नाश्ता" },
    aiScannerBadge: "स्मार्ट स्कैनर",
    aiScannerTitle: "स्कैनर से\nरेसिपी खोजें",
    aiScannerSub: "कैमरा सामग्री पर ले जाएँ",
    aiScannerCta: "शुरू करें",
    smartFeaturesTitle: "स्मार्ट सुविधाएँ",
    smartFeaturesSub: "आपकी रसोई के लिए स्मार्ट टूल",
    smart: {
      expiryTitle: "एक्सपायरी ट्रैकिंग", expirySub: "सामग्री की एक्सपायरी ट्रैक करें", expiryCta: "स्कैन",
      substituteTitle: "सामग्री विकल्प", substituteSub: "सामग्री नहीं है? विकल्प खोजें", substituteCta: "खोजें",
      quickTitle: "15 मिनट के व्यंजन", quickSub: "जल्दी बनने वाले व्यंजन", quickCta: "देखें",
    },
    contest: { title: "कुकिंग प्रतियोगिता", sub: "अपनी रसोई का हुनर दुनिया को दिखाएं", badge: "नया", cta: "देखें" },
    todaysSpecial: "आज का विशेष",
    todaysSpecialSub: "आज के लिए चुना गया",
    seeAll: "सभी देखें",
    dishes: [
      { name: "मीन करी", sub: "केरल मछली करी", tag: "तीखा" },
      { name: "अप्पम व स्ट्यू", sub: "अप्पम और स्ट्यू", tag: "प्रीमियम" },
      { name: "गोभी थोरन", sub: "नारियल भुजिया", tag: "शाकाहारी" },
      { name: "पुट्टु व कडला", sub: "स्टीम्ड राइस केक", tag: "ट्रेंडिंग" },
    ],
    tabs: { home: "होम", recipes: "रेसिपी", ai: "शेफ", fav: "पसंदीदा", more: "और" },
    recipe: {
      results: "खोज परिणाम",
      noResults: "कोई रेसिपी नहीं मिली",
      askAi: "शेफ से रेसिपी बनवाएँ",
      generating: "शेफ रेसिपी बना रहा है...",
      aiGenerated: "स्मार्ट रेसिपी",
      error: "रेसिपी नहीं बन पाई। फिर कोशिश करें।",
      ingredients: "सामग्री",
      steps: "बनाने की विधि",
      cookTime: "कुल समय",
      difficulty: "कठिनाई",
      easy: "आसान",
      medium: "मध्यम",
      hard: "कठिन",
      back: "वापस",
    },

    fontClass: "",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ml");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("adukkala_lang") as Lang | null;
      if (saved && dicts[saved]) setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("adukkala_lang", l); } catch {}
  };

  return <I18nCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
