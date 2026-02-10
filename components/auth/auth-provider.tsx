/**
 * This file is a small wrapper around SessionProvider.
 * It stays client-side only so we avoid mixing concerns in layout.tsx.
 */
"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

