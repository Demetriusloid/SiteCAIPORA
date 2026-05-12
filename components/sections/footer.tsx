import { Leaf, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-3.5 sm:px-6 border-t border-border bg-card pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="mb-6 sm:mb-10 p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-r from-primary/22 via-accent/10 to-primary/16 max-sm:border-primary/30 border border-primary/35 text-center">
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-1.5 sm:mb-3">
            <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary shrink-0" />
            <span className="text-primary font-semibold uppercase tracking-wider text-[10px] sm:text-sm">
              Inovatech Fametro
            </span>
          </div>
          <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-3 text-foreground text-balance px-1 leading-snug">
            Visite nosso stand e conheça o CAIPORA de perto!
          </h3>
          <p className="text-muted-foreground text-[11px] sm:text-sm md:text-base max-w-xl mx-auto leading-snug sm:leading-relaxed">
            Venha conversar com nossa equipe, ver demonstrações do sistema e entender como a tecnologia pode proteger a Amazônia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5 order-1 md:order-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/35 to-primary/10 border border-primary/40 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <span className="font-bold text-foreground text-sm sm:text-base">CAIPORA</span>
              <p className="text-[11px] sm:text-xs text-muted-foreground">Monitoramento Ambiental Inteligente</p>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground max-w-full px-1">
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-secondary border border-primary/25">
              IoT
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-secondary border border-accent/25">
              Inteligência Artificial
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-secondary border border-primary/20">
              Bioacústica
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Projeto CAIPORA
          </p>
        </div>

        {/* References note */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center leading-relaxed">
            Projeto acadêmico desenvolvido no curso de Engenharia de Software da Fametro.
          </p>
        </div>
      </div>
    </footer>
  )
}
