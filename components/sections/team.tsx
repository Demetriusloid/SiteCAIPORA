"use client";

import { motion } from "framer-motion";

const MEMBERS = [
  "Ana Kelly de Oliveira Monteiro",
  "Ana Paula Marques Cardoso",
  "Calebe de Freitas Lima",
  "Calvin Vinicius da Rocha Silva",
  "Chrisllen Sousa de Oliveira",
  "Christian Soares da Silva",
  "Dimitri Matheus de Oliveira",
  "Gabriela Machado Natividade",
  "Gustavo Brandao Lima",
  "Ian Severo Lisboa",
  "Isaac Pereira Froes",
  "João da Cunha Rabelo Neto",
  "Joonseo Lee",
  "Jorge Luiz dos Santos Silva",
  "José Micael Mota Chagas",
  "Juan Pablo Reis Quiroga",
  "Karole Kamila Maddy da Silva",
  "Kervens Loius",
  "Lara Fabian Fogaça Coelho",
  "Lorena Kettle de Castro",
  "Matheus Gustavo de Oliveira Targino",
  "Matheus Silva Lima",
  "Paulo Vitor de Souza Dias",
  "Thomas Araujo de Souza",
  "Wallesson Cesar Santos Vinhote",
  "Yan de Araújo Lima",
];

const META: [string, string][] = [
  ["01. Curso", "Engenharia de Software"],
  ["02. Orientador", "Josue Froner Freitas"],
  ["03. Instituição", "Fametro · Inovatech 2026"],
];

const fade = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function TeamSection() {
  return (
    <section id="equipe" className="ed-section ed-section-black">
      <div className="ed-container ed-grid ed-grid-12">
        <motion.div {...fade} className="md:col-span-3">
          <h2 className="ed-label">Coletivo</h2>
        </motion.div>

        <div className="md:col-span-9 flex flex-col gap-14 md:gap-20">
          <motion.div {...fade}>
            <p className="ed-h-large">
              Quem está<br />
              <span className="italic-em font-normal">por</span> trás.
            </p>
            <p className="mt-6 text-sm md:text-base text-white/55 max-w-2xl tracking-wide leading-relaxed">
              Projeto desenvolvido por estudantes do curso de Engenharia de Software,
              unidos pelo propósito de utilizar tecnologia para preservação ambiental.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {META.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-10 border-t border-white/20 py-6 md:py-7 last:border-b last:border-white/20"
              >
                <div className="md:col-span-3"><span className="ed-label opacity-90">{k}</span></div>
                <div className="md:col-span-9"><p className="ed-h-row">{v}</p></div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade}>
            <div className="flex items-baseline justify-between mb-8">
              <h3 className="ed-label opacity-90">— Integrantes</h3>
              <span className="ed-mono opacity-50">{String(MEMBERS.length).padStart(2, "0")} pessoas</span>
            </div>
            <div className="flex flex-col">
              {MEMBERS.map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(i * 0.025, 0.6) }}
                  className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr] items-baseline gap-4 border-t border-white/15 py-3 md:py-4 last:border-b last:border-white/15 hover:bg-white/[0.03] transition-colors duration-300"
                  data-hover
                >
                  <span className="ed-mono opacity-50">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-sans font-semibold text-lg md:text-2xl tracking-tight">{m}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
