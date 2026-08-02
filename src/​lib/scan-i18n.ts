import type { Lang } from "@/lib/i18n";

export type ScanDict = {
  title: string;
  sub: string;
  howTitle: string;
  steps: { title: string; sub: string }[];
  startScan: string;
  recording: string;
  record: string;
  stop: string;
  hint: string;
  gallery: string;
  flash: string;
  switchCam: string;
  analyzing: string;
  cameraError: string;
  retry: string;
  detected: string;
  detectedSub: string;
  matches: string;
  matchesSub: string;
  rescan: string;
  noIngredients: string;
};

export const SCAN_I18N: Record<Lang, ScanDict> = {
  ml: {
    title: "സ്മാർട്ട് സ്കാനർ",
    sub: "ഫ്രിഡ്ജിലെയോ അടുക്കളയിലെയോ സാധനങ്ങൾ വീഡിയോ ആയി സ്കാൻ ചെയ്യൂ — ചേരുവകൾ തിരിച്ചറിഞ്ഞ് റെസിപ്പി നിർദ്ദേശിക്കും.",
    howTitle: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    steps: [
      { title: "വീഡിയോ എടുക്കുക", sub: "5–10 സെക്കൻഡ് ഫ്രിഡ്ജ് സ്കാൻ ചെയ്യുക" },
      { title: "സ്വയം വിശകലനം", sub: "ചേരുവകൾ സ്വയം തിരിച്ചറിയുന്നു" },
      { title: "റെസിപ്പി ലഭിക്കും", sub: "ഉള്ള സാധനങ്ങൾ കൊണ്ട് പാചകം ചെയ്യൂ" },
    ],
    startScan: "സ്കാൻ ആരംഭിക്കുക",
    recording: "റെക്കോർഡിംഗ്",
    record: "റെക്കോർഡ് ചെയ്യുക",
    stop: "നിർത്തുക",
    hint: "ചതുരത്തിനുള്ളിൽ സാധനങ്ങൾ കാണിക്കുക",
    gallery: "ഗാലറി",
    flash: "ഫ്ലാഷ്",
    switchCam: "ക്യാമറ മാറ്റുക",
    analyzing: "ചേരുവകൾ വിശകലനം ചെയ്യുന്നു...",
    cameraError: "ക്യാമറ തുറക്കാനായില്ല. അനുമതി നൽകുക.",
    retry: "വീണ്ടും ശ്രമിക്കൂ",
    detected: "കണ്ടെത്തിയ ചേരുവകൾ",
    detectedSub: "സ്കാനിൽ നിന്ന് തിരിച്ചറിഞ്ഞത്",
    matches: "ഉണ്ടാക്കാവുന്ന വിഭവങ്ങൾ",
    matchesSub: "ഈ ചേരുവകൾ കൊണ്ട് തയ്യാറാക്കാം",
    rescan: "വീണ്ടും സ്കാൻ ചെയ്യുക",
    noIngredients: "ചേരുവകൾ കണ്ടെത്തിയില്ല. വീണ്ടും സ്കാൻ ചെയ്യൂ.",
  },
  en: {
    title: "Smart Scanner",
    sub: "Scan your fridge or kitchen shelf with a short video — we detect the ingredients and suggests recipes you can cook right now.",
    howTitle: "How it works",
    steps: [
      { title: "Record a video", sub: "5–10 seconds of your fridge" },
      { title: "Automatic analysis", sub: "Ingredients detected automatically" },
      { title: "Get recipes", sub: "Cook with exactly what you have" },
    ],
    startScan: "Start Scan",
    recording: "Recording",
    record: "Record",
    stop: "Stop",
    hint: "Keep the items inside the square",
    gallery: "Gallery",
    flash: "Flash",
    switchCam: "Switch camera",
    analyzing: "Analysing your ingredients...",
    cameraError: "Couldn't open the camera. Please allow access.",
    retry: "Try again",
    detected: "Detected ingredients",
    detectedSub: "Found in your scan",
    matches: "Recipes you can make",
    matchesSub: "Using the scanned items",
    rescan: "Scan again",
    noIngredients: "No ingredients detected. Try scanning again.",
  },
  hi: {
    title: "स्मार्ट स्कैनर",
    sub: "अपने फ्रिज या रसोई की छोटी वीडियो स्कैन करें — सामग्री पहचानकर रेसिपी सुझाएगा।",
    howTitle: "यह कैसे काम करता है",
    steps: [
      { title: "वीडियो रिकॉर्ड करें", sub: "5–10 सेकंड फ्रिज स्कैन करें" },
      { title: "स्वतः विश्लेषण", sub: "सामग्री अपने आप पहचानी जाती है" },
      { title: "रेसिपी पाएँ", sub: "जो है उसी से पकाएँ" },
    ],
    startScan: "स्कैन शुरू करें",
    recording: "रिकॉर्डिंग",
    record: "रिकॉर्ड",
    stop: "रोकें",
    hint: "सामान को चौकोर फ्रेम में रखें",
    gallery: "गैलरी",
    flash: "फ्लैश",
    switchCam: "कैमरा बदलें",
    analyzing: "सामग्री का विश्लेषण हो रहा है...",
    cameraError: "कैमरा नहीं खुल सका। अनुमति दें।",
    retry: "फिर कोशिश करें",
    detected: "पहचानी गई सामग्री",
    detectedSub: "स्कैन में मिला",
    matches: "आप ये बना सकते हैं",
    matchesSub: "स्कैन की गई सामग्री से",
    rescan: "फिर से स्कैन करें",
    noIngredients: "कोई सामग्री नहीं मिली। फिर स्कैन करें।",
  },
};
