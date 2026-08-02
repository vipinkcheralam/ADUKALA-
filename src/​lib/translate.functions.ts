import { createServerFn } from "@tanstack/react-start";

type Input = { texts: string[]; lang: string };

const LANG_NAME: Record<string, string> = {
  ml: "Malayalam",
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  kn: "Kannada",
  te: "Telugu",
  ar: "Arabic",
};

export const translateTexts = createServerFn({ method: "POST" })
  .inputValidator((input: Input) => {
    const texts = (Array.isArray(input?.texts) ? input.texts : [])
      .map((t) => String(t ?? "").slice(0, 2000))
      .slice(0, 30);
    const lang = String(input?.lang ?? "en").slice(0, 5);
    if (texts.length === 0) throw new Error("Nothing to translate");
    return { texts, lang };
  })
  .handler(async ({ data }): Promise<{ texts: string[] }> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const target = LANG_NAME[data.lang] ?? "English";

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          {
            role: "system",
            content:
              `You are a translation engine for a cooking community app. Translate every string into ${target}. ` +
              `Keep cooking terms natural, preserve line breaks, do not add commentary. ` +
              `Reply with ONLY JSON: {"texts": string[]} with exactly the same number of items, in the same order. ` +
              `If a string is already in ${target}, return it unchanged.`,
          },
          { role: "user", content: JSON.stringify({ texts: data.texts }) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (res.status === 402) throw new Error("CREDITS");
    if (!res.ok) throw new Error(`Translation failed: ${res.status}`);

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = (json.choices?.[0]?.message?.content ?? "").replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(content) as { texts?: unknown };
    const out = Array.isArray(parsed.texts) ? parsed.texts.map(String) : [];
    return { texts: data.texts.map((t, i) => out[i] ?? t) };
  });
