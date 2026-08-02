import { createServerFn } from "@tanstack/react-start";

export type ScanRecipeIdea = {
  name: string;
  sub: string;
  time: string;
  difficulty: "easy" | "medium" | "hard";
  uses: string[];
};

export type ScanResult = {
  ingredients: string[];
  recipes: ScanRecipeIdea[];
};

type Input = { images: string[]; lang: "ml" | "en" | "hi" };

const LANG_NAME = { ml: "Malayalam", en: "English", hi: "Hindi" } as const;

export const scanIngredients = createServerFn({ method: "POST" })
  .inputValidator((input: Input) => {
    const images = (Array.isArray(input?.images) ? input.images : [])
      .filter((i) => typeof i === "string" && i.startsWith("data:image"))
      .slice(0, 3);
    const lang = (["ml", "en", "hi"] as const).includes(input?.lang) ? input.lang : "en";
    if (!images.length) throw new Error("No frames captured");
    return { images, lang };
  })
  .handler(async ({ data }): Promise<ScanResult> => {
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
              `You are Adukkala, a smart kitchen AI. Look at the frames from a fridge/kitchen scan video and list the food ingredients you can see. ` +
              `Then suggest 4-6 dishes that can be cooked mostly with those exact ingredients (Kerala/Indian home cooking preferred). ` +
              `Write all text in ${LANG_NAME[data.lang]}. ` +
              `Reply with ONLY JSON: {"ingredients":string[],"recipes":[{"name":string,"sub":string,"time":"30 min","difficulty":"easy"|"medium"|"hard","uses":string[]}]}.`,
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Detect the ingredients in these frames and suggest recipes." },
              ...data.images.map((url) => ({ type: "image_url", image_url: { url } })),
            ],
          },
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
    const parsed = JSON.parse(cleaned) as Partial<ScanResult>;

    return {
      ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients.map(String).slice(0, 20) : [],
      recipes: Array.isArray(parsed.recipes)
        ? parsed.recipes.slice(0, 8).map((r): ScanRecipeIdea => ({
            name: String(r?.name ?? ""),
            sub: String(r?.sub ?? ""),
            time: String(r?.time ?? "30 min"),
            difficulty: r?.difficulty === "easy" || r?.difficulty === "hard" ? r.difficulty : "medium",
            uses: Array.isArray(r?.uses) ? r.uses.map(String).slice(0, 6) : [],
          })).filter((r) => r.name)
        : [],
    };
  });
