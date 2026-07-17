"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", email: "", organization: "", project: "", message: "" });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Contact us form"
        >
          <motion.div
            key="panel"
            id="contact-modal-panel"
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-[0_40px_120px_rgba(0,0,0,0.12)] sm:p-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <style>{`#contact-modal-panel::-webkit-scrollbar { display: none; }`}</style>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/5 cursor-pointer"
              aria-label="Close contact form"
            >
              <MdClose fontSize={20} />
            </button>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-black/60">
                Start a Project
              </span>
              <h2 className="font-black text-black text-[2.4rem] sm:text-[3rem] leading-[1.02]" style={{ fontFamily: "var(--font-inter-tight)" }}>
                Tell us about your next project.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-black/70">
                Share a few details and we&apos;ll reach out with a tailored plan, timeline, and next steps for your creative communication needs.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-sm bg-black/5 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-black/60">
                  Our process
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-black/70">
                  <li>1. Strategy call to understand your goals</li>
                  <li>2. Custom communication plan</li>
                  <li>3. Creative execution and launch support</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-black/80">
                    Name
                    <input
                      required
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-black/80">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-2 text-sm text-black/80">
                  Organization
                  <input
                    type="text"
                    name="organization"
                    value={formState.organization}
                    onChange={handleChange}
                    className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                    placeholder="Choir, ministry, or brand"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-black/80">
                  Project type
                  <input
                    type="text"
                    name="project"
                    value={formState.project}
                    onChange={handleChange}
                    className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                    placeholder="Website, campaign, identity..."
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-black/80">
                  Message
                  <textarea
                    required
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    className="min-h-37.5 rounded-sm border border-black/10 bg-black/5 px-4 py-4 text-black outline-none transition focus:border-black/40 resize-none"
                    placeholder="Tell us about your vision, timeline, or budget."
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 disabled:bg-black/20 disabled:text-black/40 cursor-pointer"
                >
                  {submitted ? "Submitted" : "Send inquiry"}
                </button>
                {submitted && (
                  <p className="text-sm text-black/60">
                    Thank you! We&apos;ll review your project and reply shortly.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
