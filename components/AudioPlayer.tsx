"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESTING_VOL = 0.15;
const DUCKED_VOL = 0.02;
const DUCK_TIMEOUT = 400;

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  /* ─── Autoplay attempt + first-interaction fallback (once) ─── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = RESTING_VOL;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        /* browser blocked — user must click first */
      }
    };

    const handleInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
      document.removeEventListener("click", handleInteraction);
    };

    tryPlay();
    document.addEventListener("click", handleInteraction);

    return () => document.removeEventListener("click", handleInteraction);
  }, []);

  /* ─── Scroll-aware ducking ─── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let ducked = false;

    audio.volume = RESTING_VOL;

    const onScroll = () => {
      if (!ducked) {
        ducked = true;
        audio.volume = DUCKED_VOL;
      }
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        ducked = false;
        audio.volume = RESTING_VOL;
      }, DUCK_TIMEOUT);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
      audio.volume = RESTING_VOL;
    };
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] flex items-center gap-3">
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] text-white/50 uppercase tracking-[0.15em] select-none pointer-events-none"
          >
            {playing ? "Now Playing" : "Paused"}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-colors duration-300 cursor-pointer"
        aria-label={playing ? "Pause audio" : "Play audio"}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}

        {playing && (
          <span className="absolute inset-0 rounded-full animate-ping bg-white/10 pointer-events-none" />
        )}
      </motion.button>

      <audio ref={audioRef} loop>
        <source src="/background-audio2.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
