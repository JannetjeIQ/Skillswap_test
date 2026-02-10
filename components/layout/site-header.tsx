import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/auth/sign-in-button";

// Simple header: brand, primary nav, and auth button.
export function SiteHeader() {
  return (
    <header className="border-b border-muted bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SkillSwap
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/listings" className="text-sm text-gray-700">
            Browse
          </Link>
          <Link href="/listings/new">
            <Button variant="primary">Offer a service</Button>
          </Link>
          <SignInButton />
        </nav>
      </div>
    </header>
  );
}


