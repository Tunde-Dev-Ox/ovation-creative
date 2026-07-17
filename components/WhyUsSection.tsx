"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

/* ─── Animation helpers ──────────────────────────────────────────── */
const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
});

const revealClip = (delay = 0) => ({
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.0, ease, delay },
  },
});

function useCountUpStat(stat: string, active: boolean) {
  const trimmed = stat.trim();
  const suffix = trimmed.endsWith("%") ? "%" : trimmed.endsWith("+") ? "+" : "";
  const target = parseFloat(trimmed);
  const isNumeric = !Number.isNaN(target);

  const [display, setDisplay] = useState(() => {
    return isNumeric ? `0${suffix}` : stat;
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current || !isNumeric) return;

    const decimals = trimmed.includes(".") ? trimmed.split(".")[1].length : 0;
    const duration = 1500;
    const startTime = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - startTime, duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      setDisplay(`${formatted}${suffix}`);

      if (elapsed < duration) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(`${target.toFixed(decimals)}${suffix}`);
        hasAnimated.current = true;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, isNumeric, suffix, target, trimmed]);

  return display;
}

/* ─── Stat card ──────────────────────────────────────────────────── */
interface StatCardProps {
  label: string;
  stat: string;
  linkLabel: string;
  linkHref: string;
  variant: "dark" | "accent";
  delay?: number;
  inView: boolean;
  onOpenContact?: () => void;
}

function StatCard({
  label,
  stat,
  linkLabel,
  linkHref,
  variant,
  delay = 0,
  inView,
  onOpenContact,
}: StatCardProps) {
  const isDark = variant === "dark";
  const displayStat = useCountUpStat(stat, inView);

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative flex flex-col justify-between p-7 sm:p-9 overflow-hidden"
      style={{
        background: isDark
          ? "white"
          : "black",
        border: isDark ? "1px solid #eee" : "1px solid #000",
        minHeight: "clamp(280px, 36vw, 420px)",
      }}
    >
      {/* top-left label */}
      <p
        className="text-[11px] leading-snug font-medium max-w-[180px]"
        style={{
          color: isDark ? "#000" : "#eee",
          fontFamily: "var(--font-inter-tight)",
        }}
      >
        {label}
      </p>

      {/* large stat */}
      <div className="mt-auto pt-12">
        <motion.p
          variants={revealClip(delay + 0.15)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-black leading-none"
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontSize: "clamp(3.4rem, 9vw, 7.5rem)",
            letterSpacing: "-0.04em",
            color: isDark ? "#000" : "var(--color-brand)",
          }}
        >
          <span style={{ color: isDark ? "#000" : "var(--color-brand)" }}>
            /
          </span>
          {displayStat}
        </motion.p>

        {/* bottom row — link */}
        <div className="flex justify-end mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {linkHref === "#contact" && onOpenContact ? (
            <button
              type="button"
              id={`why-us-${linkLabel.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={onOpenContact}
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold transition-colors duration-200 cursor-pointer"
              style={{ color: isDark ? "#000" : "var(--color-brand)" }}
            >
              {linkLabel}
              <MdArrowOutward
                fontSize={12}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          ) : (
            <Link
              href={linkHref}
              id={`why-us-${linkLabel.replace(/\s+/g, "-").toLowerCase()}`}
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold transition-colors duration-200"
              style={{ color: isDark ? "#000" : "var(--color-brand)" }}
            >
              {linkLabel}
              <MdArrowOutward
                fontSize={12}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
        </div>
      </div>

      {/* subtle corner watermark */}
      {!isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 opacity-[0.04]"
          style={{
            background: "radial-gradient(circle at bottom right, var(--color-brand) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
interface WhyUsSectionProps {
  onOpenContact: () => void;
}

export default function WhyUsSection({ onOpenContact }: WhyUsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative w-full overflow-hidden bg-white"
    >
      {/* Top divider */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-24">

        {/* ── HEADER ROW ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-14">
          {/* Eyebrow — left */}
          <motion.span
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[9px] uppercase tracking-[0.28em] font-semibold text-black"
          >
            Why Us?
          </motion.span>

          {/* Headline — right */}
          <motion.h2
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-black uppercase text-right leading-[0.92]"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(2.6rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {["Built On", "Excellence."].map((line, i) => (
              <motion.span
                key={line}
                variants={fadeUp(i * 0.1)}
                className="block text-black"
              >
                {i === 1 ? (
                  <span
                    className="italic font-light"
                    style={{
                      fontFamily: "var(--font-cormorant, Georgia, serif)",
                      color: "rgba(0,0,0,0.9)",
                      fontSize: "1.1em",
                    }}
                  >
                    {line}
                  </span>
                ) : line}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* ── STAT CARDS GRID ── */}
        {/*
          Reference layout:
            – Left card: taller, starts at top of grid
            – Right card: offset downward
          We replicate with CSS grid + a top margin offset on the right card.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">

          {/* Card 1 — Client satisfaction */}
          <StatCard
            label="Average client satisfaction score across all engagements"
            stat="4.9+"
            linkLabel="Read reviews"
            linkHref="#testimonials"
            variant="dark"
            delay={0.1}
            inView={inView}
          />

          {/* Card 2 — Referrals — offset down on sm+ */}
          <div className="sm:mt-16">
            <StatCard
              label="Of our business comes from direct referrals & repeat clients"
              stat="89%"
              linkLabel="Start a Project"
              linkHref="#contact"
              variant="accent"
              delay={0.22}
              inView={inView}
              onOpenContact={onOpenContact}
            />
          </div>
        </div>

        {/* ── BOTTOM DESCRIPTOR ── */}
        <motion.p
          variants={fadeUp(0.35)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 text-[11px] leading-relaxed max-w-sm text-black tracking-[0.04em]"
        >
          Our reputation is built entirely on the quality of our work and
          the relationships we build with every organization we serve.
        </motion.p>
      </div>
    </section>
  );
}
