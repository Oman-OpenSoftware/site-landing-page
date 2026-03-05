import Image from "next/image"

export function Hero() {
  return (
    <section className="p-2 sm:p-[1.5%] bg-zinc-100">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask id="heroMask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="black" />
            <path
              d="M0 0.1474 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0581 C1 0.0506 0.9958 0.0444 0.9912 0.0444 H0.9255 C0.9208 0.0444 0.9165 0.0383 0.9165 0.0307 V0.0149 C0.9165 0.0074 0.9132 0.0013 0.9084 0.0013 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0061 0.1975 0.0137 V0.0312 C0.1975 0.0387 0.1936 0.0448 0.1889 0.0448 H0.0915 C0.0868 0.0448 0.0830 0.0510 0.0830 0.0585 V0.1201 C0.0830 0.1276 0.0792 0.1337 0.0745 0.1337 H0.0085 C0.0038 0.1337 0 0.1399 0 0.1474 Z"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div className="relative isolate w-full min-h-[calc(100svh-3vh)]">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            mask: "url(#heroMask)",
            WebkitMask: "url(#heroMask)",
          }}
        >
          <div
            className="absolute inset-0 bg-white"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[42%] sm:w-[72%] sm:h-[48%] md:w-[56%] md:h-[55%] lg:w-[50%] lg:h-[58%] object-cover rounded-3xl opacity-80 mix-blend-multiply"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid-metal-video_yX6NvjdW-6bLYorR3Ihmlwjivg3pjA978qrSKRU.mp4"
              type="video/mp4"
            />
          </video>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/80" />
            <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_50%,transparent_0%,rgba(255,255,255,.45)_100%)]" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
            <div className="w-full max-w-3xl rounded-3xl border border-zinc-200/80 bg-white/75 backdrop-blur-md shadow-[0_18px_90px_rgba(0,0,0,0.12)] p-8 sm:p-12 md:p-16 text-center" dir="rtl">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/90 px-4 py-1.5 text-[11px] sm:text-xs tracking-[0.08em] text-zinc-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                تحديث الإطلاق
              </div>

              <h1 className="[font-family:var(--font-noto-kufi-arabic)] mt-5 text-[clamp(2.8rem,11vw,6rem)] leading-[1.05] tracking-[0.01em] text-zinc-900">
                قريبًا
              </h1>

              <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-zinc-700">
                نعمل على تجربة مميزة بعناية. ترقبوا الإطلاق الرسمي قريبًا.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 top-[clamp(8px,1.5vh,20px)] -translate-x-1/2 z-20">
          <div className="relative w-[clamp(128px,22vw,200px)] aspect-square">
            <Image
              src="/logo.png"
              alt="Majan Programmers Club Logo"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 22vw, 200px"
              className="object-contain drop-shadow-[0_10px_28px_rgba(15,23,42,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
