import type { Lang } from "@/lib/i18n";
import type { FestivalCategory } from "@/lib/festival-i18n";
import onamImg from "@/assets/festival-onam.jpg";
import deepavaliImg from "@/assets/festival-deepavali.jpg";
import christmasImg from "@/assets/festival-christmas.jpg";
import vishuImg from "@/assets/festival-vishu.jpg";
import meenCurry from "@/assets/meen-curry.jpg";
import appam from "@/assets/appam.jpg";
import thoran from "@/assets/thoran.jpg";
import puttu from "@/assets/puttu.jpg";
import biryani from "@/assets/biryani.jpg";
import dosa from "@/assets/dosa.jpg";
import sambar from "@/assets/sambar.jpg";
import payasam from "@/assets/payasam.jpg";
import { DISH_IMAGES } from "@/lib/dish-images";


export type FestivalId = "vishu" | "onam" | "deepavali" | "christmas";

export type FestivalRecipe = {
  id: string;
  festival: FestivalId;
  category: Exclude<FestivalCategory, "all">;
  image: string;
  time: string;
  rating: number;
  veg: boolean;
  i18n: Record<Lang, { name: string; sub: string; ingredients: string[]; steps: string[] }>;
};

export type Festival = {
  id: FestivalId;
  image: string;
  /** inclusive window in the calendar year: [month, day] */
  start: [number, number];
  end: [number, number];
  categories: Exclude<FestivalCategory, "all">[];
  /** tailwind gradient classes for the banner / header tint */
  gradient: string;
  accent: string;
  i18n: Record<Lang, { name: string; tagline: string; bannerTitle: string; bannerSub: string; about: string }>;
};

/* ------------------------------------------------------------------ */
/* Festival calendar                                                    */
/* ------------------------------------------------------------------ */

