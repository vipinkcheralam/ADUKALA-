import type { Lang } from "@/lib/i18n";

export type SubstituteItem = {
  slug: string;
  emoji: string;
  i18n: Record<Lang, { name: string; note: string; options: { name: string; ratio: string }[] }>;
};

export const SUBSTITUTES: SubstituteItem[] = [
  {
    slug: "curd",
    emoji: "🥛",
    i18n: {
      ml: { name: "തൈര്", note: "പുളിരസത്തിനും മൃദുത്വത്തിനും", options: [{ name: "മോര്", ratio: "1 കപ്പ് = 1 കപ്പ്" }, { name: "നാരങ്ങാനീര് + പാൽ", ratio: "1 ടീസ്പൂൺ + 1 കപ്പ്" }, { name: "തേങ്ങാപ്പാൽ + നാരങ്ങ", ratio: "1 കപ്പ് + 1 ടീസ്പൂൺ" }] },
      en: { name: "Curd", note: "For tang and tenderness", options: [{ name: "Buttermilk", ratio: "1 cup = 1 cup" }, { name: "Lemon juice + milk", ratio: "1 tsp + 1 cup" }, { name: "Coconut milk + lemon", ratio: "1 cup + 1 tsp" }] },
      hi: { name: "दही", note: "खट्टापन और नरमी के लिए", options: [{ name: "छाछ", ratio: "1 कप = 1 कप" }, { name: "नींबू + दूध", ratio: "1 छोटा चम्मच + 1 कप" }, { name: "नारियल दूध + नींबू", ratio: "1 कप + 1 छोटा चम्मच" }] },
    },
  },
  {
    slug: "milk",
    emoji: "🥛",
    i18n: {
      ml: { name: "പാൽ", note: "കറികൾക്കും പായസത്തിനും", options: [{ name: "തേങ്ങാപ്പാൽ", ratio: "1 കപ്പ് = 1 കപ്പ്" }, { name: "കശുവണ്ടി പാൽ", ratio: "1 കപ്പ് = 1 കപ്പ്" }, { name: "പാൽപ്പൊടി + വെള്ളം", ratio: "3 ടേബിൾസ്പൂൺ + 1 കപ്പ്" }] },
      en: { name: "Milk", note: "For curries and payasam", options: [{ name: "Coconut milk", ratio: "1 cup = 1 cup" }, { name: "Cashew milk", ratio: "1 cup = 1 cup" }, { name: "Milk powder + water", ratio: "3 tbsp + 1 cup" }] },
      hi: { name: "दूध", note: "करी और खीर के लिए", options: [{ name: "नारियल दूध", ratio: "1 कप = 1 कप" }, { name: "काजू दूध", ratio: "1 कप = 1 कप" }, { name: "दूध पाउडर + पानी", ratio: "3 बड़े चम्मच + 1 कप" }] },
    },
  },
  {
    slug: "cashew",
    emoji: "🥜",
    i18n: {
      ml: { name: "കശുവണ്ടി", note: "കട്ടിയുള്ള ഗ്രേവിക്ക്", options: [{ name: "കടലപ്പരിപ്പ് (വേവിച്ചത്)", ratio: "10 കശുവണ്ടി = 2 ടേബിൾസ്പൂൺ" }, { name: "വെളുത്ത എള്ള്", ratio: "1:1" }, { name: "തേങ്ങ ചിരകിയത്", ratio: "10 കശുവണ്ടി = 3 ടേബിൾസ്പൂൺ" }] },
      en: { name: "Cashew", note: "For thick, creamy gravy", options: [{ name: "Boiled chana dal", ratio: "10 cashews = 2 tbsp" }, { name: "White sesame", ratio: "1:1" }, { name: "Grated coconut", ratio: "10 cashews = 3 tbsp" }] },
      hi: { name: "काजू", note: "गाढ़ी ग्रेवी के लिए", options: [{ name: "उबली चना दाल", ratio: "10 काजू = 2 बड़े चम्मच" }, { name: "सफेद तिल", ratio: "1:1" }, { name: "कसा नारियल", ratio: "10 काजू = 3 बड़े चम्मच" }] },
    },
  },
  {
    slug: "oats",
    emoji: "🌾",
    i18n: {
      ml: { name: "ഓട്സ്", note: "പ്രഭാതഭക്ഷണത്തിനും കട്ടിക്കും", options: [{ name: "റവ (സൂജി)", ratio: "1 കപ്പ് = 1 കപ്പ്" }, { name: "അവൽ", ratio: "1 കപ്പ് = 1 കപ്പ്" }, { name: "ഗോതമ്പ് റവ", ratio: "1 കപ്പ് = ¾ കപ്പ്" }] },
      en: { name: "Oats", note: "For breakfast and thickening", options: [{ name: "Rava (semolina)", ratio: "1 cup = 1 cup" }, { name: "Poha (flattened rice)", ratio: "1 cup = 1 cup" }, { name: "Broken wheat", ratio: "1 cup = ¾ cup" }] },
      hi: { name: "ओट्स", note: "नाश्ते और गाढ़ेपन के लिए", options: [{ name: "रवा (सूजी)", ratio: "1 कप = 1 कप" }, { name: "पोहा", ratio: "1 कप = 1 कप" }, { name: "दलिया", ratio: "1 कप = ¾ कप" }] },
    },
  },
  {
    slug: "ghee",
    emoji: "🧈",
    i18n: {
      ml: { name: "നെയ്യ്", note: "സ്വാദിനും മണത്തിനും", options: [{ name: "വെളിച്ചെണ്ണ", ratio: "1:1" }, { name: "വെണ്ണ", ratio: "1 ടേബിൾസ്പൂൺ = 1¼ ടേബിൾസ്പൂൺ" }, { name: "എള്ളെണ്ണ", ratio: "1:1" }] },
      en: { name: "Ghee", note: "For aroma and richness", options: [{ name: "Coconut oil", ratio: "1:1" }, { name: "Butter", ratio: "1 tbsp = 1¼ tbsp" }, { name: "Sesame oil", ratio: "1:1" }] },
      hi: { name: "घी", note: "स्वाद और खुशबू के लिए", options: [{ name: "नारियल तेल", ratio: "1:1" }, { name: "मक्खन", ratio: "1 बड़ा चम्मच = 1¼" }, { name: "तिल का तेल", ratio: "1:1" }] },
    },
  },
  {
    slug: "tamarind",
    emoji: "🟤",
    i18n: {
      ml: { name: "പുളി", note: "പുളിരസത്തിന്", options: [{ name: "കുടംപുളി", ratio: "1 നെല്ലിക്കാ വലുപ്പം = 2 കഷ്ണം" }, { name: "നാരങ്ങാനീര്", ratio: "= 1½ ടേബിൾസ്പൂൺ" }, { name: "തക്കാളി", ratio: "= 1 വലിയ തക്കാളി" }] },
      en: { name: "Tamarind", note: "For sourness", options: [{ name: "Kudampuli (gambooge)", ratio: "1 lime-size = 2 pieces" }, { name: "Lemon juice", ratio: "= 1½ tbsp" }, { name: "Tomato", ratio: "= 1 large tomato" }] },
      hi: { name: "इमली", note: "खट्टेपन के लिए", options: [{ name: "कोकम", ratio: "1 नींबू आकार = 2 टुकड़े" }, { name: "नींबू रस", ratio: "= 1½ बड़े चम्मच" }, { name: "टमाटर", ratio: "= 1 बड़ा टमाटर" }] },
    },
  },
  {
    slug: "coconut-oil",
    emoji: "🥥",
    i18n: {
      ml: { name: "വെളിച്ചെണ്ണ", note: "കേരള രുചിക്ക്", options: [{ name: "എള്ളെണ്ണ", ratio: "1:1" }, { name: "നെയ്യ്", ratio: "1:1" }, { name: "സൺഫ്ലവർ ഓയിൽ", ratio: "1:1" }] },
      en: { name: "Coconut oil", note: "For Kerala flavour", options: [{ name: "Sesame oil", ratio: "1:1" }, { name: "Ghee", ratio: "1:1" }, { name: "Sunflower oil", ratio: "1:1" }] },
      hi: { name: "नारियल तेल", note: "केरल स्वाद के लिए", options: [{ name: "तिल का तेल", ratio: "1:1" }, { name: "घी", ratio: "1:1" }, { name: "सूरजमुखी तेल", ratio: "1:1" }] },
    },
  },
  {
    slug: "sugar",
    emoji: "🍚",
    i18n: {
      ml: { name: "പഞ്ചസാര", note: "മധുരത്തിന്", options: [{ name: "ശർക്കര", ratio: "1 കപ്പ് = 1 കപ്പ്" }, { name: "തേൻ", ratio: "1 കപ്പ് = ¾ കപ്പ്" }, { name: "ഈന്തപ്പഴം പേസ്റ്റ്", ratio: "1 കപ്പ് = 1 കപ്പ്" }] },
      en: { name: "Sugar", note: "For sweetness", options: [{ name: "Jaggery", ratio: "1 cup = 1 cup" }, { name: "Honey", ratio: "1 cup = ¾ cup" }, { name: "Date paste", ratio: "1 cup = 1 cup" }] },
      hi: { name: "चीनी", note: "मिठास के लिए", options: [{ name: "गुड़", ratio: "1 कप = 1 कप" }, { name: "शहद", ratio: "1 कप = ¾ कप" }, { name: "खजूर पेस्ट", ratio: "1 कप = 1 कप" }] },
    },
  },
];

