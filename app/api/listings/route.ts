import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth";

const createListingSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10),
  category: z.enum([
    "CLEANING",
    "TUTORING",
    "PET_CARE",
    "HANDYMAN",
    "GARDENING",
    "OTHER",
  ]),
  // Store as string then convert so we can show friendly validation messages.
  price: z.string().regex(/^[0-9]+$/, {
    message: "Use whole numbers only for now (e.g. 25).",
  }),
  email: z.string().email(),
});

export async function POST(request: Request) {
  // Using getServerSession keeps this compatible with NextAuth v4 in App Router.
  const session = await getServerSession(authConfig);

  if (!session?.user?.email || !(session.user as { id?: string }).id) {
    return Response.json({ message: "You must be signed in." }, { status: 401 });
  }

  const json = await request.json();
  const parsed = createListingSchema.safeParse(json);

  if (!parsed.success) {
    return Response.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid data." },
      { status: 400 },
    );
  }

  const { title, description, category, price, email } = parsed.data;

  const priceCents = Number(price) * 100;
  if (Number.isNaN(priceCents) || priceCents < 0) {
    return Response.json(
      { message: "Price must be a non-negative number." },
      { status: 400 },
    );
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      priceCents,
      email,
      userId: (session.user as { id?: string }).id ?? null,
    },
    select: { id: true },
  });

  return Response.json({ id: listing.id }, { status: 201 });
}

