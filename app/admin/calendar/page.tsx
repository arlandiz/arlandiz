"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminCalendar() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: "",
    description: "",
    image: null as File | null,
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setForm({
      ...form,
      [name]: name === "image"
        ? (e.target as HTMLInputElement).files?.[0] || null
        : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = null;

    if (form.image) {
      const fileName = `${form.slug}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage
        .from("calendar-images")
        .upload(fileName, form.image);

      if (uploadError) {
        alert("Image upload failed");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("calendar-images")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const { error: insertError } = await supabase
      .from("calendar_events")
      .insert({
        title: form.title,
        slug: form.slug,
        date: form.date,
        description: form.description,
        image: imageUrl,
      });

    if (insertError) {
      alert("Error saving event");
    } else {
      alert("Event saved successfully!");
      setForm({ title: "", slug: "", date: "", description: "", image: null });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">Admin: Add Calendar Event</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input
          name="title"
          value={form.title}
          onChange={updateForm}
          placeholder="Event Title"
          className="p-2 rounded bg-zinc-800"
          required
        />

        <input
          name="slug"
          value={form.slug}
          onChange={updateForm}
          placeholder="slug-example"
          className="p-2 rounded bg-zinc-800"
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={updateForm}
          className="p-2 rounded bg-zinc-800"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={updateForm}
          placeholder="Description (optional)"
          className="p-2 rounded bg-zinc-800"
        />

        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={updateForm}
          className="p-2 bg-zinc-900"
        />

        <button
          type="submit"
          className="p-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400"
        >
          Save Event
        </button>
      </form>
    </main>
  );
}