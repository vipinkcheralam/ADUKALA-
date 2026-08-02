import { createServerFn } from "@tanstack/react-start";

export type AiSubstitute = {
  name: string;
  note: string;
  emoji: string;
  options: { name: string; ratio: string; tip: string }[];
};

type Input = { query: string; lang: "ml" | "en" | "hi" };

const LANG_NAME = { ml: "Malayalam", en: "English", hi: "Hindi" } as const;

export const lookupSubstitute = createServerFn({ method: "POST" })
  .inputValidator((input: Input) => {
    const query = String(input?.query ?? "").slice(0, 80).trim();
    const lang = (["ml", "en", "hi"] as const).includes(input?.lang) ? input.lang : "en";
    if (!query) throw new Error("Query is required");
    return { query, lang };
  })
  .handler(async ({ data }): Promise<AiSubstitute> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          {
            role: "system",
            content:
              `You are Adukkala, a professional culinary reference for ingredient substitutions worldwide. ` +
              `Given any cooking ingredient (any cuisine, any country), return the best practical replacements with exact measurement ratios. ` +
              `Write all text in ${LANG_NAME[data.lang]} (keep well-known ingredient names recognisable). ` +
              `Reply with ONLY JSON: {"name":string,"note":string,"emoji":one emoji,"options":[{"name":string,"ratio":string like "1 cup = 1 cup","tip":short string}]}. ` +
              `Give 3-5 options ordered best-first. If the input is not a food ingredient, set note to a short explanation and options to [].`,
          },
          { role: "user", content: `Substitutes for: ${data.query}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (res.status === 402) throw new Error("CREDITS");
    if (!res.ok) throw new Error(`AI request failed: ${res.status}`);

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = json.choices?.[0]?.message?.content ?? "";
    const cleaned = content.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(cleaned) as Partial<AiSubstitute>;

    return {
      name: String(parsed.name || data.query),
      note: String(parsed.note || ""),
      emoji: String(parsed.emoji || "🥄").slice(0, 4),
      options: Array.isArray(parsed.options)
        ? parsed.options.slice(0, 6).map((o) => ({
            name: String(o?.name ?? ""),
            ratio: String(o?.ratio ?? ""),
            tip: String(o?.tip ?? ""),
          })).filter((o) => o.name)
        : [],
    };
  });
