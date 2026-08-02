import { createFileRoute, useRouter, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Ban, Heart, MessageCircle, MessageSquare, ShieldCheck, Trash2, UserCheck, UserPlus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getDeviceId } from "@/lib/dishes";
import { fetchProfile, toggleBlock, toggleFollow } from "@/lib/social";
import { deletePost, fetchUserPosts } from "@/lib/community";

export const Route = createFileRoute("/profile/$deviceId")({
  head: () => ({
    meta: [
      { title: "Home Chef Profile — Adukkala Community" },
      { name: "description", content: "View a home cook's public profile, follow them and message them about their recipes." },
      { property: "og:title", content: "Home Chef Profile — Adukkala Community" },
      { property: "og:description", content: "Follow home cooks, browse their shared recipes and start a conversation." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfileScreen,
});

const COPY = {
  ml: { follow: "പിന്തുടരൂ", following: "പിന്തുടരുന്നു", message: "സന്ദേശം", block: "ബ്ലോക്ക്", unblock: "അൺബ്ലോക്ക്", followers: "പിന്തുടരുന്നവർ", followingC: "പിന്തുടരുന്നു", posts: "പോസ്റ്റുകൾ", privacy: "സ്വകാര്യ വിവരങ്ങൾ (ഫോൺ നമ്പർ) പൊതുവായി കാണിക്കില്ല", blocked: "ഈ ഉപയോക്താവിനെ ബ്ലോക്ക് ചെയ്തിരിക്കുന്നു", noPosts: "ഇതുവരെ പോസ്റ്റുകളില്ല", delete: "നീക്കം", confirmDelete: "ഉറപ്പാണോ?", likes: "ലൈക്കുകൾ", comments: "കമന്റുകൾ" },
  en: { follow: "Follow", following: "Following", message: "Message", block: "Block", unblock: "Unblock", followers: "Followers", followingC: "Following", posts: "Posts", privacy: "Personal details such as phone numbers are never shown publicly", blocked: "You have blocked this user", noPosts: "No posts yet", delete: "Delete", confirmDelete: "Tap to confirm", likes: "likes", comments: "comments" },
  hi: { follow: "फ़ॉलो करें", following: "फ़ॉलो कर रहे हैं", message: "संदेश", block: "ब्लॉक", unblock: "अनब्लॉक", followers: "फ़ॉलोअर्स", followingC: "फ़ॉलोइंग", posts: "पोस्ट", privacy: "फ़ोन नंबर जैसी निजी जानकारी कभी सार्वजनिक नहीं दिखाई जाती", blocked: "आपने इस उपयोगकर्ता को ब्लॉक किया है", noPosts: "अभी कोई पोस्ट नहीं", delete: "हटाएँ", confirmDelete: "पुष्टि करें", likes: "लाइक", comments: "कमेंट" },
} as const;

function ProfileScreen() {
  const { deviceId: targetId } = Route.useParams();
  const { t, lang } = useI18n();
  const c = COPY[lang];
  const router = useRouter();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [me, setMe] = useState("");

  useEffect(() => setMe(getDeviceId()), []);

  const profileQ = useQuery({
    queryKey: ["profile", targetId, me],
    queryFn: () => fetchProfile(targetId, me),
    enabled: !!targetId,
  });

  const [confirmId, setConfirmId] = useState<string | null>(null);

  const postsQ = useQuery({
    queryKey: ["profile-posts", targetId, me],
    queryFn: () => fetchUserPosts(targetId, me),
    enabled: !!targetId,
  });

  const deleteM = useMutation({
    mutationFn: (postId: string) => deletePost(postId, me),
    onSuccess: () => {
      setConfirmId(null);
      qc.invalidateQueries({ queryKey: ["profile-posts", targetId, me] });
      qc.invalidateQueries({ queryKey: ["community-feed"] });
    },
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["profile", targetId, me] });
  const followM = useMutation({
    mutationFn: () => toggleFollow(me, targetId, !!profileQ.data?.isFollowing),
    onSuccess: invalidate,
  });
  const blockM = useMutation({
    mutationFn: () => toggleBlock(me, targetId, !!profileQ.data?.isBlocked),
    onSuccess: () => { invalidate(); qc.invalidateQueries({ queryKey: ["community-feed"] }); },
  });

  const p = profileQ.data;
  const isSelf = !!me && me === targetId;

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto w-full max-w-md px-5">
        <header className="sticky top-0 z-30 -mx-5 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground active:scale-90"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className={`${t.fontClass} truncate text-lg font-extrabold text-foreground`}>
            {p?.display_name ?? "…"}
          </h1>
        </header>

        <section className="rounded-3xl bg-gradient-hero p-5 shadow-soft">
          <div className="flex items-center gap-4">
            {p?.avatarSrc ? (
              <img src={p.avatarSrc} alt={p.display_name} className="h-20 w-20 rounded-full object-cover ring-2 ring-card" />
            ) : (
              <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-primary text-2xl font-black text-primary-foreground">
                {(p?.display_name ?? "H").charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className={`${t.fontClass} truncate text-base font-black text-foreground`}>{p?.display_name ?? "…"}</p>
              {p?.bio && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{p.bio}</p>}
              <div className="mt-2 flex gap-4 text-[11px] text-muted-foreground">
                <span><b className="text-foreground">{p?.followers ?? 0}</b> {c.followers}</span>
                <span><b className="text-foreground">{p?.following ?? 0}</b> {c.followingC}</span>
                <span><b className="text-foreground">{postsQ.data?.length ?? 0}</b> {c.posts}</span>
              </div>
            </div>
          </div>

          {!isSelf && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => me && followM.mutate()}
                disabled={followM.isPending}
                className={`${t.fontClass} flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-xs font-bold active:scale-95 ${
                  p?.isFollowing ? "bg-secondary text-foreground" : "bg-gradient-primary text-primary-foreground shadow-soft"
                }`}
              >
                {p?.isFollowing ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                {p?.isFollowing ? c.following : c.follow}
              </button>
              <button
                onClick={() => navigate({ to: "/messages/$deviceId", params: { deviceId: targetId } })}
                className={`${t.fontClass} flex items-center justify-center gap-1.5 rounded-2xl bg-card py-2.5 text-xs font-bold text-foreground shadow-soft active:scale-95`}
              >
                <MessageCircle className="h-4 w-4" /> {c.message}
              </button>
              <button
                onClick={() => me && blockM.mutate()}
                disabled={blockM.isPending}
                className={`${t.fontClass} flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-xs font-bold active:scale-95 ${
                  p?.isBlocked ? "bg-spice text-white" : "bg-card text-foreground shadow-soft"
                }`}
              >
                <Ban className="h-4 w-4" /> {p?.isBlocked ? c.unblock : c.block}
              </button>
            </div>
          )}
          {p?.isBlocked && <p className="mt-2 text-[11px] font-semibold text-spice">{c.blocked}</p>}
        </section>

        <p className="mt-3 flex items-center gap-1.5 rounded-2xl bg-secondary px-3 py-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" /> {c.privacy}
        </p>

        <section className="mt-5">
          <h2 className={`${t.fontClass} mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground`}>
            {c.posts}
          </h2>

          {postsQ.isLoading && (
            <div className="space-y-3">
              {[0, 1].map((i) => <div key={i} className="h-48 animate-pulse rounded-3xl bg-muted" />)}
            </div>
          )}

          {!postsQ.isLoading && (postsQ.data ?? []).length === 0 && (
            <p className="rounded-2xl bg-secondary px-4 py-6 text-center text-xs text-muted-foreground">
              {c.noPosts}
            </p>
          )}

          <div className="space-y-4">
            {(postsQ.data ?? []).map((post) => (
              <article key={post.id} className="overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border">
                {post.mediaSrc && (
                  post.media_type === "video" ? (
                    <video src={post.mediaSrc} controls playsInline className="aspect-[4/3] w-full bg-muted object-cover" />
                  ) : (
                    <img src={post.mediaSrc} alt={post.title} loading="lazy" className="aspect-[4/3] w-full bg-muted object-cover" />
                  )
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className={`${t.fontClass} truncate text-sm font-black text-foreground`}>{post.title}</h3>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {isSelf && (
                      <button
                        onClick={() => {
                          if (confirmId === post.id) deleteM.mutate(post.id);
                          else setConfirmId(post.id);
                        }}
                        disabled={deleteM.isPending}
                        className={`${t.fontClass} flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold active:scale-95 ${
                          confirmId === post.id
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {confirmId === post.id ? c.confirmDelete : c.delete}
                      </button>
                    )}
                  </div>

                  {post.description && (
                    <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{post.description}</p>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-[11px] font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className={`h-4 w-4 ${post.liked ? "fill-spice text-spice" : ""}`} />
                      {post.likeCount} {c.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {post.commentCount} {c.comments}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
