"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const NAV = [
  { label: "Problema", href: "#problema", n: "01" },
  { label: "Solução", href: "#solucao", n: "02" },
  { label: "Sistema", href: "#metodologia", n: "03" },
  { label: "Resultados", href: "#resultados", n: "04" },
  { label: "Equipe", href: "#equipe", n: "05" },
];

const ease = [0.76, 0, 0.24, 1] as [number, number, number, number];
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const overlay: Variants = {
  closed: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 1, ease } },
  open: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, ease } },
};
const item: Variants = {
  closed: { y: 40, opacity: 0, transition: { duration: 0.7, ease } },
  open: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.4 + i * 0.08, ease: easeOut } }),
};

export default function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed top-6 right-6 md:top-8 md:right-10 z-[200]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          data-hover
          className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-black"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.55)" }}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            transition={{ duration: 0.5, ease }}
            className="absolute block h-[1.5px] w-[20px] bg-white"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute block h-[1.5px] w-[20px] bg-white"
          />
          <motion.span
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            transition={{ duration: 0.5, ease }}
            className="absolute block h-[1.5px] w-[20px] bg-white"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={overlay}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-between px-6 md:px-16 pt-20 md:pt-24 pb-10 md:pb-14"
          >
            <div className="flex items-center gap-6 ed-mono text-white/55">
              <span>· Inovatech Fametro</span>
              <span className="hidden md:inline">· 2026</span>
            </div>

            <nav className="flex flex-col">
              {NAV.map((it, i) => (
                <div key={it.label} className="overflow-hidden border-b border-white/20 py-2 md:py-3">
                  <motion.a
                    href={it.href}
                    onClick={() => setOpen(false)}
                    custom={i}
                    variants={item}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="flex items-baseline justify-between group"
                    data-hover
                  >
                    <span
                      className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-[-0.04em] leading-[0.9] group-hover:translate-x-3 transition-transform duration-500"
                    >
                      {it.label}
                    </span>
                    <span className="ed-mono text-white/55 self-start mt-2">{it.n}</span>
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1, duration: 0.8 } }}
              exit={{ opacity: 0 }}
              className="ed-mono text-white/30 md:self-end mt-8 md:mt-0"
            >
              © {new Date().getFullYear()} CAIPORA · Fametro
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
