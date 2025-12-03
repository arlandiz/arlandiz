// app/components/DNAMapOrigen.tsx
"use client";

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import GenePoolTable from "./GenePoolTable";

export const genePoolMarkers = [
  { id: 1, name: "Central America", percent: 34, coordinates: [-100, 23] },
  { id: 2, name: "Fennoscandia", percent: 6.5, coordinates: [10, 65] },
  { id: 3, name: "Orkney Islands", percent: 6.1, coordinates: [-3, 59] },
  { id: 4, name: "Pima County: The Sonora", percent: 6.1, coordinates: [-111, 31] },
  { id: 5, name: "Tuva", percent: 5.4, coordinates: [95, 52] },
  { id: 6, name: "Basque Country", percent: 4.8, coordinates: [-2, 43] },
  { id: 7, name: "West Africa", percent: 4.4, coordinates: [-2, 9] },
  { id: 8, name: "Western Amazon", percent: 4.1, coordinates: [-70, -4] },
  { id: 9, name: "Southern France", percent: 3.9, coordinates: [2, 44] },
  { id: 10, name: "Western Siberia", percent: 3.7, coordinates: [65, 60] },
  { id: 11, name: "Madagascar", percent: 3.6, coordinates: [45, -19] },
  { id: 12, name: "Western South America", percent: 3.2, coordinates: [-76, -10] },
  { id: 13, name: "The Southern Levant", percent: 2.7, coordinates: [35, 32] },
  { id: 14, name: "Southern Ethiopia", percent: 2.4, coordinates: [38, 7] },
  { id: 15, name: "Sardinia", percent: 2.0, coordinates: [9, 40] },
  { id: 16, name: "Northwestern Africa", percent: 1.6, coordinates: [-5, 28] },
  { id: 17, name: "Austronesian Southeast Asia", percent: 1.5, coordinates: [120, 0] },
  { id: 18, name: "Bantu Africa and the Niger-Congo Areas", percent: 1.4, coordinates: [20, -4] },
  { id: 19, name: "Southeastern India", percent: 1.1, coordinates: [80, 12] },
  { id: 20, name: "Eastern Amazon", percent: 1.1, coordinates: [-52, -3] },
  { id: 21, name: "Hadza", percent: 0.4, coordinates: [35, -3] },
  { id: 22, name: "Northern Mongolia and Eastern Siberia", percent: 0.1, coordinates: [104, 50] },
];

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function DNAMapOrigen() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="w-full min-h-[70vh] flex flex-col bg-black">

      {/* TITLE + NARRATIVE */}
      <div className="px-4 pb-4 max-w-5xl">
        <h2 className="text-amber-400 text-2xl sm:text-3xl font-bold uppercase tracking-[0.28em] mb-2">
          Ancestral Map
        </h2>

        {/* Short line always visible */}
        <p className="text-sm text-zinc-300 max-w-xl">
          My DNA lights up across the world — each pulse a signal from my ancestors.
        </p>

        {/* Expandable narrative */}
        {showStory && (
          <p className="mt-3 text-sm text-zinc-200 max-w-2xl leading-relaxed">
            Every light that pulses on this map is an echo of lives, families, and
            generations of survivors — ancestors who fought, loved, dreamed and
            endured. Their courage, fears and struggles run through me still.
            Voices I never heard, embraces I never felt, yet I know them; I sleep
            with them, I live them. Every warrior and farmer, I am. The
            shoemaker and sailor, I am. I may not know their names, but I see
            their traces in the mirror and feel them in my own emotions. I am the
            continuation of every one of them. I am because of them.
          </p>
        )}

        <button
          type="button"
          onClick={() => setShowStory((v) => !v)}
          className="mt-2 text-xs uppercase tracking-[0.2em] text-amber-300 hover:text-amber-200"
        >
          {showStory ? "Hide Story ▲" : "Read Story ▼"}
        </button>
      </div>

      {/* MAP + FLOATING TABLE */}
      <div className="relative w-full max-w-[1800px] h-[78vh] mx-auto">
        <ComposableMap projectionConfig={{ scale: 200 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="transparent"
                  stroke="#777"
                  strokeWidth={1.05}
                />
              ))
            }
          </Geographies>

          {genePoolMarkers.map((marker) => {
            const p = marker.percent;
            const size =
              p >= 25 ? 14 : p >= 10 ? 11 : p >= 5 ? 9 : p >= 2 ? 7 : 5;
            const speed =
              p >= 25 ? 1.6 : p >= 10 ? 1.9 : p >= 5 ? 2.2 : p >= 2 ? 2.6 : 3.1;

            return (
              <Marker
                key={marker.id}
                coordinates={marker.coordinates}
                onMouseEnter={() => setHovered(marker.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* outer pulse */}
                <circle
                  r={size}
                  className="dna-pulse"
                  style={{ "--pulse-speed": `${speed}s` } as any}
                />
                {/* inner core */}
                <circle r={size * 0.55} fill="gold" opacity={0.9} />

                {/* label on hover */}
                {hovered === marker.name && (
                  <text
                    textAnchor="middle"
                    y={-size - 8}
                    fill="white"
                    stroke="black"
                    strokeWidth={1.5}
                    style={{ fontSize: "12px", fontWeight: 900 }}
                  >
                    {marker.name} — {marker.percent}%
                  </text>
                )}
              </Marker>
            );
          })}
        </ComposableMap>

        {/* FLOATING GLASS TABLE (top-right) */}
        <div
          className="
            absolute top-4 right-4
            w-[240px]
            max-h-[65%]
            p-4 z-50
            overflow-y-auto
            rounded-2xl

            bg-white/10
            backdrop-blur-xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.6)]

            before:content-[''] before:absolute before:inset-0
            before:rounded-2xl
            before:bg-gradient-to-br before:from-white/10 before:to-transparent
            before:pointer-events-none
          "
        >
          <GenePoolTable />
        </div>
      </div>
    </section>
  );
}