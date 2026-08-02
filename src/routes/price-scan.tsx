import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Barcode, Loader2, ScanLine, Search, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRICE_I18N, lookupBarcode } from "@/lib/price-scan";
import { lookupProductPrice, type LivePrice } from "@/lib/price-lookup.functions";

export const Route = createFileRoute("/price-scan")({
  head: () => ({
    meta: [
      { title: "Supermarket Price Scanner — Adukkala" },
      { name: "description", content: "Scan a supermarket barcode with your camera and instantly see the product name and today's market price." },
      { property: "og:title", content: "Supermarket Price Scanner — Adukkala" },
      { property: "og:description", content: "Scan grocery barcodes and check market prices instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PriceScanScreen,
});

type DetectorLike = { detect: (source: HTMLVideoElement) => Promise<{ rawValue: string }[]> };

function PriceScanScreen() {
  const { t, lang } = useI18n();
  const p = PRICE_I18N[lang];
  const router = useRouter();
  const lookup = useServerFn(lookupProductPrice);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const zxingRef = useRef<{ stop: () => void } | null>(null);
  const busyRef = useRef(false);
  const lastCodeRef = useRef("");

  const [manual, setManual] = useState("");
  const [result, setResult] = useState<LivePrice | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [camError, setCamError] = useState(false);

  const handleCode = useCallback(
    async (raw: string) => {
      const code = raw.replace(/\D/g, "");
      if (code.length < 6) return;
      if (busyRef.current || lastCodeRef.current === code) return;
      busyRef.current = true;
      lastCodeRef.current = code;
      setLoading(true);
      setNotFound(false);
      setResult(null);

      // Vibrate feedback on a successful capture (native + supported browsers).
      try { navigator.vibrate?.(40); } catch { /* no-op */ }

      const local = lookupBarcode(code);
      try {
        const live = await lookup({ data: { barcode: code } });
        if (live.source === "live" || live.price != null) {
          setResult({
            ...live,
            name: live.name || local?.name[lang] || "",
            price: live.price ?? local?.price ?? null,
            mrp: live.mrp ?? local?.mrp ?? null,
            unit: live.unit || local?.unit || "",
            store: live.store || local?.store || "Open Food Facts",
          });
        } else if (local) {
          setResult({
            barcode: code, name: local.name[lang], brand: "", unit: local.unit, image: null,
            emoji: local.emoji, price: local.price, mrp: local.mrp, currency: "INR",
            store: local.store, source: "catalogue",
          });
        } else {
          setNotFound(true);
        }
      } catch {
        if (local) {
          setResult({
            barcode: code, name: local.name[lang], brand: "", unit: local.unit, image: null,
            emoji: local.emoji, price: local.price, mrp: local.mrp, currency: "INR",
            store: local.store, source: "catalogue",
          });
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
        busyRef.current = false;
      }
    },
    [lang, lookup],
  );

  const reset = () => {
    setResult(null);
    setNotFound(false);
    setLoading(false);
    lastCodeRef.current = "";
  };

  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((tr) => tr.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }

        const Ctor = (window as unknown as { BarcodeDetector?: new (o?: unknown) => DetectorLike }).BarcodeDetector;
        if (Ctor) {
          const detector = new Ctor({
            formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "itf"],
          });
          loopRef.current = setInterval(async () => {
            const video = videoRef.current;
            if (!video || !video.videoWidth) return;
            try {
              const codes = await detector.detect(video);
              if (codes[0]?.rawValue) void handleCode(codes[0].rawValue);
            } catch {
              /* ignore frame errors */
            }
          }, 500);
          return;
        }

        // Fallback decoder for browsers without the native BarcodeDetector (iOS Safari).
        const { BrowserMultiFormatReader } = await import("@zxing/browser");
        if (cancelled || !videoRef.current) return;
        const reader = new BrowserMultiFormatReader();
        const controls = await reader.decodeFromVideoElement(videoRef.current, (res) => {
          const text = res?.getText();
          if (text) void handleCode(text);
        });
        zxingRef.current = controls;
      } catch {
        setCamError(true);
      }
    }
    start();
    return () => {
      cancelled = true;
      if (loopRef.current) clearInterval(loopRef.current);
      zxingRef.current?.stop();
      zxingRef.current = null;
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    };
  }, [handleCode]);

  const saving = result && result.price != null && result.mrp != null ? result.mrp - result.price : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto min-h-screen w-full max-w-md">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/85 px-5 py-4 backdrop-blur-xl">
          <button
            onClick={() => router.history.back()}
            aria-label={t.recipe.back}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="min-w-0">
            <h1 className={`${t.fontClass} truncate text-sm font-black text-foreground`}>{p.title}</h1>
            <p className="truncate text-[11px] text-muted-foreground">{p.sub}</p>
          </div>
        </header>

        <div className="px-5 pb-10">
          <div className="relative overflow-hidden rounded-3xl bg-black shadow-card">
            <video ref={videoRef} playsInline muted className="h-64 w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="relative h-28 w-64 rounded-2xl ring-2 ring-white/70">
                <span className="absolute left-3 right-3 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
              </div>
            </div>
            <p className={`${t.fontClass} absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur`}>
              {camError ? p.cameraError : loading ? p.looking : p.hint}
            </p>
          </div>

          <div className="mt-5 rounded-3xl bg-card p-4 shadow-soft ring-1 ring-border">
            <label className={`${t.fontClass} text-[11px] font-bold uppercase tracking-wider text-muted-foreground`}>
              {p.manual}
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (manual.trim()) {
                  lastCodeRef.current = "";
                  void handleCode(manual);
                }
              }}
              className="mt-2 flex items-center gap-2"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
                <Barcode className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={manual}
                  onChange={(e) => setManual(e.target.value)}
                  inputMode="numeric"
                  placeholder={p.manualPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                />
              </div>
              <button
                type="submit"
                className={`${t.fontClass} inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-soft active:scale-95`}
              >
                <Search className="h-3.5 w-3.5" /> {p.check}
              </button>
            </form>
          </div>
        </div>
      </div>

      {(result || notFound || loading) && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 px-4 pb-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-card p-5 shadow-card ring-1 ring-border">
            <div className="flex items-start justify-between gap-3">
              <span className={`${t.fontClass} inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary`}>
                <ScanLine className="h-3 w-3" /> {result?.source === "live" ? p.live : p.title}
              </span>
              <button
                onClick={reset}
                aria-label={p.scanAgain}
                className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {loading ? (
              <div className="mt-6 mb-2 flex flex-col items-center gap-2">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
                <p className={`${t.fontClass} text-sm font-semibold text-muted-foreground`}>{p.looking}</p>
              </div>
            ) : result ? (
              <>
                <div className="mt-3 flex items-center gap-4">
                  {result.image ? (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="h-20 w-20 shrink-0 rounded-2xl bg-secondary object-contain shadow-soft"
                    />
                  ) : (
                    <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-hero text-4xl shadow-soft">
                      {result.emoji}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className={`${t.fontClass} truncate text-base font-black text-foreground`}>
                      {result.name || result.barcode}
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {[result.brand, result.unit, result.store].filter(Boolean).join(" • ")}
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-muted-foreground">{result.barcode}</div>
                  </div>
                </div>
                {result.price != null ? (
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-2xl bg-gradient-primary p-3 text-primary-foreground">
                      <div className="text-[10px] font-semibold opacity-85">{p.price}</div>
                      <div className="text-lg font-black">₹{result.price}</div>
                    </div>
                    <div className="rounded-2xl bg-secondary p-3">
                      <div className="text-[10px] font-semibold text-muted-foreground">{p.mrp}</div>
                      <div className="text-lg font-black text-foreground line-through decoration-muted-foreground/60">₹{result.mrp}</div>
                    </div>
                    <div className="rounded-2xl bg-secondary p-3">
                      <div className="text-[10px] font-semibold text-muted-foreground">{p.save}</div>
                      <div className="text-lg font-black text-primary">₹{saving ?? 0}</div>
                    </div>
                  </div>
                ) : (
                  <p className={`${t.fontClass} mt-4 rounded-2xl bg-secondary p-3 text-center text-xs font-semibold text-muted-foreground`}>
                    {p.noPrice}
                  </p>
                )}
              </>
            ) : (
              <div className="mt-4 text-center">
                <Barcode className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className={`${t.fontClass} mt-2 text-sm font-bold text-foreground`}>{p.notFound}</p>
                <p className="text-[11px] text-muted-foreground">{p.notFoundSub}</p>
              </div>
            )}

            <button
              onClick={() => {
                reset();
                setManual("");
              }}
              className={`${t.fontClass} mt-5 w-full rounded-2xl bg-gradient-primary py-3.5 text-sm font-black text-primary-foreground shadow-glow active:scale-[0.98]`}
            >
              {p.scanAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
