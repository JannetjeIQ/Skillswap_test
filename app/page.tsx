import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  // Lean, marketing-style hero with clear next steps.
  return (
    <div className="space-y-16">
      <section className="grid gap-10 md:grid-cols-[2fr,1.5fr] md:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-gray-700">
            Local skills, zero fuss
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Swap skills,{" "}
            <span className="text-primary">support your local community</span>.
          </h1>
          <p className="max-w-xl text-sm text-gray-700 md:text-base">
            SkillSwap is a simple marketplace where neighbours can offer and
            find local services like cleaning, tutoring, pet care, handyman
            help, gardening, and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings">
              <Button variant="primary">Browse listings</Button>
            </Link>
            <Link href="/listings/new">
              <Button variant="outline">Offer a service</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">
            Popular categories
          </h2>
          <dl className="grid grid-cols-2 gap-4 text-xs text-gray-700">
            <div className="space-y-1 rounded-lg bg-background px-3 py-3">
              <dt className="font-medium text-primary">Cleaning</dt>
              <dd>Home cleaning, laundry, and one-off deep cleans.</dd>
            </div>
            <div className="space-y-1 rounded-lg bg-background px-3 py-3">
              <dt className="font-medium text-primary">Tutoring</dt>
              <dd>Homework help, exam prep, and language practice.</dd>
            </div>
            <div className="space-y-1 rounded-lg bg-background px-3 py-3">
              <dt className="font-medium text-primary">Pet Care</dt>
              <dd>Dog walking, pet sitting, and check-ins.</dd>
            </div>
            <div className="space-y-1 rounded-lg bg-background px-3 py-3">
              <dt className="font-medium text-primary">Handyman</dt>
              <dd>Small repairs, furniture builds, and odd jobs.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="grid gap-6 rounded-xl bg-card p-6 shadow-sm md:grid-cols-3">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900">1. Post</h3>
          <p className="text-sm text-gray-700">
            Create a short listing with what you offer or need, how much you
            charge in EUR, and how to contact you.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900">2. Browse</h3>
          <p className="text-sm text-gray-700">
            Filter by category and quickly scan local services that match what
            you&apos;re looking for.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900">3. Connect</h3>
          <p className="text-sm text-gray-700">
            Reach out via email to arrange the details directly. No complex
            messaging or bookings to manage.
          </p>
        </div>
      </section>
    </div>
  );
}

