"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const brazilGeoUrl =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

const POINTS = [
  { name: "Novo Progresso (PA)", coordinates: [-55.41, -7.87] as [number, number] },
  { name: "São Félix do Xingu (PA)", coordinates: [-51.99, -6.64] as [number, number] },
  { name: "Altamira (PA)", coordinates: [-52.21, -3.2] as [number, number] },
  { name: "Itaituba (PA)", coordinates: [-55.99, -4.28] as [number, number] },
  { name: "Marabá (PA)", coordinates: [-49.18, -5.37] as [number, number] },
  { name: "Sinop (MT)", coordinates: [-55.5, -11.86] as [number, number] },
  { name: "Porto Velho (RO)", coordinates: [-63.9, -8.76] as [number, number] },
  { name: "Rio Branco (AC)", coordinates: [-67.81, -9.97] as [number, number] },
];

const FACTS = [
  { n: "01", stat: "13M", unit: "Hectares", desc: "queimados em 2024 — maior número de focos desde 2007. Área maior que a Inglaterra." },
  { n: "02", stat: "06s", unit: "Por Campo", desc: "de futebol que desaparece. Dez por minuto. Para sempre." },
  { n: "03", stat: "10K", unit: "Espécies", desc: "ameaçadas. Muitas desaparecem antes mesmo de serem descritas pela ciência." },
];

const CENTER: [number, number] = [-54.2819, -15.2275];

const fade = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function AmazonMapSection() {
  const [{ center, scale }, set] = useState({ center: CENTER, scale: 1120 });
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 380) set({ center: CENTER, scale: 1000 });
      else if (w < 480) set({ center: CENTER, scale: 1120 });
      else if (w < 640) set({ center: CENTER, scale: 1280 });
      else if (w < 900) set({ center: CENTER, scale: 1760 });
      else if (w < 1280) set({ center: CENTER, scale: 2160 });
      else set({ center: CENTER, scale: 2480 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggle = (n: string) => setSelected((p) => (p === n ? null : n));

  return (
    <section className="ed-section ed-section-black">
      <div className="ed-container ed-grid ed-grid-12">
        <motion.div {...fade} className="md:col-span-3">
          <h2 className="ed-label">A Urgência</h2>
        </motion.div>

        <div className="md:col-span-9 flex flex-col gap-12 md:gap-16">
          <motion.div {...fade}>
            <p className="ed-h-large">
              Onde a floresta<br />
              está <span className="italic-em font-normal">sangrando</span>.
            </p>
            <p className="mt-6 text-sm md:text-base text-white/55 max-w-2xl tracking-wide leading-relaxed">
              Municípios da Amazônia Legal com histórico recorrente de pressão por desmatamento e
              queimadas. Cada pulso é uma cicatriz.
            </p>
          </motion.div>

          <motion.div
            {...fade}
            className="relative w-full border border-white/20 bg-black"
            style={{ aspectRatio: "16 / 9" }}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center, scale }}
              width={800}
              height={450}
              preserveAspectRatio="xMidYMid meet"
              style={{ width: "100%", height: "100%", background: "transparent" }}
            >
              <Geographies geography={brazilGeoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#0A0A0A"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#161616" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {POINTS.map((p, i) => (
                <Marker key={p.name} coordinates={p.coordinates}>
                  <g>
                    <g style={{ pointerEvents: "none" }}>
                      <circle r={8} fill="none" stroke="#FFFFFF" strokeWidth={1.2}
                              style={{ animation: `ed-ping 2.4s ease-out infinite ${(i % 5) * 0.35}s` }} />
                      <circle r={3} fill="#FFFFFF" />
                    </g>
                    <circle
                      r={14}
                      fill="transparent"
                      style={{ pointerEvents: "all", cursor: "pointer" }}
                      onClick={(e) => { e.stopPropagation(); toggle(p.name); }}
                    >
                      <title>{p.name}</title>
                    </circle>
                  </g>
                </Marker>
              ))}
            </ComposableMap>

            {selected && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 ed-mono text-white bg-black border border-white/25 px-4 py-2">
                · {selected}
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-white/20 pt-10">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <div className="ed-mono text-white/55 mb-3">{f.n}.</div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="ed-h-large" style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}>{f.stat}</span>
                  <span className="ed-label opacity-60">{f.unit}</span>
                </div>
                <p className="text-sm md:text-base text-white/55 leading-relaxed max-w-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ed-ping {
          0% { opacity: 0.9; transform: scale(0.5); }
          80%, 100% { opacity: 0; transform: scale(2.6); }
        }
      `}</style>
    </section>
  );
}
