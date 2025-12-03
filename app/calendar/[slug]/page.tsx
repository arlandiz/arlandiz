"use client";

import { useParams } from "next/navigation";
import { calendarEvents } from "../events";

export default function CalendarEventPage() {
  const { slug } = useParams();
  const event = calendarEvents.find((e) => e.slug === slug);

  if (!event)
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-center text-xl text-amber-300">Event Not Found</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-black text-white p-6 sm:p-12">
      
      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-bold text-amber-300 mb-4 drop-shadow-md">
        {event.title}
      </h1>

      {/* Date */}
      <p className="text-sm text-zinc-400 mb-8 tracking-wide">
        {new Date(event.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Media Stack */}
      <div className="space-y-6">
        {event.media.map((media, i) =>
          media.type === "image" ? (
            <img
              key={i}
              src={media.src}
              alt={event.title}
              className="w-full rounded-xl shadow-lg object-cover"
            />
          ) : (
            <video
              key={i}
              controls
              className="w-full rounded-xl shadow-lg"
            >
              <source src={media.src} />
              Your browser does not support the video tag.
            </video>
          )
        )}
      </div>

      {/* Description */}
      <div className="mt-10 text-zinc-200 text-lg leading-relaxed max-w-3xl">
        {event.description}
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <a
          href="/calendar"
          className="inline-block px-4 py-2 border border-amber-300 text-amber-300 rounded-md hover:bg-amber-300 hover:text-black transition"
        >
          ← Back to Calendar
        </a>
      </div>
    </main>
  );
}