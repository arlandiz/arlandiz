// app/dna/page.tsx
"use client";

import DNAMapOrigen from "../components/DNAMapOrigen";

export default function DNAPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 lg:px-16">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-5">
        <div className="mt-1 text-left">
          <span className="font-arizona text-4xl sm:text-5xl text-white tracking-wide">
            Arlandiz
          </span>
        </div>

        {/* Nav buttons */}
        <nav className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
          <a
            href="/gene"
            className="rounded-none border border-white/20 bg-zinc-900/80 py-3 text-center uppercase tracking-[0.25em] text-xs text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            Genealogy
          </a>
          <a
            href="/dna"
            className="rounded-none border border-amber-400 bg-amber-500/20 py-3 text-center uppercase tracking-[0.25em] text-xs text-amber-300"
          >
            DNA
          </a>
          <a
            href="/calendar"
            className="rounded-none border border-white/20 bg-zinc-900/80 py-3 text-center uppercase tracking-[0.25em] text-xs text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            Calendar
          </a>
        </nav>
      </header>

      {/* DNA Map + Narrative + Table */}
      <section className="animate-fadeZoom rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-4 sm:p-6 lg:p-8 shadow-[0_0_48px_rgba(0,0,0,0.9)]">
        <DNAMapOrigen />
      </section>
    </main>
  );
}