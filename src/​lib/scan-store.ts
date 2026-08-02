import type { ScanResult } from "@/lib/scan.functions";

const KEY = "adukkala.scan";

let memory: ScanResult | null = null;

export function saveScan(result: ScanResult) {
  memory = result;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(result));
  } catch {
    /* ignore */
  }
}

export function loadScan(): ScanResult | null {
  if (memory) return memory;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    memory = JSON.parse(raw) as ScanResult;
    return memory;
  } catch {
    return null;
  }
}
