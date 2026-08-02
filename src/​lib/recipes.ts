import type { Lang } from "@/lib/i18n";
import meenCurry from "@/assets/meen-curry.jpg";
import appam from "@/assets/appam.jpg";
import thoran from "@/assets/thoran.jpg";
import puttu from "@/assets/puttu.jpg";
import biryani from "@/assets/biryani.jpg";
import dosa from "@/assets/dosa.jpg";
import sambar from "@/assets/sambar.jpg";
import payasam from "@/assets/payasam.jpg";

export type Difficulty = "easy" | "medium" | "hard";

export type LocalizedRecipe = {
  name: string;
  sub: string;
  ingredients: string[];
  steps: string[];
};

export type Recipe = {
  slug: string;
  image: string;
  time: string;
  rating: number;
  difficulty: Difficulty;
  veg: boolean;
  keywords: string[];
  i18n: Record<Lang, LocalizedRecipe>;
};

export const RECIPES: Recipe[] = [
  {
    slug: "meen-curry",
    image: meenCurry,
    time: "35 min",
    rating: 4.8,
    difficulty: "medium",
    veg: false,
    keywords: ["meen curry", "fish curry", "മീൻ കറി", "मीन करी", "kerala fish"],
    i18n: {
      en: {
        name: "Meen Curry",
        sub: "Kerala Fish Curry",
        ingredients: ["500g fish, cleaned", "Kudampuli (gambooge) 3 pieces", "Shallots, ginger, garlic", "Chilli & turmeric powder", "Coconut oil, curry leaves"],
        steps: [
          "Soak kudampuli in warm water for 10 minutes.",
          "Heat coconut oil in a clay pot and sauté shallots, ginger, garlic and curry leaves.",
          "Add chilli and turmeric powder, cook until the raw smell goes, then pour in water and kudampuli.",
          "Slide in the fish, simmer 15 minutes without stirring, finish with a drizzle of coconut oil.",
        ],
      },
      ml: {
        name: "മീൻ കറി",
        sub: "നാടൻ മീൻ കറി",
        ingredients: ["500g മീൻ", "കുടംപുളി 3 കഷ്ണം", "ചെറിയുള്ളി, ഇഞ്ചി, വെളുത്തുള്ളി", "മുളകുപൊടി, മഞ്ഞൾപൊടി", "വെളിച്ചെണ്ണ, കറിവേപ്പില"],
        steps: [
          "കുടംപുളി ചൂടുവെള്ളത്തിൽ 10 മിനിറ്റ് കുതിർത്തുവയ്ക്കുക.",
          "മൺചട്ടിയിൽ വെളിച്ചെണ്ണ ചൂടാക്കി ഉള്ളി, ഇഞ്ചി, വെളുത്തുള്ളി, കറിവേപ്പില വഴറ്റുക.",
          "മുളകുപൊടിയും മഞ്ഞളും ചേർത്ത് വഴറ്റി വെള്ളവും കുടംപുളിയും ഒഴിക്കുക.",
          "മീൻ ചേർത്ത് 15 മിനിറ്റ് വേവിക്കുക, അവസാനം വെളിച്ചെണ്ണ ഒഴിക്കുക.",
        ],
      },
      hi: {
        name: "मीन करी",
        sub: "केरल मछली करी",
        ingredients: ["500g मछली", "कुडमपुली 3 टुकड़े", "छोटे प्याज़, अदरक, लहसुन", "मिर्च व हल्दी पाउडर", "नारियल तेल, करी पत्ता"],
        steps: [
          "कुडमपुली को गर्म पानी में 10 मिनट भिगोएँ।",
          "मिट्टी के बर्तन में नारियल तेल गर्म कर प्याज़, अदरक, लहसुन व करी पत्ता भूनें।",
          "मिर्च व हल्दी डालकर भूनें, फिर पानी और कुडमपुली डालें।",
          "मछली डालकर 15 मिनट पकाएँ, ऊपर से नारियल तेल डालें।",
        ],
      },
    },
  },
  {
    slug: "appam-stew",
    image: appam,
    time: "20 min",
    rating: 4.7,
    difficulty: "medium",
    veg: true,
    keywords: ["appam", "stew", "ആപ്പം", "अप्पम", "hoppers"],
    i18n: {
      en: {
        name: "Appam & Stew",
        sub: "Lace hoppers with coconut stew",
        ingredients: ["Raw rice 2 cups, soaked", "Grated coconut 1 cup", "Yeast & sugar", "Mixed vegetables", "Coconut milk, whole spices"],
        steps: [
          "Grind soaked rice with coconut and cooked rice to a smooth batter; ferment 6–8 hours with yeast and sugar.",
          "Pour a ladle of batter into a hot appam pan, swirl once and cover until the edges crisp.",
          "For the stew, sauté whole spices, onion and vegetables, add thin coconut milk and simmer.",
          "Finish the stew with thick coconut milk, do not boil, and serve hot with appam.",
        ],
      },
      ml: {
        name: "ആപ്പം & സ്റ്റ്യൂ",
        sub: "ആപ്പവും വെജ് സ്റ്റ്യൂവും",
        ingredients: ["പച്ചരി 2 കപ്പ്", "തേങ്ങ ചിരകിയത് 1 കപ്പ്", "യീസ്റ്റ്, പഞ്ചസാര", "പച്ചക്കറികൾ", "തേങ്ങാപ്പാൽ, ഗരം മസാല"],
        steps: [
          "കുതിർത്ത അരി തേങ്ങയും ചോറും ചേർത്ത് അരയ്ക്കുക; യീസ്റ്റും പഞ്ചസാരയും ചേർത്ത് 6–8 മണിക്കൂർ പുളിപ്പിക്കുക.",
          "ചൂടായ ആപ്പച്ചട്ടിയിൽ മാവ് ഒഴിച്ച് ചുഴറ്റി അടച്ചുവേവിക്കുക.",
          "സ്റ്റ്യൂവിന് സുഗന്ധവ്യഞ്ജനങ്ങൾ, ഉള്ളി, പച്ചക്കറികൾ വഴറ്റി രണ്ടാം പാൽ ഒഴിച്ച് വേവിക്കുക.",
          "ഒന്നാം പാൽ ചേർത്ത് തിളപ്പിക്കാതെ വാങ്ങി ആപ്പത്തോടൊപ്പം വിളമ്പുക.",
        ],
      },
      hi: {
        name: "अप्पम व स्ट्यू",
        sub: "अप्पम और नारियल स्ट्यू",
        ingredients: ["चावल 2 कप, भिगोया", "कसा नारियल 1 कप", "यीस्ट व चीनी", "मिली-जुली सब्ज़ियाँ", "नारियल दूध, खड़े मसाले"],
        steps: [
          "भीगे चावल को नारियल व पके चावल के साथ पीसें; यीस्ट-चीनी डालकर 6–8 घंटे खमीर उठाएँ।",
          "गर्म अप्पम पैन में घोल डालकर घुमाएँ और ढककर पकाएँ।",
          "स्ट्यू के लिए खड़े मसाले, प्याज़ व सब्ज़ियाँ भूनकर पतला नारियल दूध डालें।",
          "गाढ़ा नारियल दूध डालकर बिना उबाले उतारें और अप्पम के साथ परोसें।",
        ],
      },
    },
  },
  {
    slug: "cabbage-thoran",
    image: thoran,
    time: "15 min",
    rating: 4.6,
    difficulty: "easy",
    veg: true,
    keywords: ["thoran", "cabbage", "തോരൻ", "थोरन", "stir fry"],
    i18n: {
      en: {
        name: "Cabbage Thoran",
        sub: "Coconut stir-fry",
        ingredients: ["Cabbage 3 cups, shredded", "Grated coconut 1/2 cup", "Green chilli, cumin, turmeric", "Mustard seeds, curry leaves", "Coconut oil, salt"],
        steps: [
          "Crush coconut with green chilli, cumin and turmeric.",
          "Splutter mustard seeds and curry leaves in coconut oil.",
          "Add cabbage and salt, cover and cook on low heat for 5 minutes.",
          "Mix in the coconut masala, cook uncovered 3 more minutes and serve.",
        ],
      },
      ml: {
        name: "കാബേജ് തോരൻ",
        sub: "തേങ്ങ ചേർത്ത തോരൻ",
        ingredients: ["കാബേജ് 3 കപ്പ്", "തേങ്ങ ചിരകിയത് 1/2 കപ്പ്", "പച്ചമുളക്, ജീരകം, മഞ്ഞൾ", "കടുക്, കറിവേപ്പില", "വെളിച്ചെണ്ണ, ഉപ്പ്"],
        steps: [
          "തേങ്ങ, പച്ചമുളക്, ജീരകം, മഞ്ഞൾ ചേർത്ത് ചതയ്ക്കുക.",
          "വെളിച്ചെണ്ണയിൽ കടുകും കറിവേപ്പിലയും വറക്കുക.",
          "കാബേജും ഉപ്പും ചേർത്ത് അടച്ചുവച്ച് 5 മിനിറ്റ് വേവിക്കുക.",
          "തേങ്ങാ മിശ്രിതം ചേർത്ത് 3 മിനിറ്റ് ഇളക്കി വാങ്ങുക.",
        ],
      },
      hi: {
        name: "गोभी थोरन",
        sub: "नारियल भुजिया",
        ingredients: ["पत्ता गोभी 3 कप", "कसा नारियल 1/2 कप", "हरी मिर्च, जीरा, हल्दी", "राई, करी पत्ता", "नारियल तेल, नमक"],
        steps: [
          "नारियल को हरी मिर्च, जीरा व हल्दी के साथ कूटें।",
          "नारियल तेल में राई व करी पत्ता तड़काएँ।",
          "गोभी व नमक डालकर ढककर 5 मिनट पकाएँ।",
          "नारियल मसाला मिलाकर 3 मिनट और पकाएँ और परोसें।",
        ],
      },
    },
  },
  {
    slug: "puttu-kadala",
    image: puttu,
    time: "25 min",
    rating: 4.9,
    difficulty: "easy",
    veg: true,
    keywords: ["puttu", "kadala", "പുട്ട്", "पुट्टु", "steamed rice cake"],
    i18n: {
      en: {
        name: "Puttu & Kadala",
        sub: "Steamed rice cake with black chana",
        ingredients: ["Puttu podi 2 cups", "Grated coconut", "Black chana 1 cup, soaked", "Onion, ginger, garlic", "Roasted coconut masala"],
        steps: [
          "Sprinkle salted water into puttu podi until it holds shape when pressed.",
          "Layer coconut and flour in the puttu maker and steam for 7–8 minutes.",
          "Pressure cook soaked chana with salt and turmeric for 4 whistles.",
          "Sauté onion masala, add the cooked chana and roasted coconut paste, simmer and serve with puttu.",
        ],
      },
      ml: {
        name: "പുട്ട് & കടല",
        sub: "പുട്ടും കടലക്കറിയും",
        ingredients: ["പുട്ടുപൊടി 2 കപ്പ്", "തേങ്ങ ചിരകിയത്", "കടല 1 കപ്പ്", "ഉള്ളി, ഇഞ്ചി, വെളുത്തുള്ളി", "വറുത്തരച്ച മസാല"],
        steps: [
          "പുട്ടുപൊടിയിൽ ഉപ്പുവെള്ളം തളിച്ച് ഉതിർത്തെടുക്കുക.",
          "പുട്ടുകുറ്റിയിൽ തേങ്ങയും പൊടിയും അടുക്കി 7–8 മിനിറ്റ് ആവിയിൽ വേവിക്കുക.",
          "കുതിർത്ത കടല ഉപ്പും മഞ്ഞളും ചേർത്ത് 4 വിസിൽ വേവിക്കുക.",
          "ഉള്ളി മസാല വഴറ്റി കടലയും വറുത്തരച്ചതും ചേർത്ത് തിളപ്പിച്ച് പുട്ടിനൊപ്പം വിളമ്പുക.",
        ],
      },
      hi: {
        name: "पुट्टु व कडला",
        sub: "स्टीम्ड राइस केक और काला चना",
        ingredients: ["पुट्टु आटा 2 कप", "कसा नारियल", "काला चना 1 कप", "प्याज़, अदरक, लहसुन", "भुना नारियल मसाला"],
        steps: [
          "पुट्टु आटे में नमक वाला पानी छिड़ककर भुरभुरा करें।",
          "पुट्टु मेकर में नारियल व आटे की परतें लगाकर 7–8 मिनट भाप दें।",
          "भीगे चने को नमक-हल्दी के साथ 4 सीटी तक पकाएँ।",
          "प्याज़ मसाला भूनकर चना व भुना नारियल पेस्ट डालें, उबालें और पुट्टु के साथ परोसें।",
        ],
      },
    },
  },
  {
    slug: "chicken-biryani",
    image: biryani,
    time: "60 min",
    rating: 4.9,
    difficulty: "hard",
    veg: false,
    keywords: ["biryani", "chicken biryani", "ബിരിയാണി", "बिरयानी", "malabar"],
    i18n: {
      en: {
        name: "Malabar Biryani",
        sub: "Fragrant chicken biryani",
        ingredients: ["Kaima rice 3 cups", "Chicken 750g", "Onion, tomato, ginger-garlic", "Yogurt, mint & coriander", "Ghee, whole spices"],
        steps: [
          "Fry onions in ghee until golden and set aside; parboil rice with whole spices.",
          "Cook chicken with ginger-garlic, tomato, yogurt and spices until thick.",
          "Layer rice over the masala with fried onions, mint and coriander.",
          "Seal the pot and dum on very low heat for 20 minutes, then fluff gently.",
        ],
      },
      ml: {
        name: "മലബാർ ബിരിയാണി",
        sub: "ചിക്കൻ ബിരിയാണി",
        ingredients: ["കൈമ അരി 3 കപ്പ്", "ചിക്കൻ 750g", "ഉള്ളി, തക്കാളി, ഇഞ്ചി-വെളുത്തുള്ളി", "തൈര്, പുതിന, മല്ലിയില", "നെയ്യ്, ഗരം മസാല"],
        steps: [
          "നെയ്യിൽ ഉള്ളി വറുത്തെടുക്കുക; അരി സുഗന്ധവ്യഞ്ജനങ്ങളോടെ പാതി വേവിക്കുക.",
          "ചിക്കൻ ഇഞ്ചി-വെളുത്തുള്ളി, തക്കാളി, തൈര്, മസാല ചേർത്ത് വറ്റിച്ചെടുക്കുക.",
          "മസാലയ്ക്ക് മുകളിൽ ചോറ്, വറുത്ത ഉള്ളി, പുതിന, മല്ലിയില അടുക്കുക.",
          "പാത്രം അടച്ച് 20 മിനിറ്റ് ദം വയ്ക്കുക, പിന്നീട് പതിയെ ഇളക്കുക.",
        ],
      },
      hi: {
        name: "मलाबार बिरयानी",
        sub: "खुशबूदार चिकन बिरयानी",
        ingredients: ["कैमा चावल 3 कप", "चिकन 750g", "प्याज़, टमाटर, अदरक-लहसुन", "दही, पुदीना व धनिया", "घी, खड़े मसाले"],
        steps: [
          "घी में प्याज़ सुनहरा तलें; चावल खड़े मसालों के साथ आधा पकाएँ।",
          "चिकन को अदरक-लहसुन, टमाटर, दही व मसालों के साथ गाढ़ा होने तक पकाएँ।",
          "मसाले के ऊपर चावल, तला प्याज़, पुदीना व धनिया की परत लगाएँ।",
          "बर्तन सील कर 20 मिनट धीमी आँच पर दम दें, फिर हल्के हाथ से मिलाएँ।",
        ],
      },
    },
  },
  {
    slug: "masala-dosa",
    image: dosa,
    time: "30 min",
    rating: 4.7,
    difficulty: "medium",
    veg: true,
    keywords: ["dosa", "masala dosa", "ദോശ", "दोसा"],
    i18n: {
      en: {
        name: "Masala Dosa",
        sub: "Crisp dosa with potato filling",
        ingredients: ["Dosa batter 3 cups", "Potato 3, boiled", "Onion, green chilli, ginger", "Mustard, turmeric, curry leaves", "Oil or ghee"],
        steps: [
          "Temper mustard, chilli, onion and curry leaves; add turmeric and mashed potato for the filling.",
          "Heat a tawa, pour a ladle of batter and spread thin in a spiral.",
          "Drizzle oil around the edges and cook until golden and crisp.",
          "Place the filling in the centre, fold and serve with chutney.",
        ],
      },
      ml: {
        name: "മസാല ദോശ",
        sub: "ഉരുളക്കിഴങ്ങ് മസാല ദോശ",
        ingredients: ["ദോശമാവ് 3 കപ്പ്", "ഉരുളക്കിഴങ്ങ് 3", "ഉള്ളി, പച്ചമുളക്, ഇഞ്ചി", "കടുക്, മഞ്ഞൾ, കറിവേപ്പില", "എണ്ണ / നെയ്യ്"],
        steps: [
          "കടുക്, മുളക്, ഉള്ളി, കറിവേപ്പില വറുത്ത് മഞ്ഞളും ഉടച്ച ഉരുളക്കിഴങ്ങും ചേർക്കുക.",
          "ചൂടായ ദോശക്കല്ലിൽ മാവ് ഒഴിച്ച് നേർത്തതായി പരത്തുക.",
          "വശങ്ങളിൽ എണ്ണ ഒഴിച്ച് ക്രിസ്പ് ആകുന്നതുവരെ ചുടുക.",
          "നടുവിൽ മസാല വച്ച് മടക്കി ചട്ണിയോടൊപ്പം വിളമ്പുക.",
        ],
      },
      hi: {
        name: "मसाला दोसा",
        sub: "आलू भरवां कुरकुरा दोसा",
        ingredients: ["दोसा घोल 3 कप", "आलू 3, उबले", "प्याज़, हरी मिर्च, अदरक", "राई, हल्दी, करी पत्ता", "तेल या घी"],
        steps: [
          "राई, मिर्च, प्याज़ व करी पत्ता तड़काकर हल्दी व मसले आलू मिलाएँ।",
          "तवा गर्म कर घोल डालें और पतला गोल फैलाएँ।",
          "किनारों पर तेल डालकर सुनहरा-कुरकुरा होने तक सेंकें।",
          "बीच में भरावन रखकर मोड़ें और चटनी के साथ परोसें।",
        ],
      },
    },
  },
  {
    slug: "sambar",
    image: sambar,
    time: "40 min",
    rating: 4.5,
    difficulty: "easy",
    veg: true,
    keywords: ["sambar", "സാമ്പാർ", "सांबर", "dal"],
    i18n: {
      en: {
        name: "Sambar",
        sub: "Vegetable lentil stew",
        ingredients: ["Toor dal 1 cup", "Mixed vegetables 2 cups", "Tamarind pulp", "Sambar powder", "Mustard, curry leaves, hing"],
        steps: [
          "Pressure cook toor dal with turmeric until soft.",
          "Cook vegetables with tamarind water, salt and sambar powder.",
          "Mash in the dal and simmer for 10 minutes.",
          "Temper mustard, curry leaves and hing in oil and pour over the sambar.",
        ],
      },
      ml: {
        name: "സാമ്പാർ",
        sub: "പച്ചക്കറി സാമ്പാർ",
        ingredients: ["തുവരപ്പരിപ്പ് 1 കപ്പ്", "പച്ചക്കറികൾ 2 കപ്പ്", "പുളി വെള്ളം", "സാമ്പാർ പൊടി", "കടുക്, കറിവേപ്പില, കായം"],
        steps: [
          "പരിപ്പ് മഞ്ഞൾ ചേർത്ത് കുക്കറിൽ വേവിക്കുക.",
          "പുളിവെള്ളം, ഉപ്പ്, സാമ്പാർ പൊടി ചേർത്ത് പച്ചക്കറി വേവിക്കുക.",
          "പരിപ്പ് ഉടച്ചു ചേർത്ത് 10 മിനിറ്റ് തിളപ്പിക്കുക.",
          "കടുക്, കറിവേപ്പില, കായം താളിച്ച് ഒഴിക്കുക.",
        ],
      },
      hi: {
        name: "सांबर",
        sub: "सब्ज़ी दाल स्ट्यू",
        ingredients: ["तुअर दाल 1 कप", "मिली-जुली सब्ज़ियाँ 2 कप", "इमली का पानी", "सांबर पाउडर", "राई, करी पत्ता, हींग"],
        steps: [
          "दाल को हल्दी के साथ कुकर में नरम पकाएँ।",
          "सब्ज़ियों को इमली पानी, नमक व सांबर पाउडर के साथ पकाएँ।",
          "दाल मसलकर मिलाएँ और 10 मिनट उबालें।",
          "राई, करी पत्ता व हींग का तड़का डालें।",
        ],
      },
    },
  },
  {
    slug: "payasam",
    image: payasam,
    time: "45 min",
    rating: 4.8,
    difficulty: "medium",
    veg: true,
    keywords: ["payasam", "പായസം", "पायसम", "kheer", "dessert"],
    i18n: {
      en: {
        name: "Palada Payasam",
        sub: "Creamy rice ada dessert",
        ingredients: ["Rice ada 1 cup", "Milk 1.5 litre", "Sugar 1 cup", "Ghee 2 tbsp", "Cardamom, cashews"],
        steps: [
          "Soak rice ada in hot water for 10 minutes and drain.",
          "Boil the milk in a heavy pan and add the ada, stirring often.",
          "Add sugar and simmer on low heat until the payasam turns pink and thick.",
          "Fry cashews in ghee with cardamom and stir them in before serving.",
        ],
      },
      ml: {
        name: "പാലട പായസം",
        sub: "നാടൻ പാലട പായസം",
        ingredients: ["അട 1 കപ്പ്", "പാൽ 1.5 ലിറ്റർ", "പഞ്ചസാര 1 കപ്പ്", "നെയ്യ് 2 ടേബിൾസ്പൂൺ", "ഏലക്ക, കശുവണ്ടി"],
        steps: [
          "അട ചൂടുവെള്ളത്തിൽ 10 മിനിറ്റ് ഇട്ട് വെള്ളം ഊറ്റുക.",
          "കട്ടിയുള്ള പാത്രത്തിൽ പാൽ തിളപ്പിച്ച് അട ചേർത്ത് ഇളക്കുക.",
          "പഞ്ചസാര ചേർത്ത് ചെറുതീയിൽ പായസം കുറുകി നിറം മാറുന്നതുവരെ വേവിക്കുക.",
          "നെയ്യിൽ കശുവണ്ടിയും ഏലക്കയും വറുത്ത് ചേർക്കുക.",
        ],
      },
      hi: {
        name: "पालदा पायसम",
        sub: "मलाईदार चावल की खीर",
        ingredients: ["राइस अडा 1 कप", "दूध 1.5 लीटर", "चीनी 1 कप", "घी 2 बड़े चम्मच", "इलायची, काजू"],
        steps: [
          "अडा को गर्म पानी में 10 मिनट भिगोकर छान लें।",
          "भारी बर्तन में दूध उबालें और अडा डालकर चलाते रहें।",
          "चीनी डालकर धीमी आँच पर गाढ़ा व गुलाबी होने तक पकाएँ।",
          "घी में काजू व इलायची भूनकर मिलाएँ और परोसें।",
        ],
      },
    },
  },
];

export function findRecipe(slug: string) {
  return RECIPES.find((r) => r.slug === slug);
}

export function searchRecipes(query: string, lang: Lang) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return RECIPES.filter((r) => {
    const loc = r.i18n[lang];
    const hay = [loc.name, loc.sub, r.slug, ...r.keywords, ...Object.values(r.i18n).map((l) => l.name)]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
