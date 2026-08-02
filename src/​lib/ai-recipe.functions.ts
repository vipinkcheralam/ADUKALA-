import { createServerFn } from "@tanstack/react-start";

export type AiRecipe = {
  name: string;
  sub: string;
  time: string;
  difficulty: "easy" | "medium" | "hard";
  ingredients: string[];
  steps: string[];
};

type Input = { query: string; lang: "ml" | "en" | "hi" };

const LANG_NAME = { ml: "Malayalam", en: "English", hi: "Hindi" } as const;

export const generateAiRecipe = createServerFn({ method: "POST" })
  .inputValidator((input: Input) => {
    const query = String(input?.query ?? "").slice(0, 120).trim();
    const lang = (["ml", "en", "hi"] as const).includes(input?.lang) ? input.lang : "en";
    if (!query) throw new Error("Query is required");
    return { query, lang };
  })
  .handler(async ({ data }): Promise<AiRecipe> => {
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
              `You are Adukkala, a smart chef. Write the recipe entirely in ${LANG_NAME[data.lang]}. ` +
              `Reply with ONLY JSON: {"name":string,"sub":string,"time":string like "30 min","difficulty":"easy"|"medium"|"hard","ingredients":string[],"steps":string[]}. ` +
              `Use 4-8 ingredients and 3-6 short numbered-friendly steps.`,
          },
          { role: "user", content: `Recipe for: ${data.query}` },
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
    const parsed = JSON.parse(cleaned) as Partial<AiRecipe>;

    return {
      name: parsed.name || data.query,
      sub: parsed.sub || "",
      time: parsed.time || "30 min",
      difficulty: parsed.difficulty === "hard" || parsed.difficulty === "easy" ? parsed.difficulty : "medium",
      ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients.map(String) : [],
      steps: Array.isArray(parsed.steps) ? parsed.steps.map(String) : [],
    };
  });
