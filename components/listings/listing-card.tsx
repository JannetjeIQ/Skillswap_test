import Link from "next/link";
import type { Listing, ListingCategory } from "@prisma/client";
import { CategoryBadge } from "@/components/listings/category-badge";

type ListingCardProps = {
  listing: Listing;
};

function formatPriceEUR(priceCents: number) {
  // Store price in cents for precision, show in EUR for people.
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(priceCents / 100);
}

function formatCategory(category: ListingCategory) {
  const map: Record<ListingCategory, string> = {
    CLEANING: "Cleaning",
    TUTORING: "Tutoring",
    PET_CARE: "Pet Care",
    HANDYMAN: "Handyman",
    GARDENING: "Gardening",
    OTHER: "Other",
  };
  return map[category];
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-900">
            {listing.title}
          </h3>
          <CategoryBadge category={formatCategory(listing.category)} />
        </div>
        <p className="text-sm font-semibold text-primary">
          {formatPriceEUR(listing.priceCents)}
        </p>
      </div>
      <p className="line-clamp-2 text-xs text-gray-700">
        {listing.description}
      </p>
    </Link>
  );
}

