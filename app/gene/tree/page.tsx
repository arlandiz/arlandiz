"use client";

import Link from "next/link";

export default function TreePage() {
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

      {/* Embed Tree HTML */}
      <section className="rounded-3xl overflow-hidden shadow-[0_0_48px_rgba(0,0,0,0.9)] border border-white/10">
        <iframe
          src="/gene/tree.html"
          className="w-full h-[75vh] bg-black"
        />
      </section>

    </main>
  );
}