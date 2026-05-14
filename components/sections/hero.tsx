"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { splitText } from "@/lib/splitText";

const HeroCanvas = dynamic(() => import("@/components/layout/HeroCanvas"), { ssr: false });

const SIDE_LINKS = [
  { label: "Problema", href: "#problema" },
  { label: "Solução", href: "#solucao" },
  { label: "Sistema", href: "#metodologia" },
  { label: "Equipe", href: "#equipe" },
];

function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="absolute z-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 pointer-events-none"
      style={{ top: "2.25rem" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--green-soft)" }} />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "var(--green-soft)" }} />
      </span>
      <span className="font-mono font-medium text-[9px] tracking-[0.25em] uppercase text-white">
        Inovatech Fametro · 2026
      </span>
    </motion.div>
  );
}

function SideStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
      className="absolute z-20 hidden md:flex flex-col items-center"
      style={{
        right: "48px",
        top: "112px",
        bottom: "180px",
        justifyContent: "center",
        gap: "1.6rem",
      }}
    >
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
      {SIDE_LINKS.map((it) => (
        <a
          key={it.label}
          href={it.href}
          title={it.label}
          className="group flex-shrink-0 transition-opacity duration-300 hover:opacity-100 opacity-65"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          data-hover
        >
          <span className="font-mono font-medium text-[10px] tracking-[0.22em] uppercase text-white group-hover:text-[color:var(--green-soft)] transition-colors">
            {it.label}
          </span>
        </a>
      ))}
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
    </motion.div>
  );
}

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const builtRef = useRef<HTMLSpanElement>(null);
  const titleA = useRef<HTMLSpanElement>(null);
  const titleB = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chA = titleA.current ? splitText(titleA.current, "chars") : [];
    const chB = titleB.current ? splitText(titleB.current, "chars") : [];

    gsap.set([...chA, ...chB], { yPercent: 110, opacity: 0 });
    gsap.set(builtRef.current, { opacity: 0, y: -8 });
    gsap.set(subRef.current, { opacity: 0, y: 14 });
    if (metaRef.current) gsap.set(metaRef.current.children, { opacity: 0, y: 10 });
    if (ghostRef.current) gsap.set(ghostRef.current, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(ghostRef.current, { opacity: 1, duration: 1.4 }, 0)
      .to(builtRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
      .to(chA, { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.035 }, 0.35)
      .to(chB, { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.035 }, 0.7)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
      .to(metaRef.current?.children ?? [], { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.25);

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex flex-col justify-end px-6 py-12 md:px-16 md:py-16 overflow-hidden"
      style={{ minHeight: "100vh", background: "var(--green-deep)" }}
    >
      <HeroCanvas />

      <span
        ref={ghostRef}
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          left: "-2vw",
          bottom: "-9vw",
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          fontSize: "24vw",
          lineHeight: 0.82,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(91, 201, 122, 0.07)",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
        aria-hidden
      >
        AMAZÔNIA
      </span>

      <AvailabilityBadge />
      <SideStrip />

      <div className="z-10 mb-6 md:mb-8">
        <span
          ref={builtRef}
          className="ed-mono block mb-3 md:mb-5"
          style={{ color: "var(--green-soft)" }}
        >
          · Vigilância acústica · v_ 1.0.0
        </span>
        <h1
          className="font-sans font-bold uppercase text-left text-white"
          style={{
            fontSize: "clamp(3.5rem, 13vw, 11rem)",
            letterSpacing: "-0.045em",
            lineHeight: 0.85,
          }}
        >
          <span style={{ display: "block", overflow: "hidden" }}>
            <span ref={titleA} style={{ display: "inline-block" }}>A floresta</span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span
              ref={titleB}
              className="italic-em font-normal"
              style={{ display: "inline-block", letterSpacing: "-0.02em", color: "var(--green-soft)" }}
            >
              escuta.
            </span>
          </span>
        </h1>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-12 w-full gap-4 mb-2 md:mb-0">
        <div className="col-span-1 md:col-span-5 lg:col-span-4">
          <div className="w-10 h-[2px] bg-white mb-6 md:hidden" />
          <p
            ref={subRef}
            className="font-sans text-xs md:text-sm font-medium text-white/85 leading-relaxed tracking-wide uppercase text-left"
          >
            Sistema autônomo de vigilância bioacústica da Amazônia — IoT, IA de borda e LoRa
            transformam som em alerta antes do crime virar estatística.
          </p>
        </div>

        <div
          ref={metaRef}
          className="hidden md:flex md:col-span-7 lg:col-span-8 items-end justify-end gap-5 ed-mono text-white/55"
        >
          <span>Edge AI</span>
          <span>·</span>
          <span>TinyML</span>
          <span>·</span>
          <span>Bioacústica</span>
          <span>·</span>
          <span>Manaus / AM</span>
        </div>
      </div>
    </section>
  );
}