export function searchSubstitutes(query: string, lang: Lang) {
  const q = query.trim().toLowerCase();
  if (!q) return SUBSTITUTES;
  return SUBSTITUTES.filter((s) => {
    const all = [s.slug, ...(["ml", "en", "hi"] as Lang[]).map((l) => s.i18n[l].name)].join(" ").toLowerCase();
    return all.includes(q) || s.i18n[lang].options.some((o) => o.name.toLowerCase().includes(q));
  });
}

export const SUB_I18N: Record<Lang, { title: string; sub: string; placeholder: string; popular: string; noResults: string; alternatives: string; back: string }> = {
  ml: { title: "പകരം ചേരുവകൾ", sub: "സാധനം തീർന്നോ? പകരം എന്ത് ഉപയോഗിക്കാം എന്നറിയൂ", placeholder: "ചേരുവ തിരയൂ...", popular: "സാധാരണ ചേരുവകൾ", noResults: "ഫലങ്ങളൊന്നുമില്ല", alternatives: "പകരം ഉപയോഗിക്കാം", back: "തിരികെ" },
  en: { title: "Ingredient Substitute", sub: "Out of something? Find what to use instead", placeholder: "Search an ingredient...", popular: "Common ingredients", noResults: "No results found", alternatives: "Use instead", back: "Back" },
  hi: { title: "सामग्री विकल्प", sub: "सामग्री खत्म? जानें किसका उपयोग करें", placeholder: "सामग्री खोजें...", popular: "सामान्य सामग्री", noResults: "कोई परिणाम नहीं", alternatives: "इसके बदले", back: "वापस" },
};
