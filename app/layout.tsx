import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { AuthProvider } from "@/components/auth/auth-provider";

export const metadata = {
  title: "SkillSwap",
  description:
    "Find and offer local services like cleaning, tutoring, pet care, and more.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  // Layout stays minimal: global auth provider, header, then page content.
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <AuthProvider>
          <SiteHeader />
          <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}



