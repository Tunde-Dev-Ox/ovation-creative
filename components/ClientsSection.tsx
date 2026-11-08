"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const CLIENT_CASES = [
  {
    name: "Lagos Cathedral Choir",
    tagline: "Choir brand refresh + concert campaign",
    result: "Boosted concert attendance by 68% with refreshed visuals, messaging, and targeted audience outreach.",
    website: "/",
  },
  {
    name: "Harmony Choral Society",
    tagline: "Season launch identity + digital storytelling",
    result: "Helped the society present a compelling season narrative that increased donor engagement and ticket inquiries.",
    website: "/",
  },
  {
    name: "New Life Music Ministry",
    tagline: "Ministry outreach and event promotion",
    result: "Built a high-impact launch experience that strengthened community connection and advanced event visibility.",
    website: "/",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const, delay } },
});

interface ClientsSectionProps {
  onOpenContact: () => void;
}

export default function ClientsSection({ onOpenContact }: ClientsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="clients" ref={ref} className="relative w-full bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden />

      <div className="max-w-350 mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-3">
            <motion.span
              variants={fadeUp(0)}
              className="text-[9px] uppercase tracking-[0.28em] font-semibold text-black"
            >
              Our Clients
            </motion.span>
            <motion.h2
              variants={fadeUp(0.08)}
              className="font-black uppercase leading-none text-black/90"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(2rem, 5vw, 3.6rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Focused portfolio
              <br />
              <span
                className="italic font-light"
                style={{
                  fontFamily: "var(--font-cormorant, Georgia, serif)",
                  fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                  letterSpacing: "-0.01em",
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                built for results.
              </span>
            </motion.h2>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {CLIENT_CASES.map((client, index) => (
            <motion.div
              key={client.name}
              variants={fadeUp(0.05 * index)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group border border-black/10 bg-zinc-50 p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-white"
            >
              <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-black/60 mb-5">
                Case study
              </div>
              <h3 className="font-black text-black text-[1.7rem] leading-tight mb-4" style={{ fontFamily: "var(--font-inter-tight)" }}>
                {client.name}
              </h3>
              <p className="text-sm font-semibold text-black/80 mb-4">{client.tagline}</p>
              <p className="text-sm leading-7 text-black/70 mb-6">{client.result}</p>
              <Link
                href={client.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-bold text-black transition-transform duration-300 group-hover:translate-x-1"
              >
                View website
                <MdArrowOutward fontSize={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl text-sm leading-7 text-black/70">
            We work with just a few clients at a time so every project receives direct strategic attention, clear creative direction, and measurable follow-through.
          </div>
          <button
            id="clients-work-with-us"
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 rounded-sm bg-brand px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-black transition-opacity duration-200 hover:opacity-80 cursor-pointer justify-center max-[540px]:w-[220px]"
          >
            Talk to our team
            <MdArrowOutward fontSize={15} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden />
    </section>
  );
}
