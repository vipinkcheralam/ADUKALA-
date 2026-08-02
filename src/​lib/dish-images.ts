// Accurate per-dish photography. Keys are festival recipe ids.
import avial from "@/assets/dishes/avial.jpg";
import parippuCurry from "@/assets/dishes/parippu-curry.jpg";
import kaalan from "@/assets/dishes/kaalan.jpg";
import olan from "@/assets/dishes/olan.jpg";
import erissery from "@/assets/dishes/erissery.jpg";
import beansThoran from "@/assets/dishes/beans-thoran.jpg";
import cheeraThoran from "@/assets/dishes/cheera-thoran.jpg";
import pineapplePachadi from "@/assets/dishes/pineapple-pachadi.jpg";
import cucumberKichadi from "@/assets/dishes/cucumber-kichadi.jpg";
import beetrootPachadi from "@/assets/dishes/beetroot-pachadi.jpg";
import injiPuli from "@/assets/dishes/inji-puli.jpg";
import narangaCurry from "@/assets/dishes/naranga-curry.jpg";
import mangoPickle from "@/assets/dishes/mango-pickle.jpg";
import rasam from "@/assets/dishes/rasam.jpg";
import pulissery from "@/assets/dishes/pulissery.jpg";
import koottukari from "@/assets/dishes/koottukari.jpg";
import moruCurry from "@/assets/dishes/moru-curry.jpg";
import pappadam from "@/assets/dishes/pappadam.jpg";
import mattaRice from "@/assets/dishes/matta-rice.jpg";
import neyChoru from "@/assets/dishes/ney-choru.jpg";
import mampazhaPulissery from "@/assets/dishes/mampazha-pulissery.jpg";

import adaPradhaman from "@/assets/dishes/ada-pradhaman.jpg";
import paladaPayasam from "@/assets/dishes/palada-payasam.jpg";
import semiyaPayasam from "@/assets/dishes/semiya-payasam.jpg";
import parippuPayasam from "@/assets/dishes/parippu-payasam.jpg";
import chakkaPradhaman from "@/assets/dishes/chakka-pradhaman.jpg";
import gothambuPayasam from "@/assets/dishes/gothambu-payasam.jpg";
import carrotPayasam from "@/assets/dishes/carrot-payasam.jpg";
import mangoPayasam from "@/assets/dishes/mango-payasam.jpg";

import bananaChips from "@/assets/dishes/banana-chips.jpg";
import sharkaraVaratti from "@/assets/dishes/sharkara-varatti.jpg";
import pazhamPori from "@/assets/dishes/pazham-pori.jpg";
import unniyappam from "@/assets/dishes/unniyappam.jpg";
import achappam from "@/assets/dishes/achappam.jpg";
import kuzhalappam from "@/assets/dishes/kuzhalappam.jpg";
import murukku from "@/assets/dishes/murukku.jpg";
import elaAda from "@/assets/dishes/ela-ada.jpg";
import avalosUnda from "@/assets/dishes/avalos-unda.jpg";
import neyyappam from "@/assets/dishes/neyyappam.jpg";
import cheeda from "@/assets/dishes/cheeda.jpg";
import thattai from "@/assets/dishes/thattai.jpg";
import mixture from "@/assets/dishes/mixture.jpg";
import ribbonPakoda from "@/assets/dishes/ribbon-pakoda.jpg";
import samosa from "@/assets/dishes/samosa.jpg";
import namakPare from "@/assets/dishes/namak-pare.jpg";
import sev from "@/assets/dishes/sev.jpg";
import mathri from "@/assets/dishes/mathri.jpg";
import masalaPeanuts from "@/assets/dishes/masala-peanuts.jpg";
import paniyaram from "@/assets/dishes/paniyaram.jpg";

