"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

/* ─── Service data ───────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "communication-strategy",
    number: "01",
    title: "Communication strategy",
    description:
      "Great performances deserve intentional communication. We help musicians, choirs, music ministries, and artistic organizations develop clear communication strategies that strengthen their brand, connect with the right audiences, and amplify their impact.",
    details: [
      "Communication strategy development",
      "Audience and stakeholder mapping",
      "Campaign planning and messaging",
    ],
    leftDescription:
      "Great performances deserve intentional communication. We help musicians, choirs, music ministries, and artistic organizations develop clear communication strategies that strengthen their brand, connect with the right audiences, and amplify their impact.",
    rightDescription:
      "Whether you're preparing for a concert, launching a new project, or building long-term visibility, we create strategic communication plans that ensure every message reflects your artistic excellence and mission.",
  },
  {
    id: "brand-identity",
    number: "02",
    title: "Brand Identity",
    description:
      "Your brand is your story. We help choirs, ministries, and arts organizations develop authentic, memorable brand identities that reflect their unique voice and vision.",
    details: [
      "Visual identity design",
      "Brand guidelines",
      "Marketing and promotional assets",
    ],
    leftDescription:
      "Your audience should recognize your brand before they hear your performance. We build visual identities and brand systems that communicate professionalism, consistency, and authenticity across every platform.",
    rightDescription:
      "From logos and brand guidelines to digital assets, we help artistic brands create a memorable identity that inspires trust and leaves a lasting impression.",
  },
  {
    id: "digital-content-production",
    number: "03",
    title: "Digital content production",
    description:
      "We create engaging digital content that brings artistic vision to life across websites, social media, and digital platforms.",
    details: [
      "Social media graphics",
      "Promotional videos and reels",
      "Concert and campaign content",
    ],
    leftDescription:
      "Powerful stories deserve exceptional content. We create compelling visuals, videos, and digital media that showcase your performances, promote your events, and keep your audience engaged all year round.",
    rightDescription:
      "Every piece of content is crafted to strengthen your brand and communicate your artistic vision with excellence.",
  },
  {
    id: "social-media-management",
    number: "04",
    title: "Social media management",
    description:
      "Launching is just the beginning. We provide proactive monitoring, security updates, and performance tuning to keep your platform running at peak efficiency.",
    details: [
      "Content planning and scheduling",
      "Community engagement",
      "Performance analytics",
      "Growth strategy",
    ],
    leftDescription:
      "Maintaining an active online presence requires more than posting consistently—it requires purposeful communication. We manage your social media channels with strategies that grow your audience, encourage meaningful engagement, and keep your community connected.",
    rightDescription:
      "Our goal is to ensure every post contributes to your broader communication objectives and artistic growth.",
  },
  {
    id: "event-communications",
    number: "05",
    title: "Event communications",
    description:
      "We optimize your digital presence to ensure you're discovered by the right audience through search engines and organic channels.",
    details: [
      "Concert promotion",
      "Campaign management",
      "Audience engagement strategy",
    ],
    leftDescription:
      "Successful performances begin long before the curtain rises. We design communication campaigns that build anticipation, increase attendance, and keep audiences engaged before, during, and after your events.",
    rightDescription:
      "Whether it's a concert, recital, festival, workshop, or tour, we help your message reach the people who matter most.",
  },
  {
    id: "creative-consultancy",
    number: "06",
    title: "Creative Consultancy",
    description:
      "We optimize your digital presence to ensure you're discovered by the right audience through search engines and organic channels.",
    details: [
      "Communication audits",
      "Brand and audience strategy",
      "Creative direction and advisory",
    ],
    leftDescription:
      "Creative organizations often know what they want to achieve but need clarity on how to communicate it. We provide strategic guidance to help artistic brands improve their communication, strengthen audience relationships, and make confident creative decisions.",
    rightDescription:
      "Our consultancy combines industry insight with practical recommendations tailored to your goals.",
  },
];

/* ─── Animation helpers ──────────────────────────────────────────── */
const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
});

