"use client";

import Link from "next/link";
import MasonryGallery from "./components/MasonryGallery";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-8">
      
      {/* Header Row */}
      <div className="flex justify-start mb-6">
        <h1 className="font-arizona text-6xl drop-shadow-lg">
          Arlandiz
        </h1>
      </div>

      {/* Full-Width Navigation Buttons */}
      <nav className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-center">
        <Link
          href="/gene"
          className="bg-gray-800 py-3 uppercase tracking-wide hover:bg-gray-700 transition rounded block"
        >
          Genealogy
        </Link>

        <Link
          href="/dna"
          className="bg-gray-800 py-3 uppercase tracking-wide hover:bg-gray-700 transition rounded block"
        >
          DNA
        </Link>

        <Link
          href="/calendar"
          className="bg-gray-800 py-3 uppercase tracking-wide hover:bg-gray-700 transition rounded block"
        >
          Calendar
        </Link>
      </nav>

      {/* Masonry Gallery */}
      <MasonryGallery />

    </main>
  );
}