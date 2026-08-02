import { supabase } from "@/integrations/supabase/client";

const BUCKET = "community-media";

export type Profile = {
  device_id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string;
  preferred_lang: string;
};

export type ProfileView = Profile & {
  avatarSrc: string | null;
  followers: number;
  following: number;
  isFollowing: boolean;
  isBlocked: boolean;
};

export type Message = {
  id: string;
  sender_device_id: string;
  recipient_device_id: string;
  body: string;
  media_url: string | null;
  created_at: string;
  mediaSrc?: string | null;
};

export async function resolveMedia(url: string | null): Promise<string | null> {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(url, 60 * 60);
  return data?.signedUrl ?? null;
}

export async function uploadToBucket(file: File, deviceId: string, prefix: string) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${deviceId}/${prefix}-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
  if (error) throw error;
  return path;
}

/* ---------------- profiles ---------------- */

export async function ensureProfile(deviceId: string, displayName?: string) {
  if (!deviceId) return;
  const { data } = await supabase.from("profiles").select("device_id").eq("device_id", deviceId).maybeSingle();
  if (data) return;
  const base = ((displayName ?? "Home Chef").trim().slice(0, 30) || "Home Chef");
  // display names are unique app-wide; add a short suffix when the name is taken
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = attempt === 0 ? base : `${base} ${Math.random().toString(36).slice(2, 6)}`;
    const { error } = await supabase.from("profiles").insert({ device_id: deviceId, display_name: candidate });
    if (!error) return;
    if (error.code !== "23505") return;
  }

}

