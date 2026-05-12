import { AlertTriangle, TreeDeciduous, Target, Quote } from "lucide-react"

const problemCards = [
  {
    icon: AlertTriangle,
    iconClass: "text-destructive",
    wrapClass: "bg-destructive/15 border-destructive/25",
    title: "Desmatamento ilegal",
    mobileTitle: "Desmatamento",
    body: "A supressão indevida de vegetação continua sendo uma das maiores ameaças ao bioma amazônico, impactando diretamente as mudanças climáticas globais.",
    mobileBody: "Corte ilegal de mata. Impacto direto no clima.",
  },
  {
    icon: Target,
    iconClass: "text-accent",
    wrapClass: "bg-accent/15 border-accent/30",
    title: "Caça ilegal",
    mobileTitle: "Caça ilegal",
    body: "A fauna amazônica sofre com a caça predatória, ameaçando espécies como a onça-pintada e comprometendo o equilíbrio ecológico da região.",
    mobileBody: "Presa ilegal. Ameaça onça e o ecossistema.",
  },
  {
    icon: TreeDeciduous,
    iconClass: "text-primary",
    wrapClass: "bg-primary/15 border-primary/25",
    title: "Áreas remotas",
    mobileTitle: "Áreas remotas",
    body: "A vastidão da floresta torna impossível a fiscalização tradicional eficiente, exigindo soluções tecnológicas autônomas e de longo alcance.",
    mobileBody: "Floresta imensa. Fiscalização clássica não cobre.",
  },
] as const

export function ProblemSection() {
  return (
    <section id="problema" className="py-9 sm:py-20 md:py-32 px-3.5 sm:px-6">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="text-center mb-7 sm:mb-14 md:mb-16 max-sm:max-w-md max-sm:mx-auto">
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-4 block">
            O Problema
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6 text-balance px-1 leading-snug">
            A Amazônia Pede Socorro
          </h2>
          <p className="text-muted-foreground text-[13px] sm:text-base md:text-lg max-w-3xl mx-auto leading-snug sm:leading-relaxed px-1">
            O desmatamento e a caça ilegal na Amazônia demandam soluções tecnológicas
            eficientes para monitoramento em áreas remotas. A fiscalização tradicional
            não consegue cobrir a imensidão da floresta.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {problemCards.map((card, i) => (
            <div
              key={card.title}
              className={`group max-sm:p-2 sm:p-7 md:p-8 rounded-lg sm:rounded-2xl bg-card/95 max-sm:border-border/60 border border-border transition-all duration-300 max-sm:text-center hover:border-primary/40 sm:hover:border-destructive/40 ${
                i === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className={`mx-auto flex w-8 h-8 sm:w-14 sm:h-14 shrink-0 items-center justify-center rounded-md sm:rounded-xl border sm:mb-6 max-sm:mb-1.5 ${card.wrapClass}`}
              >
                <card.icon className={`w-4 h-4 sm:w-7 sm:h-7 ${card.iconClass}`} />
              </div>
              <h3 className="text-[11px] sm:text-xl font-semibold leading-tight max-sm:line-clamp-2 sm:mb-3 text-card-foreground">
                <span className="sm:hidden">{card.mobileTitle}</span>
                <span className="hidden sm:inline">{card.title}</span>
              </h3>
              <p className="text-muted-foreground max-sm:text-[9px] max-sm:leading-tight max-sm:line-clamp-4 sm:text-base sm:leading-relaxed">
                <span className="sm:hidden">{card.mobileBody}</span>
                <span className="hidden sm:inline">{card.body}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 sm:mt-14 md:mt-16 p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-br from-destructive/8 via-card to-accent/5 max-sm:border-border/60 border border-accent/20">
          <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0 max-sm:opacity-90" aria-hidden />
            <div className="min-w-0">
              <p className="text-foreground text-[13px] sm:text-base md:text-lg italic leading-snug sm:leading-relaxed mb-2 sm:mb-4">
                {`"A floresta amazônica é marcada por diversos sons que caracterizam sua biodiversidade, 
                incluindo o canto dos pássaros, o rugido e as vibrações emitidas pela onça-pintada 
                ao se deslocar pela mata, bem como a comunicação entre os pirarucus nas profundezas dos rios."`}
              </p>
              <cite className="text-muted-foreground text-xs sm:text-sm not-italic">
                Emiliano Ramalho, pesquisador (2025)
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