import laddoo from "@/assets/dishes/laddoo.jpg";
import kajuKatli from "@/assets/dishes/kaju-katli.jpg";
import gulabJamun from "@/assets/dishes/gulab-jamun.jpg";
import jalebi from "@/assets/dishes/jalebi.jpg";
import mysorePak from "@/assets/dishes/mysore-pak.jpg";
import ravaKesari from "@/assets/dishes/rava-kesari.jpg";
import coconutBarfi from "@/assets/dishes/coconut-barfi.jpg";
import badamHalwa from "@/assets/dishes/badam-halwa.jpg";
import milkPeda from "@/assets/dishes/milk-peda.jpg";
import besanBarfi from "@/assets/dishes/besan-barfi.jpg";
import gajarHalwa from "@/assets/dishes/gajar-halwa.jpg";
import rasgulla from "@/assets/dishes/rasgulla.jpg";
import shankarpali from "@/assets/dishes/shankarpali.jpg";
import milkCake from "@/assets/dishes/milk-cake.jpg";

import vegBiryani from "@/assets/dishes/veg-biryani.jpg";
import paneerButterMasala from "@/assets/dishes/paneer-butter-masala.jpg";
import chanaMasala from "@/assets/dishes/chana-masala.jpg";
import puriBhaji from "@/assets/dishes/puri-bhaji.jpg";
import jeeraPulao from "@/assets/dishes/jeera-pulao.jpg";
import dalMakhani from "@/assets/dishes/dal-makhani.jpg";
import alooGobi from "@/assets/dishes/aloo-gobi.jpg";
import kadaiPaneer from "@/assets/dishes/kadai-paneer.jpg";
import badamMilk from "@/assets/dishes/badam-milk.jpg";

import plumCake from "@/assets/dishes/plum-cake.jpg";
import roastChicken from "@/assets/dishes/roast-chicken.jpg";
import duckRoast from "@/assets/dishes/duck-roast.jpg";
import beefFry from "@/assets/dishes/beef-fry.jpg";
import muttonStew from "@/assets/dishes/mutton-stew.jpg";
import vattayappam from "@/assets/dishes/vattayappam.jpg";
import homemadeWine from "@/assets/dishes/homemade-wine.jpg";
import vishuKanji from "@/assets/dishes/vishu-kanji.jpg";

