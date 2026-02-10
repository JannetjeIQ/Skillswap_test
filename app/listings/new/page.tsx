"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "CLEANING",
  "TUTORING",
  "PET_CARE",
  "HANDYMAN",
  "GARDENING",
  "OTHER",
] as const;

type ListingCategory = (typeof CATEGORIES)[number];

type FormState = {
  title: string;
  description: string;
  category: ListingCategory;
  price: string;
  email: string;
};

const DEFAULT_FORM: FormState = {
  title: "",
  description: "",
  category: "CLEANING",
  price: "",
  email: "",
};

async function createListing(form: FormState) {
  const res = await fetch("/api/listings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Could not create listing");
  }

  const data = (await res.json()) as { id: number };
  return data.id;
}

export default function NewListingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (status === "loading") {
    return <p className="text-sm text-gray-700">Checking your account…</p>;
  }

  if (!session?.user) {
    return (
      <p className="rounded-xl bg-card px-4 py-6 text-sm text-gray-700 shadow-sm">
        You need to sign in with Google before creating a listing. Use the
        <span className="font-semibold"> Sign in </span>
        button in the top right, then come back here.
      </p>
    );
  }

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const id = await createListing(form);
      router.push(`/listings/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Offer a local service
        </h1>
        <p className="text-sm text-gray-700">
          Share what you offer, how much you charge in EUR, and how people can
          contact you.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-card p-6 shadow-sm"
      >
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-800" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            required
            maxLength={120}
            value={form.title}
            onChange={handleChange("title")}
            className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm text-gray-900"
            placeholder="Weekend cleaning help, maths tutoring, dog walking…"
          />
        </div>

        <div className="space-y-1">
          <label
            className="text-xs font-medium text-gray-800"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={form.description}
            onChange={handleChange("description")}
            className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm text-gray-900"
            placeholder="Add a bit more detail so people know what to expect."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <label
              className="text-xs font-medium text-gray-800"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={handleChange("category")}
              className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm text-gray-900"
            >
              <option value="CLEANING">Cleaning</option>
              <option value="TUTORING">Tutoring</option>
              <option value="PET_CARE">Pet Care</option>
              <option value="HANDYMAN">Handyman</option>
              <option value="GARDENING">Gardening</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              className="text-xs font-medium text-gray-800"
              htmlFor="price"
            >
              Price (EUR)
            </label>
            <input
              id="price"
              required
              type="number"
              min={0}
              step={1}
              value={form.price}
              onChange={handleChange("price")}
              className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm text-gray-900"
              placeholder="25"
            />
          </div>

          <div className="space-y-1">
            <label
              className="text-xs font-medium text-gray-800"
              htmlFor="email"
            >
              Contact email
            </label>
            <input
              id="email"
              required
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm text-gray-900"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating listing…" : "Create listing"}
          </Button>
        </div>
      </form>
    </div>
  );
}

