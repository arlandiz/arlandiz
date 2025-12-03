"use client";

import { useState } from "react";
import { genePoolMarkers } from "./DNAMapOrigen";

export default function GenePoolTable() {
  const [expanded, setExpanded] = useState(false);

  const sorted = [...genePoolMarkers].sort((a, b) => b.percent - a.percent);
  const visibleItems = expanded ? sorted : sorted.slice(0, 10);

  return (
    <div className="text-xs">
      {/* Title */}
      <h3 className="text-center mb-3 uppercase tracking-[0.28em] text-zinc-200">
        DNA Origin &amp; %
      </h3>

      <table className="w-full border-collapse">
        <thead className="bg-white/5">
          <tr>
            <th className="px-2 py-1 text-left font-semibold text-zinc-300">
              Origin
            </th>
            <th className="px-2 py-1 text-right font-semibold text-zinc-300">
              %
            </th>
          </tr>
        </thead>

        <tbody>
          {visibleItems.map((item, idx) => (
            <tr
              key={item.id}
              className={`
                ${idx % 2 ? "bg-white/10" : ""}
                hover:bg-white/20 transition-colors
              `}
            >
              {/* Left column → MUCH stronger */}
              <td
                className="
                  px-2 py-1 
                  text-white 
                  font-bold
                  text-[13px]
                  drop-shadow-[0_0_6px_rgba(255,255,255,0.65)]
                "
              >
                {item.name}
              </td>

              {/* Percentage column → Gold & sharper */}
              <td
                className="
                  px-2 py-1 
                  font-extrabold
                  text-amber-300
                  text-right
                  text-[13px]
                  drop-shadow-[0_0_8px_rgba(255,200,60,0.8)]
                "
              >
                {item.percent}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sorted.length > 10 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 w-full text-center text-[10px] text-amber-300 underline hover:text-amber-200"
        >
          {expanded ? "Show top 10 ↑" : "Show all ↓"}
        </button>
      )}
    </div>
  );
}