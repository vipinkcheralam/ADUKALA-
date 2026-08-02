import { supabase } from "@/integrations/supabase/client";

export type CommunityPost = {
  id: string;
  device_id: string;
  author_name: string;
  title: string;
  description: string;
  steps: string[];
  media_url: string | null;
  media_type: string;
  created_at: string;
};

export type CommunityComment = {
  id: string;
  post_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

export type FeedPost = CommunityPost & {
  mediaSrc: string | null;
  likeCount: number;
  liked: boolean;
  commentCount: number;
};

const BUCKET = "community-media";

async function resolveMedia(url: string | null): Promise<string | null> {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(url, 60 * 60);
  return data?.signedUrl ?? null;
}

export async function fetchFeed(deviceId: string): Promise<FeedPost[]> {
  const [{ data: posts, error }, { data: likes }, { data: comments }] = await Promise.all([
    supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(50),
    supabase.from("community_likes").select("post_id, device_id"),
    supabase.from("community_comments").select("post_id"),
  ]);
  if (error) throw error;

  return Promise.all(
    (posts ?? []).map(async (p) => {
      const postLikes = (likes ?? []).filter((l) => l.post_id === p.id);
      return {
        ...(p as CommunityPost),
        steps: (p.steps ?? []) as string[],
        mediaSrc: await resolveMedia(p.media_url),
        likeCount: postLikes.length,
        liked: !!deviceId && postLikes.some((l) => l.device_id === deviceId),
        commentCount: (comments ?? []).filter((c) => c.post_id === p.id).length,
      };
    }),
  );
}

export async function toggleLike(postId: string, deviceId: string, liked: boolean) {
  if (liked) {
    const { error } = await supabase
      .from("community_likes")
      .delete()
      .eq("post_id", postId)
      .eq("device_id", deviceId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("community_likes").insert({ post_id: postId, device_id: deviceId });
    if (error) throw error;
  }
}

export async function fetchComments(postId: string): Promise<CommunityComment[]> {
  const { data, error } = await supabase
    .from("community_comments")
    .select("id, post_id, author_name, body, created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CommunityComment[];
}

export async function addComment(postId: string, deviceId: string, authorName: string, body: string) {
  const { error } = await supabase.from("community_comments").insert({
    post_id: postId,
    device_id: deviceId,
    author_name: authorName.trim().slice(0, 60) || "Home Chef",
    body: body.trim().slice(0, 1000),
  });
  if (error) throw error;
}

export async function uploadMedia(file: File, deviceId: string): Promise<{ path: string; type: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${deviceId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
  if (error) throw error;
  return { path, type: file.type.startsWith("video") ? "video" : "image" };
}

export async function createPost(input: {
  deviceId: string;
  authorName: string;
  title: string;
  description: string;
  steps: string[];
  file: File | null;
}) {
  let media_url: string | null = null;
  let media_type = "image";
  if (input.file) {
    const up = await uploadMedia(input.file, input.deviceId);
    media_url = up.path;
    media_type = up.type;
  }
  const { error } = await supabase.from("community_posts").insert({
    device_id: input.deviceId,
    author_name: input.authorName.trim().slice(0, 60) || "Home Chef",
    title: input.title.trim().slice(0, 120),
    description: input.description.trim().slice(0, 2000),
    steps: input.steps.map((s) => s.trim()).filter(Boolean).slice(0, 20),
    media_url,
    media_type,
  });
  if (error) throw error;
}

/** Posts by one home cook, with like/comment counts — used by the profile feed. */
export async function fetchUserPosts(authorId: string, viewerId: string): Promise<FeedPost[]> {
  const [{ data: posts, error }, { data: likes }, { data: comments }] = await Promise.all([
    supabase.from("community_posts").select("*").eq("device_id", authorId).order("created_at", { ascending: false }).limit(50),
    supabase.from("community_likes").select("post_id, device_id"),
    supabase.from("community_comments").select("post_id"),
  ]);
  if (error) throw error;

  return Promise.all(
    (posts ?? []).map(async (p) => {
      const postLikes = (likes ?? []).filter((l) => l.post_id === p.id);
      return {
        ...(p as CommunityPost),
        steps: (p.steps ?? []) as string[],
        mediaSrc: await resolveMedia(p.media_url),
        likeCount: postLikes.length,
        liked: !!viewerId && postLikes.some((l) => l.device_id === viewerId),
        commentCount: (comments ?? []).filter((c) => c.post_id === p.id).length,
      };
    }),
  );
}

/** Delete one of your own posts (and its stored media). */
export async function deletePost(postId: string, deviceId: string) {
  const { data: post } = await supabase
    .from("community_posts")
    .select("media_url, device_id")
    .eq("id", postId)
    .maybeSingle();
  if (!post || post.device_id !== deviceId) throw new Error("not_owner");

  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", postId)
    .eq("device_id", deviceId);
  if (error) throw error;

  if (post.media_url && !post.media_url.startsWith("http")) {
    await supabase.storage.from(BUCKET).remove([post.media_url]);
  }
}
