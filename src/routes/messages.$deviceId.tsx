import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ImagePlus, Send, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getDeviceId } from "@/lib/dishes";
import { fetchConversation, fetchProfile, sendMessage } from "@/lib/social";

export const Route = createFileRoute("/messages/$deviceId")({
  head: () => ({
    meta: [
      { title: "Messages — Adukkala Community Chat" },
      { name: "description", content: "Private chat with fellow home cooks: send messages and photos about their shared recipes." },
      { property: "og:title", content: "Messages — Adukkala Community Chat" },
      { property: "og:description", content: "Send direct messages and photos to home cooks in the Adukkala community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChatScreen,
});

const COPY = {
  ml: { placeholder: "സന്ദേശം എഴുതൂ…", empty: "സംഭാഷണം തുടങ്ങൂ", photo: "ഫോട്ടോ അയക്കൂ", blocked: "ബ്ലോക്ക് ചെയ്ത ഉപയോക്താവ്" },
  en: { placeholder: "Write a message…", empty: "Start the conversation", photo: "Send photo", blocked: "You blocked this user" },
  hi: { placeholder: "संदेश लिखें…", empty: "बातचीत शुरू करें", photo: "फ़ोटो भेजें", blocked: "आपने इस उपयोगकर्ता को ब्लॉक किया है" },
} as const;

function ChatScreen() {
  const { deviceId: otherId } = Route.useParams();
  const { t, lang } = useI18n();
  const c = COPY[lang];
  const router = useRouter();
  const qc = useQueryClient();
  const [me, setMe] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMe(getDeviceId()), []);

  const profileQ = useQuery({
    queryKey: ["profile", otherId, me],
    queryFn: () => fetchProfile(otherId, me),
    enabled: !!otherId,
  });

  const msgsQ = useQuery({
    queryKey: ["conversation", me, otherId],
    queryFn: () => fetchConversation(me, otherId),
    enabled: !!me && !!otherId,
    refetchInterval: 8000,
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [msgsQ.data?.length]);

  const sendM = useMutation({
    mutationFn: () => sendMessage(me, otherId, body, file),
    onSuccess: () => {
      setBody("");
      setFile(null);
      setPreview(null);
      qc.invalidateQueries({ queryKey: ["conversation", me, otherId] });
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5">
        <header className="sticky top-0 z-30 -mx-5 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground active:scale-90"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          {profileQ.data?.avatarSrc ? (
            <img src={profileQ.data.avatarSrc} alt="" className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
              {(profileQ.data?.display_name ?? "H").charAt(0).toUpperCase()}
            </span>
          )}
          <h1 className={`${t.fontClass} truncate text-sm font-extrabold text-foreground`}>
            {profileQ.data?.display_name ?? "…"}
          </h1>
        </header>

        <div className="flex-1 space-y-2 py-2">
          {(msgsQ.data ?? []).length === 0 && (
            <p className="py-10 text-center text-xs text-muted-foreground">{c.empty}</p>
          )}
          {(msgsQ.data ?? []).map((m) => {
            const mine = m.sender_device_id === me;
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] space-y-1.5 rounded-2xl px-3 py-2 text-xs ${
                    mine ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  {m.mediaSrc && <img src={m.mediaSrc} alt="" className="max-h-64 w-full rounded-xl object-cover" />}
                  {m.body && <p className="whitespace-pre-line">{m.body}</p>}
                  <p className="text-right text-[9px] opacity-70">
                    {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if ((body.trim() || file) && me && !sendM.isPending) sendM.mutate();
          }}
          className="sticky bottom-0 -mx-5 space-y-2 bg-background/90 px-5 py-3 backdrop-blur-xl"
        >
          {preview && (
            <div className="relative w-24">
              <img src={preview} alt="" className="h-24 w-24 rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => { setFile(null); setPreview(null); }}
                aria-label="Remove photo"
                className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <label
              aria-label={c.photo}
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-secondary text-foreground"
            >
              <ImagePlus className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  setPreview(f ? URL.createObjectURL(f) : null);
                }}
              />
            </label>
            <input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={2000}
              placeholder={c.placeholder}
              className="h-10 flex-1 rounded-full bg-secondary px-4 text-xs text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={(!body.trim() && !file) || sendM.isPending}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
