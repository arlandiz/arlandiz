"use client";
import { useState, useEffect } from "react";

export default function MasonryGallery() {
  const [columns, setColumns] = useState(6);
  const [computedCols, setComputedCols] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBack, setShowBack] = useState(false);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const images = Array.from({ length: 13 }, (_, i) => `/images/sample${i + 1}.png`);

  const maxColsMobile = 2;
  const maxColsTablet = 5;
  const maxColsDesktop = 8;

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      const limit =
        width >= 1280 ? maxColsDesktop :
        width >= 1024 ? maxColsTablet :
        maxColsMobile;
      setComputedCols(Math.min(columns, limit));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columns]);

  const flipCard = (e?: any) => {
    if (e) e.preventDefault(); // prevent browser context menu
    setShowBack((prev) => !prev);
  };

  const closeViewer = () => {
    setShowBack(false);
    setSelectedImage(null);
  };

  const saveAndClose = () => {
    setShowBack(false);
    setSelectedImage(null);
  };

  return (
    <section className="min-h-screen w-full bg-black text-white px-4 py-8 sm:px-8 lg:px-14">

      <div className="flex items-center gap-3 mb-8">
        <label className="text-gray-300 font-medium">Columns:</label>
        <select
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className="border border-gray-600 bg-gray-900 text-gray-200 p-2 rounded"
        >
          {[1,2,3,4,5,6,7,8].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div
        className="gap-4 columns-1 sm:columns-2 md:columns-3 lg:columns-5 xl:columns-8"
        style={{ columnCount: computedCols }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            draggable="false"
            loading="lazy"
            onClick={() => setSelectedImage(src)}
            className="
              cursor-pointer mb-4 w-full h-auto object-cover break-inside-avoid
              shadow-[0_4px_12px_rgba(0,0,0,0.75)]
              hover:shadow-[0_12px_24px_rgba(0,0,0,1)]
              transition-shadow duration-300
              animate-fadeZoom
            "
          />
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
          <div className="relative w-[90vw] max-w-5xl h-[80vh] perspective-[1500px]">

            {/* Flip container */}
            <div
              className={`absolute inset-0 transition-transform duration-700 preserve-3d ${
                showBack ? "rotate-y-180" : ""
              }`}
            >

              {/* FRONT IMAGE (correct orientation) */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center"
                onContextMenu={flipCard}
              >
                <img
                  src={selectedImage}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>

              {/* BACK NOTES */}
              <div
                className="absolute inset-0 bg-[#cfcfcf] text-black p-10 flex flex-col gap-5 border border-gray-500 rounded-lg shadow-xl backface-hidden rotate-y-180"
                onContextMenu={flipCard}
              >
                <h3 classname="text-xl font-bold text-gray-800">
                  Notes
                </h3>

                <textarea
                  value={notes[selectedImage] || ""}
                  onChange={(e) =>
                    setNotes({ ...notes, [selectedImage]: e.target.value })
                  }
                  className="w-full flex-1 p-4 border border-gray-400 rounded-md bg-white text-black focus:outline-none"
                  placeholder="Enter notes..."
                />

                <div className="flex justify-between">
                  <button
                    onClick={flipCard}
                    className="px-5 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                  >
                    ⬅ Back
                  </button>
                  <button
                    onClick={saveAndClose}
                    className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    💾 Save & Close
                  </button>
                </div>
              </div>
            </div>

            {/* 🟥 CLOSE BUTTON */}
            <button
              onClick={closeViewer}
              className="absolute top-4 right-4 text-white text-3xl hover:text-red-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}