import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ListingsSearch } from "@/components/listings/ListingsSearch";
import { BackLink } from "@/components/ui/BackLink";
import { getListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Browse listings — Dibs",
  description: "See what's for sale on Dibs right now.",
};

// Listings change live and the backend isn't guaranteed reachable at Vercel
// build time — render per-request instead of prerendering at build time.
export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const listings = await getListings();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 sm:px-10">
        <BackLink href="/">Back to Dibs</BackLink>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          What people are selling
        </h1>
        <p className="mt-2 text-lg text-foreground/70">
          Text Dibs to make an offer on anything below.
        </p>
        <ListingsSearch listings={listings} />
      </main>
      <Footer />
    </>
  );
}