export const FESTIVALS: Festival[] = [
  {
    id: "vishu",
    image: vishuImg,
    start: [4, 1],
    end: [4, 25],
    categories: ["sadhya", "payasam", "snacks", "mains"],
    gradient: "from-[#f7b733] via-[#fc913a] to-[#f25c05]",
    accent: "#f2a007",
    i18n: {
      ml: {
        name: "വിഷു",
        tagline: "വിഷുക്കണിയും വിഷു സദ്യയും",
        bannerTitle: "വിഷു സ്പെഷ്യൽ — 40+ പരമ്പരാഗത വിഭവങ്ങൾ",
        bannerSub: "കണി കണ്ട് സദ്യയൊരുക്കാം",
        about: "വിഷുക്കട്ട മുതൽ മാമ്പഴ പുളിശ്ശേരി വരെ — വിഷു സദ്യയുടെ പൂർണ്ണ ശേഖരം.",
      },
      en: {
        name: "Vishu",
        tagline: "Vishukkani & the Vishu sadya",
        bannerTitle: "Vishu Special — 40+ traditional dishes",
        bannerSub: "Set the kani, then cook the feast",
        about: "From Vishu katta to mambazha pulissery — the complete Vishu sadya collection.",
      },
      hi: {
        name: "विशु",
        tagline: "विशुक्कणि और विशु सद्या",
        bannerTitle: "विशु स्पेशल — 40+ पारंपरिक व्यंजन",
        bannerSub: "कणि सजाएँ, फिर दावत बनाएँ",
        about: "विशु कट्टा से मांबज़ा पुलिश्शेरी तक — पूरा विशु सद्या संग्रह।",
      },
    },
  },
  {
    id: "onam",
    image: onamImg,
    start: [8, 10],
    end: [9, 20],
    categories: ["sadhya", "payasam", "snacks", "mains"],
    gradient: "from-[#f9c449] via-[#f2761b] to-[#c2185b]",
    accent: "#e8590c",
    i18n: {
      ml: {
        name: "ഓണം",
        tagline: "പൂക്കളവും ഓണസദ്യയും",
        bannerTitle: "ഓണം സ്പെഷ്യൽ — 50+ പരമ്പരാഗത വിഭവങ്ങൾ",
        bannerSub: "സദ്യ വിഭവങ്ങൾ, പായസങ്ങൾ, പലഹാരങ്ങൾ",
        about: "അവിയൽ മുതൽ അട പ്രഥമൻ വരെ — ഓണസദ്യയുടെ എല്ലാ വിഭവങ്ങളും ഒരിടത്ത്.",
      },
      en: {
        name: "Onam",
        tagline: "Pookalam & the grand Onasadya",
        bannerTitle: "Onam Special — 50+ traditional dishes",
        bannerSub: "Sadhya items, payasams & snacks",
        about: "From avial to ada pradhaman — every Onasadya dish in one place.",
      },
      hi: {
        name: "ओणम",
        tagline: "पूक्कलम और ओणसद्या",
        bannerTitle: "ओणम स्पेशल — 50+ पारंपरिक व्यंजन",
        bannerSub: "सद्या व्यंजन, पायसम और नाश्ते",
        about: "अवियल से अड़ा प्रधमन तक — पूरी ओणसद्या एक जगह।",
      },
    },
  },
  {
    id: "deepavali",
    image: deepavaliImg,
    start: [10, 10],
    end: [11, 15],
    categories: ["sweets", "snacks", "mains", "drinks"],
    gradient: "from-[#ff9a3c] via-[#d6336c] to-[#6741d9]",
    accent: "#d6336c",
    i18n: {
      ml: {
        name: "ദീപാവലി",
        tagline: "വെളിച്ചത്തിൻ്റെ ഉത്സവം",
        bannerTitle: "ദീപാവലി സ്പെഷ്യൽ — 40+ മധുരവും പലഹാരവും",
        bannerSub: "ലഡ്ഡു, മുറുക്ക്, മിക്സ്ചർ & കൂടുതൽ",
        about: "വീട്ടിൽ തന്നെ ഉണ്ടാക്കാവുന്ന ദീപാവലി മധുരപലഹാരങ്ങളുടെ ശേഖരം.",
      },
      en: {
        name: "Deepavali",
        tagline: "The festival of lights",
        bannerTitle: "Deepavali Special — 40+ sweets & savouries",
        bannerSub: "Laddoo, murukku, mixture & more",
        about: "A full collection of homemade Diwali sweets and crunchy savouries.",
      },
      hi: {
        name: "दीपावली",
        tagline: "रोशनी का त्योहार",
        bannerTitle: "दीपावली स्पेशल — 40+ मिठाइयाँ और नमकीन",
        bannerSub: "लड्डू, मुरुक्कू, मिक्सचर और बहुत कुछ",
        about: "घर पर बनने वाली दीवाली मिठाइयों और नमकीन का पूरा संग्रह।",
      },
    },
  },
  {
    id: "christmas",
    image: christmasImg,
    start: [12, 1],
    end: [12, 31],
    categories: ["sweets", "mains", "snacks", "drinks"],
    gradient: "from-[#2f9e44] via-[#c92a2a] to-[#7048e8]",
    accent: "#c92a2a",
    i18n: {
      ml: {
        name: "ക്രിസ്മസ്",
        tagline: "കേക്കും കറികളും",
        bannerTitle: "ക്രിസ്മസ് സ്പെഷ്യൽ — 40+ വിഭവങ്ങൾ",
        bannerSub: "പ്ലം കേക്ക്, താറാവ് റോസ്റ്റ്, കുസ്വാർ",
        about: "നാടൻ ക്രിസ്മസ് വിരുന്നിനുള്ള കേക്കുകളും ഇറച്ചി വിഭവങ്ങളും.",
      },
      en: {
        name: "Christmas",
        tagline: "Cakes, roasts & Kuswar",
        bannerTitle: "Christmas Special — 40+ festive dishes",
        bannerSub: "Plum cake, duck roast, kuswar & more",
        about: "Everything for a Kerala Christmas table — bakes, roasts and party bites.",
      },
      hi: {
        name: "क्रिसमस",
        tagline: "केक, रोस्ट और कुस्वार",
        bannerTitle: "क्रिसमस स्पेशल — 40+ व्यंजन",
        bannerSub: "प्लम केक, डक रोस्ट, कुस्वार",
        about: "केरल क्रिसमस दावत के लिए केक, रोस्ट और स्नैक्स।",
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/* Date-based scheduler                                                 */
/* ------------------------------------------------------------------ */

const dayOfYear = (m: number, d: number) => m * 31 + d;

export function isFestivalActive(f: Festival, date = new Date()) {
  const today = dayOfYear(date.getMonth() + 1, date.getDate());
  return today >= dayOfYear(...f.start) && today <= dayOfYear(...f.end);
}

/** Whole days from `date` until the festival window starts (0 while active). */
export function daysUntil(f: Festival, date = new Date()) {
  const year = date.getFullYear();
  const today = new Date(year, date.getMonth(), date.getDate()).getTime();
  let start = new Date(year, f.start[0] - 1, f.start[1]).getTime();
  const end = new Date(year, f.end[0] - 1, f.end[1]).getTime();
  if (today > end) start = new Date(year + 1, f.start[0] - 1, f.start[1]).getTime();
  return Math.max(0, Math.round((start - today) / 86_400_000));
}

/** Days remaining in the active window. */
export function daysRemaining(f: Festival, date = new Date()) {
  const year = date.getFullYear();
  const today = new Date(year, date.getMonth(), date.getDate()).getTime();
  const end = new Date(year, f.end[0] - 1, f.end[1]).getTime();
  return Math.max(0, Math.round((end - today) / 86_400_000));
}

/**
 * The festival the app should promote right now: the one whose window
 * contains today, otherwise the next one on the calendar (wrapping years).
 */
export function getCurrentFestival(date = new Date()): { festival: Festival; active: boolean } {
  const active = FESTIVALS.find((f) => isFestivalActive(f, date));
  if (active) return { festival: active, active: true };
  const next = [...FESTIVALS].sort((a, b) => daysUntil(a, date) - daysUntil(b, date))[0];
  return { festival: next, active: false };
}

export const findFestival = (id: string) => FESTIVALS.find((f) => f.id === id);

/* ------------------------------------------------------------------ */
/* Recipe repository                                                    */
/* ------------------------------------------------------------------ */

const POOL: Record<Exclude<FestivalCategory, "all">, string[]> = {
  sadhya: [thoran, sambar, appam, puttu],
  payasam: [payasam],
  snacks: [puttu, dosa, appam],
  sweets: [payasam, puttu],
  mains: [biryani, meenCurry, dosa, appam],
  drinks: [payasam, appam],
};

type Cat = Exclude<FestivalCategory, "all">;

/** compact row: "id|en|ml|hi|category|time|rating|veg" */
type Row = string;

const templates: Record<Lang, Record<Cat, { ing: (n: string) => string[]; steps: (n: string) => string[] }>> = {
  en: {
    sadhya: {
      ing: (n) => [`Main vegetables for ${n} — 300 g, cut lengthwise`, "Grated coconut 1 cup", "Green chilli 3, cumin 1 tsp", "Turmeric 1/2 tsp, salt to taste", "Coconut oil 2 tbsp, curry leaves 1 sprig"],
      steps: (n) => [
        `Cook the vegetables for ${n} with turmeric, salt and a little water until just tender.`,
        "Grind coconut with green chilli and cumin to a coarse paste.",
        "Fold the coconut paste in, cover and cook on low for 5 minutes.",
        "Finish with raw coconut oil and curry leaves, toss and rest before serving.",
      ],
    },
    payasam: {
      ing: (n) => [`Base for ${n} (rice ada / dal / vermicelli) 1 cup`, "Jaggery 400 g, melted and strained", "Thick coconut milk 1 cup, thin 3 cups", "Ghee 4 tbsp", "Cardamom, dry ginger, cumin 1/4 tsp each", "Cashews & coconut bits to garnish"],
      steps: (n) => [
        `Cook the base for ${n} in thin coconut milk until soft.`,
        "Add the strained jaggery syrup and simmer till it thickens and darkens.",
        "Stir in ghee little by little until the payasam leaves the sides of the pan.",
        "Turn off, add thick coconut milk and spice powders; garnish with ghee-fried cashews.",
      ],
    },
    snacks: {
      ing: (n) => [`Rice flour / batter base for ${n} 2 cups`, "Jaggery or sugar 3/4 cup (for sweet versions)", "Grated coconut 1/2 cup", "Cardamom 1/4 tsp, salt a pinch", "Coconut oil for frying"],
      steps: (n) => [
        `Mix the batter for ${n} to a thick dropping consistency and rest 20 minutes.`,
        "Heat coconut oil to medium; test with a drop of batter.",
        "Fry in small batches until golden and crisp, turning once.",
        "Drain on paper and cool completely before storing airtight.",
      ],
    },
    sweets: {
      ing: (n) => [`Main base for ${n} (flour / nuts / milk solids) 2 cups`, "Sugar 1.5 cups", "Ghee 1/2 cup", "Milk 1/2 cup", "Cardamom 1/2 tsp, saffron a pinch", "Chopped nuts to garnish"],
      steps: (n) => [
        `Roast the base for ${n} in ghee on low heat until aromatic.`,
        "Make a one-string sugar syrup separately.",
        "Combine, stirring constantly until the mix thickens and leaves the pan.",
        "Pour into a greased tray or shape into balls; garnish with nuts and cool.",
      ],
    },
    mains: {
      ing: (n) => [`Main protein or vegetable for ${n} 500 g`, "Onion 2, tomato 2, ginger-garlic paste 1 tbsp", "Chilli, coriander, turmeric & garam masala", "Coconut milk or curd 1 cup", "Oil 3 tbsp, curry leaves, coriander leaves"],
      steps: (n) => [
        `Marinate the main ingredient for ${n} with turmeric, chilli and salt for 20 minutes.`,
        "Sauté onions till golden, add ginger-garlic and tomato, cook to a thick masala.",
        "Add powdered spices, then the marinated ingredient, and sear well.",
        "Pour in coconut milk, simmer covered until cooked through and finish with fresh herbs.",
      ],
    },
    drinks: {
      ing: (n) => [`Base liquid for ${n} (milk / water / juice) 1 litre`, "Sugar or jaggery 3/4 cup", "Cardamom, cinnamon, clove", "Nuts or fruit as required", "Ice or serve warm"],
      steps: (n) => [
        `Warm the base for ${n} with the whole spices for 5 minutes.`,
        "Sweeten and stir until fully dissolved.",
        "Blend in the nuts or fruit and strain if needed.",
        "Chill or serve hot in festive glasses.",
      ],
    },
  },
  ml: {
    sadhya: {
      ing: (n) => [`${n} ഉണ്ടാക്കാൻ പച്ചക്കറികൾ 300 ഗ്രാം`, "തേങ്ങ ചിരകിയത് 1 കപ്പ്", "പച്ചമുളക് 3, ജീരകം 1 ടീസ്പൂൺ", "മഞ്ഞൾപൊടി 1/2 ടീസ്പൂൺ, ഉപ്പ്", "വെളിച്ചെണ്ണ 2 ടേബിൾസ്പൂൺ, കറിവേപ്പില"],
      steps: (n) => [
        `${n}-നുള്ള പച്ചക്കറികൾ മഞ്ഞളും ഉപ്പും ചേർത്ത് വേവിക്കുക.`,
        "തേങ്ങ, പച്ചമുളക്, ജീരകം ചേർത്ത് ചതച്ചരയ്ക്കുക.",
        "അരച്ചത് ചേർത്ത് അടച്ചുവെച്ച് 5 മിനിറ്റ് ചെറുതീയിൽ വേവിക്കുക.",
        "പച്ച വെളിച്ചെണ്ണയും കറിവേപ്പിലയും ചേർത്ത് ഇളക്കി വിളമ്പുക.",
      ],
    },
    payasam: {
      ing: (n) => [`${n}-നുള്ള അട / പരിപ്പ് / സേമിയ 1 കപ്പ്`, "ശർക്കര 400 ഗ്രാം, ഉരുക്കി അരിച്ചത്", "ഒന്നാം പാൽ 1 കപ്പ്, രണ്ടാം പാൽ 3 കപ്പ്", "നെയ്യ് 4 ടേബിൾസ്പൂൺ", "ഏലക്ക, ചുക്ക്, ജീരകപ്പൊടി", "അണ്ടിപ്പരിപ്പ്, തേങ്ങാക്കൊത്ത്"],
      steps: (n) => [
        `${n}-നുള്ള ചേരുവ രണ്ടാം പാലിൽ വേവിക്കുക.`,
        "ശർക്കരപ്പാനി ചേർത്ത് കുറുകുന്നത് വരെ ഇളക്കുക.",
        "നെയ്യ് അല്പാല്പമായി ചേർത്ത് ചീനച്ചട്ടിയിൽ നിന്ന് വിട്ടുവരുന്നത് വരെ ഇളക്കുക.",
        "തീ അണച്ച് ഒന്നാം പാലും പൊടികളും ചേർത്ത് നെയ്യിൽ വറുത്ത അണ്ടിപ്പരിപ്പ് വിതറുക.",
      ],
    },
    snacks: {
      ing: (n) => [`${n}-നുള്ള അരിപ്പൊടി / മാവ് 2 കപ്പ്`, "ശർക്കര അല്ലെങ്കിൽ പഞ്ചസാര 3/4 കപ്പ്", "തേങ്ങ ചിരകിയത് 1/2 കപ്പ്", "ഏലക്കാപ്പൊടി, ഒരു നുള്ള് ഉപ്പ്", "വറുക്കാൻ വെളിച്ചെണ്ണ"],
      steps: (n) => [
        `${n}-നുള്ള മാവ് കുഴച്ച് 20 മിനിറ്റ് വയ്ക്കുക.`,
        "വെളിച്ചെണ്ണ ചൂടാക്കി ഒരു തുള്ളി മാവിട്ട് പരിശോധിക്കുക.",
        "ചെറിയ അളവുകളായി പൊൻനിറമാകുന്നത് വരെ വറുക്കുക.",
        "എണ്ണ വാർത്ത് തണുപ്പിച്ച് ഭരണിയിൽ സൂക്ഷിക്കുക.",
      ],
    },
    sweets: {
      ing: (n) => [`${n}-നുള്ള മാവ് / പരിപ്പ് / പാൽപ്പൊടി 2 കപ്പ്`, "പഞ്ചസാര 1.5 കപ്പ്", "നെയ്യ് 1/2 കപ്പ്", "പാൽ 1/2 കപ്പ്", "ഏലക്കാപ്പൊടി, കുങ്കുമപ്പൂവ്", "അണ്ടിപ്പരിപ്പ്, ബദാം"],
      steps: (n) => [
        `${n}-നുള്ള ചേരുവ നെയ്യിൽ ചെറുതീയിൽ വറുക്കുക.`,
        "പഞ്ചസാര പാനി ഒറ്റ കമ്പിപ്പാകത്തിൽ തയ്യാറാക്കുക.",
        "രണ്ടും ചേർത്ത് ഇളക്കി കുറുകുന്നത് വരെ വേവിക്കുക.",
        "നെയ്യ് പുരട്ടിയ പാത്രത്തിലേക്ക് ഒഴിച്ച് ഉരുളകളാക്കി തണുപ്പിക്കുക.",
      ],
    },
    mains: {
      ing: (n) => [`${n}-നുള്ള മെയിൻ ചേരുവ 500 ഗ്രാം`, "സവാള 2, തക്കാളി 2, ഇഞ്ചി-വെളുത്തുള്ളി പേസ്റ്റ്", "മുളക്, മല്ലി, മഞ്ഞൾ, ഗരം മസാല", "തേങ്ങാപ്പാൽ അല്ലെങ്കിൽ തൈര് 1 കപ്പ്", "എണ്ണ, കറിവേപ്പില, മല്ലിയില"],
      steps: (n) => [
        `${n}-നുള്ള ചേരുവ മഞ്ഞളും മുളകും ഉപ്പും ചേർത്ത് 20 മിനിറ്റ് വയ്ക്കുക.`,
        "സവാള വഴറ്റി ഇഞ്ചി-വെളുത്തുള്ളിയും തക്കാളിയും ചേർത്ത് മസാല പാകമാക്കുക.",
        "പൊടികൾ ചേർത്ത ശേഷം മെയിൻ ചേരുവ ചേർത്ത് നന്നായി വഴറ്റുക.",
        "തേങ്ങാപ്പാൽ ഒഴിച്ച് അടച്ചുവെച്ച് വേവിച്ച് മല്ലിയില വിതറുക.",
      ],
    },
    drinks: {
      ing: (n) => [`${n}-നുള്ള പാൽ / വെള്ളം / ജ്യൂസ് 1 ലിറ്റർ`, "പഞ്ചസാര അല്ലെങ്കിൽ ശർക്കര 3/4 കപ്പ്", "ഏലക്ക, കറുവപ്പട്ട, ഗ്രാമ്പൂ", "പരിപ്പുകൾ അല്ലെങ്കിൽ പഴം", "ഐസ് അല്ലെങ്കിൽ ചൂടോടെ"],
      steps: (n) => [
        `${n}-നുള്ള ദ്രാവകം സുഗന്ധവ്യഞ്ജനങ്ങൾ ചേർത്ത് 5 മിനിറ്റ് ചൂടാക്കുക.`,
        "മധുരം ചേർത്ത് നന്നായി അലിയിക്കുക.",
        "പരിപ്പോ പഴമോ ചേർത്ത് അടിച്ച് അരിക്കുക.",
        "തണുപ്പിച്ചോ ചൂടോടെയോ വിളമ്പുക.",
      ],
    },
  },
  hi: {
    sadhya: {
      ing: (n) => [`${n} के लिए सब्ज़ियाँ 300 ग्राम`, "कसा नारियल 1 कप", "हरी मिर्च 3, जीरा 1 छोटा चम्मच", "हल्दी 1/2 छोटा चम्मच, नमक", "नारियल तेल 2 बड़े चम्मच, करी पत्ता"],
      steps: (n) => [
        `${n} की सब्ज़ियाँ हल्दी-नमक डालकर हल्का नरम होने तक पकाएँ।`,
        "नारियल, हरी मिर्च और जीरा को दरदरा पीस लें।",
        "पिसा मसाला मिलाकर ढककर 5 मिनट धीमी आँच पर पकाएँ।",
        "कच्चा नारियल तेल और करी पत्ता डालकर मिलाएँ और परोसें।",
      ],
    },
    payasam: {
      ing: (n) => [`${n} के लिए अड़ा / दाल / सेवई 1 कप`, "गुड़ 400 ग्राम, पिघलाकर छाना", "गाढ़ा नारियल दूध 1 कप, पतला 3 कप", "घी 4 बड़े चम्मच", "इलायची, सोंठ, जीरा पाउडर", "काजू और नारियल के टुकड़े"],
      steps: (n) => [
        `${n} की सामग्री पतले नारियल दूध में नरम होने तक पकाएँ।`,
        "छना हुआ गुड़ डालकर गाढ़ा होने तक पकाएँ।",
        "थोड़ा-थोड़ा घी डालकर तब तक चलाएँ जब तक मिश्रण कड़ाही छोड़ने लगे।",
        "आँच बंद कर गाढ़ा नारियल दूध व मसाले मिलाएँ, घी में भुने काजू डालें।",
      ],
    },
    snacks: {
      ing: (n) => [`${n} के लिए चावल का आटा / घोल 2 कप`, "गुड़ या चीनी 3/4 कप", "कसा नारियल 1/2 कप", "इलायची, चुटकी भर नमक", "तलने के लिए नारियल तेल"],
      steps: (n) => [
        `${n} का घोल गाढ़ा तैयार कर 20 मिनट रखें।`,
        "तेल मध्यम आँच पर गरम करें और एक बूँद घोल से जाँचें।",
        "थोड़ा-थोड़ा करके सुनहरा और कुरकुरा होने तक तलें।",
        "तेल निथारकर ठंडा करें और एयरटाइट डिब्बे में रखें।",
      ],
    },
    sweets: {
      ing: (n) => [`${n} के लिए आटा / मेवा / मावा 2 कप`, "चीनी 1.5 कप", "घी 1/2 कप", "दूध 1/2 कप", "इलायची, केसर", "कटे मेवे"],
      steps: (n) => [
        `${n} की मुख्य सामग्री घी में धीमी आँच पर भूनें।`,
        "अलग से एक तार की चाशनी बनाएँ।",
        "दोनों मिलाकर लगातार चलाते हुए गाढ़ा करें।",
        "घी लगी थाली में फैलाएँ या लड्डू बाँधें, मेवे डालकर ठंडा करें।",
      ],
    },
    mains: {
      ing: (n) => [`${n} के लिए मुख्य सामग्री 500 ग्राम`, "प्याज़ 2, टमाटर 2, अदरक-लहसुन पेस्ट", "मिर्च, धनिया, हल्दी, गरम मसाला", "नारियल दूध या दही 1 कप", "तेल, करी पत्ता, हरा धनिया"],
      steps: (n) => [
        `${n} की मुख्य सामग्री को हल्दी, मिर्च व नमक में 20 मिनट मैरिनेट करें।`,
        "प्याज़ सुनहरा भूनें, अदरक-लहसुन व टमाटर डालकर मसाला पकाएँ।",
        "पाउडर मसाले डालें, फिर मुख्य सामग्री डालकर अच्छे से भूनें।",
        "नारियल दूध डालकर ढककर पकाएँ और हरा धनिया डालें।",
      ],
    },
    drinks: {
      ing: (n) => [`${n} के लिए दूध / पानी / जूस 1 लीटर`, "चीनी या गुड़ 3/4 कप", "इलायची, दालचीनी, लौंग", "मेवे या फल", "बर्फ या गरम परोसें"],
      steps: (n) => [
        `${n} के लिए तरल को साबुत मसालों के साथ 5 मिनट गरम करें।`,
        "मिठास डालकर पूरी तरह घोलें।",
        "मेवे या फल मिलाकर ब्लेंड करें और छान लें।",
        "ठंडा या गरम, उत्सव के गिलास में परोसें।",
      ],
    },
  },
};

let poolIndex = 0;

function buildRecipes(festival: FestivalId, rows: Row[]): FestivalRecipe[] {
  return rows.map((row) => {
    const [id, en, ml, hi, cat, time, rating, veg, subEn, subMl, subHi] = row.split("|");
    const category = cat as Cat;
    const pool = POOL[category];
    const image = DISH_IMAGES[id] ?? pool[poolIndex++ % pool.length];

    const names: Record<Lang, string> = { en, ml, hi };
    const subs: Record<Lang, string> = { en: subEn ?? en, ml: subMl ?? en, hi: subHi ?? en };
    const langs: Lang[] = ["ml", "en", "hi"];
    const i18n = Object.fromEntries(
      langs.map((l) => [
        l,
        {
          name: names[l],
          sub: subs[l],
          ingredients: templates[l][category].ing(names[l]),
          steps: templates[l][category].steps(names[l]),
        },
      ]),
    ) as FestivalRecipe["i18n"];
    return {
      id,
      festival,
      category,
      image,
      time: `${time} min`,
      rating: Number(rating),
      veg: veg === "1",
      i18n,
    };
  });
}

const ONAM_ROWS: Row[] = [
  "avial|Avial|അവിയൽ|अवियल|sadhya|30|4.9|1|Mixed veg in coconut & curd|മിക്സഡ് വെജ് തേങ്ങാക്കൂട്ട്|मिली सब्ज़ी नारियल में",
  "sambar|Onam Sambar|ഓണം സാമ്പാർ|ओणम सांबर|sadhya|40|4.9|1|Sadhya style sambar|സദ്യ സ്റ്റൈൽ സാമ്പാർ|सद्या स्टाइल सांबर",
  "parippu-curry|Parippu Curry|പരിപ്പ് കറി|परिप्पु करी|sadhya|20|4.8|1|First course dal|ആദ്യ വിളമ്പ്|पहला दाल",
  "kaalan|Kaalan|കാളൻ|कालन|sadhya|35|4.7|1|Yam & plantain in curd|ചേനയും കായയും|सूरन-केला दही में",
  "olan|Olan|ഓലൻ|ओलन|sadhya|25|4.7|1|Pumpkin & cowpea in coconut milk|മത്തങ്ങയും പയറും|कद्दू-लोबिया",
  "erissery|Erissery|എരിശ്ശേരി|एरिश्शेरी|sadhya|30|4.8|1|Pumpkin & bean with roasted coconut|വറുത്തരച്ച കൂട്ട്|भुना नारियल",
  "cabbage-thoran|Cabbage Thoran|കാബേജ് തോരൻ|पत्तागोभी थोरन|sadhya|20|4.6|1|Coconut stir fry|തേങ്ങ ചേർത്ത്|नारियल भुर्जी",
  "beans-thoran|Beans Thoran|ബീൻസ് തോരൻ|बीन्स थोरन|sadhya|20|4.6|1|Crunchy beans|ക്രഞ്ചി ബീൻസ്|कुरकुरी बीन्स",
  "cheera-thoran|Cheera Thoran|ചീര തോരൻ|चीरा थोरन|sadhya|18|4.5|1|Red spinach|ചുവന്ന ചീര|लाल चौलाई",
  "pineapple-pachadi|Pineapple Pachadi|പൈനാപ്പിൾ പച്ചടി|पाइनएप्पल पचड़ी|sadhya|20|4.8|1|Sweet & sour|മധുരവും പുളിയും|खट्टा-मीठा",
  "cucumber-kichadi|Cucumber Kichadi|വെള്ളരി കിച്ചടി|खीरा किचड़ी|sadhya|18|4.6|1|Curd based|തൈര് ചേർത്ത്|दही वाला",
  "beetroot-pachadi|Beetroot Pachadi|ബീറ്റ്റൂട്ട് പച്ചടി|चुकंदर पचड़ी|sadhya|20|4.6|1|Pink & creamy|പിങ്ക് നിറം|गुलाबी",
  "inji-puli|Inji Puli|ഇഞ്ചിപ്പുളി|इंजी पुली|sadhya|25|4.7|1|Ginger tamarind relish|പുളിയിഞ്ചി|अदरक-इमली",
  "naranga-curry|Naranga Curry|നാരങ്ങാ കറി|नींबू करी|sadhya|15|4.5|1|Lime pickle|ചെറുനാരങ്ങ|नींबू अचार",
  "manga-achar|Mango Pickle|മാങ്ങാ അച്ചാർ|आम का अचार|sadhya|20|4.6|1|Raw mango|പച്ചമാങ്ങ|कच्चा आम",
  "rasam|Sadhya Rasam|രസം|रसम|sadhya|20|4.7|1|Peppery finish|കുരുമുളക് രസം|काली मिर्च",
  "pulissery|Pulissery|പുളിശ്ശേരി|पुलिश्शेरी|sadhya|25|4.7|1|Curd curry|തൈര് കറി|दही करी",
  "koottukari|Koottukari|കൂട്ടുകറി|कूट्टुकरी|sadhya|30|4.6|1|Yam & chana|ചേനയും കടലയും|सूरन-चना",
  "moru-curry|Moru Curry|മോര് കറി|मोरु करी|sadhya|15|4.6|1|Spiced buttermilk|സംഭാരം കറി|मसाला छाछ",
  "pappadam|Pappadam|പപ്പടം|पापड़म|sadhya|10|4.8|1|Crisp fried|വറുത്തത്|तला हुआ",
  "ada-pradhaman|Ada Pradhaman|അട പ്രഥമൻ|अड़ा प्रधमन|payasam|60|5.0|1|Jaggery & coconut milk|ശർക്കര പായസം|गुड़ पायसम",
  "palada-payasam|Palada Payasam|പാലട പായസം|पालड़ा पायसम|payasam|75|4.9|1|Slow cooked milk|പാൽ പായസം|दूध वाला",
  "semiya-payasam|Semiya Payasam|സേമിയ പായസം|सेवई पायसम|payasam|30|4.7|1|Vermicelli|സേമിയ|सेवई",
  "parippu-payasam|Parippu Payasam|പരിപ്പ് പായസം|परिप्पु पायसम|payasam|45|4.8|1|Moong dal|ചെറുപയർ പരിപ്പ്|मूंग दाल",
  "chakka-pradhaman|Chakka Pradhaman|ചക്ക പ്രഥമൻ|कटहल प्रधमन|payasam|50|4.8|1|Jackfruit|ചക്ക വരട്ടി|कटहल",
  "gothambu-payasam|Gothambu Payasam|ഗോതമ്പ് പായസം|गेहूँ पायसम|payasam|55|4.6|1|Broken wheat|ഗോതമ്പ് നുറുക്ക്|दलिया",
  "pal-payasam|Pal Payasam|പാൽ പായസം|पाल पायसम|payasam|60|4.8|1|Temple style|അമ്പലം സ്റ്റൈൽ|मंदिर शैली",
  "kadala-payasam|Kadala Parippu Payasam|കടല പരിപ്പ് പായസം|चना दाल पायसम|payasam|45|4.7|1|Chana dal|കടലപ്പരിപ്പ്|चना दाल",
  "carrot-payasam|Carrot Payasam|കാരറ്റ് പായസം|गाजर पायसम|payasam|35|4.5|1|Kid friendly|കുട്ടികൾക്ക് പ്രിയം|बच्चों की पसंद",
  "cherupayar-payasam|Cherupayar Payasam|ചെറുപയർ പായസം|मूंग पायसम|payasam|45|4.7|1|Roasted moong|വറുത്ത പയർ|भुनी मूंग",
  "upperi|Banana Chips (Upperi)|കായ വറുത്തത്|केला चिप्स|snacks|30|4.9|1|Coconut oil fried|വെളിച്ചെണ്ണയിൽ|नारियल तेल में",
  "sharkara-varatti|Sharkara Varatti|ശർക്കര വരട്ടി|शर्करा वरट्टी|snacks|45|4.8|1|Jaggery coated|ശർക്കര പുരട്ടിയത്|गुड़ लिपटा",
  "pazham-pori|Pazham Pori|പഴം പൊരി|पज़म पोरी|snacks|20|4.8|1|Banana fritters|നേന്ത്രപ്പഴം|केला पकौड़ा",
  "unniyappam|Unniyappam|ഉണ്ണിയപ്പം|उन्नियप्पम|snacks|35|4.9|1|Rice & jaggery|അരിയും ശർക്കരയും|चावल-गुड़",
  "achappam|Achappam|അച്ചപ്പം|अच्चप्पम|snacks|40|4.7|1|Rose cookies|റോസ് കുക്കീസ്|रोज़ कुकीज़",
  "kuzhalappam|Kuzhalappam|കുഴലപ്പം|कुज़लप्पम|snacks|40|4.6|1|Crunchy rolls|ക്രഞ്ചി|कुरकुरा रोल",
  "murukku|Murukku|മുറുക്ക്|मुरुक्कू|snacks|35|4.7|1|Spiral savoury|ഉപ്പുള്ള പലഹാരം|नमकीन",
  "ela-ada|Ela Ada|ഇല അട|इला अड़ा|snacks|40|4.8|1|Steamed in banana leaf|ഇലയിൽ ആവിയിൽ|पत्ते में पका",
  "avalos-unda|Avalos Unda|അവലോസ് ഉണ്ട|अवलोस उंडा|snacks|25|4.5|1|Rice & coconut balls|അരിപ്പൊടി ഉരുള|चावल-नारियल लड्डू",
  "neyyappam|Neyyappam|നെയ്യപ്പം|नेय्यप्पम|snacks|30|4.7|1|Ghee fried|നെയ്യിൽ|घी में",
  "matta-choru|Matta Rice|ചോറ്|मट्टा चावल|mains|35|4.8|1|Kerala red rice|കുത്തരി ചോറ്|केरल लाल चावल",
  "ney-choru|Ney Choru|നെയ്ച്ചോറ്|नेय चोरु|mains|40|4.7|1|Ghee rice|നെയ്യരി|घी चावल",
];

const DEEPAVALI_ROWS: Row[] = [
  "besan-laddoo|Besan Laddoo|ബേസൻ ലഡ്ഡു|बेसन लड्डू|sweets|40|4.9|1|Classic gram flour|കടലമാവ് ലഡ്ഡു|क्लासिक",
  "boondi-laddoo|Boondi Laddoo|ബൂന്ദി ലഡ്ഡു|बूंदी लड्डू|sweets|50|4.8|1|Festive favourite|ഉത്സവ പ്രിയം|त्योहारी पसंद",
  "kaju-katli|Kaju Katli|കാജു കത്‌ലി|काजू कतली|sweets|35|4.9|1|Cashew diamonds|അണ്ടിപ്പരിപ്പ്|काजू बर्फी",
  "gulab-jamun|Gulab Jamun|ഗുലാബ് ജാമൂൻ|गुलाब जामुन|sweets|45|4.9|1|Syrup soaked|പഞ്ചസാരപ്പാനി|चाशनी में",
  "jalebi|Jalebi|ജിലേബി|जलेबी|sweets|40|4.7|1|Crisp spirals|ക്രിസ്പ്|कुरकुरी",
  "mysore-pak|Mysore Pak|മൈസൂർ പാക്ക്|मैसूर पाक|sweets|40|4.8|1|Ghee rich|നെയ്യ് നിറഞ്ഞ|घी भरा",
  "rava-kesari|Rava Kesari|റവ കേസരി|रवा केसरी|sweets|25|4.6|1|Saffron semolina|കുങ്കുമപ്പൂവ്|केसर सूजी",
  "coconut-barfi|Coconut Barfi|തേങ്ങ ബർഫി|नारियल बर्फी|sweets|30|4.7|1|Two ingredient|രണ്ട് ചേരുവ|दो सामग्री",
  "badam-halwa|Badam Halwa|ബദാം ഹൽവ|बादाम हलवा|sweets|50|4.8|1|Almond rich|ബദാം|बादाम",
  "milk-peda|Milk Peda|പാൽ പേഡ|दूध पेड़ा|sweets|30|4.7|1|Mawa based|മാവ പേഡ|मावा",
  "besan-barfi|Besan Barfi|ബേസൻ ബർഫി|बेसन बर्फी|sweets|35|4.6|1|Melt in mouth|അലിഞ്ഞു പോകും|मुँह में घुले",
  "gajar-halwa|Gajar Halwa|ഗാജർ ഹൽവ|गाजर हलवा|sweets|60|4.8|1|Carrot & milk|കാരറ്റ് ഹൽവ|गाजर-दूध",
  "rasgulla|Rasgulla|രസഗുള|रसगुल्ला|sweets|55|4.7|1|Spongy chenna|ചെന്ന|छेना",
  "shankarpali|Shankarpali|ശങ്കർപാലി|शंकरपाली|sweets|35|4.5|1|Sweet diamonds|മധുര കഷ്ണങ്ങൾ|मीठे टुकड़े",
  "milk-cake|Milk Cake|മിൽക്ക് കേക്ക്|मिल्क केक|sweets|60|4.6|1|Grainy fudge|പാൽ ഫഡ്ജ്|दूध फज",
  "murukku-d|Murukku|മുറുക്ക്|मुरुक्कू|snacks|35|4.8|1|Rice spirals|അരി മുറുക്ക്|चावल स्पाइरल",
  "chakli|Chakli|ചക്ലി|चकली|snacks|40|4.7|1|Crunchy coil|ക്രഞ്ചി|कुरकुरी",
  "mixture|Kerala Mixture|മിക്സ്ചർ|मिक्सचर|snacks|45|4.8|1|Spicy medley|എരിവുള്ള മിക്സ്|मसालेदार",
  "ribbon-pakoda|Ribbon Pakoda|റിബൺ പക്കോഡ|रिबन पकौड़ा|snacks|30|4.6|1|Flat & crisp|പരന്നത്|पतला कुरकुरा",
  "thattai|Thattai|തട്ടൈ|थट्टै|snacks|35|4.6|1|Rice crackers|അരി ക്രാക്കർ|चावल क्रैकर",
  "samosa|Samosa|സമോസ|समोसा|snacks|50|4.8|1|Potato filled|ഉരുളക്കിഴങ്ങ്|आलू भरा",
  "namak-pare|Namak Pare|നമക് പാരെ|नमक पारे|snacks|30|4.5|1|Salty bites|ഉപ്പ് കഷ്ണം|नमकीन",
  "sev|Sev|സേവ്|सेव|snacks|25|4.5|1|Gram flour strings|കടലമാവ്|बेसन सेव",
  "mathri|Mathri|മത്രി|मठरी|snacks|35|4.5|1|Flaky crackers|ഫ്ലേക്കി|परतदार",
  "masala-peanuts|Masala Peanuts|മസാല കപ്പലണ്ടി|मसाला मूंगफली|snacks|20|4.6|1|Crunchy nuts|ക്രഞ്ചി|कुरकुरी",
  "cheeda|Cheeda|ചീട|चीड़ा|snacks|30|4.4|1|Kerala crisps|നാടൻ ചീട|केरल चिप्स",
  "banana-chips-d|Banana Chips|കായ വറുത്തത്|केला चिप्स|snacks|30|4.8|1|Coconut oil|വെളിച്ചെണ്ണ|नारियल तेल",
  "veg-biryani|Veg Biryani|വെജ് ബിരിയാണി|वेज बिरयानी|mains|60|4.8|1|Festive rice|ഉത്സവ ചോറ്|उत्सव चावल",
  "paneer-butter-masala|Paneer Butter Masala|പനീർ ബട്ടർ മസാല|पनीर बटर मसाला|mains|40|4.8|1|Creamy gravy|ക്രീമി|मलाईदार",
  "chana-masala|Chana Masala|ചന മസാല|छोले मसाला|mains|45|4.7|1|Chickpea curry|കടല കറി|चना करी",
  "puri-bhaji|Puri Bhaji|പൂരി ഭാജി|पूरी भाजी|mains|40|4.7|1|Festive breakfast|രാവിലത്തെ വിഭവം|नाश्ता",
  "jeera-pulao|Jeera Pulao|ജീരക പുലാവ്|जीरा पुलाव|mains|30|4.6|1|Fragrant rice|സുഗന്ധ ചോറ്|सुगंधित चावल",
  "dal-makhani|Dal Makhani|ദാൽ മഖ്നി|दाल मखनी|mains|70|4.8|1|Slow cooked|പതുക്കെ വേവിച്ചത്|धीमी आँच",
  "aloo-gobi|Aloo Gobi|ആലു ഗോബി|आलू गोभी|mains|35|4.5|1|Dry sabzi|ഡ്രൈ കറി|सूखी सब्ज़ी",
  "kadai-paneer|Kadai Paneer|കടായി പനീർ|कड़ाही पनीर|mains|40|4.7|1|Peppery masala|കുരുമുളക് മസാല|मिर्च मसाला",
  "badam-milk|Badam Milk|ബദാം പാൽ|बादाम दूध|drinks|20|4.7|1|Saffron almond|കുങ്കുമപ്പൂവ്|केसर बादाम",
  "masala-chai|Masala Chai|മസാല ചായ|मसाला चाय|drinks|15|4.8|1|Spiced tea|സ്പൈസ്ഡ് ടീ|मसालेदार चाय",
  "thandai|Thandai|തണ്ഡായ്|ठंडाई|drinks|25|4.6|1|Nut & spice cooler|തണുപ്പൻ പാനീയം|ठंडा पेय",
  "rose-sharbat|Rose Sharbat|റോസ് ശർബത്ത്|गुलाब शरबत|drinks|10|4.5|1|Chilled cooler|തണുത്തത്|ठंडा",
  "sweet-lassi|Sweet Lassi|സ്വീറ്റ് ലസ്സി|मीठी लस्सी|drinks|10|4.6|1|Creamy curd drink|തൈര് പാനീയം|दही पेय",
];

const CHRISTMAS_ROWS: Row[] = [
  "plum-cake|Kerala Plum Cake|പ്ലം കേക്ക്|प्लम केक|sweets|90|5.0|1|Boozy fruit cake|ഫ്രൂട്ട് കേക്ക്|फ्रूट केक",
  "rich-fruit-cake|Rich Fruit Cake|റിച്ച് ഫ്രൂട്ട് കേക്ക്|रिच फ्रूट केक|sweets|100|4.8|1|Aged fruits|പഴങ്ങൾ ഊറിയത്|भीगे मेवे",
  "rose-cookies|Rose Cookies|അച്ചപ്പം|रोज़ कुकीज़|sweets|45|4.7|1|Achappam|അച്ചപ്പം|अच्चप्पम",
  "kalkals|Kalkals|കൽക്കൽസ്|कलकल|sweets|50|4.6|1|Kuswar classic|കുസ്വാർ|कुस्वार",
  "gingerbread|Gingerbread Cookies|ജിഞ്ചർബ്രെഡ്|जिंजरब्रेड|sweets|45|4.6|1|Spiced cookies|സ്പൈസ്ഡ്|मसालेदार",
  "coconut-macaroon|Coconut Macaroons|കോക്കനട്ട് മക്രൂൺ|नारियल मैकरून|sweets|30|4.5|1|Chewy coconut|തേങ്ങ|नारियल",
  "marzipan|Marzipan|മാർസിപാൻ|मार्जिपान|sweets|30|4.5|1|Almond sweet|ബദാം മധുരം|बादाम मिठाई",
  "christmas-pudding|Christmas Pudding|ക്രിസ്മസ് പുഡ്ഡിംഗ്|क्रिसमस पुडिंग|sweets|120|4.7|1|Steamed pudding|ആവിയിൽ|भाप में",
  "banana-cake|Banana Cake|ബനാന കേക്ക്|केला केक|sweets|55|4.6|1|Moist & easy|സോഫ്റ്റ്|नरम",
  "tea-cake|Vanilla Tea Cake|ടീ കേക്ക്|टी केक|sweets|50|4.5|1|Everyday bake|ദിവസേന|रोज़ का केक",
  "coconut-ice|Coconut Ice|കോക്കനട്ട് ഐസ്|नारियल आइस|sweets|25|4.4|1|Pink & white|പിങ്കും വെള്ളയും|गुलाबी-सफ़ेद",
  "date-roll|Date & Nut Roll|ഈത്തപ്പഴ റോൾ|खजूर रोल|sweets|25|4.7|1|No bake|ബേക്ക് വേണ്ട|बिना बेक",
  "duck-roast|Kerala Duck Roast|താറാവ് റോസ്റ്റ്|डक रोस्ट|mains|80|4.9|0|Syrian Christian classic|നാടൻ റോസ്റ്റ്|पारंपरिक",
  "beef-fry|Kerala Beef Fry|ബീഫ് ഫ്രൈ|बीफ फ्राई|mains|60|4.9|0|Coconut slivers|തേങ്ങാക്കൊത്ത്|नारियल टुकड़े",
  "chicken-roast|Chicken Roast|ചിക്കൻ റോസ്റ്റ്|चिकन रोस्ट|mains|50|4.8|0|Thick masala|കട്ടി മസാല|गाढ़ा मसाला",
  "appam-christmas|Appam|ആപ്പം|अप्पम|mains|30|4.8|1|Lacy hoppers|വെള്ളയപ്പം|लेस जैसा",
  "vegetable-stew|Vegetable Stew|സ്റ്റൂ|स्टू|mains|35|4.7|1|Coconut milk stew|തേങ്ങാപ്പാൽ|नारियल दूध",
  "christmas-biryani|Christmas Biryani|ബിരിയാണി|बिरयानी|mains|75|4.8|0|Party pot|പാർട്ടി|पार्टी",
  "pork-vindaloo|Pork Vindaloo|പോർക്ക് വിൻഡാലു|पोर्क विंडालू|mains|70|4.7|0|Tangy & hot|പുളിയും എരിവും|खट्टा-तीखा",
  "fish-molee|Fish Molee|ഫിഷ് മോളി|फिश मोली|mains|40|4.8|0|Mild coconut curry|മൃദു കറി|हल्की करी",
  "meen-pollichathu|Meen Pollichathu|മീൻ പൊള്ളിച്ചത്|मीन पोल्लिचतु|mains|50|4.9|0|Leaf wrapped|ഇലയിൽ പൊതിഞ്ഞ്|पत्ते में",
  "chicken-cutlet|Chicken Cutlet|ചിക്കൻ കട്ലറ്റ്|चिकन कटलेट|mains|45|4.7|0|Crumb fried|ബ്രെഡ് പൊടി|ब्रेडक्रम्ब",
  "mutton-curry|Mutton Curry|മട്ടൻ കറി|मटन करी|mains|75|4.8|0|Slow cooked|പതുക്കെ വേവിച്ചത്|धीमी आँच",
  "prawn-roast|Prawn Roast|ചെമ്മീൻ റോസ്റ്റ്|झींगा रोस्ट|mains|35|4.8|0|Spicy masala|എരിവ്|मसालेदार",
  "egg-roast|Egg Roast|മുട്ട റോസ്റ്റ്|अंडा रोस्ट|mains|25|4.7|0|Onion heavy|സവാള കൂടുതൽ|प्याज़ वाला",
  "idiyappam|Idiyappam|ഇടിയപ്പം|इडियप्पम|mains|35|4.7|1|String hoppers|നൂലപ്പം|सेवई रोटी",
  "veg-cutlet|Vegetable Cutlet|വെജ് കട്ലറ്റ്|वेज कटलेट|snacks|40|4.6|1|Party starter|സ്റ്റാർട്ടർ|स्टार्टर",
  "puffs|Chicken Puffs|ചിക്കൻ പഫ്സ്|चिकन पफ|snacks|45|4.7|0|Flaky pastry|പഫ് പേസ്ട്രി|पफ पेस्ट्री",
  "samosa-x|Samosa|സമോസ|समोसा|snacks|50|4.6|1|Crispy triangles|ക്രിസ്പി|कुरकुरा",
  "uzhunnu-vada|Uzhunnu Vada|ഉഴുന്നു വട|उड़द वड़ा|snacks|30|4.7|1|Crisp lentil rings|ഉഴുന്ന്|उड़द",
  "banana-fritters|Banana Fritters|പഴം പൊരി|केला पकौड़ा|snacks|20|4.7|1|Tea time|ചായക്ക്|चाय के साथ",
  "chicken-lollipop|Chicken Lollipop|ചിക്കൻ ലോലിപോപ്പ്|चिकन लॉलीपॉप|snacks|40|4.7|0|Party bite|പാർട്ടി|पार्टी स्नैक",
  "deviled-eggs|Deviled Eggs|ഡെവിൾഡ് എഗ്സ്|डेविल्ड एग|snacks|25|4.4|0|Cold starter|തണുത്ത സ്റ്റാർട്ടർ|ठंडा स्टार्टर",
  "cheese-straws|Cheese Straws|ചീസ് സ്ട്രോസ്|चीज़ स्ट्रॉ|snacks|30|4.4|1|Buttery sticks|ബട്ടർ സ്റ്റിക്ക്|मक्खन स्टिक",
  "grape-wine|Homemade Grape Wine|മുന്തിരി വൈൻ|अंगूर वाइन|drinks|30|4.9|1|21 day ferment|21 ദിവസം|21 दिन",
  "mulled-wine|Mulled Wine|മൾഡ് വൈൻ|मल्ड वाइन|drinks|20|4.6|1|Warm spiced|ചൂടോടെ|गरम मसालेदार",
  "hot-chocolate|Hot Chocolate|ഹോട്ട് ചോക്ലേറ്റ്|हॉट चॉकलेट|drinks|15|4.7|1|Kids favourite|കുട്ടികൾക്ക്|बच्चों की पसंद",
  "eggnog|Eggnog|എഗ് നോഗ്|एगनॉग|drinks|20|4.4|0|Creamy classic|ക്രീമി|मलाईदार",
  "plum-punch|Plum Punch|പ്ലം പഞ്ച്|प्लम पंच|drinks|15|4.5|1|Non alcoholic|മദ്യരഹിതം|बिना अल्कोहल",
  "filter-coffee|Filter Coffee|ഫിൽട്ടർ കോഫി|फ़िल्टर कॉफ़ी|drinks|10|4.7|1|Strong decoction|കടുപ്പം|कड़क",
];

const VISHU_ROWS: Row[] = [
  "vishu-kanji|Vishu Kanji|വിഷു കഞ്ഞി|विशु कांजी|mains|40|4.8|1|Rice & coconut milk|തേങ്ങാപ്പാൽ കഞ്ഞി|नारियल दूध",
  "vishu-katta|Vishu Katta|വിഷുക്കട്ട|विशु कट्टा|mains|35|4.8|1|Set rice with jaggery|ശർക്കരയോടൊപ്പം|गुड़ के साथ",
  "mango-curry|Mango Curry|മാങ്ങ കറി|आम की करी|mains|30|4.7|1|Raw mango|പച്ചമാങ്ങ|कच्चा आम",
  "chakka-thoran|Jackfruit Thoran|ചക്ക തോരൻ|कटहल थोरन|mains|30|4.6|1|Tender jackfruit|ഇടിച്ചക്ക|कच्चा कटहल",
  "ney-choru-v|Ney Choru|നെയ്ച്ചോറ്|नेय चोरु|mains|40|4.6|1|Ghee rice|നെയ്യരി|घी चावल",
  "puttu-v|Puttu|പുട്ട്|पुट्टु|mains|25|4.7|1|Steamed cylinders|ആവിയിൽ|भाप में",
  "kadala-curry|Kadala Curry|കടല കറി|कदला करी|mains|40|4.8|1|Black chana|കറുത്ത കടല|काला चना",
  "dosa-v|Vishu Dosa|ദോശ|डोसा|mains|25|4.6|1|Crisp & golden|ക്രിസ്പ്|कुरकुरा",
  "vishu-avial|Avial|അവിയൽ|अवियल|sadhya|30|4.9|1|Coconut & curd|തേങ്ങയും തൈരും|नारियल-दही",
  "vishu-sambar|Vishu Sambar|സാമ്പാർ|सांबर|sadhya|40|4.8|1|Vegetable sambar|പച്ചക്കറി സാമ്പാർ|सब्ज़ी सांबर",
  "vishu-parippu|Parippu Curry|പരിപ്പ് കറി|परिप्पु करी|sadhya|20|4.7|1|Ghee & dal|നെയ്യും പരിപ്പും|घी-दाल",
  "vishu-olan|Olan|ഓലൻ|ओलन|sadhya|25|4.7|1|Mild coconut milk|മൃദു രുചി|हल्का स्वाद",
  "vishu-erissery|Erissery|എരിശ്ശേരി|एरिश्शेरी|sadhya|30|4.7|1|Roasted coconut|വറുത്തരച്ചത്|भुना नारियल",
  "vishu-kaalan|Kaalan|കാളൻ|कालन|sadhya|35|4.6|1|Thick curd curry|കട്ടിയുള്ള കറി|गाढ़ी करी",
  "mambazha-pulissery|Mambazha Pulissery|മാമ്പഴ പുളിശ്ശേരി|मांबज़ा पुलिश्शेरी|sadhya|30|4.8|1|Ripe mango|പഴുത്ത മാങ്ങ|पका आम",
  "veppampoo-rasam|Veppampoo Rasam|വേപ്പിൻപൂ രസം|वेप्पम्पू रसम|sadhya|25|4.5|1|Neem flower|വേപ്പിൻപൂവ്|नीम फूल",
  "vishu-inji-curry|Inji Curry|ഇഞ്ചി കറി|अदरक करी|sadhya|25|4.6|1|Sweet & sour|മധുരപുളി|खट्टा-मीठा",
  "vishu-pachadi|Vishu Pachadi|വിഷു പച്ചടി|विशु पचड़ी|sadhya|20|4.7|1|Six tastes|ആറ് രുചികൾ|छह स्वाद",
  "vishu-thoran|Beetroot Thoran|ബീറ്റ്റൂട്ട് തോരൻ|चुकंदर थोरन|sadhya|20|4.5|1|Colourful stir fry|നിറമുള്ളത്|रंगीन",
  "vishu-koottukari|Koottukari|കൂട്ടുകറി|कूट्टुकरी|sadhya|30|4.6|1|Yam & chana|ചേനയും കടലയും|सूरन-चना",
  "vishu-kichadi|Kichadi|കിച്ചടി|किचड़ी|sadhya|20|4.5|1|Curd & coconut|തൈരും തേങ്ങയും|दही-नारियल",
  "vishu-moru|Moru Curry|മോര് കറി|मोरु करी|sadhya|15|4.6|1|Light buttermilk|ലളിതം|हल्की छाछ",
  "vishu-rasam|Rasam|രസം|रसम|sadhya|20|4.6|1|Peppery|കുരുമുളക്|मिर्च वाला",
  "vishu-pickle|Mango Pickle|മാങ്ങാ അച്ചാർ|आम का अचार|sadhya|20|4.6|1|Sharp & spicy|എരിവ്|तीखा",
  "vishu-ada-pradhaman|Ada Pradhaman|അട പ്രഥമൻ|अड़ा प्रधमन|payasam|60|4.9|1|Jaggery classic|ശർക്കര|गुड़",
  "vishu-palada|Palada Payasam|പാലട പായസം|पालड़ा पायसम|payasam|75|4.9|1|Rich milk|പാൽ സമൃദ്ധം|दूध भरपूर",
  "vishu-semiya|Semiya Payasam|സേമിയ പായസം|सेवई पायसम|payasam|30|4.6|1|Quick payasam|പെട്ടെന്ന്|झटपट",
  "vishu-parippu-payasam|Parippu Payasam|പരിപ്പ് പായസം|परिप्पु पायसम|payasam|45|4.8|1|Moong & jaggery|പയറും ശർക്കരയും|मूंग-गुड़",
  "vishu-chakka|Chakka Pradhaman|ചക്ക പ്രഥമൻ|कटहल प्रधमन|payasam|50|4.7|1|Jackfruit jam|ചക്ക വരട്ടി|कटहल जैम",
  "vishu-pal-payasam|Pal Payasam|പാൽ പായസം|पाल पायसम|payasam|60|4.8|1|Temple style|അമ്പലം|मंदिर शैली",
  "vishu-mango-payasam|Mango Payasam|മാമ്പഴ പായസം|आम पायसम|payasam|35|4.6|1|Seasonal|സീസൺ സ്പെഷ്യൽ|मौसमी",
  "vishu-gothambu|Gothambu Payasam|ഗോതമ്പ് പായസം|गेहूँ पायसम|payasam|55|4.6|1|Wholesome|പോഷകം|पौष्टिक",
  "vishu-unniyappam|Unniyappam|ഉണ്ണിയപ്പം|उन्नियप्पम|snacks|35|4.8|1|Jaggery bites|ശർക്കര|गुड़ बाइट",
  "vishu-neyyappam|Neyyappam|നെയ്യപ്പം|नेय्यप्पम|snacks|30|4.7|1|Ghee fried|നെയ്യിൽ|घी में",
  "vishu-pazham-pori|Pazham Pori|പഴം പൊരി|पज़म पोरी|snacks|20|4.7|1|Banana fritters|നേന്ത്രപ്പഴം|केला पकौड़ा",
  "vishu-achappam|Achappam|അച്ചപ്പം|अच्चप्पम|snacks|40|4.6|1|Rose cookies|റോസ് കുക്കീസ്|रोज़ कुकीज़",
  "vishu-kuzhalappam|Kuzhalappam|കുഴലപ്പം|कुज़लप्पम|snacks|40|4.5|1|Crunchy tubes|ക്രഞ്ചി|कुरकुरा",
  "vishu-chips|Banana Chips|കായ വറുത്തത്|केला चिप्स|snacks|30|4.8|1|Golden crisps|പൊൻനിറം|सुनहरा",
  "vishu-sharkara|Sharkara Varatti|ശർക്കര വരട്ടി|शर्करा वरट्टी|snacks|45|4.7|1|Jaggery coated|ശർക്കര പുരട്ടി|गुड़ लिपटा",
  "vishu-ela-ada|Ela Ada|ഇല അട|इला अड़ा|snacks|40|4.7|1|Leaf steamed|ഇലയിൽ|पत्ते में",
];

export const FESTIVAL_RECIPES: FestivalRecipe[] = [
  ...buildRecipes("onam", ONAM_ROWS),
  ...buildRecipes("deepavali", DEEPAVALI_ROWS),
  ...buildRecipes("christmas", CHRISTMAS_ROWS),
  ...buildRecipes("vishu", VISHU_ROWS),
];

export const recipesForFestival = (id: FestivalId) =>
  FESTIVAL_RECIPES.filter((r) => r.festival === id);

export const findFestivalRecipe = (festival: string, id: string) =>
  FESTIVAL_RECIPES.find((r) => r.festival === festival && r.id === id);

export function filterFestivalRecipes(
  id: FestivalId,
  category: FestivalCategory,
  query: string,
  lang: Lang,
) {
  const q = query.trim().toLowerCase();
  return recipesForFestival(id).filter((r) => {
    if (category !== "all" && r.category !== category) return false;
    if (!q) return true;
    return (["ml", "en", "hi"] as Lang[]).some((l) =>
      `${r.i18n[l].name} ${r.i18n[l].sub}`.toLowerCase().includes(q),
    ) || r.i18n[lang].name.toLowerCase().includes(q);
  });
}
