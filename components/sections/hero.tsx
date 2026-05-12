"use client"

import { ArrowDown, Leaf, Shield, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[92dvh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8 sm:pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent)] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <Leaf className="absolute top-20 left-[10%] w-8 h-8 text-primary/35 animate-pulse" />
        <Shield className="absolute top-40 right-[15%] w-6 h-6 text-primary/25 animate-pulse delay-300" />
        <Wifi className="absolute bottom-40 left-[20%] w-7 h-7 text-accent/30 animate-pulse delay-500" />
        <Leaf className="absolute bottom-32 right-[25%] w-5 h-5 text-primary/25 animate-pulse delay-700" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-1 max-sm:max-w-[min(100%,22rem)]">
        <div className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full border border-primary/30 bg-primary/8 text-primary text-[11px] sm:text-sm mb-4 sm:mb-8 max-w-[95vw] mx-auto">
          <Leaf className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          <span className="text-balance leading-tight">
            Amazônia em foco · Engenharia de Software
          </span>
        </div>

        <h1 className="text-[2.15rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 sm:mb-6 text-balance px-1">
          <span className="bg-gradient-to-br from-emerald-300 via-green-500 to-emerald-800 bg-clip-text text-transparent">
            CAIPORA
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-foreground/90 font-medium mb-2 sm:mb-4 text-pretty px-1">
          A floresta em tempo real: som, IA e alerta na hora.
        </p>

        <p className="text-[13px] sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-12 leading-snug sm:leading-relaxed px-1">
          O CAIPORA escuta a mata com sensores e bioacústica, processa na borda com TinyML e avisa
          quando algo soa errado: desmatamento e caça ilegal antes de virarem estatística.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 mb-7 sm:mb-16 w-full max-w-[280px] sm:max-w-none mx-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto px-5 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg shadow-md sm:shadow-lg shadow-primary/20 sm:shadow-primary/25 h-auto min-h-11 sm:min-h-12"
            onClick={() => scrollToSection("problema")}
          >
            Ver o que está em jogo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-5 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg border-accent/40 bg-accent/5 hover:bg-accent/15 text-foreground h-auto min-h-11 sm:min-h-12"
            onClick={() => scrollToSection("metodologia")}
          >
            Como a tecnologia age
          </Button>
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-sm text-muted-foreground pb-1 max-w-[95vw]">
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-secondary/70 border border-accent/25 text-foreground/85">
            IoT
          </span>
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-secondary/70 border border-primary/20 text-foreground/85">
            Edge AI
          </span>
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-secondary/70 border border-accent/25 text-foreground/85">
            TinyML
          </span>
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-secondary/70 border border-primary/20 text-foreground/85">
            LoRa
          </span>
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-secondary/70 border border-destructive/20 text-foreground/85">
            Bioacústica
          </span>
        </div>

        <div className="mt-4 sm:mt-10 flex w-full justify-center">
          <button
            type="button"
            onClick={() => scrollToSection("problema")}
            className="flex flex-col items-center justify-center gap-1.5 text-center text-muted-foreground hover:text-primary transition-colors cursor-pointer min-h-10 min-w-10 px-4"
            aria-label="Descer e continuar a leitura"
          >
            <span className="text-xs sm:text-sm font-medium text-foreground/80 max-w-[16rem] sm:max-w-none leading-snug">
              Desça: mapa, dados e o porquê disso tudo
            </span>
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce shrink-0" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
