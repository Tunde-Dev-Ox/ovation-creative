"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface HeroSectionProps {
  onOpenContact: () => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface">
      {/* Video background */}
      <motion.video
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://www.pexels.com/download/video/3134579/" type="video/mp4" />
      </motion.video>

      {/* Overlays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-black/5"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute inset-0 mix-blend-overlay opacity-5"
        style={{
          backgroundImage: "url('/noise.png')",
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-surface/30" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center border border-white/10 rounded-md p-10"
      >
        <motion.span variants={fadeUp} className="relative inline-block text-[8px] text-white/80 uppercase tracking-[0.25em] font-medium mb-6">
          Creative Communications Studio
        </motion.span>

        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none">
          Tell your story with <br /><span className="text-brand italic">excellence</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 text-[14px] text-zinc-200 leading-relaxed max-w-xl mx-auto uppercase tracking-wider">
          We combine strategy, design, and digital media to create experiences
          that inspire audiences and elevate artistic brands.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4 max-[540px]:flex-col">
          <a
            href="#clients"
            className="group relative inline-flex items-center px-8 py-3 text-sm font-semibold text-black bg-brand overflow-hidden transition-all duration-300 uppercase tracking-[0.15em] rounded-sm max-[540px]:w-[220px] justify-center"
          >
            <span className="relative z-10">View Our Work</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="relative inline-flex items-center px-8 py-3 text-sm font-bold border-white/30 border-[1.5px] hover:border-white transition-all duration-300 uppercase tracking-[0.15em] rounded-sm group cursor-pointer max-[540px]:w-[220px] justify-center"
          >
            <span className="relative z-10 text-white transition-colors duration-300">Get in Touch</span>
          </button>
        </motion.div>

        {/* Watermark */}
        {/* <motion.span
          variants={fadeIn}
          className="hidden lg:block font-[family-name:var(--font-cormorant)] text-5xl text-brand/20 absolute -right-16 bottom-0 -rotate-12 select-none pointer-events-none"
        >
          Ovation studio
        </motion.span> */}
      </motion.div>
    </section>
  );
}
