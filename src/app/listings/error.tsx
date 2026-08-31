"use client";

import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default function ListingsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
        <h1 className="text-xl font-semibold">Couldn&apos;t load listings</h1>
        <p className="text-foreground/70">
          The marketplace is temporarily unreachable. Try again in a moment.
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-hover"
        >
          Try again
        </button>
      </main>
      <Footer />
    </>
  );
}
