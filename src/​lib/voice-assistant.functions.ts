import { createServerFn } from "@tanstack/react-start";

type Lang = "ml" | "en" | "hi";
const LANG_NAME: Record<Lang, string> = { ml: "Malayalam", en: "English", hi: "Hindi" };

function b64ToBytes(b64: string) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Transcribe a base64 WAV recording with the Lovable AI speech-to-text gateway. */
export const transcribeVoice = createServerFn({ method: "POST" })
  .inputValidator((input: { audio: string }) => {
    const audio = String(input?.audio ?? "");
    if (!audio) throw new Error("Audio is required");
    if (audio.length > 12_000_000) throw new Error("Recording too long");
    return { audio };
  })
  .handler(async ({ data }): Promise<{ text: string }> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const bytes = b64ToBytes(data.audio);
    if (bytes.byteLength < 2048) throw new Error("EMPTY_AUDIO");

    const form = new FormData();
    form.append("model", "openai/gpt-4o-transcribe");
    form.append("file", new Blob([bytes], { type: "audio/wav" }), "recording.wav");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
    });

    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (res.status === 402) throw new Error("CREDITS");
    if (!res.ok) throw new Error(`Transcription failed: ${res.status} ${await res.text().catch(() => "")}`);

    const json = (await res.json()) as { text?: string };
    return { text: String(json.text ?? "").trim() };
  });

export type VoiceAnswer = { text: string; lang: Lang };

/** Answer a cooking question in the language the user spoke. */
export const askVoiceChef = createServerFn({ method: "POST" })
  .inputValidator((input: { question: string; context?: string; lang: Lang }) => {
    const question = String(input?.question ?? "").slice(0, 500).trim();
    if (!question) throw new Error("Question is required");
    const lang = (["ml", "en", "hi"] as const).includes(input?.lang) ? input.lang : "en";
    const context = String(input?.context ?? "").slice(0, 4000);
    return { question, context, lang };
  })
  .handler(async ({ data }): Promise<VoiceAnswer> => {
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
              "You are Adukkala's hands-free AI cooking assistant. The user is cooking and speaking to you. " +
              "Detect the language of the user's question and reply ONLY in that same language " +
              `(app language is ${LANG_NAME[data.lang]}; use it if the question language is unclear). ` +
              "Answer in 1-3 short spoken-style sentences, no markdown, no lists, no emojis. " +
              "Reply with ONLY JSON: {\"text\":string,\"lang\":\"ml\"|\"en\"|\"hi\"} where lang is the language you replied in." +
              (data.context ? `\n\nCurrent screen context:\n${data.context}` : ""),
          },
          { role: "user", content: data.question },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (res.status === 402) throw new Error("CREDITS");
    if (!res.ok) throw new Error(`AI request failed: ${res.status}`);

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = (json.choices?.[0]?.message?.content ?? "").replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    let parsed: Partial<VoiceAnswer> = {};
    try {
      parsed = JSON.parse(content) as Partial<VoiceAnswer>;
    } catch {
      parsed = { text: content };
    }
    const lang = (["ml", "en", "hi"] as const).includes(parsed.lang as Lang) ? (parsed.lang as Lang) : data.lang;
    return { text: String(parsed.text ?? "").trim(), lang };
  });