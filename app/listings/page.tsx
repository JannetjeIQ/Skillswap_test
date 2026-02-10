import { prisma } from "@/lib/prisma";
import { ListingCard } from "@/components/listings/listing-card";

// Categories defined here so build does not depend on @prisma/client (fixes Vercel).
const CATEGORIES = [
  "CLEANING",
  "TUTORING",
  "PET_CARE",
  "HANDYMAN",
  "GARDENING",
  "OTHER",
] as const;

type SearchParams = {
  category?: string;
};

type ListingsPageProps = {
  searchParams: SearchParams;
};

const CATEGORY_OPTIONS: { value: (typeof CATEGORIES)[number] | "ALL"; label: string }[] = [
  { value: "ALL", label: "All categories" },
  { value: "CLEANING", label: "Cleaning" },
  { value: "TUTORING", label: "Tutoring" },
  { value: "PET_CARE", label: "Pet Care" },
  { value: "HANDYMAN", label: "Handyman" },
  { value: "GARDENING", label: "Gardening" },
  { value: "OTHER", label: "Other" },
];

export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const selectedCategory = searchParams.category as (typeof CATEGORIES)[number] | undefined;

  const listings = await prisma.listing.findMany({
    where: selectedCategory ? { category: selectedCategory } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Browse local services
          </h1>
          <p className="text-sm text-gray-700">
            Filter by category to quickly find cleaning, tutoring, pet care,
            handyman help, gardening, and more.
          </p>
        </div>
        <form className="flex gap-2 text-sm">
          <label className="sr-only" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={selectedCategory ?? "ALL"}
            className="rounded-lg border border-muted bg-background px-3 py-2 text-xs text-gray-800"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
          >
            Apply
          </button>
        </form>
      </section>

      {listings.length === 0 ? (
        <p className="rounded-xl bg-card px-4 py-6 text-sm text-gray-700 shadow-sm">
          No listings yet. Be the first to{" "}
          <a
            href="/listings/new"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            offer a service
          </a>
          .
        </p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>
      )}
    </div>
  );
}

