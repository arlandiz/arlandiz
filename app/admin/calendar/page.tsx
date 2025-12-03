export const dynamic = "force-dynamic";
"use client";

import Link from "next/link";
import AdminNavBar from "@/app/components/AdminNavBar";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

interface EventItem {
  id: number;
  title: string;
  slug: string;
}

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("id, title, slug");

        if (error) {
          console.error("Error fetching events:", error);
          return;
        }

        setEvents(data || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <ProtectedRoute>
      <AdminNavBar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Calendar Events</h1>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((event) => (
              <li
                key={event.id}
                className="border p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <Link
                  href={`/admin/calendar/${event.slug}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {event.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}