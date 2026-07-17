"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const TESTIMONIALS = [
  {
    quote:
      "Working with Ovation Studios felt like working with a small, dedicated team that truly understood our ministry. They distilled our story into a campaign that moved our audience and helped us sell out our launch event.",
    name: "Rai Mehta",
    role: "CTO, Lagos Cathedral Choir",
  },
  {
    quote:
      "The clarity they brought to our season messaging was a game changer. We launched with confidence, and the results showed immediately in ticket inquiries and community engagement.",
    name: "Aisha Bello",
    role: "Marketing Director, Harmony Choral Society",
  },
  {
    quote:
      "They listened to who we are and translated it into a campaign that felt authentic. The launch experience they built helped our music ministry connect with more families than ever before.",
    name: "Daniel Okafor",
    role: "Founder, New Life Music Ministry",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay } },
});

export default function TestimonialSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));
  const handleNext = () => setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));

  return (
    <section id="testimonials" ref={ref} className="relative w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <span className="text-[9px] uppercase tracking-[0.28em] font-semibold text-black/70">
              Testimonials
            </span>
            <h2
              className="font-black uppercase leading-[0.92] text-black"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              What our clients say.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-black/70">
              We let the results speak, but sometimes the people behind them have something more to add. Each partnership is grounded in real strategy, real collaboration, and real impact.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="border border-black/10 bg-zinc-50 p-10 lg:p-14"
          >
            <div className="relative">
              <div className="text-[5rem] leading-none text-black/10 absolute -top-4 -left-4 select-none">
                “
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={TESTIMONIALS[activeIndex].name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <p className="text-lg leading-9 text-black/90">
                    {TESTIMONIALS[activeIndex].quote}
                  </p>
                  <div className="mt-10 border-t border-black/10 pt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-black/70">
                      {TESTIMONIALS[activeIndex].name}
                    </p>
                    <p className="mt-2 text-sm text-black/55">
                      {TESTIMONIALS[activeIndex].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {TESTIMONIALS.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                      index === activeIndex ? "bg-black" : "bg-black/15"
                    }`}
                    aria-label={`Show testimonial from ${item.name}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-black/5 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <MdArrowBackIosNew fontSize={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-black/5 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <MdArrowForwardIos fontSize={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
