"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut", delay } },
});

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const stagger = (delayChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren } },
});

function TopMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-black">
        {label}
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-black">
        {value}
      </span>
    </div>
  );
}

export default function StatementSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">

        {/* ── TOP METADATA ROW ── */}
        <motion.div
          variants={stagger(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap items-start justify-between gap-y-6 pb-10 border-b border-white/20"
        >
          <motion.div variants={slideFromLeft} className="flex items-start gap-10 sm:gap-16">
            <TopMetric label="Launched" value="Est. 2025" />
            <TopMetric label="Clients Served" value="3+ Organizations" />
            <TopMetric label="Est." value="2025 — ©" />
          </motion.div>

          <motion.p
            variants={slideFromRight}
            className="hidden lg:block text-[10px] text-black uppercase tracking-[0.2em] font-medium self-end"
          >
            Creative Communications Studio
          </motion.p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-6 items-start">

          {/* ─ LEFT: Body copy ─ */}
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6 lg:pt-2"
          >
            <motion.span
              variants={fadeUp(0)}
              className="lg:hidden text-[9px] text-black uppercase tracking-[0.22em] font-semibold"
            >
              Creative Communications Studio
            </motion.span>

            <motion.p
              variants={fadeUp(0.1)}
              className="text-[13px] leading-[1.85] max-w-[360px] text-black"
            >
              Audiences decide whether they trust your brand{" "}
              <strong className="text-black font-bold">
                before they hear a single note.
              </strong>{" "}
              That&apos;s not a metaphor — visual credibility forms almost instantly, and it&apos;s shaped by{" "}
              <strong className="text-black font-bold">
                strategy, design, story, and consistency.
              </strong>
            </motion.p>

            <motion.p
              variants={fadeUp(0.2)}
              className="text-[13px] leading-[1.8] max-w-[340px] text-black"
            >
              We work alongside choirs, music ministries, artists, bands, musicians, and performing arts organizations to ensure
              every message reflects the quality of their music and mission.
            </motion.p>

            <motion.div variants={fadeUp(0.3)} className="mt-auto pt-4 lg:pt-16">
              <Link
                id="statement-about-link"
                href="#services"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-black transition-opacity duration-200 hover:opacity-70"
              >
                Our Services
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <MdArrowOutward fontSize={16} className="text-black"/>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ─ CENTER: Portrait image ─ */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex-shrink-0 mx-auto"
          >
            <motion.div
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)" },
                visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.1, ease, delay: 0.15 } },
              }}
              className="relative overflow-hidden"
              style={{
                width: "clamp(200px, 28vw, 360px)",
                aspectRatio: "3 / 4",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <img
                src="https://images.pexels.com/photos/35555137/pexels-photo-35555137.jpeg"
                alt="Ovation Creative Studios"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </motion.div>
          </motion.div>

          {/* ─ RIGHT: Headline + bottom stat ─ */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-between gap-10 lg:h-full"
          >
            <motion.h2
              className="text-right leading-[0.9] uppercase font-black text-black"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                fontFamily: "var(--font-inter-tight)",
                letterSpacing: "-0.02em",
              }}
            >
              {["Music.", "Mission.", <span key="e" className="italic" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, letterSpacing: "-0.01em" }}>Excellence.</span>].map((line, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp(i * 0.12)}
                  className="block overflow-hidden"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h2>

            <motion.div variants={fadeUp(0.4)} className="text-right">
              <p
                className="font-black text-black leading-none"
                style={{
                  fontSize: "clamp(4rem, 10vw, 8rem)",
                  fontFamily: "var(--font-inter-tight)",
                  letterSpacing: "-0.03em",
                }}
              >
                3+
              </p>
              <p
                className="mt-1 text-[11px] leading-snug max-w-[200px] ml-auto text-black"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  letterSpacing: "0.04em",
                }}
              >
                Performing arts organizations elevated through strategic communications
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
