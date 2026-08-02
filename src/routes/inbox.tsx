import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageCircle, Search, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getDeviceId } from "@/lib/dishes";
import { fetchInbox } from "@/lib/social";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Chats — Adukkala Community Inbox" },
      { name: "description", content: "All your Adukkala conversations in one place: read replies from other home cooks and continue any chat." },
      { property: "og:title", content: "Chats — Adukkala Community Inbox" },
      { property: "og:description", content: "Your private Adukkala message inbox with every home-cook conversation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InboxScreen,
});

const COPY = {
  ml: {
    title: "ചാറ്റുകൾ", sub: "നിങ്ങളുടെ എല്ലാ സംഭാഷണങ്ങളും",
    search: "പേര് തിരയൂ…", empty: "ഇതുവരെ സന്ദേശങ്ങളില്ല",
    emptySub: "കമ്മ്യൂണിറ്റിയിൽ ഒരു പാചകക്കാരനെ കണ്ടെത്തി സംഭാഷണം തുടങ്ങൂ",
    browse: "കമ്മ്യൂണിറ്റി കാണൂ",
  },
  en: {
    title: "Chats", sub: "All your conversations",
    search: "Search a name…", empty: "No messages yet",
    emptySub: "Find a home cook in the community and start a conversation",
    browse: "Browse community",
  },
  hi: {
    title: "चैट", sub: "आपकी सभी बातचीत",
    search: "नाम खोजें…", empty: "अभी कोई संदेश नहीं",
    emptySub: "कम्युनिटी में किसी होम शेफ को खोजें और बातचीत शुरू करें",
    browse: "कम्युनिटी देखें",
  },
} as const;

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d`;
  return new Date(iso).toLocaleDateString();
}

function InboxScreen() {
  const { t, lang } = useI18n();
  const c = COPY[lang];
  const router = useRouter();
  const [me, setMe] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => setMe(getDeviceId()), []);

  const inboxQ = useQuery({
    queryKey: ["inbox", me],
    queryFn: () => fetchInbox(me),
    enabled: !!me,
    refetchInterval: 15000,
  });

  const items = (inboxQ.data ?? []).filter((i) =>
    q.trim() ? i.name.toLowerCase().includes(q.trim().toLowerCase()) : true,
  );

  return (
    <div
      className="min-h-screen bg-background pb-16"
      style={{ paddingBottom: "calc(4rem + var(--ad-banner-h, 0px))" }}
    >
      <div className="mx-auto w-full max-w-md px-5">
        <header className="sticky top-0 z-30 -mx-5 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground active:scale-90"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className={`${t.fontClass} truncate text-lg font-extrabold text-foreground`}>{c.title}</h1>
            <p className="truncate text-[11px] text-muted-foreground">{c.sub}</p>
          </div>
          <Link
            to="/community"
            aria-label={c.browse}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft active:scale-90"
          >
            <Users className="h-5 w-5" />
          </Link>
        </header>

        <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={c.search}
            className={`${t.fontClass} min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70`}
          />
        </div>

        {inboxQ.isLoading && (
          <div className="mt-4 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        )}

        {!inboxQ.isLoading && items.length === 0 && (
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-secondary">
              <MessageCircle className="h-9 w-9 text-primary" />
            </span>
            <p className={`${t.fontClass} mt-4 text-base font-bold text-foreground`}>{c.empty}</p>
            <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">{c.emptySub}</p>
            <Link
              to="/community"
              className={`${t.fontClass} mt-5 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft active:scale-95`}
            >
              {c.browse}
            </Link>
          </div>
        )}

        <ul className="mt-2 divide-y divide-border">
          {items.map((i) => (
            <li key={i.deviceId}>
              <Link
                to="/messages/$deviceId"
                params={{ deviceId: i.deviceId }}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-1 py-3 active:bg-secondary"
              >
                {i.avatarSrc ? (
                  <img
                    src={i.avatarSrc}
                    alt={i.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-lg font-black text-primary-foreground ring-2 ring-primary/20">
                    {i.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <p className={`${t.fontClass} truncate text-sm font-bold text-foreground`}>{i.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{i.lastBody}</p>
                </div>
                <span className="shrink-0 text-[10px] font-medium text-muted-foreground">{timeAgo(i.lastAt)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
