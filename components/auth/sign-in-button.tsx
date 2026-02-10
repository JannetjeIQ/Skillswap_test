"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

// Small auth button that switches between sign-in and sign-out.
export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="ghost" disabled>
        Checking session...
      </Button>
    );
  }

  if (session?.user) {
    return (
      <Button variant="ghost" onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }

  return (
    <Button variant="ghost" onClick={() => signIn("google")}>
      Sign in with Google
    </Button>
  );
}

