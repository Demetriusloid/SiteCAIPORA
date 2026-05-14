# CAIPORA

> **A floresta escuta.** — Sistema autônomo de vigilância bioacústica para a Amazônia.

Site institucional do projeto **CAIPORA**, desenvolvido como parte da **Inovatech Fametro 2026** pelo curso de Engenharia de Software da Fametro. O sistema integra Internet das Coisas, Inteligência Artificial e Computação de Borda para detectar desmatamento e caça ilegal em áreas remotas da Amazônia através de análise bioacústica em tempo real.

🌐 **Live:** [site-caipora.vercel.app](https://site-caipora.vercel.app/)

---

## Sobre o Projeto

O CAIPORA é um sistema embarcado que escuta a mata com sensores e bioacústica, processa localmente com TinyML e envia alertas via LoRa quando algo soa errado — antes do crime virar estatística.

### Como funciona

1. **Captura** — Microfone digital INMP441 (I2S) capta sons do ambiente em alta fidelidade
2. **Processamento** — Sinais brutos viram espectrogramas no próprio dispositivo
3. **Classificação** — Uma CNN otimizada com TinyML diferencia sons naturais de atividades ilegais (motosserras, disparos)
4. **Alerta** — Som suspeito aciona o módulo LoRa SX1276, que transmite ao gateway remoto e notifica as autoridades

### Stack técnica

| Camada | Tecnologia |
|---|---|
| Hardware | ESP32 · INMP441 · LoRa SX1276 · Bateria/Solar |
| Software | TinyML (Edge Impulse) · CNN · Firmware embarcado |
| Comunicação | LoRaWAN · Gateway remoto · Backend de gerenciamento |

---

## Site

Aplicação Next.js 16 estática (`next dev` / `next build`), tipografia editorial brutalist com cenário 3D em React Three Fiber.

### Stack do front-end

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-first, sem `tailwind.config`)
- **Three.js / @react-three/fiber / @react-three/drei** — floresta amazônica 3D em point cloud
- **Framer Motion** — animações em viewport e overlay de menu
- **GSAP + ScrollTrigger** — parallax de partículas, splitText do hero
- **Lenis** — smooth scroll
- **react-simple-maps** — mapa interativo do Brasil com pulsos nos municípios críticos

### Design system

- Paleta cream `#F1EDE3` ↔ forest deep `#0A1C14` alternada por seção
- Inter (300–900) uppercase para títulos massive
- Playfair Display italic como ênfase pontual em verde `#2D6A45 / #5BC97A`
- Geist Mono para labels e numeração `01. / 02. / R.01`
- Grid editorial 12 colunas (col-span-3 label + col-span-9 conteúdo)

### Seções

| # | Seção | Conteúdo |
|---|---|---|
| 01 | Hero | Cenário 3D de point cloud — floresta amazônica em eye-level (140 árvores em grade espaçada, troncos castanhos e copas verdes gradient por altura) |
| 02 | O Problema | Desmatamento ilegal · Caça ilegal · Áreas remotas + citação de Emiliano Ramalho |
| 03 | A Urgência | Mapa interativo da Amazônia Legal com pulsos nos municípios críticos + estatísticas de 2024 |
| 04 | A Solução | Análise bioacústica · IA embarcada · Processamento local · Rede LoRa |
| 05 | Sistema | 4 etapas da metodologia + especificações Hardware/Software/Comunicação |
| 06 | Impacto | Resultados esperados + considerações finais |
| 07 | Coletivo | 26 integrantes da equipe + meta do projeto |
| 08 | Visita | Call-to-action para o stand da Inovatech Fametro |

---

## Rodando localmente

```bash
git clone https://github.com/Demetriusloid/SiteCAIPORA.git
cd SiteCAIPORA
npm install
npm run dev
```

Abre em `http://localhost:3000`.

### Scripts

- `npm run dev` — servidor de desenvolvimento (Turbopack)
- `npm run build` — build de produção
- `npm run start` — servidor de produção
- `npm run lint` — ESLint

---

## Estrutura

```
app/
├── globals.css        # design tokens + utilities editorial
├── layout.tsx         # fontes (Inter, Playfair, Geist Mono) + overlays globais
└── page.tsx           # composição das 8 sections

components/
├── layout/
│   ├── BrandLogo.tsx       # CAIPORA® top-left mix-blend-difference
│   ├── Navigation.tsx      # hamburger fullscreen com clipPath (Framer)
│   ├── ForestOverlay.tsx   # vaga-lumes parallax GSAP ScrollTrigger
│   ├── ProgressBar.tsx     # barra verde no topo
│   └── HeroCanvas.tsx      # cenário 3D R3F (floresta de pontos)
└── sections/
    ├── hero.tsx            # splitText + cenário 3D
    ├── problem.tsx
    ├── amazon-map.tsx      # mapa interativo Brasil
    ├── solution.tsx
    ├── methodology.tsx
    ├── results.tsx
    ├── team.tsx
    └── footer.tsx

hooks/useReveal.ts          # GSAP reveal helper
lib/splitText.ts            # split text char/word para animação
```

---

## Equipe

Projeto desenvolvido por estudantes do curso de **Engenharia de Software** da Fametro, sob orientação do professor **Josue Froner Freitas**. 26 integrantes — lista completa na seção *Coletivo* do site.

---

## Licença

Projeto acadêmico — Inovatech Fametro · 2026.
