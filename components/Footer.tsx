"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import {FaInstagram} from 'react-icons/fa';

const navLinks = [
  { label: "Work", href: "#clients" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

function NavColumn() {
  return (
    <div>
      <span className="block text-[12px] uppercase tracking-[0.22em] font-semibold mb-5">
        Navigation
      </span>
      <ul className="space-y-3">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm hover:text-white/90 transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn() {
  return (
    <div>
      <span className="block text-[12px] uppercase tracking-[0.22em] font-semibold mb-5">
        Contact
      </span>
      <ul className="space-y-3">
        <li>
          <a
            href="mailto:ovationcreativestudios@gmail.com"
            className="text-sm text-white/80 hover:text-white transition-colors duration-300"
          >
            Email us
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/2347063139322"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 hover:text-white transition-colors duration-300"
          >
            WhatsApp
          </a>
        </li>
      </ul>
    </div>
  );
}


function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 cursor-pointer"
    >
      Back to top
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
        ↑
      </span>
    </motion.button>
  );
}

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer id="footer" className="relative w-full overflow-hidden bg-black text-white border-t border-white/5">
      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Decorative "O" watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 lg:-right-10 select-none text-[300px] lg:text-[500px] font-(family-name:--font-cormorant) leading-none font-bold"
      >
        O
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        {/* ── Top section: Brand + CTA ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 border-b border-white/6">
          <div className="max-w-md">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-semibold font-(family-name:--font-cormorant) tracking-wide leading-none">
                Ovation
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] font-medium mt-1">
                Creative Studios
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              A creative communications studio helping choirs, music ministries, artistes, and arts organizations tell their stories with excellence.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenContact}
              className="group inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-black bg-brand hover:bg-brand/90 transition-all duration-300 uppercase tracking-[0.15em] cursor-pointer"
            >
              Start a Project
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <MdArrowOutward />
              </span>
            </button>
            <BackToTop />
          </div>
        </div>

        {/* ── Middle: Links grid ── */}
        <div className="py-12 grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          <NavColumn />
          <ContactColumn />
          <a href="https://instagram.com/ovation_studios1" target="_blank" rel="noopener noreferrer" className="col-span-2 lg:col-span-1 flex">
            <FaInstagram className="text-2xl" />
          </a>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.15em]">
            &copy; {new Date().getFullYear()} Ovation Creative Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-white/80 uppercase tracking-[0.15em] font-semibold">Developed by </span><a className="text-[10px] text-white hover:text-white/80 uppercase tracking-[0.15em] font-semibold transition-colors duration-300 underline" href="https://x.com/real__jot" target="_blank" rel="noopener noreferrer">JOT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