/* ─── Accordion item ─────────────────────────────────────────────── */
function AccordionItem({
  service,
  isOpen,
  onToggle,
  onOpenContact,
  index,
  inView,
}: {
  service: (typeof SERVICES)[0];
  isOpen: boolean;
  onToggle: () => void;
  onOpenContact: () => void;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp(index * 0.06)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* ── Accordion trigger ── */}
      <button
        id={`service-toggle-${service.id}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group w-full flex items-center justify-between gap-6 py-6 text-left transition-colors duration-200 cursor-pointer bg-gray-100 px-2"
      >
        {/* Left: number + title + price */}
        <div className="flex items-baseline gap-5 sm:gap-8 flex-1">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-semibold shrink-0"
          >
            {service.number}
          </span>
          <div className="flex-1">
            <span
              className="font-bold text-black leading-none block"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(1.05rem, 2.5vw, 1.55rem)",
                letterSpacing: "-0.01em",
                opacity: isOpen ? 1 : 0.85,
                transition: "opacity 0.25s",
              }}
            >
              {service.title}
            </span>
          </div>
        </div>

        {/* Right: toggle icon */}
        <div
          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            border: `1px solid ${isOpen ? "var(--color-brand)" : "rgba(255,255,255,0.12)"}`,
            background: isOpen ? "var(--color-brand)" : "transparent",
          }}
          aria-hidden
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease }}
            className="block text-black font-medium"
            style={{ fontSize: "1.1rem", lineHeight: 1 }}
          >
            +
          </motion.span>
        </div>
      </button>

      {/* ── Accordion body ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden"
          >
            <div className="pb-10 flex flex-col gap-8">
              {/* Top: description columns */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-10 items-start pt-2">
                {/* Col 1 — main description (left) */}
                <p
                  className="leading-[1.85] text-black text-[14px]"
                >
                  {service.leftDescription || service.description}
                </p>

                {/* Divider */}
                <div
                  className="hidden sm:block w-px self-stretch"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  aria-hidden
                />

                {/* Col 2 — detail (right) */}
                <div className="flex flex-col gap-5">
                  <p
                    className="leading-[1.8] text-black text-[14px]"
                  >
                    {service.rightDescription || service.description}
                  </p>

                  {service.details && service.details.length > 0 && (
                    <ul
                      className="leading-[1.8] space-y-2"
                    >
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex gap-2 text-black text-[14px]">
                          <span>•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    type="button"
                    id={`service-cta-${service.id}`}
                    onClick={onOpenContact}
                    className="group/link inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold transition-colors duration-200 mt-2 text-black"
                  >
                    Get Started
                    <MdArrowOutward
                      fontSize={12}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function ServicesSection({ onOpenContact }: { onOpenContact: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative w-full bg-white"
    >
      {/* Top divider */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-24">

        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-16">
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[9px] uppercase tracking-[0.28em] font-semibold shrink-0 text-black"
          >
            Services
          </motion.span>

          {/* Intro statement */}
          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-semibold text-black leading-[1.2] sm:max-w-[55%] lg:max-w-[48%]"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(1.25rem, 3.2vw, 2.1rem)",
              letterSpacing: "-0.015em",
            }}
          >
            Every project starts with understanding how your audience thinks and what&apos;s stopping them from taking the next step.
          </motion.h2>
        </div>

        {/* ── ACCORDION LIST ── */}
        <div>
          {SERVICES.map((service, index) => (
            <AccordionItem
              key={service.id}
              service={service}
              isOpen={openId === service.id}
              onToggle={() => toggle(service.id)}
              onOpenContact={onOpenContact}
              index={index}
              inView={inView}
            />
          ))}

          {/* Final bottom border */}
          <div
            className="border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          />
        </div>

        {/* ── FOOTER CTA ── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
        >
          <p
            className="text-[11px] leading-relaxed max-w-xs text-black tracking-[0.03em]"
          >
            Not sure which service fits your needs? Let&apos;s have a conversation — no pressure, just clarity.
          </p>
          <button
            id="services-cta-start"
            type="button"
            onClick={onOpenContact}
            className="group inline-flex items-center gap-2 px-7 py-3 text-[10px] uppercase tracking-[0.18em] font-bold transition-all duration-200 rounded-sm bg-brand text-black justify-center max-[540px]:w-[250px]"
          >
            Start a Conversation
            <MdArrowOutward
              fontSize={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
