/**
 * Phone-number validation for registration.
 *
 * Goal: accept real, dialable mobile numbers and reject the obvious fakes
 * people type to skip registration (1234567890, 0000000000, 5551234567,
 * repeated pairs, short sequences, etc).
 */

export type PhoneCheck = { ok: true; e164: string } | { ok: false; reason: PhoneReason };

export type PhoneReason =
  | "empty"
  | "too_short"
  | "too_long"
  | "fake"
  | "sequential"
  | "repeated"
  | "invalid_prefix";

/** Digits-only national number length per country (min, max). */
const LENGTH: Record<string, [number, number]> = {
  IN: [10, 10], AE: [9, 9], SA: [9, 9], QA: [8, 8], KW: [8, 8], OM: [8, 8], BH: [8, 8],
  US: [10, 10], CA: [10, 10], GB: [10, 10], IE: [9, 9], AU: [9, 9], NZ: [8, 10],
  SG: [8, 8], MY: [9, 10], ID: [9, 12], PH: [10, 10], TH: [9, 9], VN: [9, 9],
  CN: [11, 11], HK: [8, 8], JP: [10, 10], KR: [9, 10], LK: [9, 9], PK: [10, 10],
  BD: [10, 10], NP: [10, 10], MV: [7, 7], DE: [10, 11], FR: [9, 9], IT: [9, 10],
  ES: [9, 9], PT: [9, 9], NL: [9, 9], BE: [9, 9], CH: [9, 9], AT: [10, 13],
  SE: [9, 9], NO: [8, 8], DK: [8, 8], FI: [9, 10], PL: [9, 9], CZ: [9, 9],
  GR: [10, 10], TR: [10, 10], RU: [10, 10], UA: [9, 9], IL: [9, 9], EG: [10, 10],
  ZA: [9, 9], NG: [10, 10], KE: [9, 9], TZ: [9, 9], GH: [9, 9], MA: [9, 9],
  BR: [10, 11], AR: [10, 10], CL: [9, 9], CO: [10, 10], MX: [10, 10], PE: [9, 9],
};

/** Leading digits that a real mobile line uses, when the country is strict about it. */
const MOBILE_PREFIX: Record<string, RegExp> = {
  IN: /^[6-9]/,
  AE: /^5/,
  SA: /^5/,
  GB: /^7/,
  CN: /^1[3-9]/,
  PK: /^3/,
  LK: /^7/,
  BD: /^1[3-9]/,
  NP: /^9[678]/,
  ZA: /^[6-8]/,
  KE: /^[17]/,
  NG: /^[789]/,
  TR: /^5/,
  RU: /^9/,
  UA: /^[3679]/,
  IL: /^5/,
  EG: /^1/,
  MX: /^[1-9]/,
};

/** Hard-blocked demo/test numbers seen in fake registrations. */
const BLOCKLIST = new Set([
  "1234567890", "0123456789", "9876543210", "1111111111", "0000000000",
  "9999999999", "1234512345", "1234567891", "5555555555", "1231231234",
  "9999999998", "1212121212", "7777777777", "8888888888", "1234554321",
  "123456789", "12345678", "1234567", "987654321", "000000000", "111111111",
]);

function isAllSame(d: string) {
  return /^(\d)\1+$/.test(d);
}

function isSequential(d: string) {
  // ascending or descending runs of 5+ consecutive digits anywhere
  let asc = 1;
  let desc = 1;
  for (let i = 1; i < d.length; i++) {
    const diff = Number(d[i]) - Number(d[i - 1]);
    asc = diff === 1 ? asc + 1 : 1;
    desc = diff === -1 ? desc + 1 : 1;
    if (asc >= 6 || desc >= 6) return true;
  }
  return false;
}

function isRepeatedPattern(d: string) {
  // 121212..., 123123123..., 45454545
  for (const size of [1, 2, 3, 4]) {
    if (d.length >= size * 3 && d.length % size === 0) {
      const unit = d.slice(0, size);
      if (unit.repeat(d.length / size) === d) return true;
    }
  }
  // 5 or more of the same digit in a row
  return /(\d)\1{4,}/.test(d);
}

/** Validate a national number for a country. `dial` is like "+91". */
export function checkPhone(country: string, dial: string, raw: string): PhoneCheck {
  const digits = raw.replace(/\D/g, "").replace(/^0+/, "");
  if (!digits) return { ok: false, reason: "empty" };

  const [min, max] = LENGTH[country] ?? [7, 14];
  if (digits.length < min) return { ok: false, reason: "too_short" };
  if (digits.length > max) return { ok: false, reason: "too_long" };

  if (BLOCKLIST.has(digits)) return { ok: false, reason: "fake" };
  if (isAllSame(digits)) return { ok: false, reason: "repeated" };
  if (isRepeatedPattern(digits)) return { ok: false, reason: "repeated" };
  if (isSequential(digits)) return { ok: false, reason: "sequential" };

  // A real number never has fewer than 4 distinct digits.
  if (new Set(digits).size < 4) return { ok: false, reason: "fake" };

  const prefix = MOBILE_PREFIX[country];
  if (prefix && !prefix.test(digits)) return { ok: false, reason: "invalid_prefix" };

  // NANP (US/CA): area code and exchange must start 2-9, and 555 is reserved for fiction.
  if (country === "US" || country === "CA") {
    const area = digits.slice(0, 3);
    const exch = digits.slice(3, 6);
    if (!/^[2-9]/.test(area) || !/^[2-9]/.test(exch)) return { ok: false, reason: "invalid_prefix" };
    if (exch === "555" || area === "555") return { ok: false, reason: "fake" };
    if (/^(\d)\1\1$/.test(area)) return { ok: false, reason: "fake" };
  }

  return { ok: true, e164: `${dial}${digits}` };
}

export const PHONE_ERRORS: Record<"ml" | "en" | "hi", Record<PhoneReason, string>> = {
  ml: {
    empty: "മൊബൈൽ നമ്പർ നൽകുക",
    too_short: "നമ്പർ പൂർണ്ണമല്ല",
    too_long: "നമ്പർ വളരെ നീളമുള്ളതാണ്",
    fake: "ഇത് യഥാർത്ഥ നമ്പറല്ല. സജീവമായ മൊബൈൽ നമ്പർ നൽകുക",
    sequential: "തുടർച്ചയായ അങ്കങ്ങൾ അനുവദിക്കില്ല",
    repeated: "ആവർത്തിക്കുന്ന അങ്കങ്ങൾ അനുവദിക്കില്ല",
    invalid_prefix: "ഈ രാജ്യത്ത് സാധുവായ മൊബൈൽ നമ്പറല്ല",
  },
  en: {
    empty: "Enter your mobile number",
    too_short: "This number looks incomplete",
    too_long: "This number is too long",
    fake: "That looks like a demo number. Please enter a real, active mobile number",
    sequential: "Sequential numbers like 1234567890 aren't allowed",
    repeated: "Repeated digits aren't allowed",
    invalid_prefix: "Not a valid mobile number for this country",
  },
  hi: {
    empty: "अपना मोबाइल नंबर दर्ज करें",
    too_short: "यह नंबर अधूरा है",
    too_long: "यह नंबर बहुत लंबा है",
    fake: "यह डेमो नंबर लगता है। कृपया वास्तविक, सक्रिय मोबाइल नंबर दर्ज करें",
    sequential: "1234567890 जैसे क्रमिक नंबर मान्य नहीं हैं",
    repeated: "दोहराए गए अंक मान्य नहीं हैं",
    invalid_prefix: "इस देश के लिए मान्य मोबाइल नंबर नहीं है",
  },
};
