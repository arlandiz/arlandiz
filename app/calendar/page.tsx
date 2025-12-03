"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { calendarEvents } from "./events";

// Type for the heights map (slug → height in px)
type HeightMap = Record<string, number>;

export default function CalendarPage() {
  // 🔹 Search query state
  const [query, setQuery] = useState("");

  // 🔹 Random card heights
  const [cardHeights, setCardHeights] = useState<HeightMap>({});

  useEffect(() => {
    const heights: HeightMap = {};
    calendarEvents.forEach((event) => {
      heights[event.slug] = 220 + Math.floor(Math.random() * 140); // 220–360px
    });
    setCardHeights(heights);
  }, []);

  // 🔹 Filter events
  const loweredQuery = query.toLowerCase();
  const visibleEvents = calendarEvents.filter((event) => {
    if (!loweredQuery) return true;
    const haystack = `${event.title} ${event.date}`.toLowerCase();
    return haystack.includes(loweredQuery);
  });

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 lg:px-16">
      {/* ░░░ HEADER ░░░ */}
      <header className="mb-8 flex flex-col gap-5">
        <div className="mt-1 text-left">
          <span className="font-arizona text-4xl sm:text-5xl text-white tracking-wide">
            Arlandiz
          </span>
        </div>

        <nav className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
          <a
            href="/gene"
            className="rounded-none border border-white/20 bg-zinc-900/80 py-3 text-center uppercase tracking-[0.25em] text-xs text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            Genealogy
          </a>
          <a
            href="/dna"
            className="rounded-none border border-white/20 bg-zinc-900/80 py-3 text-center uppercase tracking-[0.25em] text-xs text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            DNA
          </a>
          <a
            href="/calendar"
            className="rounded-none border border-amber-400 bg-amber-500/20 py-3 text-center uppercase tracking-[0.25em] text-xs text-amber-300"
          >
            Calendar
          </a>
        </nav>
      </header>

      {/* ░░░ SEARCH BAR + GRID ░░░ */}
      <section className="pb-16">
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 text-sm">
                🔍
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events by name or date…"
                className="w-full rounded-full border border-white/15 bg-zinc-900/80 py-2 pr-4 pl-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>
          </div>
        </div>

        {/* EVENT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleEvents.map((event) => {
            const height = cardHeights[event.slug] ?? 260;
            const firstMedia = event.media?.[0];

            return (
              <Link
                key={event.slug}
                href={`/calendar/${event.slug}`}
                className="group border border-white/10 bg-zinc-900/30 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300 animate-fadeZoom"
                style={{ height: `${height}px` }}
              >
                {/* Poster image zone */}
                <div className="h-2/3 bg-black/50 flex items-center justify-center">
                  {firstMedia?.type === "image" ? (
                    <img
                      src={firstMedia.src}
                      alt={event.title}
                      className="h-full w-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                    />
                  ) : (
                    <div className="text-zinc-400 text-xs">No Image</div>
                  )}
                </div>

                {/* Title / date */}
                <div className="h-1/3 p-3 flex flex-col items-center justify-center text-center">
                  <h3 className="text-amber-300 font-semibold text-sm">
                    {event.date}
                  </h3>
                  <p className="text-xs opacity-80 mt-1">{event.title}</p>
                </div>
              </Link>
            );
          })}

          {/* Empty search state */}
          {visibleEvents.length === 0 && (
            <div className="col-span-full text-center text-sm text-zinc-400">
              No events match your search.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}