import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ListingCard } from "@/components/listings/ListingCard";
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
        <h1 className="text-2xl font-semibold tracking-tight">
          What people are selling
        </h1>
        <p className="mt-2 text-foreground/70">
          Text Dibs to make an offer on anything below.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
