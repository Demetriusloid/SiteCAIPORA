"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Captura de Áudio", sub: "Microfone INMP441 (I2S) captura sons do ambiente em alta fidelidade, viabilizando análise bioacústica precisa.", tags: "INMP441 · I2S" },
  { n: "02", title: "Processamento de Sinais", sub: "Sinais brutos viram espectrogramas — informação sonora traduzida em representação visual de frequência ao longo do tempo.", tags: "Espectrograma" },
  { n: "03", title: "Classificação por IA", sub: "Rede Neural Convolucional otimizada com TinyML analisa os espectrogramas e classifica os sons como naturais ou ilegais.", tags: "CNN · TinyML" },
  { n: "04", title: "Envio de Alertas", sub: "Som suspeito com alta confiança aciona o módulo LoRa, que transmite alertas para um gateway remoto e notifica as autoridades.", tags: "LoRaWAN · Gateway" },
];

const SPECS = [
  { title: "Hardware", items: ["Microcontrolador ESP32", "Microfone INMP441 (I2S)", "Módulo LoRa SX1276", "Bateria / energia solar"] },
  { title: "Software", items: ["Redes Neurais Convolucionais", "TinyML via Edge Impulse", "Espectrogramas no dispositivo", "Firmware embarcado"] },
  { title: "Comunicação", items: ["Protocolo LoRaWAN", "Gateway remoto", "Backend de gerenciamento", "Interface de monitoramento"] },
];

const fade = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function MethodologySection() {
  return (
    <section id="metodologia" className="ed-section ed-section-black">
      <div className="ed-container ed-grid ed-grid-12">
        <motion.div {...fade} className="md:col-span-3">
          <h2 className="ed-label">Sistema</h2>
        </motion.div>

        <div className="md:col-span-9 flex flex-col gap-14 md:gap-20">
          <motion.div {...fade}>
            <p className="ed-h-large">
              Como o sistema<br />
              <span className="italic-em font-normal">escuta</span> a mata.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="ed-row"
                data-hover
              >
                <span className="ed-mono opacity-50 self-start" style={{ paddingTop: "0.4rem", color: "var(--green-soft)" }}>{s.n}</span>
                <div>
                  <p className="ed-h-row">{s.title}</p>
                  <p className="mt-3 text-sm md:text-base text-white/55 leading-relaxed max-w-xl">{s.sub}</p>
                </div>
                <span className="ed-row-tags">{s.tags}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="border-t border-white/20 pt-12">
            <h3 className="ed-label mb-10">Especificações Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {SPECS.map((sp) => (
                <div key={sp.title}>
                  <h4 className="ed-h-row mb-5">{sp.title}</h4>
                  <ul className="flex flex-col gap-2">
                    {sp.items.map((it) => (
                      <li key={it} className="text-sm md:text-base text-white/55 tracking-wide leading-relaxed">
                        — {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
