import { createFileRoute, useRouter, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Heart, ImagePlus, Languages, MessageCircle, MessageSquare, Plus, Send, ChefHat, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getDeviceId } from "@/lib/dishes";
import { ensureProfile, fetchBlockedIds } from "@/lib/social";
import { translateTexts } from "@/lib/translate.functions";
import {
  addComment, createPost, fetchComments, fetchFeed, toggleLike, type FeedPost,
} from "@/lib/community";


export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "കമ്മ്യൂണിറ്റി — Home Cook Creations | Adukkala" },
      { name: "description", content: "Share photos, videos and step-by-step methods of your homemade recipes, and like or comment on creations from other home cooks." },
      { property: "og:title", content: "Community Feed — Home Cook Creations" },
      { property: "og:description", content: "Upload your homemade recipes with photos, videos and steps. Like and comment on the community's creations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityScreen,
});

const COPY = {
  ml: {
    title: "കമ്മ്യൂണിറ്റി", sub: "വീട്ടിലെ വിഭവങ്ങൾ പങ്കുവയ്ക്കൂ", share: "പങ്കുവയ്ക്കൂ",
    name: "നിങ്ങളുടെ പേര്", recipeTitle: "വിഭവത്തിന്റെ പേര്", about: "വിവരണം",
    steps: "രീതി (ഓരോ വരിയിലും ഒരു സ്റ്റെപ്പ്)", media: "ഫോട്ടോ / വീഡിയോ ചേർക്കുക",
    post: "പോസ്റ്റ് ചെയ്യൂ", posting: "അയക്കുന്നു…", empty: "ഇതുവരെ പോസ്റ്റുകളില്ല",
    comments: "കമന്റുകൾ", writeComment: "ഒരു കമന്റ് എഴുതൂ…", method: "രീതി",
    translate: "വിവർത്തനം", original: "ഒറിജിനൽ", translating: "വിവർത്തനം ചെയ്യുന്നു…", message: "സന്ദേശം",
  },
  en: {
    title: "Community", sub: "Share your homemade creations", share: "Share",
    name: "Your name", recipeTitle: "Recipe title", about: "Description",
    steps: "Method (one step per line)", media: "Add photo / video",
    post: "Post recipe", posting: "Posting…", empty: "No creations yet",
    comments: "Comments", writeComment: "Write a comment…", method: "Method",
    translate: "Translate", original: "Show original", translating: "Translating…", message: "Message",
  },
  hi: {
    title: "कम्युनिटी", sub: "अपनी घरेलू रेसिपी साझा करें", share: "साझा करें",
    name: "आपका नाम", recipeTitle: "रेसिपी का नाम", about: "विवरण",
    steps: "विधि (हर पंक्ति में एक चरण)", media: "फ़ोटो / वीडियो जोड़ें",
    post: "पोस्ट करें", posting: "भेजा जा रहा है…", empty: "अभी कोई पोस्ट नहीं",
    comments: "टिप्पणियाँ", writeComment: "टिप्पणी लिखें…", method: "विधि",
    translate: "अनुवाद", original: "मूल दिखाएँ", translating: "अनुवाद हो रहा है…", message: "संदेश",
  },
} as const;

type Copy = Record<keyof typeof COPY["en"], string>;

