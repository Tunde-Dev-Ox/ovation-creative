"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

const FAQ_ITEMS = [
  {
    id: "who-we-work-with",
    question: "Who do you work with?",
    answer:
      "We work with choirs, music ministries, gospel and classical artists, orchestras, instrumentalists, music educators, churches, arts organizations, concert promoters, and other creative brands looking to communicate their work with excellence.",
  },
  {
    id: "services",
    question: "What services do you offer?",
    answer:
      "We provide communication strategy, brand identity development, social media management, content production, event communications, and creative consultancy tailored to the performing arts and creative sector.",
  },
  {
    id: "why-communication-studio",
    question: "Why should I hire a communication studio instead of a regular design agency?",
    answer:
      "Design is only one part of effective communication. We help you develop the strategy behind your message, ensuring your branding, content, and campaigns work together to grow your audience, strengthen your reputation, and achieve your goals.",
  },
  {
    id: "concert-promotion",
    question: "Can you help promote an upcoming concert or event?",
    answer:
      "Absolutely. We create communication campaigns for concerts, festivals, recitals, workshops, album launches, and other events, helping you build awareness, engage your audience, and maximize attendance.",
  },
  {
    id: "ongoing-social-media-management",
    question: "Do you offer ongoing social media management?",
    answer:
      "Yes. We can manage your social media on a monthly basis, including content planning, graphic design, publishing, community engagement, and performance reporting.",
  },
  {
    id: "rebrand",
    question: "Can you help us rebrand our choir or band?",
    answer:
      "Yes. Whether you're refreshing an existing identity or building one from scratch, we create cohesive brand systems that reflect your vision, values, and artistic excellence. ",
  },
  {
    id: "only-christian-organizations",
    question: "Do you only work with christian organizations?",
    answer:
      "No. While we have a strong passion for serving churches and music ministries, we also work with musicians, performing artists, educational institutions, cultural organizations, and other creative brands.",
  },
  {
    id: "process",
    question: "How does your creative process work?",
    answer:
      "Our process typically begins with a discovery session to understand your goals and audience. From there, we develop a strategy, create the required assets, collaborate with you through feedback, and deliver solutions that support your communication objectives.",
  },
  {
    id: "single-project",
    question: "Can we hire you for a single project?",
    answer:
      "Yes. Whether you need support for a one-time campaign, concert, branding project, or content production, we're happy to work on individual projects as well as long-term partnerships.",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const, delay } },
});

const FAQItem = ({
  item,
  isOpen,
  onToggle,
  index,
  inView,
}: {
  item: typeof FAQ_ITEMS[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
}) => {
  return (
    <motion.div
      variants={fadeUp(index * 0.06)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="border-b border-black/10"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-6 text-left cursor-pointer"
      >
        <span className="text-sm font-semibold text-black/80">{item.question}</span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300"
          style={{
            borderColor: isOpen ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.16)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            backgroundColor: isOpen ? "#fef317" : "#fff",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-sm leading-7 text-zinc-700">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FAQSectionProps {
  onOpenContact: () => void;
}

export default function FAQSection({ onOpenContact }: FAQSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  return (
    <section id="faq" ref={ref} className="relative w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
          >
            <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-black/70 mb-6">
              FAQ
            </span>
            <h2
              className="font-black uppercase text-black leading-[0.92]"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(3.2rem, 6vw, 6rem)",
              }}
            >
              Before we <br /> get started.
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp(0.12)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="border border-black/5 p-6 sm:p-8"
          >
            <div className="space-y-2 text-[10px] uppercase tracking-[0.26em] font-semibold text-black/60 mb-5">
              Common questions
            </div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, index) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
            <div className="mt-8 pt-6">
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 rounded-sm bg-brand px-5 py-3 text-[10px] uppercase tracking-[0.18em] font-bold text-black transition-colors duration-200 cursor-pointer"
              >
                Ask a question
                <MdArrowOutward fontSize={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
