"use client";

import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = fillRef.current;
      if (!el) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      el.style.width = `${p * 100}%`;
      el.style.opacity = p > 0.015 ? "1" : "0";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="fr-progress" aria-hidden>
        <div ref={fillRef} className="fr-progress-fill" />
      </div>
      <style jsx global>{`
        .fr-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 1.5px;
          width: 100%;
          background: transparent;
          z-index: 9998;
          pointer-events: none;
        }
        .fr-progress-fill {
          height: 100%;
          width: 0%;
          background: var(--green-soft);
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 0 10px rgba(91, 201, 122, 0.5);
        }
      `}</style>
    </>
  );
}
