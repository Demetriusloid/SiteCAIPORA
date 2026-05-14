"use client";

import { motion } from "framer-motion";

const RESULTS = [
  { n: "R.01", title: "Detecção em Tempo Real", sub: "Identificação instantânea de atividades suspeitas através do processamento local de áudio.", tags: "Real-time" },
  { n: "R.02", title: "Alta Eficiência", sub: "Redução significativa de falsos positivos via redes neurais treinadas para o contexto amazônico.", tags: "Precisão" },
  { n: "R.03", title: "Sustentabilidade", sub: "Baixo consumo energético permite operação prolongada com baterias ou energia solar.", tags: "Solar · Bateria" },
  { n: "R.04", title: "Autonomia Total", sub: "Funcionamento independente de internet — ideal para áreas remotas sem infraestrutura.", tags: "Offline" },
];

const fade = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function ResultsSection() {
  return (
    <section id="resultados" className="ed-section ed-section-white">
      <div className="ed-container ed-grid ed-grid-12">
        <motion.div {...fade} className="md:col-span-3">
          <h2 className="ed-label">Impacto</h2>
        </motion.div>

        <div className="md:col-span-9 flex flex-col gap-14 md:gap-20">
          <motion.div {...fade}>
            <p className="ed-h-large">
              Impacto<br />
              <span className="italic-em font-normal">e</span> benefícios.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="ed-row"
                data-hover
              >
                <span className="ed-mono opacity-50 self-start" style={{ paddingTop: "0.4rem" }}>{r.n}</span>
                <div>
                  <p className="ed-h-row">{r.title}</p>
                  <p className="mt-3 text-sm md:text-base text-black/55 leading-relaxed max-w-xl">{r.sub}</p>
                </div>
                <span className="ed-row-tags">{r.tags}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="border-t border-black/15 pt-12">
            <h3 className="ed-label mb-8">Encerramento</h3>
            <p className="italic-em text-2xl md:text-3xl lg:text-4xl leading-snug max-w-3xl mb-6">
              O CAIPORA propõe monitoramento ambiental em áreas remotas da Amazônia,
              reunindo IoT, IA e computação de borda para detectar atividades ilegais.
            </p>
            <p className="text-base md:text-lg text-black/60 leading-relaxed max-w-2xl">
              O projeto segue em desenvolvimento — falta validação em campo, mais dados
              e testes reais. Mesmo assim, abre caminho para novos usos e para proteger
              melhor a biodiversidade da região.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
