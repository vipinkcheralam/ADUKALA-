import type { Lang } from "@/lib/i18n";

export type PriceProduct = {
  barcode: string;
  emoji: string;
  unit: string;
  price: number;
  mrp: number;
  store: string;
  name: Record<Lang, string>;
};

/** Local mock market price catalogue (offline lookup). */
export const PRICE_CATALOGUE: PriceProduct[] = [
  { barcode: "8901030865278", emoji: "🌾", unit: "1 kg", price: 62, mrp: 70, store: "Supermarket avg.",
    name: { en: "Matta Rice", ml: "മട്ട അരി", hi: "मट्टा चावल" } },
  { barcode: "8901058000474", emoji: "🥥", unit: "1 L", price: 285, mrp: 310, store: "Supermarket avg.",
    name: { en: "Coconut Oil", ml: "വെളിച്ചെണ്ണ", hi: "नारियल तेल" } },
  { barcode: "8901719101465", emoji: "🫘", unit: "500 g", price: 89, mrp: 95, store: "Supermarket avg.",
    name: { en: "Toor Dal", ml: "തുവര പരിപ്പ്", hi: "तूर दाल" } },
  { barcode: "8904004400014", emoji: "🌶️", unit: "200 g", price: 74, mrp: 80, store: "Supermarket avg.",
    name: { en: "Chilli Powder", ml: "മുളകുപൊടി", hi: "मिर्च पाउडर" } },
  { barcode: "8901063010116", emoji: "🥛", unit: "1 L", price: 54, mrp: 56, store: "Supermarket avg.",
    name: { en: "Toned Milk", ml: "പാൽ", hi: "दूध" } },
  { barcode: "8901491101837", emoji: "🧂", unit: "1 kg", price: 28, mrp: 30, store: "Supermarket avg.",
    name: { en: "Iodised Salt", ml: "ഉപ്പ്", hi: "नमक" } },
  { barcode: "8901725121112", emoji: "🍬", unit: "1 kg", price: 48, mrp: 52, store: "Supermarket avg.",
    name: { en: "Sugar", ml: "പഞ്ചസാര", hi: "चीनी" } },
  { barcode: "8901396111115", emoji: "🫓", unit: "1 kg", price: 58, mrp: 64, store: "Supermarket avg.",
    name: { en: "Wheat Atta", ml: "ഗോതമ്പ് പൊടി", hi: "गेहूं आटा" } },
];

export function lookupBarcode(code: string): PriceProduct | null {
  const clean = code.replace(/\D/g, "");
  return PRICE_CATALOGUE.find((p) => p.barcode === clean) ?? null;
}

export type PriceDict = {
  title: string;
  sub: string;
  scanCta: string;
  homeCardTitle: string;
  homeCardSub: string;
  hint: string;
  manual: string;
  manualPlaceholder: string;
  check: string;
  notFound: string;
  notFoundSub: string;
  cameraError: string;
  price: string;
  mrp: string;
  save: string;
  scanAgain: string;
  samples: string;
  looking: string;
  live: string;
  noPrice: string;
};


export const PRICE_I18N: Record<Lang, PriceDict> = {
  en: {
    title: "Price Scanner",
    sub: "Scan a product barcode to see today's market price.",
    scanCta: "Scan Price",
    homeCardTitle: "Supermarket Price Scanner",
    homeCardSub: "Scan any barcode and check the market price instantly.",
    hint: "Point the camera at the product barcode",
    manual: "Or enter the barcode number",
    manualPlaceholder: "e.g. 8901030865278",
    check: "Check price",
    notFound: "Product not found",
    notFoundSub: "This barcode is not in our price list yet.",
    cameraError: "Camera unavailable — enter the barcode manually.",
    price: "Market price",
    mrp: "MRP",
    save: "You save",
    scanAgain: "Scan another",
    samples: "Try a sample barcode",
    looking: "Looking up product…",
    live: "Live",
    noPrice: "Live price not available yet",
  },
  ml: {
    title: "വില സ്കാനർ",
    sub: "ബാർകോഡ് സ്കാൻ ചെയ്ത് ഇന്നത്തെ വിപണി വില അറിയാം.",
    scanCta: "വില സ്കാൻ",
    homeCardTitle: "സൂപ്പർമാർക്കറ്റ് വില സ്കാനർ",
    homeCardSub: "ബാർകോഡ് സ്കാൻ ചെയ്ത് വില ഉടൻ അറിയൂ.",
    hint: "ക്യാമറ ബാർകോഡിലേക്ക് നേരെ പിടിക്കുക",
    manual: "അല്ലെങ്കിൽ ബാർകോഡ് നമ്പർ നൽകുക",
    manualPlaceholder: "ഉദാ. 8901030865278",
    check: "വില നോക്കുക",
    notFound: "ഉൽപ്പന്നം കണ്ടെത്തിയില്ല",
    notFoundSub: "ഈ ബാർകോഡ് ഇപ്പോൾ പട്ടികയിൽ ഇല്ല.",
    cameraError: "ക്യാമറ ലഭ്യമല്ല — ബാർകോഡ് സ്വയം നൽകുക.",
    price: "വിപണി വില",
    mrp: "എം.ആർ.പി",
    save: "ലാഭം",
    scanAgain: "വീണ്ടും സ്കാൻ",
    samples: "സാമ്പിൾ ബാർകോഡ് പരീക്ഷിക്കൂ",
    looking: "ഉൽപ്പന്നം തിരയുന്നു…",
    live: "ലൈവ്",
    noPrice: "ലൈവ് വില ഇപ്പോൾ ലഭ്യമല്ല",
  },
  hi: {
    title: "प्राइस स्कैनर",
    sub: "बारकोड स्कैन करें और आज का बाज़ार भाव देखें।",
    scanCta: "प्राइस स्कैन",
    homeCardTitle: "सुपरमार्केट प्राइस स्कैनर",
    homeCardSub: "कोई भी बारकोड स्कैन करें, कीमत तुरंत देखें।",
    hint: "कैमरा बारकोड की ओर रखें",
    manual: "या बारकोड नंबर दर्ज करें",
    manualPlaceholder: "जैसे 8901030865278",
    check: "कीमत देखें",
    notFound: "उत्पाद नहीं मिला",
    notFoundSub: "यह बारकोड अभी सूची में नहीं है।",
    cameraError: "कैमरा उपलब्ध नहीं — बारकोड मैन्युअल दर्ज करें।",
    price: "बाज़ार भाव",
    mrp: "एमआरपी",
    save: "बचत",
    scanAgain: "फिर स्कैन करें",
    samples: "सैंपल बारकोड आज़माएँ",
    looking: "उत्पाद खोजा जा रहा है…",
    live: "लाइव",
    noPrice: "लाइव कीमत अभी उपलब्ध नहीं",
  },
};