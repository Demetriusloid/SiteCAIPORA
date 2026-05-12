"use client"

import { useCallback, useEffect, useState } from "react"
import { Users, GraduationCap, BookOpen } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const teamMembers = [
  "Ana Kelly de Oliveira Monteiro",
  "Ana Paula Marques Cardoso",
  "Calebe de Freitas Lima",
  "Calvin Vinicius da Rocha Silva",
  "Chrisllen Sousa de Oliveira",
  "Christian Soares da Silva",
  "Dimitri Matheus de Oliveira",
  "Gabriela Machado Natividade",
  "Gustavo Brandao Lima",
  "Ian Severo Lisboa",
  "Isaac Pereira Froes",
  "João da Cunha Rabelo Neto",
  "Joonseo Lee",
  "Jorge Luiz dos Santos Silva",
  "José Micael Mota Chagas",
  "Juan Pablo Reis Quiroga",
  "Karole Kamila Maddy da Silva",
  "Kervens Loius",
  "Lara Fabian Fogaça Coelho",
  "Lorena Kettle de Castro",
  "Matheus Gustavo de Oliveira Targino",
  "Matheus Silva Lima",
  "Paulo Vitor de Souza Dias",
  "Thomas Araujo de Souza",
  "Wallesson Cesar Santos Vinhote",
  "Yan de Araújo Lima",
]

/** Parte a lista em 4 grupos (tamanhos o mais uniformes possível). */
function chunkIntoFour<T>(arr: readonly T[]): T[][] {
  const n = arr.length
  const base = Math.floor(n / 4)
  const remainder = n % 4
  const chunks: T[][] = []
  let start = 0
  for (let i = 0; i < 4; i++) {
    const size = base + (i < remainder ? 1 : 0)
    chunks.push(arr.slice(start, start + size) as T[])
    start += size
  }
  return chunks
}

const teamSlides = chunkIntoFour(teamMembers)

let _memberStart = 1
const teamSlideLabels = teamSlides.map((slide) => {
  const end = _memberStart + slide.length - 1
  const label = `Membros ${_memberStart} a ${end}`
  _memberStart = end + 1
  return label
})

export function TeamSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [active, setActive] = useState(0)

  const onSelect = useCallback((carousel: CarouselApi | undefined) => {
    if (!carousel) return
    setActive(carousel.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <section id="equipe" className="py-9 sm:py-20 md:py-32 px-3.5 sm:px-6">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="text-center mb-7 sm:mb-14 md:mb-16 max-sm:max-w-md max-sm:mx-auto">
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-4 block">
            Equipe
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6 text-balance px-1 leading-snug">
            Quem Está Por Trás
          </h2>
          <p className="text-muted-foreground text-[13px] sm:text-base md:text-lg max-w-3xl mx-auto leading-snug sm:leading-relaxed px-1">
            Projeto desenvolvido por estudantes do curso de Engenharia de Software, unidos pelo
            propósito de utilizar a tecnologia para a preservação ambiental.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-6 mb-6 sm:mb-12">
          <div className="p-3 sm:p-6 rounded-lg sm:rounded-2xl bg-card/95 max-sm:border-border/60 border border-border min-w-0">
            <div className="flex items-center gap-3 mb-2 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-card-foreground">Curso</h3>
                <p className="text-muted-foreground text-[13px] sm:text-base">Engenharia de Software</p>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-6 rounded-lg sm:rounded-2xl bg-card/95 max-sm:border-border/60 border border-border min-w-0">
            <div className="flex items-center gap-3 mb-2 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-xl bg-destructive/10 border border-destructive/25 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-card-foreground">Orientador</h3>
                <p className="text-muted-foreground text-[13px] sm:text-base">Josue Froner Freitas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-card/95 max-sm:border-border/60 border border-border min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
            <Users className="w-4 h-4 sm:w-6 sm:h-6 text-primary shrink-0" />
            <h3 className="text-base sm:text-xl font-semibold text-card-foreground">Membros da Equipe</h3>
          </div>

          <div className="sm:hidden -mx-0.5">
            <Carousel setApi={setApi} opts={{ loop: false, align: "start" }} className="w-full">
              <CarouselContent className="-ml-2">
                {teamSlides.map((slideMembers, slideIndex) => (
                  <CarouselItem key={slideIndex} className="pl-2 basis-full">
                    <div className="grid grid-cols-1 gap-1.5">
                      {slideMembers.map((member) => (
                        <div
                          key={member}
                          className="rounded-md bg-secondary/50 px-2.5 py-2 text-left text-[11px] leading-snug text-foreground break-words"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Páginas da lista">
              {teamSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={teamSlideLabels[i] ?? `Grupo ${i + 1} de 4`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    active === i ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/35",
                  )}
                  onClick={() => api?.scrollTo(i)}
                />
              ))}
            </div>
          </div>

          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {teamMembers.map((member) => (
              <div
                key={member}
                className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-secondary/50 text-xs sm:text-sm text-foreground leading-snug break-words hover:bg-secondary transition-colors"
              >
                {member}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
