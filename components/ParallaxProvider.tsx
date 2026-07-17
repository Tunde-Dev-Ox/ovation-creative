"use client";

import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ParallaxProvider({ children }: Props) {
  useEffect(() => {
    let rafId = 0;
    let enabled = true;

    const update = () => {
      const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
      const vh = window.innerHeight;

      els.forEach((el) => {
        const speedAttr = el.getAttribute("data-parallax-speed");
        const speed = speedAttr ? parseFloat(speedAttr) : 0.15;
        const rect = el.getBoundingClientRect();
        // distance from viewport center
        const distance = rect.top + rect.height / 2 - vh / 2;
        const offset = -distance * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
        el.style.willChange = "transform";
      });

      rafId = requestAnimationFrame(update);
    };

    const onScrollOrResize = () => {
      if (!enabled) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Disable on small screens for performance
    const checkEnable = () => {
      enabled = window.innerWidth > 640;
      if (!enabled) {
        // reset transforms
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          el.style.transform = "";
        });
      } else {
        onScrollOrResize();
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", checkEnable);

    checkEnable();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", checkEnable);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