export async function fetchProfile(deviceId: string, viewerId: string): Promise<ProfileView> {
  const [{ data: p }, followers, following, isFollowing, isBlocked] = await Promise.all([
    supabase.from("profiles").select("*").eq("device_id", deviceId).maybeSingle(),
    supabase.from("follows").select("id", { count: "exact", head: true }).eq("following_device_id", deviceId),
    supabase.from("follows").select("id", { count: "exact", head: true }).eq("follower_device_id", deviceId),
    viewerId
      ? supabase.from("follows").select("id").eq("follower_device_id", viewerId).eq("following_device_id", deviceId).maybeSingle()
      : Promise.resolve({ data: null }),
    viewerId
      ? supabase.from("blocks").select("id").eq("blocker_device_id", viewerId).eq("blocked_device_id", deviceId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const fallbackName = await fallbackNameFor(deviceId);
  const base: Profile = p
    ? (p as Profile)
    : { device_id: deviceId, display_name: fallbackName, avatar_url: null, bio: "", preferred_lang: "en" };

  return {
    ...base,
    avatarSrc: await resolveMedia(base.avatar_url),
    followers: followers.count ?? 0,
    following: following.count ?? 0,
    isFollowing: !!isFollowing.data,
    isBlocked: !!isBlocked.data,
  };
}

async function fallbackNameFor(deviceId: string) {
  const { data } = await supabase
    .from("community_posts")
    .select("author_name")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data?.author_name ?? "Home Chef";
}

export async function saveProfile(deviceId: string, patch: { bio?: string; avatar_url?: string | null }) {
  await ensureProfile(deviceId);
  const { error } = await supabase.from("profiles").update(patch).eq("device_id", deviceId);
  if (error) throw error;
}

/** Days a user must wait between profile-name changes. */
export const NAME_CHANGE_COOLDOWN_DAYS = 120;

export type RenameResult =
  | { ok: true; name: string; nextAllowedAt: string | null; unchanged?: boolean }
  | { ok: false; reason: "taken" | "cooldown" | "invalid_name" | "invalid_device" | "no_profile" | "error"; nextAllowedAt?: string | null };

export async function renameProfile(deviceId: string, newName: string, fallbackName?: string): Promise<RenameResult> {
  await ensureProfile(deviceId, fallbackName);
  const { data, error } = await supabase.rpc("rename_profile", { _device_id: deviceId, _new_name: newName });
  if (error) return { ok: false, reason: "error" };
  const r = (data ?? {}) as { ok?: boolean; name?: string; reason?: string; next_allowed_at?: string | null; unchanged?: boolean };
  if (r.ok) return { ok: true, name: r.name ?? newName, nextAllowedAt: r.next_allowed_at ?? null, unchanged: r.unchanged };
  const reason = (r.reason ?? "error") as Exclude<RenameResult, { ok: true }>["reason"];
  return { ok: false, reason, nextAllowedAt: r.next_allowed_at ?? null };
}

/** When the profile name may next be changed, or null if it can be changed now. */
export async function fetchNameChangeStatus(deviceId: string): Promise<{ nextAllowedAt: Date | null }> {
  const { data } = await supabase.from("profiles").select("name_changed_at").eq("device_id", deviceId).maybeSingle();
  const last = data?.name_changed_at ? new Date(data.name_changed_at) : null;
  if (!last) return { nextAllowedAt: null };
  const next = new Date(last.getTime() + NAME_CHANGE_COOLDOWN_DAYS * 86400000);
  return { nextAllowedAt: next.getTime() > Date.now() ? next : null };
}

export async function updateAvatar(deviceId: string, file: File) {
  const path = await uploadToBucket(file, deviceId, "avatar");
  await saveProfile(deviceId, { avatar_url: path });
  return path;
}

/** Remove the current profile photo entirely (storage object + profile field). */
export async function removeAvatar(deviceId: string) {
  const { data } = await supabase.from("profiles").select("avatar_url").eq("device_id", deviceId).maybeSingle();
  const path = data?.avatar_url ?? null;
  await saveProfile(deviceId, { avatar_url: null });
  if (path && !path.startsWith("http")) {
    await supabase.storage.from(BUCKET).remove([path]);
  }
}


export async function fetchFollowerCount(deviceId: string) {
  const { count } = await supabase
    .from("follows")
    .select("id", { count: "exact", head: true })
    .eq("following_device_id", deviceId);
  return count ?? 0;
}

export async function fetchMyProfileSummary(deviceId: string) {
  const [{ data: p }, followers] = await Promise.all([
    supabase.from("profiles").select("*").eq("device_id", deviceId).maybeSingle(),
    supabase.from("follows").select("id", { count: "exact", head: true }).eq("following_device_id", deviceId),
  ]);
  return {
    profile: (p as Profile | null) ?? null,
    avatarSrc: await resolveMedia((p as Profile | null)?.avatar_url ?? null),
    followers: followers.count ?? 0,
  };
}

/* ---------------- follow / block ---------------- */

export async function toggleFollow(viewerId: string, targetId: string, isFollowing: boolean) {
  if (isFollowing) {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_device_id", viewerId)
      .eq("following_device_id", targetId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("follows")
      .insert({ follower_device_id: viewerId, following_device_id: targetId });
    if (error) throw error;
  }
}

export async function toggleBlock(viewerId: string, targetId: string, isBlocked: boolean) {
  if (isBlocked) {
    const { error } = await supabase
      .from("blocks")
      .delete()
      .eq("blocker_device_id", viewerId)
      .eq("blocked_device_id", targetId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("blocks")
      .insert({ blocker_device_id: viewerId, blocked_device_id: targetId });
    if (error) throw error;
  }
}

export async function fetchBlockedIds(viewerId: string): Promise<string[]> {
  if (!viewerId) return [];
  const { data } = await supabase.from("blocks").select("blocked_device_id").eq("blocker_device_id", viewerId);
  return (data ?? []).map((b) => b.blocked_device_id);
}

/* ---------------- messages ---------------- */

export async function fetchConversation(me: string, other: string): Promise<Message[]> {
  const { data, error } = await supabase.rpc("get_conversation", { _me: me, _other: other });
  if (error) throw error;
  return Promise.all(
    ((data ?? []) as Message[]).map(async (m) => ({ ...m, mediaSrc: await resolveMedia(m.media_url) })),
  );
}

export async function sendMessage(me: string, other: string, body: string, file: File | null) {
  let media_url: string | null = null;
  if (file) media_url = await uploadToBucket(file, me, "msg");
  const { error } = await supabase.from("messages").insert({
    sender_device_id: me,
    recipient_device_id: other,
    body: body.trim().slice(0, 2000),
    media_url,
  });
  if (error) throw error;
}

export type InboxEntry = {
  deviceId: string;
  name: string;
  avatarSrc: string | null;
  lastBody: string;
  lastAt: string;
};

/** All conversations for this device, newest first (Instagram-style inbox). */
export async function fetchInbox(me: string): Promise<InboxEntry[]> {
  if (!me) return [];
  const { data, error } = await supabase.rpc("get_inbox", { _me: me });
  if (error) throw error;
  const rows = (data ?? []) as { other_device_id: string; last_body: string; last_created_at: string }[];
  if (rows.length === 0) return [];

  const ids = rows.map((r) => r.other_device_id);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("device_id, display_name, avatar_url")
    .in("device_id", ids);

  const byId = new Map((profiles ?? []).map((p) => [p.device_id, p]));

  return Promise.all(
    rows
      .sort((a, b) => +new Date(b.last_created_at) - +new Date(a.last_created_at))
      .map(async (r) => {
        const p = byId.get(r.other_device_id);
        return {
          deviceId: r.other_device_id,
          name: p?.display_name ?? "Home Chef",
          avatarSrc: await resolveMedia(p?.avatar_url ?? null),
          lastBody: r.last_body || "📷 Photo",
          lastAt: r.last_created_at,
        };
      }),
  );
}
