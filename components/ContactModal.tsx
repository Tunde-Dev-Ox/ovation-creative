"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdArrowForward, MdArrowBack } from "react-icons/md";

const describeOptions = [
  "Church Choir / Music Ministry",
  "Choral Society / Vocal Ensemble",
  "Organist / Instrumentalist",
  "Secular Band / Performing Arts",
  "Orchestra / Ensemble",
  "Record Label",
  "Recording Artist",
  "Music Educator / School",
  "Christian Organization",
  "Concert Promoter / Festival Organizer",
  "Creative Professional",
  "Other",
];

const helpOptions = [
  "Creative Strategy",
  "Brand Development",
  "Promotional Strategy",
  "Communication Strategy",
  "Social Media Management",
  "Content Production",
  "Event Communications",
  "Creative Consultancy",
  "Website Development",
  "I'm not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "This week",
  "This month",
  "Within 3 months",
  "Just exploring / Not sure yet",
];

const budgetOptions = [
  "Under ₦100,000",
  "₦100,000–₦300,000",
  "₦300,000–₦700,000",
  "₦700,000–₦1,500,000",
  "₦1,500,000+",
  "I'd like a recommendation",
];

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  describe: "",
  helpWith: [] as string[],
  project: "",
  timeline: "",
  budget: "",
  heardAbout: "",
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({ ...initialState });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
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

  /* Reset on close */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSubmitted(false);
        setError("");
        setFormState({ ...initialState });
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (stepError) setStepError("");
  };

  const handleMultiSelect = (option: string) => {
    setFormState((prev) => ({
      ...prev,
      helpWith: prev.helpWith.includes(option)
        ? prev.helpWith.filter((o) => o !== option)
        : [...prev.helpWith, option],
    }));
    setError("");
  };

  const handleNext = () => {
    if (!formState.fullName.trim() || !formState.email.trim() || !formState.describe) {
      setStepError("Please fill in all required fields before continuing.");
      return;
    }
    setStepError("");
    setStep(2);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState.helpWith.length === 0) {
      setError("Please select at least one service you need help with.");
      return;
    }
    setSending(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/xojgeoev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Form submission failed");

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
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
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-sm bg-white p-8 shadow-[0_40px_120px_rgba(0,0,0,0.12)] sm:p-12"
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
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/5 cursor-pointer z-10"
              aria-label="Close contact form"
            >
              <MdClose fontSize={20} />
            </button>

            {submitted ? (
              /* ── Success ── */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "var(--font-inter-tight)" }}>
                  Message Sent!
                </h2>
                <p className="text-sm text-black/60 max-w-md">
                  Thank you! We&apos;ll review your project and reply shortly.
                </p>
              </div>
            ) : (
              <>
                {/* ── Header ── */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-black/60">
                    Start a Project
                  </span>
                  <h2 className="font-black text-black text-[2rem] sm:text-[2.6rem] leading-[1.02]" style={{ fontFamily: "var(--font-inter-tight)" }}>
                    {step === 1 ? "Tell us about yourself." : "Tell us about your project."}
                  </h2>
                  <p className="text-sm leading-7 text-black/60 max-w-xl">
                    {step === 1
                      ? "We'll use this to get to know you and tailor our response."
                      : "Help us understand your vision so we can prepare a thoughtful proposal."}
                  </p>
                </div>

                {/* ── Step indicator ── */}
                <div className="flex items-center gap-3 mt-8 mb-8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${step === 1 ? "bg-black text-white" : "bg-black/10 text-black/40"}`}>1</div>
                  <div className="h-px flex-1 bg-black/10" />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${step === 2 ? "bg-black text-white" : "bg-black/10 text-black/40"}`}>2</div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* ═══ STEP 1 ═══ */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-1.5 text-sm text-black/80">
                          <span className="flex items-center gap-1">Full Name <span className="text-red-400">*</span></span>
                          <input
                            required
                            type="text"
                            name="fullName"
                            value={formState.fullName}
                            onChange={handleChange}
                            className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                            placeholder="Your full name"
                          />
                        </label>
                        <label className="flex flex-col gap-1.5 text-sm text-black/80">
                          <span className="flex items-center gap-1">Email Address <span className="text-red-400">*</span></span>
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

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-1.5 text-sm text-black/80">
                          <span className="flex items-center gap-1">Phone Number</span>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                            placeholder="+234 800 000 0000"
                          />
                        </label>
                        <label className="flex flex-col gap-1.5 text-sm text-black/80">
                          <span className="flex items-center gap-1">Organization / Group Name</span>
                          <input
                            type="text"
                            name="organization"
                            value={formState.organization}
                            onChange={handleChange}
                            className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                            placeholder="Choir, ministry, or brand"
                          />
                        </label>
                      </div>

                      <label className="flex flex-col gap-1.5 text-sm text-black/80">
                        <span className="flex items-center gap-1">Which best describes you? <span className="text-red-400">*</span></span>
                        <select
                          required
                          name="describe"
                          value={formState.describe}
                          onChange={handleChange}
                          className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40 appearance-none"
                        >
                          <option value="" disabled>Select one</option>
                          {describeOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </label>

                      <div className="flex flex-col items-end gap-2 pt-2">
                        {stepError && <p className="text-xs text-red-500">{stepError}</p>}
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-2 rounded-sm bg-black px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-black/90 cursor-pointer"
                        >
                          Next <MdArrowForward />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ═══ STEP 2 ═══ */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <fieldset>
                        <legend className="text-sm text-black/80 mb-3 flex items-center gap-1">
                          What can we help you with? <span className="text-red-400">*</span>
                        </legend>
                        <div className="flex flex-wrap gap-2">
                          {helpOptions.map((o) => {
                            const selected = formState.helpWith.includes(o);
                            return (
                              <button
                                key={o}
                                type="button"
                                onClick={() => handleMultiSelect(o)}
                                className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-[0.1em] border transition-colors duration-200 cursor-pointer ${
                                  selected
                                    ? "bg-black text-white border-black"
                                    : "bg-transparent text-black/60 border-black/20 hover:border-black/40"
                                }`}
                              >
                                {o}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      <label className="flex flex-col gap-1.5 text-sm text-black/80">
                        <span className="flex items-center gap-1">Tell us about your project <span className="text-red-400">*</span></span>
                        <textarea
                          required
                          name="project"
                          value={formState.project}
                          onChange={handleChange}
                          className="min-h-[120px] rounded-sm border border-black/10 bg-black/5 px-4 py-3 text-black outline-none transition focus:border-black/40 resize-none"
                          placeholder="Describe your vision, goals, timeline, or anything else we should know..."
                        />
                      </label>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-1.5 text-sm text-black/80">
                          When would you like to get started?
                          <select
                            name="timeline"
                            value={formState.timeline}
                            onChange={handleChange}
                            className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40 appearance-none"
                          >
                            <option value="" disabled>Select one</option>
                            {timelineOptions.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </label>
                        <label className="flex flex-col gap-1.5 text-sm text-black/80">
                          Estimated Budget
                          <select
                            name="budget"
                            value={formState.budget}
                            onChange={handleChange}
                            className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40 appearance-none"
                          >
                            <option value="" disabled>Select one</option>
                            {budgetOptions.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <label className="flex flex-col gap-1.5 text-sm text-black/80">
                        How did you hear about us?
                        <input
                          type="text"
                          name="heardAbout"
                          value={formState.heardAbout}
                          onChange={handleChange}
                          className="h-12 rounded-sm border border-black/10 bg-black/5 px-4 text-black outline-none transition focus:border-black/40"
                          placeholder="Instagram, Google, friend, etc."
                        />
                      </label>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black uppercase tracking-[0.15em] font-semibold transition-colors duration-200 cursor-pointer"
                        >
                          <MdArrowBack /> Back
                        </button>

                        <button
                          type="submit"
                          disabled={sending}
                          className="inline-flex items-center gap-2 rounded-sm bg-black px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-black/90 disabled:bg-black/20 disabled:text-black/40 cursor-pointer"
                        >
                          {sending ? "Sending..." : "Send Inquiry"}
                        </button>
                      </div>

                      {error && <p className="text-sm text-red-500 text-right">{error}</p>}
                    </motion.div>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
