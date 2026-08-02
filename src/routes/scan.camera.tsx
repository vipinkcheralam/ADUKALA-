import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Zap, ZapOff, Images, SwitchCamera, Refrigerator } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SCAN_I18N } from "@/lib/scan-i18n";
import { scanIngredients } from "@/lib/scan.functions";
import { saveScan } from "@/lib/scan-store";

export const Route = createFileRoute("/scan/camera")({
  head: () => ({
    meta: [
      { title: "Record your fridge — അടുക്കള Adukkala" },
      { name: "description", content: "Record a short 5-10 second video of your fridge so we can detect your ingredients." },
      { property: "og:title", content: "Record your fridge — Adukkala" },
      { property: "og:description", content: "Record a short video and detect your ingredients automatically." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CameraScreen,
});

function CameraScreen() {
  const { t, lang } = useI18n();
  const s = SCAN_I18N[lang];
  const router = useRouter();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const framesRef = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [torch, setTorch] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
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
        setError(null);
      } catch {
        setError(s.cameraError);
      }
    }
    start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    };
  }, [facing, s.cameraError]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function grabFrame() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    const w = 640;
    const h = Math.round((video.videoHeight / video.videoWidth) * w);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    framesRef.current.push(canvas.toDataURL("image/jpeg", 0.7));
  }

  async function toggleTorch() {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    try {
      await track.applyConstraints({ advanced: [{ torch: !torch }] } as unknown as MediaTrackConstraints);
      setTorch((v) => !v);
    } catch {
      setTorch((v) => !v);
    }
  }

  async function analyze(images: string[]) {
    setAnalyzing(true);
    try {
      const result = await scanIngredients({ data: { images, lang } });
      saveScan(result);
      navigate({ to: "/scan/results" });
    } catch {
      setError(t.recipe.error);
      setAnalyzing(false);
    }
  }

  function startRecording() {
    framesRef.current = [];
    setSeconds(0);
    setRecording(true);
    grabFrame();
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        if (next === 3 || next === 6) grabFrame();
        if (next >= 10) stopRecording();
        return next;
      });
    }, 1000);
  }

  function stopRecording() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecording(false);
    grabFrame();
    const frames = framesRef.current.slice(-3);
    if (frames.length) void analyze(frames);
  }

  async function onGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    void analyze([dataUrl]);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative mx-auto min-h-screen w-full max-w-md overflow-hidden">
        <video ref={videoRef} playsInline muted className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />

        <header className="relative z-20 flex items-center justify-between px-5 py-4">
          <button
            onClick={() => router.history.back()}
            aria-label={t.recipe.back}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            {recording && <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />}
            {mm}:{ss}
          </div>
          <button
            onClick={toggleTorch}
            aria-label={s.flash}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur"
          >
            {torch ? <Zap className="h-5 w-5 fill-white" /> : <ZapOff className="h-5 w-5" />}
          </button>
        </header>

        <div className="relative z-10 mt-10 grid place-items-center px-8">
          <div className="relative aspect-square w-full max-w-xs rounded-3xl">
            <span className="absolute left-0 top-0 h-10 w-10 rounded-tl-3xl border-l-4 border-t-4 border-white/90" />
            <span className="absolute right-0 top-0 h-10 w-10 rounded-tr-3xl border-r-4 border-t-4 border-white/90" />
            <span className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-3xl border-b-4 border-l-4 border-white/90" />
            <span className="absolute bottom-0 right-0 h-10 w-10 rounded-br-3xl border-b-4 border-r-4 border-white/90" />
          </div>
          <p className={`${t.fontClass} mt-4 rounded-full bg-black/45 px-4 py-1.5 text-center text-[11px] font-semibold text-white backdrop-blur`}>
            {error ?? s.hint}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-8">
          <div className="grid grid-cols-3 items-center">
            <label className="flex cursor-pointer flex-col items-center gap-1 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <Images className="h-5 w-5" />
              </span>
              <span className={`${t.fontClass} text-[10px] font-semibold`}>{s.gallery}</span>
              <input type="file" accept="image/*,video/*" className="hidden" onChange={onGallery} />
            </label>

            <button
              onClick={recording ? stopRecording : startRecording}
              disabled={analyzing || !!error}
              aria-label={recording ? s.stop : s.record}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/25 backdrop-blur disabled:opacity-50"
            >
              <span
                className={`bg-red-500 transition-all ${recording ? "h-7 w-7 rounded-md" : "h-16 w-16 rounded-full"}`}
              />
            </button>

            <button
              onClick={() => setFacing((f) => (f === "environment" ? "user" : "environment"))}
              className="flex flex-col items-center gap-1 text-white"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <SwitchCamera className="h-5 w-5" />
              </span>
              <span className={`${t.fontClass} text-[10px] font-semibold`}>{s.switchCam}</span>
            </button>
          </div>
        </div>

        {analyzing && (
          <div className="absolute inset-0 z-30 flex animate-analyze-overlay-in flex-col items-center justify-center gap-8 px-8 text-center backdrop-blur-md bg-gradient-analyze">
            {/* Scanner frame + icon */}
            <div className="relative h-40 w-40">
              {/* Pulsing glow */}
              <span className="absolute inset-0 rounded-full bg-primary/25 blur-xl animate-analyze-glow" />
              {/* Rotating dashed ring */}
              <span className="absolute inset-3 rounded-full border-2 border-dashed border-primary/35 animate-analyze-ring" />
              {/* Inner solid disc with fridge icon */}
              <div className="absolute inset-6 grid place-items-center rounded-full bg-gradient-primary shadow-glow">
                <Refrigerator className="h-16 w-16 text-primary-foreground" strokeWidth={1.6} />
              </div>
              {/* Scanning line */}
              <span className="absolute left-7 right-7 h-0.5 rounded-full bg-primary-foreground shadow-[0_0_14px_4px] shadow-primary-glow/70 animate-analyze-line" />
              {/* Corner brackets */}
              <span className="absolute left-0 top-0 h-7 w-7 rounded-tl-xl border-l-4 border-t-4 border-primary/60" />
              <span className="absolute right-0 top-0 h-7 w-7 rounded-tr-xl border-r-4 border-t-4 border-primary/60" />
              <span className="absolute bottom-0 left-0 h-7 w-7 rounded-bl-xl border-b-4 border-l-4 border-primary/60" />
              <span className="absolute bottom-0 right-0 h-7 w-7 rounded-br-xl border-b-4 border-r-4 border-primary/60" />
            </div>

            {/* Label + progress */}
            <div className="space-y-3">
              <p className={`${t.fontClass} text-base font-bold leading-snug text-foreground sm:text-lg`}>{s.analyzing}</p>
              <div className="mx-auto h-1 w-44 overflow-hidden rounded-full bg-primary/15">
                <span className="block h-full w-1/3 rounded-full bg-gradient-primary animate-analyze-bar" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