/** recipe id -> accurate dish photo */
export const DISH_IMAGES: Record<string, string> = {
  // Onam sadhya
  avial, "vishu-avial": avial,
  "parippu-curry": parippuCurry, "vishu-parippu": parippuCurry,
  kaalan, "vishu-kaalan": kaalan,
  olan, "vishu-olan": olan,
  erissery, "vishu-erissery": erissery,
  "cabbage-thoran": beansThoran,
  "beans-thoran": beansThoran,
  "cheera-thoran": cheeraThoran,
  "chakka-thoran": cheeraThoran,
  "vishu-thoran": beetrootPachadi,
  "pineapple-pachadi": pineapplePachadi, "vishu-pachadi": pineapplePachadi,
  "cucumber-kichadi": cucumberKichadi, "vishu-kichadi": cucumberKichadi,
  "beetroot-pachadi": beetrootPachadi,
  "inji-puli": injiPuli, "vishu-inji-curry": injiPuli,
  "naranga-curry": narangaCurry,
  "manga-achar": mangoPickle, "vishu-pickle": mangoPickle,
  rasam, "vishu-rasam": rasam, "veppampoo-rasam": rasam,
  pulissery,
  "mambazha-pulissery": mampazhaPulissery,
  koottukari, "vishu-koottukari": koottukari,
  "moru-curry": moruCurry, "vishu-moru": moruCurry,
  pappadam,
  "matta-choru": mattaRice,
  "ney-choru": neyChoru, "ney-choru-v": neyChoru,
  sambar: pulissery,
  "vishu-sambar": pulissery,

  // Payasams
  "ada-pradhaman": adaPradhaman, "vishu-ada-pradhaman": adaPradhaman,
  "palada-payasam": paladaPayasam, "vishu-palada": paladaPayasam,
  "pal-payasam": paladaPayasam, "vishu-pal-payasam": paladaPayasam,
  "semiya-payasam": semiyaPayasam, "vishu-semiya": semiyaPayasam,
  "parippu-payasam": parippuPayasam, "vishu-parippu-payasam": parippuPayasam,
  "kadala-payasam": parippuPayasam, "cherupayar-payasam": parippuPayasam,
  "chakka-pradhaman": chakkaPradhaman, "vishu-chakka": chakkaPradhaman,
  "gothambu-payasam": gothambuPayasam, "vishu-gothambu": gothambuPayasam,
  "carrot-payasam": carrotPayasam,
  "vishu-mango-payasam": mangoPayasam,

  // Snacks
  upperi: bananaChips, "banana-chips-d": bananaChips, "vishu-chips": bananaChips,
  "sharkara-varatti": sharkaraVaratti, "vishu-sharkara": sharkaraVaratti,
  "pazham-pori": pazhamPori, "vishu-pazham-pori": pazhamPori, "banana-fritters": pazhamPori,
  unniyappam, "vishu-unniyappam": unniyappam,
  achappam, "vishu-achappam": achappam, "rose-cookies": achappam,
  kuzhalappam, "vishu-kuzhalappam": kuzhalappam,
  murukku, "murukku-d": murukku, chakli: murukku,
  "ela-ada": elaAda, "vishu-ela-ada": elaAda,
  "avalos-unda": avalosUnda,
  neyyappam, "vishu-neyyappam": neyyappam,
  cheeda, thattai, mixture,
  "ribbon-pakoda": ribbonPakoda,
  samosa, "samosa-x": samosa,
  "namak-pare": namakPare,
  sev, mathri,
  "masala-peanuts": masalaPeanuts,
  "uzhunnu-vada": paniyaram,
  "veg-cutlet": ribbonPakoda,
  "cheese-straws": mathri,

  // Sweets
  "besan-laddoo": laddoo, "boondi-laddoo": laddoo,
  "kaju-katli": kajuKatli, marzipan: kajuKatli,
  "gulab-jamun": gulabJamun,
  jalebi,
  "mysore-pak": mysorePak,
  "rava-kesari": ravaKesari,
  "coconut-barfi": coconutBarfi, "coconut-macaroon": coconutBarfi, "coconut-ice": coconutBarfi,
  "badam-halwa": badamHalwa,
  "milk-peda": milkPeda,
  "besan-barfi": besanBarfi,
  "gajar-halwa": gajarHalwa,
  rasgulla,
  shankarpali, kalkals: shankarpali, gingerbread: shankarpali,
  "milk-cake": milkCake, "date-roll": milkCake,

  // Mains
  "veg-biryani": vegBiryani, "christmas-biryani": vegBiryani,
  "paneer-butter-masala": paneerButterMasala,
  "chana-masala": chanaMasala, "kadala-curry": chanaMasala,
  "puri-bhaji": puriBhaji,
  "jeera-pulao": jeeraPulao,
  "dal-makhani": dalMakhani,
  "aloo-gobi": alooGobi,
  "kadai-paneer": kadaiPaneer,
  "badam-milk": badamMilk,

  // Christmas
  "plum-cake": plumCake, "rich-fruit-cake": plumCake, "christmas-pudding": plumCake,
  "banana-cake": plumCake, "tea-cake": milkCake,
  "chicken-roast": roastChicken, "chicken-lollipop": roastChicken,
  "duck-roast": duckRoast,
  "beef-fry": beefFry, "pork-vindaloo": beefFry,
  "mutton-curry": muttonStew, "vegetable-stew": muttonStew,
  "grape-wine": homemadeWine, "mulled-wine": homemadeWine, "plum-punch": homemadeWine,

  // Vishu
  "vishu-kanji": vishuKanji, "vishu-katta": vattayappam,
  "mango-curry": mampazhaPulissery,
};
