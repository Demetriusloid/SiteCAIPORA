"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LayerCfg = { count: number; size: [number, number]; opacity: [number, number]; speed: number; warm: number };

const LAYERS: LayerCfg[] = [
  { count: 32, size: [1, 1.4], opacity: [0.14, 0.32], speed: 0.1, warm: 0.15 },
  { count: 18, size: [1.4, 2.2], opacity: [0.25, 0.55], speed: 0.28, warm: 0.2 },
  { count: 8, size: [2.2, 3.4], opacity: [0.4, 0.75], speed: 0.5, warm: 0.3 },
];

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function ForestOverlay() {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    layerRefs.current.forEach((layer, i) => {
      if (!layer) return;
      const cfg = LAYERS[i];
      layer.innerHTML = "";
      for (let j = 0; j < cfg.count; j++) {
        const s = document.createElement("span");
        const sz = rand(cfg.size[0], cfg.size[1]);
        const warm = Math.random() < cfg.warm;
        s.className = warm ? "fr-firefly fr-firefly-warm" : "fr-firefly";
        s.style.left = `${rand(0, 100)}%`;
        s.style.top = `${rand(0, 100)}%`;
        s.style.width = `${sz}px`;
        s.style.height = `${sz}px`;
        s.style.opacity = String(rand(cfg.opacity[0], cfg.opacity[1]));
        s.style.setProperty("--dur", `${rand(2.6, 6.5).toFixed(2)}s`);
        s.style.setProperty("--delay", `${rand(0, 5).toFixed(2)}s`);
        layer.appendChild(s);
      }
    });

    const sts: ScrollTrigger[] = [];
    layerRefs.current.forEach((layer, i) => {
      if (!layer) return;
      const cfg = LAYERS[i];
      const t = gsap.to(layer, {
        y: () => -window.innerHeight * cfg.speed * 1.6,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    });

    let timer: number | undefined;
    const shoot = () => {
      const el = shootRef.current;
      if (!el) return;
      const sx = rand(-10, 70);
      const sy = rand(0, 50);
      const a = rand(15, 35);
      gsap.set(el, { left: `${sx}%`, top: `${sy}%`, rotation: a, opacity: 0, scaleX: 0.4 });
      gsap
        .timeline()
        .to(el, { opacity: 1, scaleX: 1, duration: 0.18, ease: "power2.out" })
        .to(el, { x: 360, y: 360 * Math.tan((a * Math.PI) / 180), duration: 0.95, ease: "power2.in" }, 0)
        .to(el, { opacity: 0, duration: 0.2 }, 0.85);
    };
    const queue = () => {
      shoot();
      timer = window.setTimeout(queue, rand(9000, 16000));
    };
    timer = window.setTimeout(queue, 4000);

    return () => {
      sts.forEach((s) => s.kill());
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="fr-overlay" aria-hidden>
        {LAYERS.map((_, i) => (
          <div
            key={`layer-${i}`}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="fr-layer"
          />
        ))}
        <span ref={shootRef} className="fr-shoot" />
      </div>
      <style jsx global>{`
        .fr-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
          mix-blend-mode: screen;
        }
        .fr-layer { position: absolute; inset: -25% 0; width: 100%; height: 150%; will-change: transform; }
        .fr-firefly {
          position: absolute;
          border-radius: 50%;
          background: #DFF5DC;
          box-shadow: 0 0 3px rgba(223, 245, 220, 0.45), 0 0 9px rgba(111, 224, 138, 0.25);
          animation: fr-twinkle var(--dur, 3s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        .fr-firefly-warm {
          background: #FFE7C0;
          box-shadow: 0 0 3px rgba(255, 224, 168, 0.5), 0 0 11px rgba(242, 169, 59, 0.28);
        }
        .fr-shoot {
          position: absolute;
          width: 100px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(223, 245, 220, 0.9), transparent);
          opacity: 0;
          transform-origin: left center;
          filter: drop-shadow(0 0 3px rgba(111, 224, 138, 0.7));
        }
        @keyframes fr-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.12); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fr-firefly { animation: none; opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
