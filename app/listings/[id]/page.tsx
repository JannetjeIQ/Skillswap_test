import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryBadge } from "@/components/listings/category-badge";

type ListingPageProps = {
  params: { id: string };
};

function formatPriceEUR(priceCents: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(priceCents / 100);
}

export default async function ListingPage({ params }: ListingPageProps) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    notFound();
  }

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) {
    notFound();
  }

  const createdAt = new Intl.DateTimeFormat("en-IE", {
    dateStyle: "medium",
  }).format(listing.createdAt);

  return (
    <article className="space-y-6">
      <Link
        href="/listings"
        className="text-xs font-medium text-primary underline-offset-2 hover:underline"
      >
        &larr; Back to listings
      </Link>

      <header className="space-y-3">
        <CategoryBadge category={listing.category} />
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          {listing.title}
        </h1>
        <p className="text-sm text-gray-700">
          {formatPriceEUR(listing.priceCents)} · Posted on {createdAt}
        </p>
      </header>

      <section className="space-y-3 rounded-xl bg-card p-6 text-sm text-gray-800 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Details</h2>
        <p className="whitespace-pre-line">{listing.description}</p>
      </section>

      <section className="rounded-xl bg-card p-6 text-sm text-gray-800 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-gray-900">
          How to get in touch
        </h2>
        <p>
          Email:{" "}
          <a
            href={`mailto:${listing.email}`}
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {listing.email}
          </a>
        </p>
      </section>
    </article>
  );
}

