import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { TextDibsButton } from "@/components/landing/TextDibsButton";
import { BackLink } from "@/components/ui/BackLink";
import { getListing } from "@/lib/listings";

// Listings change live and the backend isn't guaranteed reachable at Vercel
// build time — render per-request instead of prerendering at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return {};

  return {
    title: `${listing.title} — Dibs`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: listing.photo_urls,
      type: "website",
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10">
        <BackLink href="/listings">Back to listings</BackLink>
        <div className="relative mx-auto mt-6 aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-foreground/5">
          <Image
            src={listing.photo_urls[0]}
            alt={listing.title}
            fill
            sizes="384px"
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-6 flex items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            {listing.title}
          </h1>
          <span className="shrink-0 text-3xl font-semibold text-accent">
            ${listing.price}
          </span>
        </div>
        <p className="mt-4 whitespace-pre-line text-lg text-foreground/80">
          {listing.description}
        </p>
        <TextDibsButton
          body={`Is the "${listing.title}" still available?`}
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-base font-medium text-white transition hover:bg-accent-hover"
        >
          Text Dibs about this
        </TextDibsButton>
      </main>
      <Footer />
    </>
  );
}
