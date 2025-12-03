// app/calendar/events.ts

export interface MediaItem {
  type: "image" | "video";
  src: string;
}

export interface CalendarEvent {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  media: MediaItem[]; // <-- Updated for multiple media items
  description: string;
}

export const calendarEvents: CalendarEvent[] = [
  {
    slug: "sergio-birth-1961",
    title: "Sergio's Birth",
    date: "1961-12-02",
    media: [
      { type: "image", src: "/calendar/sergio_birth.jpg" }
    ],
    description:
      "Born in Tierra Blanca, Veracruz — destined for a journey across continents and generations."
  },
  {
    slug: "wedding-anniversary-2007",
    title: "Wedding Anniversary",
    date: "2007-11-23",
    media: [
      { type: "image", src: "/calendar/wedding.jpg" },
      // Example future videos:
      // { type: "video", src: "/calendar/wedding-toast.mp4" },
      // { type: "video", src: "https://youtu.be/Example" }
    ],
    description:
      "The day Sergio and Julia united two worlds — Mexico and Russia — in love and faith."
  },
  {
    slug: "elizabeth-birthday-1940",
    title: "Elizabeth's Birthday",
    date: "1940-03-18",
    media: [
      { type: "image", src: "/calendar/mom.jpg" }
    ],
    description:
      "The birth of Elizabeth — a strong mother who shaped generations."
  }
];