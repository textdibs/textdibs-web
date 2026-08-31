import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BackLink } from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "Privacy Policy — Dibs",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10">
        <BackLink href="/">Back to Dibs</BackLink>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-foreground/70">
          Placeholder —{" "}
          <a
            href="https://google.com"
            className="text-accent underline underline-offset-2"
          >
            google.com
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
