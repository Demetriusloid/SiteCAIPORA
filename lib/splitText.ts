export type SplitMode = "chars" | "words";

export function splitText(el: HTMLElement, mode: SplitMode = "words"): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  el.innerHTML = "";
  const parts: HTMLSpanElement[] = [];

  const make = (txt: string) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.verticalAlign = "top";
    wrap.style.lineHeight = "inherit";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform, opacity";
    inner.textContent = txt;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    parts.push(inner);
  };

  if (mode === "words") {
    text.split(/(\s+)/).forEach((w) => {
      if (/^\s+$/.test(w)) {
        el.appendChild(document.createTextNode(w));
        return;
      }
      make(w);
    });
  } else {
    Array.from(text).forEach((c) => {
      if (c === " ") {
        el.appendChild(document.createTextNode(" "));
        return;
      }
      make(c);
    });
  }
  return parts;
}
