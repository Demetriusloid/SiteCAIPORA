"use client"

import { useCallback, useEffect, useState } from "react"
import { Mic, FileAudio, Brain, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const steps = [
  {
    number: "01",
    icon: Mic,
    title: "Captura de Áudio",
    description:
      "O microfone digital INMP441 com interface I2S captura os sons do ambiente em alta fidelidade, permitindo análise bioacústica precisa.",
  },
  {
    number: "02",
    icon: FileAudio,
    title: "Processamento de Sinais",
    description:
      "Os sinais brutos são convertidos em espectrogramas, transformando informação sonora em representações visuais de frequência ao longo do tempo.",
  },
  {
    number: "03",
    icon: Brain,
    title: "Classificação por IA",
    description:
      "Uma Rede Neural Convolucional (CNN) otimizada com TinyML analisa os espectrogramas e classifica os sons como naturais ou atividades ilegais.",
  },
  {
    number: "04",
    icon: Bell,
    title: "Envio de Alertas",
    description:
      "Ao identificar um som suspeito com alto índice de confiança, o módulo LoRa transmite alertas para um gateway remoto que notifica as autoridades.",
  },
] as const

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <div className="relative flex h-full min-w-0 flex-col rounded-lg border border-border bg-card/95 p-3.5 transition-all duration-300 hover:border-primary/45 max-sm:border-border/60 sm:rounded-2xl sm:p-6 md:p-8">
      <div className="mb-2 flex shrink-0 items-center justify-between gap-2 sm:mb-3">
        <span
          className={cn(
            "inline-flex min-h-[1.5rem] min-w-[2rem] items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold tabular-nums sm:px-3 sm:text-sm",
            index === 3
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary text-primary-foreground",
          )}
        >
          {step.number}
        </span>
      </div>

      <div
        className={cn(
          "mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border sm:mb-6 sm:h-14 sm:w-14 sm:rounded-xl",
          index === 3
            ? "bg-destructive/10 border-destructive/25"
            : index % 2 === 0
              ? "bg-primary/10 border-primary/25"
              : "bg-accent/10 border-accent/25",
        )}
      >
        <step.icon
          className={cn(
            "w-5 h-5 sm:w-7 sm:h-7",
            index === 3
              ? "text-destructive"
              : index % 2 === 0
                ? "text-primary"
                : "text-accent",
          )}
        />
      </div>

      <h3 className="text-base sm:text-xl font-semibold mb-1.5 sm:mb-3 text-card-foreground">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-[13px] sm:text-base leading-snug sm:leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}

export function MethodologySection() {
  const [api, setApi] = useState<CarouselApi>()
  const [active, setActive] = useState(0)

  const onSelect = useCallback((carousel: CarouselApi | undefined) => {
    if (!carousel) return
    setActive(carousel.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  return (
    <section id="metodologia" className="py-9 sm:py-20 md:py-32 px-3.5 sm:px-6">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="text-center mb-7 sm:mb-14 md:mb-16 max-sm:max-w-md max-sm:mx-auto">
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-4 block">
            Metodologia
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6 text-balance px-1 leading-snug">
            Como o Sistema Funciona
          </h2>
          <p className="text-muted-foreground text-[13px] sm:text-base md:text-lg max-w-3xl mx-auto leading-snug sm:leading-relaxed px-1">
            O CAIPORA opera em quatro etapas principais, desde a captura do áudio até o envio de
            alertas para as autoridades competentes.
          </p>
        </div>

        {/* Mobile: carrossel horizontal (sem autoplay) */}
        <div className="sm:hidden -mx-0.5 mb-2">
          <Carousel
            setApi={setApi}
            opts={{
              loop: false,
              align: "start",
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {steps.map((step, index) => (
                <CarouselItem
                  key={step.number}
                  className="pl-3 basis-[85%] min-[420px]:basis-[75%]"
                >
                  <StepCard step={step} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div
            className="flex justify-center gap-1.5 pt-4"
            role="tablist"
            aria-label="Etapas do sistema"
          >
            {steps.map((step, i) => (
              <button
                key={step.number}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Etapa ${step.number}: ${step.title}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  active === i
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/35 hover:bg-muted-foreground/55",
                )}
                onClick={() => api?.scrollTo(i)}
              />
            ))}
          </div>
        </div>

        {/* Tablet / desktop: grade */}
        <div className="relative hidden sm:block">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-90" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <StepCard step={step} index={index} />

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2.5 sm:my-4">
                    <div className="w-0.5 h-6 sm:h-8 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 sm:mt-16 md:mt-20 rounded-lg border border-border bg-secondary/50 p-3.5 max-sm:border-border/60 sm:rounded-2xl sm:p-6 md:p-8">
          <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-6 sm:text-xl">
            Especificações Técnicas
          </h3>

          <div className="sm:hidden -mx-0.5">
            <Carousel
              opts={{ loop: true, align: "center", dragFree: false }}
              className="w-full"
            >
              <CarouselContent className="-ml-2.5">
                <CarouselItem className="pl-2.5 basis-[88%]">
                  <div className="rounded-xl border border-border bg-card/90 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-destructive">Hardware</h4>
                    <ul className="space-y-2 text-[13px] leading-snug text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-destructive">•</span>
                        Microcontrolador ESP32
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">•</span>
                        Microfone INMP441 (I2S)
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">•</span>
                        Módulo LoRa SX1276
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">•</span>
                        Bateria / energia solar
                      </li>
                    </ul>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2.5 basis-[88%]">
                  <div className="rounded-xl border border-border bg-card/90 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-accent">Software</h4>
                    <ul className="space-y-2 text-[13px] leading-snug text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-accent">•</span>
                        Redes neurais convolucionais
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent">•</span>
                        TinyML (Edge Impulse)
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent">•</span>
                        Espectrogramas no dispositivo
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent">•</span>
                        Firmware embarcado
                      </li>
                    </ul>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2.5 basis-[88%]">
                  <div className="rounded-xl border border-border bg-card/90 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-primary">Comunicação</h4>
                    <ul className="space-y-2 text-[13px] leading-snug text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Protocolo LoRaWAN
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Gateway remoto
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Backend de gestão
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Interface de monitoramento
                      </li>
                    </ul>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
            <div className="min-w-0">
              <h4 className="mb-2 font-medium text-destructive sm:mb-3">Hardware</h4>
              <ul className="space-y-1.5 text-[13px] text-muted-foreground sm:space-y-2 sm:text-sm">
                <li>• Microcontrolador ESP32</li>
                <li>• Microfone INMP441 (I2S)</li>
                <li>• Módulo LoRa SX1276</li>
                <li>• Alimentação por bateria/solar</li>
              </ul>
            </div>
            <div className="min-w-0">
              <h4 className="mb-2 font-medium text-accent sm:mb-3">Software</h4>
              <ul className="space-y-1.5 text-[13px] text-muted-foreground sm:space-y-2 sm:text-sm">
                <li>• Redes Neurais Convolucionais</li>
                <li>• TinyML via Edge Impulse</li>
                <li>• Processamento de espectrogramas</li>
                <li>• Firmware embarcado</li>
              </ul>
            </div>
            <div className="min-w-0 sm:col-span-2 md:col-span-1">
              <h4 className="mb-2 font-medium text-primary sm:mb-3">Comunicação</h4>
              <ul className="space-y-1.5 text-[13px] text-muted-foreground sm:space-y-2 sm:text-sm">
                <li>• Protocolo LoRaWAN</li>
                <li>• Gateway remoto</li>
                <li>• Backend de gerenciamento</li>
                <li>• Interface de monitoramento</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