function CommunityScreen() {
  const { t, lang } = useI18n();
  const c = COPY[lang];
  const router = useRouter();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [deviceId, setDeviceId] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [openComments, setOpenComments] = useState<string | null>(null);

  useEffect(() => {
    const id = getDeviceId();
    setDeviceId(id);
    void ensureProfile(id, localStorage.getItem("adukkala_name") ?? undefined);
  }, []);

  const blockedQ = useQuery({
    queryKey: ["blocked", deviceId],
    queryFn: () => fetchBlockedIds(deviceId),
    enabled: !!deviceId,
  });


  const feedQ = useQuery({
    queryKey: ["community-feed", deviceId],
    queryFn: () => fetchFeed(deviceId),
    enabled: !!deviceId,
  });

  const likeMutation = useMutation({
    mutationFn: ({ id, liked }: { id: string; liked: boolean }) => toggleLike(id, deviceId, liked),
    onMutate: async ({ id, liked }) => {
      await qc.cancelQueries({ queryKey: ["community-feed", deviceId] });
      const prev = qc.getQueryData<FeedPost[]>(["community-feed", deviceId]) ?? [];
      qc.setQueryData<FeedPost[]>(
        ["community-feed", deviceId],
        prev.map((p) => (p.id === id ? { ...p, liked: !liked, likeCount: p.likeCount + (liked ? -1 : 1) } : p)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => qc.setQueryData(["community-feed", deviceId], ctx?.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ["community-feed", deviceId] }),
  });

  const blocked = blockedQ.data ?? [];
  const posts = (feedQ.data ?? []).filter((p) => !blocked.includes(p.device_id));


  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="mx-auto w-full max-w-md px-5">
        <header className="sticky top-0 z-30 -mx-5 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground active:scale-90"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className={`${t.fontClass} truncate text-lg font-extrabold text-foreground`}>{c.title}</h1>
            <p className="truncate text-xs text-muted-foreground">{c.sub}</p>
          </div>
          <button
            onClick={() => setComposerOpen(true)}
            className="ml-auto flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-soft active:scale-95"
          >
            <Plus className="h-4 w-4" /> {c.share}
          </button>
        </header>

        {feedQ.isLoading && (
          <div className="space-y-4 py-4">
            {[0, 1].map((i) => <div key={i} className="h-64 animate-pulse rounded-3xl bg-muted" />)}
          </div>
        )}

        {!feedQ.isLoading && posts.length === 0 && (
          <div className="grid place-items-center gap-2 py-24 text-center">
            <ChefHat className="h-10 w-10 text-muted-foreground" />
            <p className={`${t.fontClass} font-bold text-foreground`}>{c.empty}</p>
          </div>
        )}

        <div className="space-y-5 py-2">
          {posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              copy={c}
              fontClass={t.fontClass}
              lang={lang}
              deviceId={deviceId}
              commentsOpen={openComments === p.id}
              onToggleComments={() => setOpenComments(openComments === p.id ? null : p.id)}
              onLike={() => likeMutation.mutate({ id: p.id, liked: p.liked })}
              onMessage={() => navigate({ to: "/messages/$deviceId", params: { deviceId: p.device_id } })}
            />
          ))}
        </div>

      </div>

      {composerOpen && (
        <Composer
          deviceId={deviceId}
          copy={c}
          fontClass={t.fontClass}
          onClose={() => setComposerOpen(false)}
          onDone={() => {
            setComposerOpen(false);
            qc.invalidateQueries({ queryKey: ["community-feed", deviceId] });
          }}
        />
      )}
    </div>
  );
}

