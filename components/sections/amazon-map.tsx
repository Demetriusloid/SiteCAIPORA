"use client"

import { useEffect, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"
import { Flame, TreeDeciduous, Skull } from "lucide-react"

const brazilGeoUrl =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson"

/** Municípios na Amazônia Legal com histórico recorrente de pressão por desmatamento e/ou queimadas (ex.: MAAP, INPE, relatórios estaduais 2023-2024). */
const monitoringPoints = [
  { name: "Novo Progresso (PA)", coordinates: [-55.41, -7.87] as [number, number] },
  { name: "São Félix do Xingu (PA)", coordinates: [-51.99, -6.64] as [number, number] },
  { name: "Altamira (PA)", coordinates: [-52.21, -3.2] as [number, number] },
  { name: "Itaituba (PA)", coordinates: [-55.99, -4.28] as [number, number] },
  { name: "Marabá (PA)", coordinates: [-49.18, -5.37] as [number, number] },
  { name: "Sinop (MT)", coordinates: [-55.5, -11.86] as [number, number] },
  { name: "Porto Velho (RO)", coordinates: [-63.9, -8.76] as [number, number] },
  { name: "Rio Branco (AC)", coordinates: [-67.81, -9.97] as [number, number] },
]

const sadFacts = [
  {
    icon: Flame,
    stat: "13 milhões",
    label: "de hectares queimados em 2024",
    description:
      "A Amazônia registrou o maior número de focos de incêndio desde 2007. Uma área maior que a Inglaterra foi destruída em apenas um ano.",
    mobileStat: "13 mi",
    mobileLabel: "ha queimados",
    mobileHint: "Recorde de focos desde 2007.",
  },
  {
    icon: TreeDeciduous,
    stat: "1 campo",
    label: "de futebol a cada 6 segundos",
    description:
      "Esse é o ritmo atual de desmatamento na Amazônia. A cada minuto que você lê isso, 10 campos de futebol de floresta desaparecem para sempre.",
    mobileStat: "1 campo",
    mobileLabel: "/ 6 s",
    mobileHint: "Ritmo do desmatamento hoje.",
  },
  {
    icon: Skull,
    stat: "10.000",
    label: "espécies ameaçadas",
    description:
      "A destruição do habitat está levando milhares de espécies à extinção. Muitas desaparecem antes mesmo de serem descobertas pela ciência.",
    mobileStat: "10 mil",
    mobileLabel: "espécies",
    mobileHint: "Habitat destruído, extinção acelerada.",
  },
] as const

/** Mapa: preto; linhas de estado em cinza escuro. */
const MAP_FILL = "#000000"
const MAP_STROKE = "#3f3f46"

const MAP_CENTER: [number, number] = [-54.2819, -15.2275]

const MAP_WIDTH = 800
const MAP_HEIGHT = 600

function useMapProjection() {
  const [{ center, scale }, set] = useState<{
    center: [number, number]
    scale: number
  }>({ center: MAP_CENTER, scale: 1120 })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 380) set({ center: MAP_CENTER, scale: 1000 })
      else if (w < 480) set({ center: MAP_CENTER, scale: 1120 })
      else if (w < 640) set({ center: MAP_CENTER, scale: 1280 })
      else if (w < 900) set({ center: MAP_CENTER, scale: 1760 })
      else if (w < 1280) set({ center: MAP_CENTER, scale: 2160 })
      else set({ center: MAP_CENTER, scale: 2560 })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return { center, scale }
}

