"use client";

export default function BrandLogo() {
  return (
    <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50" style={{ mixBlendMode: "difference" }}>
      <a href="#hero" className="flex items-start text-white" style={{ fontFamily: "var(--font-sans)" }}>
        <span className="font-black tracking-[-0.04em] text-2xl md:text-3xl leading-none uppercase">
          CAIPORA
        </span>
        <span className="text-[10px] md:text-xs font-medium ml-1 -mt-1 md:-mt-1.5">®</span>
      </a>
    </div>
  );
}
