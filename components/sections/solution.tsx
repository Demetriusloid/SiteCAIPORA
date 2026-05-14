"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    n: "F.01",
    title: "Análise Bioacústica",
    sub: "Microfone digital INMP441 de alta fidelidade capta sons da mata e os converte em espectrogramas para análise por redes neurais.",
    tags: "Motosserra · Disparos",
  },
  {
    n: "F.02",
    title: "IA Embarcada",
    sub: "Redes Neurais Convolucionais treinadas com TinyML reconhecem padrões sonoros direto no dispositivo, em tempo real.",
    tags: "CNN · TinyML",
  },
  {
    n: "F.03",
    title: "Processamento Local",
    sub: "ESP32 processa tudo localmente, sem depender de internet. Autonomia completa, baixo consumo.",
    tags: "ESP32 · Edge",
  },
  {
    n: "F.04",
    title: "Rede LoRa",
    sub: "LoRa envia alertas a longa distância com pouca energia, ideal para áreas remotas onde nenhuma outra rede chega.",
    tags: "Long Range · Low Power",
  },
];

const HIGHLIGHTS = [
  ["Baixo", "Consumo"],
  ["Alta", "Precisão"],
  ["Longo", "Alcance"],
  ["100%", "Autônomo"],
];

const fade = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function SolutionSection() {
  return (
    <section id="solucao" className="ed-section ed-section-white">
      <div className="ed-container ed-grid ed-grid-12">
        <motion.div {...fade} className="md:col-span-3">
          <h2 className="ed-label">A Solução</h2>
        </motion.div>

        <div className="md:col-span-9 flex flex-col gap-14 md:gap-20">
          <motion.div {...fade}>
            <p className="ed-h-large">
              Tecnologia<br />
              <span className="italic-em font-normal">a favor</span> da floresta.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="ed-row"
                data-hover
              >
                <span className="ed-mono opacity-50 self-start" style={{ paddingTop: "0.4rem" }}>{f.n}</span>
                <div>
                  <p className="ed-h-row">{f.title}</p>
                  <p className="mt-3 text-sm md:text-base text-black/55 leading-relaxed max-w-xl">{f.sub}</p>
                </div>
                <span className="ed-row-tags">{f.tags}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 border-t border-black/15 pt-12">
            {HIGHLIGHTS.map(([k, v], i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.07 }}
              >
                <p className="ed-h-large" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>{k}</p>
                <p className="ed-mono opacity-55 mt-2">{v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
