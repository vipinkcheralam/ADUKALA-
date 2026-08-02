import type { Lang } from "@/lib/i18n";

export type VoiceDict = {
  title: string;
  tapSpeak: string;
  listening: string;
  thinking: string;
  you: string;
  assistant: string;
  enable: string;
  disable: string;
  hint: string;
  micError: string;
  tooShort: string;
  error: string;
  close: string;
  replay: string;
  speaking: string;
  stop: string;
  start: string;
  examples: string[];
};

export const VOICE_I18N: Record<Lang, VoiceDict> = {
  ml: {
    title: "വോയ്സ് അസിസ്റ്റന്റ്",
    tapSpeak: "ടാപ്പ് ചെയ്ത് സംസാരിക്കൂ",
    listening: "കേൾക്കുന്നു... നിർത്താൻ ടാപ്പ് ചെയ്യൂ",
    thinking: "ഷെഫ് ചിന്തിക്കുന്നു...",
    you: "നിങ്ങൾ",
    assistant: "ഷെഫ്",
    enable: "വോയ്സ് അസിസ്റ്റന്റ്",
    disable: "വോയ്സ് അസിസ്റ്റന്റ്",
    hint: "പാചകം ചെയ്യുമ്പോൾ ഏത് ഭാഷയിലും ചോദിക്കാം",
    micError: "മൈക്ക് ഉപയോഗിക്കാൻ അനുമതി നൽകുക.",
    tooShort: "ഒന്നും കേട്ടില്ല. വീണ്ടും ശ്രമിക്കൂ.",
    error: "മറുപടി ലഭിച്ചില്ല. വീണ്ടും ശ്രമിക്കൂ.",
    close: "അടയ്ക്കുക",
    replay: "വീണ്ടും കേൾക്കുക",
    speaking: "മറുപടി പറയുന്നു...",
    stop: "നിർത്തുക",
    start: "സംഭാഷണം തുടങ്ങുക",
    examples: ["അടുത്ത സ്റ്റെപ്പ് എന്താണ്?", "എത്ര ഉപ്പ് ഇടണം?"],
  },
  en: {
    title: "Voice Assistant",
    tapSpeak: "Tap & Speak",
    listening: "Listening... tap to stop",
    thinking: "Chef is thinking...",
    you: "You",
    assistant: "Chef",
    enable: "Voice assistant",
    disable: "Voice assistant",
    hint: "Ask anything while cooking, in any language",
    micError: "Please allow microphone access.",
    tooShort: "I didn't catch that. Try again.",
    error: "Couldn't get an answer. Please try again.",
    close: "Close",
    replay: "Play again",
    speaking: "Speaking...",
    stop: "Stop",
    start: "Start conversation",
    examples: ["What is the next step?", "How much salt should I add?"],
  },
  hi: {
    title: "वॉइस असिस्टेंट",
    tapSpeak: "टैप करें और बोलें",
    listening: "सुन रहा हूँ... रोकने के लिए टैप करें",
    thinking: "शेफ सोच रहा है...",
    you: "आप",
    assistant: "शेफ",
    enable: "वॉइस असिस्टेंट",
    disable: "वॉइस असिस्टेंट",
    hint: "पकाते समय किसी भी भाषा में पूछें",
    micError: "कृपया माइक्रोफ़ोन की अनुमति दें।",
    tooShort: "कुछ सुनाई नहीं दिया। फिर कोशिश करें।",
    error: "जवाब नहीं मिल सका। फिर कोशिश करें।",
    close: "बंद करें",
    replay: "फिर सुनें",
    speaking: "बोल रहा हूँ...",
    stop: "रोकें",
    start: "बातचीत शुरू करें",
    examples: ["अगला स्टेप क्या है?", "कितना नमक डालें?"],
  },
};

export const SPEECH_LOCALE: Record<Lang, string> = { ml: "ml-IN", en: "en-IN", hi: "hi-IN" };