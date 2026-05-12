import { CheckCircle2, Clock, Leaf, Quote, TrendingUp } from "lucide-react"

const results = [
  {
    icon: Clock,
    title: "Detecção em Tempo Real",
    description: "Identificação instantânea de atividades suspeitas através do processamento local de áudio.",
  },
  {
    icon: TrendingUp,
    title: "Alta Eficiência",
    description: "Redução significativa de falsos positivos através de redes neurais treinadas especificamente para o contexto amazônico.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Baixo consumo energético permite operação prolongada com baterias ou energia solar.",
  },
  {
    icon: CheckCircle2,
    title: "Autonomia Total",
    description: "Funcionamento independente de internet, ideal para áreas remotas sem infraestrutura de conectividade.",
  },
]

export function ResultsSection() {
  return (
    <section id="resultados" className="py-9 sm:py-20 md:py-32 px-3.5 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="text-center mb-7 sm:mb-14 md:mb-16 max-sm:max-w-md max-sm:mx-auto">
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-4 block">
            Resultados Esperados
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6 text-balance px-1 leading-snug">
            Impacto e Benefícios
          </h2>
          <p className="text-muted-foreground text-[13px] sm:text-base md:text-lg max-w-3xl mx-auto leading-snug sm:leading-relaxed px-1">
            O CAIPORA demonstra o potencial da tecnologia como aliada na preservação ambiental, 
            oferecendo monitoramento inteligente, processamento em tempo real e comunicação eficiente.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-2 sm:mb-14 sm:gap-6 md:mb-16 lg:grid-cols-4">
          {results.map((result) => (
            <div
              key={result.title}
              className="flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-card/95 p-2.5 transition-all duration-300 hover:border-primary/40 max-sm:border-border/60 sm:flex-row sm:gap-4 sm:rounded-2xl sm:p-6"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/15 sm:h-12 sm:w-12 sm:rounded-xl">
                <result.icon className="h-3.5 w-3.5 text-primary sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="mb-0.5 text-[11px] font-semibold leading-tight text-card-foreground sm:mb-2 sm:text-lg">
                  {result.title}
                </h3>
                <p className="text-[9px] leading-snug text-muted-foreground max-sm:line-clamp-6 sm:text-base sm:leading-relaxed">
                  {result.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card p-4 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--primary)_25%,transparent)] sm:p-8 md:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-accent/10 blur-2xl" />

          <div className="relative flex max-sm:flex-col max-sm:items-start max-sm:gap-3 sm:items-start sm:gap-5">
            <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-center sm:gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/35 bg-primary/15 sm:h-14 sm:w-14 sm:rounded-2xl">
                <Leaf className="h-5 w-5 text-primary sm:h-7 sm:w-7" />
              </div>
              <Quote className="hidden h-8 w-8 text-primary/35 sm:block" aria-hidden />
            </div>

            <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                  Encerramento
                </p>
                <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                  Considerações finais
                </h3>
              </div>

              <p className="border-l-2 border-primary/40 pl-3 text-[13px] leading-relaxed text-muted-foreground sm:border-l-4 sm:pl-4 sm:text-base">
                O CAIPORA propõe monitoramento ambiental em áreas remotas da Amazônia, reunindo IoT,
                inteligência artificial e computação de borda para análise bioacústica e detecção de
                atividades ilegais.
              </p>
              <p className="text-[13px] leading-relaxed text-muted-foreground/95 sm:text-base">
                O projeto segue em desenvolvimento: falta validação em campo, mais dados e testes
                reais. Mesmo assim, abre caminho para novos usos e para proteger melhor a
                biodiversidade da região.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
