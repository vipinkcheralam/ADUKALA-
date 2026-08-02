import type { Lang } from "@/lib/i18n";

export type FestivalCategory =
  | "all"
  | "sadhya"
  | "payasam"
  | "snacks"
  | "sweets"
  | "mains"
  | "drinks";

type FestStrings = {
  bannerBadgeActive: string;
  bannerBadgeUpcoming: string;
  bannerCta: string;
  daysLeft: (n: number) => string;
  startsIn: (n: number) => string;
  today: string;
  hubSearch: string;
  recipesCount: (n: number) => string;
  noResults: string;
  categories: Record<FestivalCategory, string>;
  back: string;
  explore: string;
  otherFestivals: string;
  ingredients: string;
  steps: string;
};

export const festivalStrings: Record<Lang, FestStrings> = {
  ml: {
    bannerBadgeActive: "ഫെസ്റ്റിവൽ സ്പെഷ്യൽ",
    bannerBadgeUpcoming: "ഉടൻ വരുന്നു",
    bannerCta: "വിഭവങ്ങൾ കാണുക",
    daysLeft: (n) => `${n} ദിവസം കൂടി`,
    startsIn: (n) => `${n} ദിവസത്തിനുള്ളിൽ`,
    today: "ഇന്ന് ആഘോഷം!",
    hubSearch: "വിഭവം തിരയുക...",
    recipesCount: (n) => `${n} വിഭവങ്ങൾ`,
    noResults: "വിഭവം കണ്ടെത്തിയില്ല",
    categories: {
      all: "എല്ലാം",
      sadhya: "സദ്യ വിഭവങ്ങൾ",
      payasam: "പായസങ്ങൾ",
      snacks: "പലഹാരങ്ങൾ",
      sweets: "മധുരപലഹാരം",
      mains: "മെയിൻ കോഴ്സ്",
      drinks: "പാനീയങ്ങൾ",
    },
    back: "തിരികെ",
    explore: "ഫെസ്റ്റിവൽ ഹബ്",
    otherFestivals: "മറ്റ് ആഘോഷങ്ങൾ",
    ingredients: "ചേരുവകൾ",
    steps: "തയ്യാറാക്കുന്ന വിധം",
  },
  en: {
    bannerBadgeActive: "Festival Special",
    bannerBadgeUpcoming: "Coming soon",
    bannerCta: "Explore recipes",
    daysLeft: (n) => `${n} days left`,
    startsIn: (n) => `Starts in ${n} days`,
    today: "Celebrating today!",
    hubSearch: "Search festival dishes...",
    recipesCount: (n) => `${n} recipes`,
    noResults: "No dishes found",
    categories: {
      all: "All",
      sadhya: "Sadhya items",
      payasam: "Payasams",
      snacks: "Snacks",
      sweets: "Sweets",
      mains: "Main course",
      drinks: "Drinks",
    },
    back: "Back",
    explore: "Festival Hub",
    otherFestivals: "Other festivals",
    ingredients: "Ingredients",
    steps: "Method",
  },
  hi: {
    bannerBadgeActive: "त्योहार स्पेशल",
    bannerBadgeUpcoming: "जल्द आ रहा है",
    bannerCta: "व्यंजन देखें",
    daysLeft: (n) => `${n} दिन बाकी`,
    startsIn: (n) => `${n} दिनों में शुरू`,
    today: "आज उत्सव है!",
    hubSearch: "व्यंजन खोजें...",
    recipesCount: (n) => `${n} व्यंजन`,
    noResults: "कोई व्यंजन नहीं मिला",
    categories: {
      all: "सभी",
      sadhya: "सद्या व्यंजन",
      payasam: "पायसम",
      snacks: "नाश्ता",
      sweets: "मिठाइयाँ",
      mains: "मुख्य व्यंजन",
      drinks: "पेय",
    },
    back: "वापस",
    explore: "त्योहार हब",
    otherFestivals: "अन्य त्योहार",
    ingredients: "सामग्री",
    steps: "विधि",
  },
};
