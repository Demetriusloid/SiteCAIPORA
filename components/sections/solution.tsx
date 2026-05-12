"use client"

import { useCallback, useEffect, useState } from "react"
import { Cpu, Radio, Brain, Zap, Waves, Shield } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Waves,
    title: "Análise Bioacústica",
    body: "O sistema captura sons do ambiente através de um microfone digital de alta fidelidade (INMP441) e os converte em espectrogramas para análise por redes neurais.",
    bullets: ["Detecção de motosserras", "Identificação de disparos", "Sons naturais vs. suspeitos"],
  },
  {
    icon: Brain,
    title: "Inteligência Artificial",
    body: "Redes Neurais Convolucionais (CNN) treinadas com TinyML permitem reconhecer padrões sonoros diretamente no dispositivo.",
    bullets: ["Tempo real", "Alta precisão", "Menos falsos positivos"],
  },
  {
    icon: Cpu,
    title: "Computação de Borda",
    body: "O ESP32 processa tudo localmente, sem depender de internet constante, com autonomia total.",
    bullets: ["Baixo consumo", "Sem internet obrigatória", "Operação autônoma"],
  },
  {
    icon: Radio,
    title: "Comunicação LoRa",
    body: "LoRa envia alertas a longa distância com pouca energia, ideal para áreas remotas.",
    bullets: ["Alcance em km", "Alertas em tempo real", "Eficiência energética"],
  },
] as const

const highlights = [
  { icon: Zap, label: "Baixo", sub: "Consumo energético", className: "text-accent" },
  { icon: Shield, label: "Alta", sub: "Precisão", className: "text-primary" },
  { icon: Radio, label: "Longo", sub: "Alcance", className: "text-destructive" },
  { icon: Cpu, label: "100%", sub: "Autônomo", className: "text-accent" },
] as const

const AUTOPLAY_MS = 6000

function FeatureCard({ item }: { item: (typeof features)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card/95 p-3.5 sm:p-7 md:p-8">
      <div className="mb-3 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-12 sm:w-12 sm:rounded-xl">
          <item.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
        </div>
        <h3 className="text-base font-semibold text-card-foreground sm:text-xl">{item.title}</h3>
      </div>
      <p className="mb-3 flex-1 text-[13px] leading-snug text-muted-foreground sm:mb-4 sm:text-base sm:leading-relaxed">
        {item.body}
      </p>
      <ul className="space-y-1.5 text-[13px] text-muted-foreground sm:space-y-2 sm:text-sm">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SolutionSection() {
  const [featApi, setFeatApi] = useState<CarouselApi>()
  const [featActive, setFeatActive] = useState(0)

  const onFeatSelect = useCallback((api: CarouselApi | undefined) => {
    if (!api) return
    setFeatActive(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!featApi) return
    onFeatSelect(featApi)
    featApi.on("select", onFeatSelect)
    return () => {
      featApi.off("select", onFeatSelect)
    }
  }, [featApi, onFeatSelect])

  useEffect(() => {
    if (!featApi) return
    let id: number | undefined
    const arm = () => {
      if (id !== undefined) window.clearInterval(id)
      id = window.setInterval(() => {
        featApi.scrollNext()
      }, AUTOPLAY_MS)
    }
    arm()
    featApi.on("select", arm)
    return () => {
      if (id !== undefined) window.clearInterval(id)
      featApi.off("select", arm)
    }
  }, [featApi])

  return (
    <section id="solucao" className="py-9 sm:py-20 md:py-32 px-3.5 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="text-center mb-7 sm:mb-14 md:mb-16 max-sm:max-w-md max-sm:mx-auto">
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-4 block">
            A Solução
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6 text-balance px-1 leading-snug">
            Tecnologia a Favor da Natureza
          </h2>
          <p className="text-muted-foreground text-[13px] sm:text-base md:text-lg max-w-3xl mx-auto leading-snug sm:leading-relaxed px-1">
            O CAIPORA integra Internet das Coisas, Inteligência Artificial e Computação de Borda para
            criar um sistema autônomo de vigilância ambiental baseado em análise bioacústica.
          </p>
        </div>

        <div className="sm:hidden -mx-0.5 mb-5">
          <Carousel
            setApi={setFeatApi}
            opts={{ loop: true, align: "start", dragFree: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {features.map((item) => (
                <CarouselItem key={item.title} className="pl-3 basis-[88%]">
                  <FeatureCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-3 flex justify-center gap-1.5" aria-label="Indicadores do carrossel">
            {features.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={item.title}
                aria-current={featActive === i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  featActive === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/35",
                )}
                onClick={() => featApi?.scrollTo(i)}
              />
            ))}
          </div>
        </div>

        <div className="mb-8 hidden sm:mb-14 sm:block md:mb-16">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-6 md:gap-8">
            {features.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4 md:gap-6">
          {highlights.map((h) => (
            <div
              key={h.sub}
              className="flex min-w-0 flex-col items-center rounded-md border border-border bg-card/95 p-2.5 text-center sm:rounded-xl sm:p-5 md:p-6"
            >
              <h.icon className={cn("mb-1.5 h-6 w-6 sm:mb-3 sm:h-8 sm:w-8", h.className)} />
              <div className="text-lg font-bold text-foreground sm:text-2xl">{h.label}</div>
              <div className="text-[10px] text-muted-foreground leading-tight sm:text-sm">{h.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
