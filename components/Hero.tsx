"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { Plus, ArrowRight } from "lucide-react"


export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const pixelGridRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const customCursorRef = useRef<HTMLDivElement>(null)
  const [showCustomCursor, setShowCustomCursor] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    const tagsElement = tagsRef.current
    const cursorElement = customCursorRef.current

    if (!tagsElement || !cursorElement) return

    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY

      gsap.to(cursorElement, {
        x: cursorX - 15,
        y: cursorY - 15,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      setShowCustomCursor(true)
    }

    const handleMouseLeave = () => {
      setShowCustomCursor(false)
    }

    tagsElement.addEventListener("mouseenter", handleMouseEnter)
    tagsElement.addEventListener("mouseleave", handleMouseLeave)
    tagsElement.addEventListener("mousemove", handleMouseMove)

    return () => {
      tagsElement.removeEventListener("mouseenter", handleMouseEnter)
      tagsElement.removeEventListener("mouseleave", handleMouseLeave)
      tagsElement.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleMouseLeave = () => {
    if (!cardRef.current || !pixelGridRef.current) return

    const gridSize = 4
    const pixelSize = 100 / gridSize

    pixelGridRef.current.innerHTML = ""

    const totalPixels = gridSize * gridSize
    const clearIndices = new Set<number>()
    while (clearIndices.size < 3) {
      clearIndices.add(Math.floor(Math.random() * totalPixels))
    }

    let pixelIndex = 0
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (clearIndices.has(pixelIndex)) {
          pixelIndex++
          continue
        }

        const pixel = document.createElement("div")
        const isIndigo = Math.random() < 0.5

        const normalizedPosition = (col + (gridSize - 1 - row)) / ((gridSize - 1) * 2)
        const targetOpacity = 0.5 + normalizedPosition * 0.5

        pixel.className = `absolute ${isIndigo ? "bg-indigo-400" : "bg-zinc-300"}`
        pixel.style.width = `${pixelSize}%`
        pixel.style.height = `${pixelSize}%`
        pixel.style.left = `${col * pixelSize}%`
        pixel.style.top = `${row * pixelSize}%`
        pixel.style.opacity = "0"
        pixel.style.display = "block"
        pixel.setAttribute("data-target-opacity", targetOpacity.toString())
        pixelGridRef.current.appendChild(pixel)

        pixelIndex++
      }
    }

    const pixels = Array.from(pixelGridRef.current.children)
    const animationStepDuration = 0.45
    const actualPixelCount = pixels.length
    const staggerDuration = animationStepDuration / actualPixelCount

    const tl = gsap.timeline()

    tl.to(cardRef.current, {
      scale: 0.995,
      duration: 0.2,
      ease: "power2.in",
    })

    tl.to(
      pixels,
      {
        opacity: (index, target) => {
          const el = target as HTMLElement
          return el.getAttribute("data-target-opacity") || "1"
        },
        duration: 0.45,
        ease: "power2.in",
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      },
      "<",
    )

    tl.to(
      pixels,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      `+=${animationStepDuration}`,
    )

    tl.to(
      cardRef.current,
      {
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
      },
      "<",
    )

    tl.set(pixels, {
      display: "none",
    })
  }

  return (
    <section className="p-[1.5%] bg-zinc-100">
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

      <div className="relative isolate w-full min-h-[calc(100svh-3vh)] sm:min-h-[calc(100svh-3vh)]">
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] h-[36%] sm:w-[70%] sm:h-[45%] md:w-[55%] md:h-[52%] lg:w-[50%] lg:h-[55%] object-cover rounded-3xl opacity-80 mix-blend-multiply"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid-metal-video_yX6NvjdW-6bLYorR3Ihmlwjivg3pjA978qrSKRU.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />
            <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_50%,transparent_0%,rgba(255,255,255,.5)_100%)]" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              ref={cardRef}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden backdrop-blur-md bg-white/70 border border-zinc-200 rounded-2xl p-9 md:p-12 transition-transform duration-500 ease-in hover:scale-[1.01] max-w-[min(36rem,92vw)] w-full text-center"
              dir="rtl"
            >
              <div ref={pixelGridRef} className="absolute inset-0 pointer-events-none z-10" />

              <h1 className="text-balance text-3xl/tight sm:text-4xl/tight md:text-5xl/tight tracking-tight text-zinc-900">
                الجلسة التعريفية لنادي مجان للمبرمجين
              </h1>
              <p className="mt-3 text-sm/6 text-zinc-600 max-w-prose mx-auto">
                الانطلاقة الحقيقية لأي مطوّر يبدأ بسؤال الشغف والفرصة. سجّل بريدك لتحصل على رابط الدخول.
              </p>

              {submitted ? (
                <p className="mt-6 text-sm font-medium text-indigo-600">
                  تم تسجيلك بنجاح. سنرسل لك رابط الجلسة قريبًا.
                </p>
              ) : (
                <>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      if (!email || isSubmitting) return

                      setSubmitError("")
                      setIsSubmitting(true)

                      try {
                        const res = await fetch("/api/subscribe", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }),
                        })

                        const data = await res.json().catch(() => ({}))
                        if (!res.ok) {
                          throw new Error(data?.error || "تعذّر التسجيل حاليًا. حاول مرة أخرى.")
                        }

                        setSubmitted(true)
                      } catch (error) {
                        const message =
                          error instanceof Error ? error.message : "تعذّر التسجيل حاليًا. حاول مرة أخرى."
                        setSubmitError(message)
                      } finally {
                        setIsSubmitting(false)
                      }
                    }}
                    className="mt-6 flex flex-col sm:flex-row items-stretch gap-3 mx-auto max-w-sm w-full"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="w-full flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full sm:w-auto justify-center items-center gap-1.5 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-colors"
                    >
                      {isSubmitting ? "جاري التسجيل..." : "سجّل الآن"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                  <p className="mt-3 text-xs text-zinc-600">سنرسل لك رابط الجلسة فور التسجيل.</p>
                  {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 top-[1%] -translate-x-1/2 z-20">
          <Image
            src="/logo.png"
            alt="Majan Programmers Club Logo"
            width={300}
            height={300}
            className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[300px] h-auto object-contain drop-shadow-[0_10px_28px_rgba(15,23,42,0.25)]"
          />
        </div>

        <div
          ref={customCursorRef}
          className={`fixed w-[30px] h-[30px] rounded-full bg-indigo-500 pointer-events-none z-50 transition-opacity duration-200 ${
            showCustomCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: 0, top: 0 }}
        />

      </div>
    </section>
  )
}
