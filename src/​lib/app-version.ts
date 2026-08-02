import { supabase } from "@/integrations/supabase/client";

/** Version code of this build. Bump on every release you publish. */
export const APP_VERSION_CODE = 1;
export const APP_VERSION_NAME = "1.0.0";

export type AppVersion = {
  version_name: string;
  version_code: number;
  apk_url: string;
  release_notes: string;
  mandatory: boolean;
};

const SKIP_KEY = "adukkala_update_skipped";

/** Returns the latest published release when it is newer than this build. */
export async function fetchLatestUpdate(): Promise<AppVersion | null> {
  const { data, error } = await supabase
    .from("app_versions")
    .select("version_name, version_code, apk_url, release_notes, mandatory")
    .eq("published", true)
    .order("version_code", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  if (data.version_code <= APP_VERSION_CODE) return null;
  return data as AppVersion;
}

export function isUpdateSkipped(versionCode: number) {
  try {
    return localStorage.getItem(SKIP_KEY) === String(versionCode);
  } catch {
    return false;
  }
}

export function skipUpdate(versionCode: number) {
  try {
    localStorage.setItem(SKIP_KEY, String(versionCode));
  } catch {
    /* storage unavailable */
  }
}