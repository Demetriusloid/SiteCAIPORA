"use client"

import { useEffect, useState } from "react"

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true
  if (target.isContentEditable) return true
  return false
}

export function MobilePreviewClient() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(
      document.documentElement.classList.contains("caipora-mobile-preview"),
    )
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.altKey || !e.shiftKey) return
      if (e.key !== "m" && e.key !== "M") return
      if (isTypingTarget(e.target)) return
      e.preventDefault()
      const root = document.documentElement
      root.classList.toggle("caipora-mobile-preview")
      setActive(root.classList.contains("caipora-mobile-preview"))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  if (!active) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-3 left-3 right-3 z-[9999] mx-auto max-w-sm rounded-lg border border-accent/40 bg-card/95 px-3 py-2 text-center text-xs text-foreground shadow-lg backdrop-blur-sm sm:left-auto sm:right-4 sm:mx-0"
    >
      <span className="font-medium text-accent">Pré-visualização mobile</span>
      <span className="text-muted-foreground">
        . A página está limitada a ~390px. Pressione{" "}
        <kbd className="rounded border border-border bg-secondary px-1 font-mono text-[10px]">
          Alt
        </kbd>{" "}
        +{" "}
        <kbd className="rounded border border-border bg-secondary px-1 font-mono text-[10px]">
          Shift
        </kbd>{" "}
        +{" "}
        <kbd className="rounded border border-border bg-secondary px-1 font-mono text-[10px]">
          M
        </kbd>{" "}
        de novo para sair.
      </span>
    </div>
  )
}
