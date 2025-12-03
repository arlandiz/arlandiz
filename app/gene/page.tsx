"use client";

import Link from "next/link";

export default function GenealogyHome() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 lg:px-16">

      {/* Header */}
      <header className="mb-8 flex flex-col gap-5">
        <div className="mt-1 text-left">
          <span className="font-arizona text-4xl sm:text-5xl text-white tracking-wide">
            Arlandiz
          </span>
        </div>

        {/* Navigation */}
        <nav className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
          <Link
            href="/gene"
            className="rounded-none border border-amber-400 bg-amber-500/20 py-3 text-center uppercase tracking-[0.25em] text-xs text-amber-300"
          >
            Genealogy
          </Link>

          <Link
            href="/dna"
            className="rounded-none border border-white/20 bg-zinc-900/80 py-3 text-center uppercase tracking-[0.25em] text-xs text-zinc-200 hover:bg-zinc-800"
          >
            DNA
          </Link>

          <Link
            href="/calendar"
            className="rounded-none border border-white/20 bg-zinc-900/80 py-3 text-center uppercase tracking-[0.25em] text-xs text-zinc-200 hover:bg-zinc-800"
          >
            Calendar
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-6 shadow-[0_0_48px_rgba(0,0,0,0.9)] text-center">
        
        <h2 className="text-amber-300 font-semibold text-xl mb-4">
          The Arlandiz Family Legacy
        </h2>

        <p className="text-zinc-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
          Discover the story of our lineage — and the generations  
          whose lives built the path that led to us today.
        </p>

        <Link
          href="/gene/tree"
          className="inline-block px-6 py-3 text-xs tracking-[0.25em] uppercase rounded border border-amber-300 text-amber-300 hover:bg-amber-500/20 transition"
        >
          View Family Tree →
        </Link>
      </section>

    </main>
  );
}