function PostCard({
  post: p, copy: c, fontClass, lang, deviceId, commentsOpen, onToggleComments, onLike, onMessage,
}: {
  post: FeedPost;
  copy: Copy;
  fontClass: string;
  lang: string;
  deviceId: string;
  commentsOpen: boolean;
  onToggleComments: () => void;
  onLike: () => void;
  onMessage: () => void;
}) {
  const [translated, setTranslated] = useState<{ title: string; description: string; steps: string[] } | null>(null);
  const [showTranslated, setShowTranslated] = useState(false);
  const [error, setError] = useState("");

  const translateM = useMutation({
    mutationFn: async () => {
      const texts = [p.title, p.description, ...p.steps];
      const res = await translateTexts({ data: { texts, lang } });
      return {
        title: res.texts[0] ?? p.title,
        description: res.texts[1] ?? p.description,
        steps: res.texts.slice(2),
      };
    },
    onSuccess: (v) => { setTranslated(v); setShowTranslated(true); setError(""); },
    onError: (e: Error) =>
      setError(e.message === "RATE_LIMIT" ? "Too many requests, try again shortly." : "Translation unavailable."),
  });

  const view = showTranslated && translated ? translated : { title: p.title, description: p.description, steps: p.steps };
  const isSelf = p.device_id === deviceId;

  return (
    <article className="overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border">
      {p.mediaSrc && (
        p.media_type === "video" ? (
          <video src={p.mediaSrc} controls playsInline className="aspect-[4/3] w-full bg-muted object-cover" />
        ) : (
          <img src={p.mediaSrc} alt={p.title} loading="lazy" className="aspect-[4/3] w-full bg-muted object-cover" />
        )
      )}
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <Link
            to="/profile/$deviceId"
            params={{ deviceId: p.device_id }}
            className="flex min-w-0 flex-1 items-center gap-2 active:scale-[0.98]"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
              {p.author_name.charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-foreground">{p.author_name}</span>
              <span className="block text-[10px] text-muted-foreground">
                {new Date(p.created_at).toLocaleDateString()}
              </span>
            </span>
          </Link>
          {!isSelf && (
            <button
              onClick={onMessage}
              aria-label={c.message}
              title={c.message}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground active:scale-90"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
          )}
        </div>
        <h2 className={`${fontClass} text-base font-extrabold text-foreground`}>{view.title}</h2>
        {view.description && <p className="text-sm text-muted-foreground">{view.description}</p>}
        {view.steps.length > 0 && (
          <div className="rounded-2xl bg-secondary p-3">
            <p className={`${fontClass} mb-1 text-[11px] font-bold text-foreground`}>{c.method}</p>
            <ol className="list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
              {view.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
        )}

        <button
          onClick={() => (translated ? setShowTranslated(!showTranslated) : translateM.mutate())}
          disabled={translateM.isPending}
          className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold text-primary active:scale-95 disabled:opacity-60"
        >
          <Languages className="h-3.5 w-3.5" />
          {translateM.isPending ? c.translating : showTranslated ? c.original : c.translate}
        </button>
        {error && <p className="text-[11px] font-semibold text-spice">{error}</p>}

        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={onLike}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground active:scale-90"
          >
            <Heart className={`h-5 w-5 ${p.liked ? "fill-spice text-spice" : ""}`} />
            {p.likeCount}
          </button>
          <button
            onClick={onToggleComments}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground active:scale-90"
          >
            <MessageCircle className="h-5 w-5" /> {p.commentCount}
          </button>
        </div>
        {commentsOpen && <Comments postId={p.id} deviceId={deviceId} copy={c} />}
      </div>
    </article>
  );
}


function Comments({ postId, deviceId, copy }: { postId: string; deviceId: string; copy: Copy }) {
  const qc = useQueryClient();
  const [body, setBody] = useState("");
  const commentsQ = useQuery({ queryKey: ["community-comments", postId], queryFn: () => fetchComments(postId) });
  const mutation = useMutation({
    mutationFn: () => addComment(postId, deviceId, localStorage.getItem("adukkala_name") ?? "Home Chef", body),
    onSuccess: () => {
      setBody("");
      qc.invalidateQueries({ queryKey: ["community-comments", postId] });
      qc.invalidateQueries({ queryKey: ["community-feed", deviceId] });
    },
  });

  return (
    <div className="mt-2 space-y-2 border-t border-border pt-3">
      {(commentsQ.data ?? []).map((cm) => (
        <div key={cm.id} className="rounded-2xl bg-secondary px-3 py-2">
          <p className="text-[11px] font-bold text-foreground">{cm.author_name}</p>
          <p className="text-xs text-muted-foreground">{cm.body}</p>
        </div>
      ))}
      <form
        onSubmit={(e) => { e.preventDefault(); if (body.trim() && deviceId) mutation.mutate(); }}
        className="flex items-center gap-2"
      >
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          placeholder={copy.writeComment}
          className="h-10 flex-1 rounded-full bg-secondary px-4 text-xs text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!body.trim() || mutation.isPending}
          aria-label="Send comment"
          className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Composer({
  deviceId, copy, fontClass, onClose, onDone,
}: {
  deviceId: string;
  copy: Copy;
  fontClass: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const [name, setName] = useState(() => (typeof window === "undefined" ? "" : localStorage.getItem("adukkala_name") ?? ""));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      createPost({
        deviceId,
        authorName: name,
        title,
        description,
        steps: steps.split("\n"),
        file,
      }),
    onSuccess: () => {
      if (name.trim()) localStorage.setItem("adukkala_name", name.trim().slice(0, 60));
      onDone();
    },
    onError: (e: Error) => setError(e.message),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-card p-5 pb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className={`${fontClass} text-base font-extrabold text-foreground`}>{copy.share}</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-secondary">
            <X className="h-4 w-4 text-foreground" />
          </button>
        </div>

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            if (!title.trim()) return setError("Please add a recipe title.");
            if (!deviceId) return;
            mutation.mutate();
          }}
        >
          <label className="block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-border bg-secondary">
            {preview ? (
              file?.type.startsWith("video") ? (
                <video src={preview} className="aspect-[4/3] w-full object-cover" muted playsInline />
              ) : (
                <img src={preview} alt="Preview" className="aspect-[4/3] w-full object-cover" />
              )
            ) : (
              <span className="flex aspect-[4/3] flex-col items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                <ImagePlus className="h-7 w-7" /> {copy.media}
              </span>
            )}
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
            />
          </label>

          <input
            value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder={copy.name}
            className="h-11 w-full rounded-2xl bg-secondary px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <input
            value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder={copy.recipeTitle}
            className="h-11 w-full rounded-2xl bg-secondary px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <textarea
            value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} rows={3} placeholder={copy.about}
            className="w-full rounded-2xl bg-secondary p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <textarea
            value={steps} onChange={(e) => setSteps(e.target.value)} rows={5} placeholder={copy.steps}
            className="w-full rounded-2xl bg-secondary p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {error && <p className="text-xs font-semibold text-spice">{error}</p>}
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`${fontClass} h-12 w-full rounded-2xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-soft active:scale-95 disabled:opacity-60`}
          >
            {mutation.isPending ? copy.posting : copy.post}
          </button>
        </form>
      </div>
    </div>
  );
}
