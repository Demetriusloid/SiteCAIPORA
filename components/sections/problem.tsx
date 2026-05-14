"use client";

import { motion } from "framer-motion";

const ITEMS = [
  {
    n: "01",
    title: "Desmatamento Ilegal",
    sub: "A supressão indevida de vegetação continua sendo uma das maiores ameaças ao bioma amazônico — impacto direto nas mudanças climáticas globais.",
    tags: "Crime · Clima · Solo",
  },
  {
    n: "02",
    title: "Caça Ilegal",
    sub: "A fauna amazônica sofre com a caça predatória, ameaçando espécies como a onça-pintada e comprometendo o equilíbrio ecológico da região.",
    tags: "Fauna · Onça · Extinção",
  },
  {
    n: "03",
    title: "Áreas Remotas",
    sub: "A vastidão da floresta torna a fiscalização tradicional ineficiente — exige soluções autônomas e de longo alcance.",
    tags: "Escala · Cobertura",
  },
];

const fade = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function ProblemSection() {
  return (
    <section id="problema" className="ed-section ed-section-white">
      <div className="ed-container ed-grid ed-grid-12">
        <motion.div {...fade} className="md:col-span-3">
          <h2 className="ed-label">O Problema</h2>
        </motion.div>

        <div className="md:col-span-9 flex flex-col gap-14 md:gap-20">
          <motion.div {...fade}>
            <p className="ed-h-large">
              A Amazônia <span className="italic-em font-normal">pede</span><br />
              socorro.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {ITEMS.map((it, i) => (
              <motion.div
                key={it.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="ed-row"
                data-hover
              >
                <span className="ed-mono opacity-50 self-start" style={{ paddingTop: "0.4rem" }}>{it.n}.</span>
                <div>
                  <p className="ed-h-row">{it.title}</p>
                  <p className="mt-3 text-sm md:text-base text-black/55 leading-relaxed max-w-xl">{it.sub}</p>
                </div>
                <span className="ed-row-tags">{it.tags}</span>
              </motion.div>
            ))}
          </div>

          <motion.blockquote {...fade} className="border-t border-black/15 pt-10">
            <p className="italic-em text-xl md:text-2xl lg:text-3xl leading-snug max-w-3xl">
              “A floresta amazônica é marcada por diversos sons que caracterizam sua biodiversidade —
              o canto dos pássaros, o rugido e as vibrações da onça-pintada ao se deslocar pela mata,
              e a comunicação dos pirarucus nas profundezas dos rios.”
            </p>
            <cite className="ed-mono not-italic mt-5 block opacity-55 text-black">
              — Emiliano Ramalho, pesquisador (2025)
            </cite>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