export function AmazonMapSection() {
  const { center, scale } = useMapProjection()
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)

  const togglePoint = (name: string) => {
    setSelectedPoint((prev) => (prev === name ? null : name))
  }

  return (
    <section className="py-9 sm:py-20 md:py-32 px-3.5 sm:px-6 bg-secondary/30">
      <div className="max-w-[min(100%,1320px)] mx-auto w-full min-w-0 flex flex-col items-center">
        <div className="text-center mb-5 sm:mb-8 md:mb-10 w-full max-w-3xl mx-auto px-1">
          <span className="text-accent text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-4 block">
            A Urgência
          </span>
          <h2 className="text-lg sm:text-2xl md:text-5xl font-bold mb-0 sm:mb-2 md:mb-4 text-balance leading-snug">
            A Amazônia Pede Socorro
          </h2>
        </div>

        <div className="w-full max-w-[min(100%,1180px)] mx-auto flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 min-w-0">
          {/* Mesma estrutura do bloco «Considerações finais» (resultados); cores em destructive em vez de primary/accent. */}
          <div className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-destructive/25 bg-card p-4 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--destructive)_25%,transparent)] sm:p-8 md:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-destructive/70 to-transparent" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-destructive/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-destructive/10 blur-2xl" />
            {/* Sem caixa preta extra: fundo transparente para o card, borrões e bg-card aparecerem nas letterboxes do SVG. */}
            <div className="relative z-10 flex w-full min-h-0 items-center justify-center overflow-hidden aspect-[4/3] min-h-[min(58vh,520px)] max-h-[min(90vh,920px)] sm:min-h-[min(52vh,480px)] sm:max-h-[min(88vh,860px)] md:aspect-[16/9] md:min-h-[min(56vh,560px)] md:max-h-[min(82vh,900px)] lg:min-h-[min(60vh,640px)] lg:max-h-[min(78vh,960px)] touch-pan-y">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  center,
                  scale,
                }}
                className="max-h-full max-w-full bg-transparent [&_svg]:bg-transparent"
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                }}
              >
                <Geographies geography={brazilGeoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={MAP_FILL}
                        stroke={MAP_STROKE}
                        strokeWidth={0.65}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {monitoringPoints.map((point, index) => (
                  <Marker key={point.name} coordinates={point.coordinates}>
                    <g role="button" tabIndex={0} className="outline-none">
                      <g style={{ pointerEvents: "none" }}>
                        <circle
                          r={8}
                          fill="none"
                          stroke="var(--destructive)"
                          strokeWidth={1.5}
                          className="animate-ping"
                          style={{
                            animationDuration: "2s",
                            animationDelay: `${(index % 5) * 0.35}s`,
                          }}
                        />
                        <circle
                          r={5.5}
                          fill="none"
                          stroke="var(--destructive)"
                          strokeWidth={1.5}
                          className="animate-ping"
                          style={{
                            animationDuration: "2.5s",
                            animationDelay: `${(index % 5) * 0.35 + 0.45}s`,
                          }}
                        />
                        <circle r={3} fill="var(--destructive)" />
                      </g>
                      <circle
                        r={14}
                        fill="transparent"
                        className="cursor-pointer"
                        style={{ pointerEvents: "all" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePoint(point.name)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            e.stopPropagation()
                            togglePoint(point.name)
                          }
                        }}
                      >
                        <title>{point.name}</title>
                      </circle>
                    </g>
                  </Marker>
                ))}
              </ComposableMap>
              {selectedPoint ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center px-2">
                  <p className="max-w-[min(100%,24rem)] rounded-md border border-border bg-card/95 px-3 py-1.5 text-center text-xs font-medium text-foreground shadow-md sm:text-sm">
                    {selectedPoint}
                  </p>
                </div>
              ) : null}
            </div>

          </div>

          <div className="w-full max-w-[min(100%,1180px)] mx-auto grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 min-w-0">
            {sadFacts.map((fact, index) => (
              <div
                key={index}
                className="relative max-sm:p-2 sm:p-5 rounded-lg sm:rounded-2xl bg-card/90 max-sm:border-border/60 border border-border overflow-hidden group hover:border-destructive/40 transition-colors max-sm:text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-sm:hidden" />

                <div className="relative flex max-sm:flex-col max-sm:items-center max-sm:gap-1 sm:gap-4">
                  <div className="flex-shrink-0 max-sm:mx-auto w-8 h-8 sm:w-12 sm:h-12 rounded-md sm:rounded-xl bg-destructive/15 border border-destructive/25 flex items-center justify-center">
                    <fact.icon className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0 max-sm:px-0.5">
                    <div className="flex max-sm:flex-col max-sm:items-center max-sm:gap-0 sm:items-baseline sm:gap-1.5 sm:flex-wrap">
                      <span className="text-sm sm:text-2xl font-bold text-destructive leading-none max-sm:tabular-nums">
                        <span className="sm:hidden">{fact.mobileStat}</span>
                        <span className="hidden sm:inline">{fact.stat}</span>
                      </span>
                      <span className="text-[9px] sm:text-sm text-muted-foreground leading-tight max-sm:line-clamp-2">
                        <span className="sm:hidden">
                          {fact.mobileLabel}
                        </span>
                        <span className="hidden sm:inline">{fact.label}</span>
                      </span>
                    </div>
                    <p className="mt-0.5 sm:mt-2 text-[9px] sm:text-sm text-muted-foreground leading-tight max-sm:line-clamp-3 sm:leading-relaxed">
                      <span className="sm:hidden">{fact.mobileHint}</span>
                      <span className="hidden sm:inline">{fact.description}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-xl mx-auto p-3 sm:p-5 rounded-lg sm:rounded-2xl bg-primary/12 border border-primary/30 text-center">
            <p className="text-xs sm:text-base text-primary font-semibold">
              CAIPORA: vigilância onde a floresta mais precisa
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
