"use client";

import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function Footer() {
  return (
    <footer id="contato" className="ed-section ed-section-white">
      <div className="ed-container ed-grid ed-grid-12">
        <motion.div {...fade} className="md:col-span-3">
          <h2 className="ed-label">Visita</h2>
        </motion.div>

        <div className="md:col-span-9 flex flex-col gap-16 md:gap-24">
          <motion.div {...fade}>
            <p className="ed-h-massive">
              Visite<br />
              <span className="italic-em font-normal">nosso</span><br />
              stand.
            </p>
            <p className="mt-8 text-base md:text-lg text-black/60 leading-relaxed max-w-xl">
              Demonstrações ao vivo, conversa com a equipe e a chance de entender como a
              tecnologia pode proteger a Amazônia.
            </p>
          </motion.div>

          <motion.div {...fade} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-black/15 pt-10">
            <div className="md:col-span-4 flex flex-col gap-2">
              <span className="ed-label opacity-60">— Projeto</span>
              <span className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tighter">CAIPORA <span className="text-base">®</span></span>
              <span className="ed-mono opacity-50 mt-1">Monitoramento ambiental inteligente</span>
            </div>
            <div className="md:col-span-4 flex flex-col gap-2">
              <span className="ed-label opacity-60">— Instituição</span>
              <span className="ed-h-row">Fametro</span>
              <span className="ed-mono opacity-50 mt-1">Engenharia de Software · Manaus / AM</span>
            </div>
            <div className="md:col-span-4 flex flex-col gap-2">
              <span className="ed-label opacity-60">— Tecnologias</span>
              <span className="font-sans font-medium text-base leading-relaxed">
                IoT · Edge AI · TinyML · LoRa · Bioacústica
              </span>
            </div>
          </motion.div>

          <motion.div {...fade} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-black/15 pt-8">
            <p className="ed-mono opacity-50">© {new Date().getFullYear()} CAIPORA · Inovatech Fametro</p>
            <p className="ed-mono opacity-50">v_ 1.0.0</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
